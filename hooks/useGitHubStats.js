"use client";

import { useState, useEffect } from 'react';

const useGitHubStats = (username = 'ArchieDev242') => {
  const [stats, setStats] = useState({
    total_commits: 170, // fallback value based on actual count
    total_repos: 10,
    is_loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try 
      {
        setStats(prev => ({ ...prev, is_loading: true }));

        const user_response = await fetch(`https://api.github.com/users/${username}`);
        
        if(!user_response.ok) throw new Error('Failed to fetch user data');
        
        const user_data = await user_response.json();

        console.log('GitHub user data:', { 
          login: user_data.login, 
          public_repos: user_data.public_repos 
        });

        const repos_response = await fetch(`https://api.github.com/users/${username}/repos?type=all&per_page=100`);
        
        if(!repos_response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await repos_response.json();
        console.log('Found repositories:', repos.length);

        let total_commits = 0;
        const commit_promises = repos.slice(0, 20).map(async (repo) => {
          try 
          {
            // try to get commits for this repo
            const commits_response = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`,
              {
                headers: {
                  'Accept': 'application/vnd.github.v3+json'
                }
              }
            );
            
            if(commits_response.ok) 
                {
              const commits = await commits_response.json();
              console.log(`${repo.name}: ${commits.length} commits`);
              
              if(commits.length === 100) 
                {
                // try to get more pages
                let page = 2;
                let more_commits = commits.length;
                
                while(page <= 5) 
                    {
                  const next_page_response = await fetch(
                    `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100&page=${page}`
                  );
                  
                  if(next_page_response.ok) 
                    {
                    const next_page_commits = await next_page_response.json();

                    if(next_page_commits.length === 0) break;
                    
                    more_commits += next_page_commits.length;
                    console.log(`${repo.name} page ${page}: +${next_page_commits.length} commits`);
                    
                    if(next_page_commits.length < 100) break;
                    page++;
                  } else 
                  {
                    break;
                  }
                }
                
                return more_commits;
              }
              
              return commits.length;
            }
            return 0;
          } catch(error) 
          {
            console.warn(`Failed to fetch commits for ${repo.name}:`, error.message);
            return 0;
          }
        });

        const commit_counts = await Promise.allSettled(commit_promises);
        total_commits = commit_counts.reduce((total, result) => {
          if(result.status === 'fulfilled') 
            {
            return total + result.value;
          }
          return total;
        }, 0);

        console.log('Total commits calculated:', total_commits);

        const final_commit_count = Math.max(total_commits, 162);

        setStats({
          total_commits: final_commit_count,
          total_repos: user_data.public_repos,
          is_loading: false,
          error: null
        });

      } catch(error) 
      {
        console.error('GitHub API Error:', error);
        setStats(prev => ({
          ...prev,
          is_loading: false,
          error: error.message
        }));
      }
    };

    fetchGitHubStats();
  }, [username]);

  return stats;
};

export default useGitHubStats;
