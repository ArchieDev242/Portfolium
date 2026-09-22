"use client";

import { useState, useEffect } from 'react';

const CACHE_KEY_PREFIX = 'gh_stats_';
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

const get_cached_stats = (user) => {
  if(typeof window === 'undefined') return null;
  try
  {
    const item = localStorage.getItem(`${CACHE_KEY_PREFIX}${user}`);
    if(!item) return null;
    const parsed = JSON.parse(item);
    if(parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.stats)
    {
      return parsed.stats;
    }
  } catch(e)
  {
    return null;
  }
  return null;
};

const useGitHubStats = (username = 'ArchieDev242') => {
  // initial state matches server render to prevent hydration mismatch
  const [stats, set_stats] = useState({
    total_commits: 0,
    total_repos: 0,
    is_loading: true,
    error: null
  });

  useEffect(() => {
    // hydrate from client cache immediately after mount
    const cached = get_cached_stats(username);
    if(cached)
    {
      set_stats({
        total_commits: cached.total_commits || 0,
        total_repos: cached.total_repos || 0,
        is_loading: false,
        error: null
      });
      return;
    }

    const controller = new AbortController();

    const fetch_stats = async () => {
      try
      {
        set_stats(prev => ({ ...prev, is_loading: true, error: null }));

        const headers = { 'Accept': 'application/vnd.github.cloak-preview+json' };

        const [search_res, user_res] = await Promise.all([
          fetch(`https://api.github.com/search/commits?q=author:${username}&per_page=1`, {
            headers,
            signal: controller.signal
          }),
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal
          })
        ]);

        let total_commits = 0;
        let total_repos = 0;

        if(search_res.ok)
        {
          const search_data = await search_res.json();
          total_commits = search_data.total_count ?? 0;
        }

        if(user_res.ok)
        {
          const user_data = await user_res.json();
          total_repos = user_data.public_repos ?? 0;
        }

        const new_stats = {
          total_commits: total_commits || 0,
          total_repos: total_repos || 0,
        };

        if((total_commits > 0 || total_repos > 0) && typeof window !== 'undefined')
        {
          localStorage.setItem(`${CACHE_KEY_PREFIX}${username}`, JSON.stringify({
            timestamp: Date.now(),
            stats: new_stats
          }));
        }

        set_stats({
          ...new_stats,
          is_loading: false,
          error: null
        });
      } catch(err)
      {
        if(err.name === 'AbortError') return;

        // check if stale cache exists before showing error
        const stale_raw = typeof window !== 'undefined' ? localStorage.getItem(`${CACHE_KEY_PREFIX}${username}`) : null;
        if(stale_raw)
        {
          try
          {
            const parsed = JSON.parse(stale_raw);
            if(parsed.stats)
            {
              set_stats({
                ...parsed.stats,
                is_loading: false,
                error: null
              });
              return;
            }
          } catch(e)
          {
            /* proceed to error state */
          }
        }

        set_stats(prev => ({
          ...prev,
          is_loading: false,
          error: err.message
        }));
      }
    };

    fetch_stats();

    return () => {
      controller.abort();
    };
  }, [username]);

  return stats;
};

export default useGitHubStats;
