"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCopy, FaCheck } from 'react-icons/fa';
import { projectsData as projects_data } from '@/data/projects';

const EMPTY_FORM = {
  group: '',
  title: '',
  slug: '',
  slug_touched: false,
  description: '',
  technologies: '',
  year: '',
  status: 'Completed',
  category: '',
  platform: '',
  license: 'Open Source',
  github: '',
  play_game: '',
  download: '',
  gamebanana: '',
  video_demo: '',
  features: '',
  how_to_play: '',
  requirements: '',
  gameplay_description: '',
  mechanics: '',
  objectives: '',
  downloads: '',
  views: '',
  likes: ''
};

const INPUT_CLASS = 'bg-white/5 border border-white/10 rounded px-3 py-2 w-full';
const LABEL_CLASS = 'block text-xs text-white/50 mb-1';

const slugify = (title) => title
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const split_list = (text, separator) => text.split(separator).map((t) => t.trim()).filter(Boolean);
const split_lines = (text) => split_list(text, '\n');

// drops empty strings, empty arrays and empty objects so the snippet only holds filled fields
const prune = (value) => {
  if(Array.isArray(value)) return value.length ? value : undefined;

  if(value && typeof value === 'object')
  {
    const entries = Object.entries(value)
      .map(([key, inner]) => [key, prune(inner)])
      .filter(([, inner]) => inner !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }

  return value === '' ? undefined : value;
};

// JSON.stringify with unquoted keys, matching the style of data/projects.js
const to_js = (value) => JSON.stringify(value, null, 2).replace(/^(\s*)"([a-zA-Z_]\w*)":/gm, '$1$2:');

// resizes + re-encodes an image file to webp fully in the browser (no server/Node needed)
const compress_image = (file, max_width = 1600, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const object_url = URL.createObjectURL(file);

    img.onload = () => {
      const scale = Math.min(1, max_width / img.width);
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(object_url);
        if(blob) resolve(blob);
        else reject(new Error('Image compression failed'));
      }, 'image/webp', quality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(object_url);
      reject(new Error(`Could not load ${file.name}`));
    };

    img.src = object_url;
  });
};

const download_blob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

// keys follow what the project page and the Win98 Projects window actually render
const build_project = (form, image_names) => {
  const [cover, ...additional] = image_names;
  const image_path = (name) => `/projects/${form.slug}/${name}`;

  return prune({
    title: form.title,
    description: form.description,
    image: cover ? image_path(cover) : '',
    additionalImages: additional.map(image_path),
    videoDemo: form.video_demo,
    technologies: split_list(form.technologies, ','),
    slug: form.slug,
    year: form.year,
    status: form.status,
    category: form.category,
    platform: form.platform,
    license: form.license,
    links: {
      github: form.github,
      playGame: form.play_game,
      download: form.download,
      gamebanana: form.gamebanana
    },
    features: split_lines(form.features),
    gameplay: {
      description: form.gameplay_description,
      mechanics: split_lines(form.mechanics),
      objectives: split_lines(form.objectives)
    },
    instructions: {
      gameplay: split_lines(form.how_to_play),
      requirements: split_lines(form.requirements)
    },
    stats: {
      downloads: form.downloads,
      views: form.views,
      likes: form.likes
    }
  });
};

const Field = ({ label, children, className = '' }) => (
  <label className = {className}>
    <span className = {LABEL_CLASS}>{label}</span>
    {children}
  </label>
);

const AddProjectModal = ({ onClose }) => {
  const [form, set_form] = useState(() => ({ ...EMPTY_FORM, group: projects_data.categories[0]?.name || '' }));
  const [files, set_files] = useState([]);
  const [is_processing, set_is_processing] = useState(false);
  const [error, set_error] = useState('');
  const [snippet, set_snippet] = useState('');
  const [copied, set_copied] = useState(false);

  const slug_taken = projects_data.categories.some((cat) => cat.projects.some((p) => p.slug === form.slug));

  const update_field = (field) => (e) => {
    const value = e.target.value;

    set_form((prev) => {
      const next = { ...prev, [field]: value };
      if(field === 'title' && !prev.slug_touched) next.slug = slugify(value);
      return next;
    });
  };

  const handle_slug_change = (e) => { set_form((prev) => ({ ...prev, slug: slugify(e.target.value), slug_touched: true })); };

  const text_input = (field, label, props = {}) => (
    <Field label = {label} className = {props.className}>
      <input value = {form[field]} onChange = {update_field(field)} className = {INPUT_CLASS} {...props} />
    </Field>
  );

  const text_area = (field, label, rows = 3, placeholder = '') => (
    <Field label = {label}>
      <textarea value = {form[field]} onChange = {update_field(field)} rows = {rows} placeholder = {placeholder} className = {INPUT_CLASS} />
    </Field>
  );

  const handle_submit = async (e) => {
    e.preventDefault();
    set_error('');

    if(!form.title || !form.slug || !form.description)
    {
      set_error('Title, slug and short description are required.');
      return;
    }
    if(slug_taken)
    {
      set_error(`Slug "${form.slug}" is already used by another project.`);
      return;
    }
    if(files.length === 0)
    {
      set_error('Add at least one screenshot: the first one becomes the cover.');
      return;
    }

    set_is_processing(true);

    try
    {
      const image_names = [];

      for(let i = 0; i < files.length; i++)
      {
        const blob = await compress_image(files[i]);
        const name = i === 0 ? 'cover.webp' : `${String(i).padStart(2, '0')}.webp`;
        download_blob(blob, name);
        image_names.push(name);
      }

      set_snippet(`${to_js(build_project(form, image_names))},`);
    }
    catch(err)
    {
      set_error(`Image processing failed: ${err.message}`);
    }
    finally
    {
      set_is_processing(false);
    }
  };

  const handle_copy = async () => {
    await navigator.clipboard.writeText(snippet);
    set_copied(true);
    setTimeout(() => set_copied(false), 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial = {{ opacity: 0 }}
        animate = {{ opacity: 1 }}
        exit = {{ opacity: 0 }}
        className = "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick = {onClose}
      >
        <motion.div
          initial = {{ opacity: 0, scale: 0.95 }}
          animate = {{ opacity: 1, scale: 1 }}
          exit = {{ opacity: 0, scale: 0.95 }}
          className = "bg-[#1a1a1f] border border-white/10 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6"
          onClick = {(e) => e.stopPropagation()}
        >
          <div className = "flex items-center justify-between mb-6">
            <h2 className = "text-xl font-semibold">Add Project (dev only)</h2>
            <button onClick = {onClose} className = "text-white/50 hover:text-white">
              <FaTimes size = {20} />
            </button>
          </div>

          {!snippet ? (
            <form onSubmit = {handle_submit} className = "flex flex-col gap-4">
              <h3 className = "text-sm font-semibold text-accent-default">Required</h3>

              <Field label = "Category group (where it shows on /projects)">
                <select value = {form.group} onChange = {update_field('group')} className = {INPUT_CLASS}>
                  {projects_data.categories.map((cat) => (
                    <option key = {cat.name} value = {cat.name} className = "bg-[#1a1a1f]">{cat.name}</option>
                  ))}
                </select>
              </Field>

              <div className = "grid grid-cols-2 gap-4">
                {text_input('title', 'Title *')}
                <Field label = {slug_taken ? 'Slug * (already taken!)' : 'Slug * (page URL)'}>
                  <input value = {form.slug} onChange = {handle_slug_change} className = {`${INPUT_CLASS} ${slug_taken ? 'border-red-500' : ''}`} />
                </Field>
              </div>

              {text_area('description', 'Short description *', 3)}

              <Field label = "Screenshots * (first one becomes the cover)">
                <input
                  type = "file"
                  accept = "image/*"
                  multiple
                  onChange = {(e) => set_files(Array.from(e.target.files))}
                  className = "text-sm"
                />
              </Field>

              <h3 className = "text-sm font-semibold text-accent-default mt-2">Details (optional)</h3>

              {text_input('technologies', 'Technologies (comma separated)', { placeholder: 'C, SDL2, Make' })}

              <div className = "grid grid-cols-3 gap-4">
                {text_input('year', 'Year', { placeholder: '2025' })}
                {text_input('status', 'Status')}
                {text_input('category', 'Type label', { placeholder: 'Arcade Game' })}
              </div>

              <div className = "grid grid-cols-2 gap-4">
                {text_input('platform', 'Platform', { placeholder: 'Web Browser' })}
                {text_input('license', 'License')}
              </div>

              <h3 className = "text-sm font-semibold text-accent-default mt-2">Links (optional)</h3>

              <div className = "grid grid-cols-2 gap-4">
                {text_input('github', 'GitHub', { type: 'url' })}
                {text_input('play_game', 'Play / live demo', { type: 'url' })}
                {text_input('download', 'Download', { type: 'url' })}
                {text_input('gamebanana', 'GameBanana', { type: 'url' })}
              </div>
              {text_input('video_demo', 'Video demo (YouTube link or video file)', { type: 'url' })}

              <h3 className = "text-sm font-semibold text-accent-default mt-2">Content (optional, one item per line)</h3>

              {text_area('features', 'Features', 4)}
              {text_area('gameplay_description', 'Gameplay description', 2)}
              <div className = "grid grid-cols-2 gap-4">
                {text_area('mechanics', 'Gameplay mechanics')}
                {text_area('objectives', 'Gameplay objectives')}
                {text_area('how_to_play', 'How to play / controls')}
                {text_area('requirements', 'Requirements')}
              </div>

              <div className = "grid grid-cols-3 gap-4">
                {text_input('downloads', 'Downloads stat')}
                {text_input('views', 'Views stat')}
                {text_input('likes', 'Likes stat')}
              </div>

              {error && <p className = "text-sm text-red-400">{error}</p>}

              <button
                type = "submit"
                disabled = {is_processing}
                className = "mt-2 bg-accent-default text-black font-medium rounded px-4 py-2 disabled:opacity-50"
              >
                {is_processing ? 'Processing images...' : 'Generate & Download'}
              </button>
            </form>
          ) : (
            <div className = "flex flex-col gap-4">
              <ol className = "text-sm text-white/60 list-decimal pl-5 flex flex-col gap-1">
                <li>
                  Move the {files.length} downloaded .webp image(s) into{' '}
                  <code className = "text-accent-default">public/projects/{form.slug}/</code>
                </li>
                <li>
                  Paste this into the <b className = "text-white">{form.group}</b> group&apos;s{' '}
                  <code className = "text-accent-default">projects: [ ... ]</code> list in{' '}
                  <code className = "text-accent-default">data/projects.js</code>
                </li>
                <li>Save. The dev server reloads and the project shows on /projects and in Win98 mode.</li>
              </ol>

              <textarea
                readOnly
                value = {snippet}
                rows = {16}
                className = "bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-xs"
              />

              <button
                onClick = {handle_copy}
                className = "flex items-center justify-center gap-2 bg-accent-default text-black font-medium rounded px-4 py-2"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy to clipboard'}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddProjectModal;
