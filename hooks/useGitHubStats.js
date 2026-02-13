"use client";

import { useState, useEffect } from 'react';

const useGitHubStats = (username = 'ArchieDev242') => {
  const [stats, setStats] = useState({
    total_commits: 0,
    total_repos: 0,
    is_loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try 
      {
        setStats(prev => ({ ...prev, is_loading: true, error: null }));

        const headers = { 'Accept': 'application/vnd.github.cloak-preview+json' };

        const [searchRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/search/commits?q=author:${username}&per_page=1`, { headers }),
          fetch(`https://api.github.com/users/${username}`)
        ]);

        let total_commits = 0;
        let total_repos = 0;

        if(searchRes.ok) 
          {
          const searchData = await searchRes.json();
          total_commits = searchData.total_count ?? 0;
        }

        if(userRes.ok) 
          {
          const userData = await userRes.json();
          total_repos = userData.public_repos ?? 0;
        }

        setStats({
          total_commits: total_commits || 0,
          total_repos: total_repos || 0,
          is_loading: false,
          error: null
        });
      } catch(err) 
      {
        setStats(prev => ({
          ...prev,
          is_loading: false,
          error: err.message
        }));
      }
    };

    fetchStats();
  }, [username]);

  return stats;
};

export default useGitHubStats;
