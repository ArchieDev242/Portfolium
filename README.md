This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Adding project screenshots

Project images live in `public/projects/<slug>/` as local `.webp` files — not on
a third-party image host and not as base64 in `data/projects.js`. Base64 was
considered but rejected: it inflates the JS bundle sent to every visitor and
loses browser caching/lazy-loading, which is worse than just committing an
optimized image file.

A helper script resizes + compresses raw screenshots and drops them in the
right place:

```bash
node scripts/add-project-images.mjs <slug> <source-folder> [--width=1600] [--quality=82] [--cover=filename]
```

- `<slug>` must match the project's `slug` field in `data/projects.js`.
- `<source-folder>` is any local folder with your raw screenshots (png/jpg/webp/etc).
- The first image alphabetically becomes the cover (project card / hero image);
  the rest become additional images. Use `--cover=filename.png` to pick a
  specific one instead.
- Output goes to `public/projects/<slug>/cover.webp`, `01.webp`, `02.webp`, ...

Example:

```bash
node scripts/add-project-images.mjs my-new-game ~/Desktop/my-new-game-screenshots
```

The script prints a ready-to-paste snippet, e.g.:

```js
image: "/projects/my-new-game/cover.webp",
additionalImages: [
  "/projects/my-new-game/01.webp"
],
```

Paste that into the matching project entry in `data/projects.js`. Image paths
are root-relative on purpose — components resolve them through
`lib/asset-path.js` (`withBasePath`), which prefixes them with
`NEXT_PUBLIC_BASE_PATH` at render time so they still work when deployed under
a GitHub Pages subpath. External `https://` URLs are left untouched if you
ever need them.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
