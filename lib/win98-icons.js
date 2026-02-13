/**
 * Win98 icons from public folder — paths work in dev and prod (with basePath).
 * Use with <Image src={getWin98Icon('windows-0.png')} unoptimized /> or <img src={...} />
 */
const base = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH) || '';

export const getWin98Icon = (filename) => `${base}/icons/win98/png/${filename}`;

export const WIN98_ICONS = {
  windows: 'windows-0.png',
  computer: 'computer-0.png',
  cd_audio: 'cd_audio_cd_a-0.png',
  users: 'users-0.png',
  monitor: 'monitor_blue_grad-0.png',
  memory: 'memory-0.png',
  network: 'network-0.png',
  battery: 'battery.png',
  hourglass: 'application_hourglass-0.png',
  themes: 'themes-0.png',
  directory_open: 'directory_open_file_mydocs-0.png',
  envelope: 'envelope_closed-0.png',
  recycle_empty: 'recycle_bin_empty-0.png',
  recycle_full: 'recycle_bin_full-0.png',
  notepad: 'notepad-0.png',
  directory_closed: 'directory_closed-0.png',
  image: 'image_old_gif-0.png',
  executable: 'executable-0.png',
  start_menu: 'start_menu_shortcuts.png',
  default_window: 'windows-0.png',
  file_lines: 'file_lines-0.png',
  media_play: 'media_player-0.png',
  globe: 'globe_map-0.png',
  download: 'download.png',
  msg_info: 'msg_information-0.png',
  color_profile: 'color_profile-0.png',
  notepad_file: 'notepad_file-0.png',
  gears: 'gears-0.png',
  check: 'check-0.png',
  envelope_open: 'envelope_open_sheet-0.png',
  refresh: 'overlay_refresh-0.png',
  phone: 'world_phonereceiver.png',
  cmd: 'shell_window6-0.png'
};
