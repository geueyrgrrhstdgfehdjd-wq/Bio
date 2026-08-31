// ดึงข้อมูลที่เซฟจากหลังบ้านมาแสดง
const userData = JSON.parse(localStorage.getItem('myBioData')) || {
  displayName: 'JOHN DOE 3D',
  bioText: 'Digital Creator & Developer 🚀',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  discordFrame: 'cyber-neon',
  badgeText: 'VERIFIED',
  links: []
};

document.getElementById('bio-avatar').src = userData.avatarUrl;
document.getElementById('bio-name').innerText = userData.displayName;
document.getElementById('bio-desc').innerText = userData.bioText;
document.getElementById('bio-badge').innerText = userData.badgeText;

// ใส่กรอบ Discord ขยับได้
const frameObj = DISCORD_FRAMES.find(f => f.id === userData.discordFrame);
if (frameObj && frameObj.class) {
  document.getElementById('bio-avatar').classList.add(frameObj.class);
}

// สร้างปุ่มลิงก์ 3D
const linksBox = document.getElementById('bio-links');
linksBox.innerHTML = userData.links.map(link => `
  <a href="${link.url}" target="_blank" class="link-btn">
    <img src="${link.icon}" alt="${link.title}">
    <span style="flex:1; text-align:center; padding-right:36px;">${link.title}</span>
  </a>
`).join('');
