const base = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH) || "";

export const withBasePath = (src) => {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return `${base}${src}`;
};
