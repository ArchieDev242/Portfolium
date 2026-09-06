"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCopy, FaCheck } from 'react-icons/fa';

const EMPTY_FORM = {
  title: '',
  description: '',
  full_description: '',
  technologies: '',
  slug: '',
  year: '',
  status: 'Completed',
  category: '',
  platform: '',
  license: 'Open Source',
  github: '',
  demo: '',
  download: '',
};

const slugify = (title) => title
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

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

const build_snippet = (form, image_names) => {
  const [cover, ...additional] = image_names;
  const tech_list = form.technologies.split(',').map((t) => t.trim()).filter(Boolean);
  const additional_lines = additional
    .map((name) => `\n    ${JSON.stringify(`/projects/${form.slug}/${name}`)}`)
    .join(',');

  return [
    '{',
    `  title: ${JSON.stringify(form.title)},`,
    `  description: ${JSON.stringify(form.description)},`,
    `  fullDescription: ${JSON.stringify(form.full_description)},`,
    `  image: ${JSON.stringify(cover ? `/projects/${form.slug}/${cover}` : '')},`,
    `  additionalImages: [${additional_lines}${additional.length ? '\n  ' : ''}],`,
    `  technologies: [${tech_list.map((t) => JSON.stringify(t)).join(', ')}],`,
    `  slug: ${JSON.stringify(form.slug)},`,
    `  year: ${JSON.stringify(form.year)},`,
    `  status: ${JSON.stringify(form.status)},`,
    `  category: ${JSON.stringify(form.category)},`,
    `  platform: ${JSON.stringify(form.platform)},`,
    `  license: ${JSON.stringify(form.license)},`,
    '  links: {',
    `    github: ${JSON.stringify(form.github)},`,
    `    demo: ${JSON.stringify(form.demo)},`,
    `    download: ${JSON.stringify(form.download)},`,
    '  },',
    '},',
  ].join('\n');
};

const AddProjectModal = ({ onClose }) => {
  const [form, set_form] = useState(EMPTY_FORM);
  const [files, set_files] = useState([]);
  const [is_processing, set_is_processing] = useState(false);
  const [snippet, set_snippet] = useState('');
  const [copied, set_copied] = useState(false);

  const update_field = (field) => (e) => {
    const value = e.target.value;

    set_form((prev) => {
      const next = { ...prev, [field]: value };
      if(field === 'title' && !prev.slug_touched) next.slug = slugify(value);
      return next;
    });
  };

  const handle_slug_change = (e) => { set_form((prev) => ({ ...prev, slug: e.target.value, slug_touched: true })); };

  const handle_submit = async (e) => {
    e.preventDefault();
    if(!form.title || !form.slug) return;

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

      set_snippet(build_snippet(form, image_names));
    } catch(err)
    {
      alert(`Image processing failed: ${err.message}`);
    } finally
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
            <h2 className = "text-xl font-semibold">Add Project (local dev only)</h2>
            <button onClick = {onClose} className = "text-white/50 hover:text-white">
              <FaTimes size = {20} />
            </button>
          </div>

          {!snippet ? (
            <form onSubmit = {handle_submit} className = "flex flex-col gap-4">
              <div className = "grid grid-cols-2 gap-4">
                <input required placeholder = "Title" value = {form.title} onChange = {update_field('title')} className = "col-span-2 bg-white/5 border border-white/10 rounded px-3 py-2" />
                <input placeholder = "Slug" value = {form.slug} onChange = {handle_slug_change} className = "col-span-2 bg-white/5 border border-white/10 rounded px-3 py-2" />
              </div>

              <textarea placeholder = "Short description" value = {form.description} onChange = {update_field('description')} rows = {2} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
              <textarea placeholder = "Full description" value = {form.full_description} onChange = {update_field('full_description')} rows = {4} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
              <input placeholder = "Technologies (comma separated)" value = {form.technologies} onChange = {update_field('technologies')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />

              <div className = "grid grid-cols-3 gap-4">
                <input placeholder = "Year" value = {form.year} onChange = {update_field('year')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
                <input placeholder = "Status" value = {form.status} onChange = {update_field('status')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
                <input placeholder = "Category" value = {form.category} onChange = {update_field('category')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
              </div>

              <div className = "grid grid-cols-2 gap-4">
                <input placeholder = "Platform" value = {form.platform} onChange = {update_field('platform')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
                <input placeholder = "License" value = {form.license} onChange = {update_field('license')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
              </div>

              <input placeholder = "GitHub link" value = {form.github} onChange = {update_field('github')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
              <input placeholder = "Demo link" value = {form.demo} onChange = {update_field('demo')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />
              <input placeholder = "Download link" value = {form.download} onChange = {update_field('download')} className = "bg-white/5 border border-white/10 rounded px-3 py-2" />

              <div>
                <label className = "block text-sm text-white/60 mb-2">
                  Screenshots (first one becomes the cover image)
                </label>
                <input
                  type = "file"
                  accept = "image/*"
                  multiple
                  onChange = {(e) => set_files(Array.from(e.target.files))}
                  className = "text-sm"
                />
              </div>

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
              <p className = "text-sm text-white/60">
                {files.length > 0 && `${files.length} image(s) downloaded as .webp — move them into `}
                {files.length > 0 && <code className = "text-accent-default">public/projects/{form.slug}/</code>}
                {files.length > 0 && '. Then paste this into the right category in '}
                <code className = "text-accent-default">data/projects.js</code>:
              </p>

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
