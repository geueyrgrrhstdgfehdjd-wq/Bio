// ตัวเลือกกรอบ Discord ขยับได้
const DISCORD_FRAMES = [
  { id: 'none', name: 'ไม่มีกรอบ', class: '' },
  { id: 'cyber-neon', name: 'Cyber Neon', class: 'frame-cyber-neon' },
  { id: 'fire-god', name: 'Fire Aura', class: 'frame-fire-god' },
  { id: 'magic-ring', name: 'Magic Galaxy', class: 'frame-magic-ring' },
  { id: 'gold-crown', name: 'Golden Shine', class: 'frame-gold-crown' },
  { id: 'sakura-pink', name: 'Sakura Glow', class: 'frame-sakura-pink' }
];

// คลังไอคอน 3D
const ICONS_3D = [
  { id: 'instagram', name: 'Instagram', url: 'https://img.icons8.com/plasticine/100/instagram-new.png' },
  { id: 'tiktok', name: 'TikTok', url: 'https://img.icons8.com/plasticine/100/tiktok.png' },
  { id: 'youtube', name: 'YouTube', url: 'https://img.icons8.com/plasticine/100/youtube-play.png' },
  { id: 'facebook', name: 'Facebook', url: 'https://img.icons8.com/plasticine/100/facebook-new.png' },
  { id: 'discord', name: 'Discord', url: 'https://img.icons8.com/plasticine/100/discord-logo.png' },
  { id: 'x', name: 'X / Twitter', url: 'https://img.icons8.com/plasticine/100/twitter.png' },
  { id: 'github', name: 'GitHub', url: 'https://img.icons8.com/plasticine/100/github.png' },
  { id: 'shop', name: 'Shop', url: 'https://img.icons8.com/plasticine/100/shopping-bag.png' },
  { id: 'game', name: 'Gaming', url: 'https://img.icons8.com/plasticine/100/controller.png' }
];

// 10+ เมนูปรับแต่งหลังบ้าน
const ADMIN_MENUS = [
  { id: 'profile', name: 'โปรไฟล์', icon: 'https://img.icons8.com/plasticine/100/user-male-circle.png' },
  { id: 'frame', name: 'กรอบดิสคอร์ด', icon: 'https://img.icons8.com/plasticine/100/filled-circle.png' },
  { id: 'badge', name: 'ยศ/ฉายา', icon: 'https://img.icons8.com/plasticine/100/medal.png' },
  { id: 'links', name: 'ปุ่มลิงก์', icon: 'https://img.icons8.com/plasticine/100/link.png' },
  { id: 'socials', name: 'โซเชียลไอคอน', icon: 'https://img.icons8.com/plasticine/100/share.png' },
  { id: 'music', name: 'เพลงเครื่องเล่น', icon: 'https://img.icons8.com/plasticine/100/music.png' },
  { id: 'theme', name: 'ธีมสี', icon: 'https://img.icons8.com/plasticine/100/color-palette.png' },
  { id: 'font', name: 'แบบฟอนต์', icon: 'https://img.icons8.com/plasticine/100/font.png' },
  { id: 'button_style', name: 'รูปทรงปุ่ม', icon: 'https://img.icons8.com/plasticine/100/vector.png' },
  { id: 'bgeffect', name: 'เอฟเฟกต์พื้นหลัง', icon: 'https://img.icons8.com/plasticine/100/sparkles.png' },
  { id: 'seo', name: 'ตั้งค่า SEO', icon: 'https://img.icons8.com/plasticine/100/search.png' },
  { id: 'analytics', name: 'สถิติคนเข้าชม', icon: 'https://img.icons8.com/plasticine/100/chart-line.png' }
];
