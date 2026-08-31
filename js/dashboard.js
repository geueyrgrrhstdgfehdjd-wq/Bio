// ดึงข้อมูลจาก LocalStorage หรือใช้ค่าเริ่มต้น
let userData = JSON.parse(localStorage.getItem('myBioData')) || {
  displayName: 'JOHN DOE 3D',
  bioText: 'Digital Creator & Developer 🚀',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  discordFrame: 'cyber-neon',
  badgeText: 'VERIFIED CREATOR',
  links: [
    { id: 1, title: 'Instagram', url: 'https://instagram.com', icon: 'https://img.icons8.com/plasticine/100/instagram-new.png' },
    { id: 2, title: 'Discord Server', url: 'https://discord.gg', icon: 'https://img.icons8.com/plasticine/100/discord-logo.png' }
  ]
};

let activeTab = 'profile';

// โหลดเมนูแถบข้าง 10+ รายการ
function renderSidebar() {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = ADMIN_MENUS.map(m => `
    <button class="menu-item ${m.id === activeTab ? 'active' : ''}" onclick="switchTab('${m.id}')">
      <img src="${m.icon}" width="24">
      <span>${m.name}</span>
    </button>
  `).join('');
}

// สลับเมนูหน้าหลังบ้าน
function switchTab(tabId) {
  activeTab = tabId;
  renderSidebar();
  renderContent();
}

// แสดงฟอร์มตามเมนูที่เลือก
function renderContent() {
  const container = document.getElementById('tab-content');
  const title = document.getElementById('current-tab-title');
  title.innerText = ADMIN_MENUS.find(m => m.id === activeTab).name;

  if (activeTab === 'profile') {
    container.innerHTML = `
      <div class="form-group">
        <label>รูปภาพ Avatar (URL)</label>
        <input type="text" value="${userData.avatarUrl}" oninput="updateData('avatarUrl', this.value)">
      </div>
      <div class="form-group">
        <label>ชื่อแสดง</label>
        <input type="text" value="${userData.displayName}" oninput="updateData('displayName', this.value)">
      </div>
      <div class="form-group">
        <label>ข้อความ Bio</label>
        <textarea oninput="updateData('bioText', this.value)">${userData.bioText}</textarea>
      </div>
    `;
  } else if (activeTab === 'frame') {
    container.innerHTML = `
      <div class="frame-grid">
        ${DISCORD_FRAMES.map(f => `
          <div class="frame-card ${userData.discordFrame === f.id ? 'active' : ''}" onclick="updateData('discordFrame', '${f.id}')">
            <div class="avatar-wrapper">
              <img src="${userData.avatarUrl}" class="avatar-img ${f.class}">
            </div>
            <p>${f.name}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (activeTab === 'badge') {
    container.innerHTML = `
      <div class="form-group">
        <label>ข้อความ Badge (ฉายา)</label>
        <input type="text" value="${userData.badgeText}" oninput="updateData('badgeText', this.value)">
      </div>
    `;
  } else {
    container.innerHTML = `<p style="color:#94a3b8;">เมนูนี้พร้อมสำหรับการขยายฟีเจอร์เพิ่มเติม</p>`;
  }
}

// อัปเดตข้อมูลและบันทึกลงเครื่อง
function updateData(key, value) {
  userData[key] = value;
  localStorage.setItem('myBioData', JSON.stringify(userData));
  updatePreview();
}

// อัปเดตจอมือถือจำลองทันที (Live Preview)
function updatePreview() {
  document.getElementById('prev-avatar').src = userData.avatarUrl;
  document.getElementById('prev-name').innerText = userData.displayName;
  document.getElementById('prev-bio').innerText = userData.bioText;
  document.getElementById('prev-badge').innerText = userData.badgeText;

  // กรอบ Discord
  const frameObj = DISCORD_FRAMES.find(f => f.id === userData.discordFrame);
  document.getElementById('prev-avatar').className = `avatar-img ${frameObj ? frameObj.class : ''}`;

  // ปุ่มลิงก์
  const linksBox = document.getElementById('prev-links');
  linksBox.innerHTML = userData.links.map(l => `
    <div class="link-btn">
      <img src="${l.icon}">
      <span style="flex:1; text-align:center;">${l.title}</span>
    </div>
  `).join('');
}

// เริ่มทำงานเมื่อเปิดหน้าเว็บ
renderSidebar();
renderContent();
updatePreview();
