import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const VALID_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".bmp",
  ".tiff",
]);

function parse_args(argv)
{
  const [slug, source_dir, ...rest] = argv;
  const options = { width: 1600, quality: 82, cover: null };

  for(const arg of rest)
  {
    if(arg.startsWith("--width=")) options.width = Number(arg.split("=")[1]);
    else if(arg.startsWith("--quality="))
      options.quality = Number(arg.split("=")[1]);
    else if(arg.startsWith("--cover=")) options.cover = arg.split("=")[1];
  }

  return { slug, source_dir, options };
}

async function main()
{
  const { slug, source_dir, options } = parse_args(process.argv.slice(2));

  if(!slug || !source_dir)
  {
    console.error(
      "Usage: node scripts/add-project-images.mjs <slug> <source-folder> [--width=1600] [--quality=82] [--cover=filename]",
    );
    process.exit(1);
  }

  const dest_dir = path.join(process.cwd(), "public", "projects", slug);
  await mkdir(dest_dir, { recursive: true });

  const entries = await readdir(source_dir, { withFileTypes: true });
  let files = entries
    .filter(
      (e) => e.isFile() && VALID_EXT.has(path.extname(e.name).toLowerCase()),
    )
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));

  if(files.length === 0)
  {
    console.error(`No images found in ${source_dir}`);
    process.exit(1);
  }

  if(options.cover)
  {
    const idx = files.indexOf(options.cover);

    if(idx === -1)
    {
      console.error(`--cover=${options.cover} not found in ${source_dir}`);
      process.exit(1);
    }
    files = [options.cover, ...files.filter((_, i) => i !== idx)];
  }

  const written = [];

  for(let i = 0; i < files.length; i++)
  {
    const name = i === 0 ? "cover" : String(i).padStart(2, "0");
    const src_path = path.join(source_dir, files[i]);
    const out_path = path.join(dest_dir, `${name}.webp`);

    await sharp(src_path)
      .resize({ width: options.width, withoutEnlargement: true })
      .webp({ quality: options.quality })
      .toFile(out_path);

    written.push(`/projects/${slug}/${name}.webp`);
    console.log(`✓ ${files[i]} -> public/projects/${slug}/${name}.webp`);
  }

  const [cover, ...additional] = written;

  console.log("\nPaste into the project entry in data/projects.js:\n");
  console.log(`  image: "${cover}",`);
  console.log(
    `  additionalImages: [${additional.map((p) => `\n    "${p}"`).join(",")}${additional.length ? "\n  " : ""}],`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
