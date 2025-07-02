"use client";

import { Item } from "@radix-ui/react-select";
import CountUp from "react-countup";
import useGitHubStats from "../hooks/useGitHubStats";

const Stats = () => {
  const { total_commits: totalCommits, total_repos: totalRepos, is_loading: isLoading, error } = useGitHubStats('Archie242');

  const stats = [
    {
      num: 1,
      txt: "Years of experience",
    },
    {
      num: totalRepos || 4,
      txt: "Projects completed",
    },
    {
      num: totalCommits,
      txt: "Code commits",
    },
  ];
  return (
    <section className = "pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className = "container mx-auto">
        <div className = "flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => (
            <div 
              className = "flex-1 flex gap-4 items-center justify-center xl:justify-start"
              key = {index}
            >
              <CountUp 
                end = {item.num}
                duration = {5}
                delay = {2}
                className = "text-4xl xl:text-6xl font-extrabold"
              />
              <p className = {`${item.txt.length < 15 ? "max-w-[100px]" : "max-w-0"} leading-snug text-white/80`}>
                {item.txt}
                {/* show loading indicator for commits */}
                {item.txt === "Code commits" && isLoading && (
                  <span className = "ml-2 text-xs text-accent-default animate-pulse">updating...</span>
                )}
                {/* show error indicator if failed to load */}
                {item.txt === "Code commits" && error && (
                  <span className = "ml-2 text-xs text-red-400" title = {error}>⚠</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats