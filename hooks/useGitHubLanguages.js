"use client";

import { useState, useEffect } from 'react';

const useGitHubLanguages = (username = 'ArchieDev242', maxRepos = 30) => {
  const [data, setData] = useState({
    languages: [],
    is_loading: true,
    error: null
  });

  useEffect(() => {
    const fetchLanguages = async () => {
      try 
      {
        setData(prev => ({ ...prev, is_loading: true, error: null }));

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=${maxRepos}&sort=pushed`);
        if(!reposRes.ok) throw new Error('Failed to fetch repos');

        const repos = await reposRes.json();
        const aggregated = {};

        await Promise.all(repos.slice(0, maxRepos).map(async (repo) => {
          try 
          {
            const langRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
            if(!langRes.ok) return;

            const langs = await langRes.json();
            Object.entries(langs).forEach(([name, bytes]) => {
              aggregated[name] = (aggregated[name] || 0) + bytes;
            });
          } catch { /* skip repo */ }
        }));

        const total = Object.values(aggregated).reduce((a, b) => a + b, 0);
        const languages = Object.entries(aggregated)
          .map(([name, bytes]) => ({ name, bytes, percent: total ? (bytes / total) * 100 : 0 }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 8);

        setData({
          languages,
          is_loading: false,
          error: null
        });
      } catch(err) 
      {
        setData(prev => ({
          ...prev,
          languages: [],
          is_loading: false,
          error: err.message
        }));
      }
    };

    fetchLanguages();
  }, [username, maxRepos]);

  return data;
};

export default useGitHubLanguages;
