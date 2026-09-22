"use client";

import { useState, useEffect } from 'react';

const CACHE_KEY_PREFIX = 'gh_languages_';
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

const get_cached_languages = (user) => {
  if(typeof window === 'undefined') return null;
  try
  {
    const item = localStorage.getItem(`${CACHE_KEY_PREFIX}${user}`);
    if(!item) return null;
    const parsed = JSON.parse(item);
    if(parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.languages?.length > 0)
    {
      return parsed.languages;
    }
  } catch(e)
  {
    return null;
  }
  return null;
};

const useGitHubLanguages = (username = 'ArchieDev242', max_repos = 12) => {
  // initial state matches server render to prevent hydration mismatch
  const [data, set_data] = useState({
    languages: [],
    is_loading: true,
    error: null
  });

  useEffect(() => {
    // hydrate from client cache immediately after mount
    const cached = get_cached_languages(username);
    if(cached)
    {
      set_data({
        languages: cached,
        is_loading: false,
        error: null
      });
      return;
    }

    const controller = new AbortController();

    const fetch_languages = async () => {
      try
      {
        set_data(prev => ({ ...prev, is_loading: true, error: null }));

        const repos_res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${max_repos}&sort=pushed`,
          { signal: controller.signal }
        );
        if(!repos_res.ok) throw new Error(`Failed to fetch repos: ${repos_res.status}`);

        const repos = await repos_res.json();
        const aggregated = {};

        await Promise.all(repos.slice(0, max_repos).map(async (repo) => {
          try
          {
            const lang_res = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/languages`,
              { signal: controller.signal }
            );
            if(!lang_res.ok) return;

            const langs = await lang_res.json();
            Object.entries(langs).forEach(([name, bytes]) => {
              aggregated[name] = (aggregated[name] || 0) + bytes;
            });
          } catch(e)
          {
            /* skip repo */
          }
        }));

        const total = Object.values(aggregated).reduce((a, b) => a + b, 0);
        const languages = Object.entries(aggregated)
          .map(([name, bytes]) => ({ name, bytes, percent: total ? (bytes / total) * 100 : 0 }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 8);

        if(languages.length > 0 && typeof window !== 'undefined')
        {
          localStorage.setItem(`${CACHE_KEY_PREFIX}${username}`, JSON.stringify({
            timestamp: Date.now(),
            languages
          }));
        }

        set_data({
          languages,
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
            if(parsed.languages?.length > 0)
            {
              set_data({
                languages: parsed.languages,
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

        set_data(prev => ({
          ...prev,
          languages: [],
          is_loading: false,
          error: err.message
        }));
      }
    };

    fetch_languages();

    return () => {
      controller.abort();
    };
  }, [username, max_repos]);

  return data;
};

export default useGitHubLanguages;
