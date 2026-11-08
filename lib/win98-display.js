// shared Display Properties data: wallpapers, patterns, schemes and screensavers

export const WALLPAPERS = [
  { id: 'teal', name: 'Windows 98 Teal', color: '#008080' },
  { id: 'navy', name: 'Setup 98 Navy', color: '#000080' },
  { id: 'forest', name: 'Forest Green', color: '#228B22' },
  { id: 'ocean', name: 'Ocean Blue', color: '#006994' },
  { id: 'sunset', name: 'Sunset Orange', color: '#FF6347' },
  { id: 'matrix', name: 'Matrix Black', color: '#000000' },
  { id: 'cyber', name: 'Cyberpunk Violet', color: '#1a0033' }
];

// 8x8 one-bit patterns drawn over the wallpaper color, like the Win98 "Pattern..." list
export const PATTERNS = [
  { id: 'none', name: '(None)', path: '' },
  { id: 'bricks', name: 'Bricks', path: 'M0 0h8v1H0zM0 4h8v1H0zM0 1h1v3H0zM4 5h1v3H4z' },
  { id: 'diamonds', name: 'Diamonds', path: 'M3 0h1v1H3zM2 1h1v1H2zM4 1h1v1H4zM1 2h1v1H1zM5 2h1v1H5zM0 3h1v1H0zM6 3h1v1H6zM1 4h1v1H1zM5 4h1v1H5zM2 5h1v1H2zM4 5h1v1H4zM3 6h1v1H3z' },
  { id: 'weave', name: 'Weave', path: 'M0 0h3v1H0zM4 1h1v3H4zM4 4h3v1H4zM0 5h1v3H0z' },
  { id: 'dots', name: 'Dots', path: 'M0 0h1v1H0zM4 4h1v1H4z' }
];

// colors follow the classic Win98 appearance schemes; inactive title fades from grey into the face color
export const SCHEMES = [
  { id: 'standard', name: 'Windows Standard', face: '#c0c0c0', title_a: '#000080', title_b: '#1084d0', highlight: '#000080' },
  { id: 'desert', name: 'Desert', face: '#d5ccbb', title_a: '#008080', title_b: '#5ab0a8', highlight: '#008080' },
  { id: 'lilac', name: 'Lilac', face: '#aea8d9', title_a: '#5a4eb1', title_b: '#9890e0', highlight: '#5a4eb1' },
  { id: 'rainy-day', name: 'Rainy Day', face: '#8399b1', title_a: '#4f657d', title_b: '#98b0c8', highlight: '#4f657d' },
  { id: 'rose', name: 'Rose', face: '#cfafb7', title_a: '#9f6070', title_b: '#d8a0b0', highlight: '#9f6070' },
  { id: 'wheat', name: 'Wheat', face: '#d8d4b0', title_a: '#808000', title_b: '#c0c040', highlight: '#808000' }
];

export const get_scheme = (scheme_id) => SCHEMES.find(s => s.id === scheme_id) || SCHEMES[0];

// css variables read by the scheme rules in win98.css
export const get_scheme_vars = (scheme_id) => {
  const scheme = get_scheme(scheme_id);
  return {
    '--scheme-face': scheme.face,
    '--scheme-title-a': scheme.title_a,
    '--scheme-title-b': scheme.title_b,
    '--scheme-highlight': scheme.highlight
  };
};

export const SCREENSAVERS = [
  { id: 'mystify', name: 'Mystify Your Mind' },
  { id: 'starfield', name: '3D Flying Windows / Starfield' },
  { id: 'none', name: '(None)' }
];

export const DEFAULT_DISPLAY = {
  wallpaper: '#008080',
  pattern: 'none',
  scheme: 'standard',
  screensaver: 'mystify',
  idle_minutes: 2
};

// fill in missing or invalid saved values so old saves keep working
export const normalize_display = (saved) => {
  const display = { ...DEFAULT_DISPLAY, ...(saved || {}) };
  if(!PATTERNS.some(p => p.id === display.pattern)) display.pattern = DEFAULT_DISPLAY.pattern;
  if(!SCHEMES.some(s => s.id === display.scheme)) display.scheme = DEFAULT_DISPLAY.scheme;
  if(!SCREENSAVERS.some(s => s.id === display.screensaver)) display.screensaver = DEFAULT_DISPLAY.screensaver;
  display.idle_minutes = Math.min(60, Math.max(1, Number(display.idle_minutes) || DEFAULT_DISPLAY.idle_minutes));
  return display;
};

export const get_pattern_image = (pattern_id) => {
  const pattern = PATTERNS.find(p => p.id === pattern_id);
  if(!pattern || !pattern.path) return 'none';

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'><path d='${pattern.path}' fill='black'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export const get_desktop_background = (color, pattern_id) => ({
  backgroundColor: color,
  backgroundImage: get_pattern_image(pattern_id),
  backgroundSize: '8px 8px'
});
