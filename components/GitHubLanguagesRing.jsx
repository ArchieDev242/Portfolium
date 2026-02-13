"use client";

import useGitHubLanguages from "@/hooks/useGitHubLanguages";

const GITHUB_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  'C++': '#f34b7d',
  'C#': '#239120',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Shell: '#89e051',
  Lua: '#000080',
  GLSL: '#5686a5',
  'Objective-C': '#438eff',
  Swift: '#F05138',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Kotlin: '#A97BFF',
  SCSS: '#c6538c',
  default: '#94a3b8'
};

const getColor = (name) => GITHUB_COLORS[name] || GITHUB_COLORS.default;

const GitHubLanguagesRing = ({ username = 'ArchieDev242' }) => {
  const { languages, is_loading, error } = useGitHubLanguages(username);

  if(is_loading) 
    return (
      <div className = "flex flex-col items-center gap-4">
        <div className = "w-32 h-32 rounded-full border-4 border-white/10 animate-pulse" />
        <p className = "text-sm text-white/50">Loading languages...</p>
      </div>
    );

  if(error || languages.length === 0) 
    return null;

  const size = 120;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = languages.map(({ name, percent, bytes }) => {
    const length = (percent / 100) * circumference;
    const seg = { name, percent, bytes, offset, length };
    offset += length;
    return seg;
  });

  return (
    <div className = "flex flex-col items-center gap-4">
      <div className = "relative" style = {{ width: size, height: size }}>
        <svg width = {size} height = {size} className = "transform -rotate-90">
          {segments.map((seg, i) => (
            <circle
              key = {seg.name}
              cx = {size / 2}
              cy = {size / 2}
              r = {r}
              fill = "none"
              stroke = {getColor(seg.name)}
              strokeWidth = {stroke}
              strokeDasharray = {`${seg.length} ${circumference}`}
              strokeDashoffset = {-seg.offset}
              strokeLinecap = "round"
              className = "transition-all duration-700"
            />
          ))}
        </svg>
        <div className = "absolute inset-0 flex items-center justify-center">
          <span className = "text-xs text-white/60 font-medium">GitHub</span>
        </div>
      </div>
      <div className = "flex flex-wrap justify-center gap-x-3 gap-y-1">
        {languages.map(({ name, percent }) => (
          <div key = {name} className = "flex items-center gap-1.5">
            <span 
              className = "w-2 h-2 rounded-full shrink-0" 
              style = {{ backgroundColor: getColor(name) }} 
            />
            <span className = "text-xs text-white/80">
              {name} <span className = "text-white/50">{(percent || 0).toFixed(0)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubLanguagesRing;
