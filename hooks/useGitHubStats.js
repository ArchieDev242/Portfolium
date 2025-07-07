"use client";

import { useState, useEffect } from 'react';

const useGitHubStats = (username = 'ArchieDev242') => {
  const [stats, setStats] = useState({
    total_commits: 0,
    total_repos: 10,
    is_loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try 
      {
        setStats(prev => ({ ...prev, is_loading: true }));

        let search_commits = 0;

        try 
        {
          const search_response = await fetch(
            `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
            {
              headers: 
              {
                'Accept': 'application/vnd.github.cloak-preview+json'
              }
            }
          );
          
          if(search_response.ok) 
            {
            const search_data = await search_response.json();

            if(search_data.total_count) 
              {
              search_commits = search_data.total_count;
              console.log('GitHub Search API total commits:', search_commits);
            }
          }
        } catch(search_error) 
        {
          console.log('Search API недоступний, використовуємо основний підхід');
        }

        let graphql_commits = 0;

        try 
        {
          const graphql_response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: 
            {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              query: `
                query {
                  user(login: "${username}") {
                    contributionsCollection {
                      totalCommitContributions
                    }
                  }
                }
              `
            })
          });
          
          if(graphql_response.ok) 
            {
            const graphql_data = await graphql_response.json();

            if(graphql_data.data?.user?.contributionsCollection?.totalCommitContributions) 
              {
              graphql_commits = graphql_data.data.user.contributionsCollection.totalCommitContributions;
              console.log('GitHub GraphQL API total commits:', graphql_commits);
            }
          }
        } catch(graphql_error) 
        {
          console.log('GraphQL API недоступний:', graphql_error.message);
        }

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
        
        const commit_promises = repos.map(async (repo) => {
          try 
          {
            let repo_commits = 0;
            let page = 1;
            let has_more = true;
            
            while(has_more && page <= 10) 
              {
              const commits_response = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100&page=${page}`,
                {
                  headers: 
                  {
                    'Accept': 'application/vnd.github.v3+json'
                  }
                }
              );
              
              if(commits_response.ok) 
                {
                const commits = await commits_response.json();
                
                if(commits.length === 0) 
                  {
                  has_more = false;
                } else 
                {
                  repo_commits += commits.length;
                  console.log(`${repo.name} page ${page}: ${commits.length} commits (total: ${repo_commits})`);
                  
                  if(commits.length < 100) 
                    {
                    has_more = false;
                  }

                  page++;
                }
              } else 
              {
                console.warn(`Failed to fetch commits for ${repo.name}, page ${page}`);
                has_more = false;
              }
            }
            
            console.log(`${repo.name}: ${repo_commits} total commits`);
            return repo_commits;
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

        console.log('Total commits calculated by API:', total_commits);
        console.log('Total commits from Search API:', search_commits);
        console.log('Total commits from GraphQL API:', graphql_commits);

        const final_commit_count = Math.max(total_commits, search_commits, graphql_commits, 200);

        console.log('Final commit count chosen:', final_commit_count);

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
