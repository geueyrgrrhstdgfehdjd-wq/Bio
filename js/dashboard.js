// 1. THREE.JS พื้นหลัง 3D ในหลังบ้าน
const canvas = document.getElementById('bg-3d-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BufferGeometry();
const count = 600;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ size: 0.02, color: 0x2563eb, transparent: true, opacity: 0.6 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);
camera.position.z = 5;

function animateBG() {
  requestAnimationFrame(animateBG);
  particles.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animateBG();

// 2. DATA MANAGEMENT (เริ่มต้นค่าว่าง)
let userData = JSON.parse(localStorage.getItem('myBioData')) || {
  displayName: '',
  bioText: '',
  avatarUrl: '',
  discordFrame: 'none',
  badgeText: '',
  links: []
};

let activeTab = 'profile';

// โหลดเมนู 3D
function renderSidebar() {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = ADMIN_MENUS.map(m => `
    <button class="menu-item ${m.id === activeTab ? 'active' : ''}" onclick="switchTab('${m.id}')">
      ${m.iconSvg}
      <span>${m.name}</span>
    </button>
  `).join('');
}

function switchTab(tabId) {
  activeTab = tabId;
  renderSidebar();
  renderContent();
}

// เรนเดอร์ฟอร์มละเอียดในแต่ละเมนู
function renderContent() {
  const container = document.getElementById('tab-content');
  const title = document.getElementById('current-tab-title');
  title.innerText = ADMIN_MENUS.find(m => m.id === activeTab).name;

  if (activeTab === 'profile') {
    container.innerHTML = `
      <div class="form-group">
        <label>URL รูปภาพโปรไฟล์ (Direct Image URL)</label>
        <input type="text" placeholder="https://example.com/avatar.jpg" value="${userData.avatarUrl}" oninput="updateData('avatarUrl', this.value)">
      </div>
      <div class="form-group">
        <label>ชื่อที่ต้องการแสดง</label>
        <input type="text" placeholder="ระบุชื่อของคุณ..." value="${userData.displayName}" oninput="updateData('displayName', this.value)">
      </div>
      <div class="form-group">
        <label>คำอธิบาย Bio (สั้นๆ กระชับ)</label>
        <textarea placeholder="ระบุตัวตนของคุณ..." oninput="updateData('bioText', this.value)">${userData.bioText}</textarea>
      </div>
    `;
  } else if (activeTab === 'frame') {
    container.innerHTML = `
      <div class="frame-grid">
        ${DISCORD_FRAMES.map(f => `
          <div class="frame-select-card ${userData.discordFrame === f.id ? 'active' : ''}" onclick="updateData('discordFrame', '${f.id}')">
            <div class="avatar-3d-wrapper" style="transform:scale(0.7); margin:0;">
              <div class="${f.class}">
                <img src="${userData.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" class="avatar-img">
              </div>
            </div>
            <p style="margin-top:12px; font-size:13px; font-weight:600;">${f.name}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (activeTab === 'badge') {
    container.innerHTML = `
      <div class="form-group">
        <label>ข้อความ ยศ / ฉายา 3D Badge</label>
        <input type="text" placeholder="เช่น CREATOR, VERIFIED..." value="${userData.badgeText}" oninput="updateData('badgeText', this.value)">
      </div>
    `;
  } else if (activeTab === 'links') {
    container.innerHTML = `
      <div class="form-group">
        <button class="view-btn" style="width:100%; justify-content:center; margin-bottom:20px;" onclick="addNewLink()">+ เพิ่มปุ่มลิงก์ใหม่</button>
      </div>
      <div id="links-edit-list">
        ${userData.links.map((link, idx) => `
          <div style="background:rgba(30,41,59,0.5); padding:16px; border-radius:14px; margin-bottom:12px; border:1px solid rgba(255,255,255,0.08);">
            <div class="form-group" style="margin-bottom:10px;">
              <label>ชื่อปุ่ม #${idx+1}</label>
              <input type="text" value="${link.title}" oninput="updateLink(${idx}, 'title', this.value)">
            </div>
            <div class="form-group" style="margin-bottom:10px;">
              <label>URL ลิงก์ปลายทาง</label>
              <input type="text" value="${link.url}" oninput="updateLink(${idx}, 'url', this.value)">
            </div>
            <button style="background:#ef4444; color:white; border:none; padding:8px 14px; border-radius:10px; cursor:pointer; font-size:12px; font-weight:700;" onclick="removeLink(${idx})">ลบปุ่มนี้</button>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function updateData(key, value) {
  userData[key] = value;
  localStorage.setItem('myBioData', JSON.stringify(userData));
  updatePreview();
}

function addNewLink() {
  userData.links.push({ title: 'ลิงก์ใหม่', url: 'https://', iconSvg: SVG_ICONS.links });
  localStorage.setItem('myBioData', JSON.stringify(userData));
  renderContent();
  updatePreview();
}

function updateLink(idx, field, val) {
  userData.links[idx][field] = val;
  localStorage.setItem('myBioData', JSON.stringify(userData));
  updatePreview();
}

function removeLink(idx) {
  userData.links.splice(idx, 1);
  localStorage.setItem('myBioData', JSON.stringify(userData));
  renderContent();
  updatePreview();
}

// 3. LIVE PREVIEW UPDATE
function updatePreview() {
  const avatarBox = document.getElementById('prev-avatar-container');
  const avatarImg = document.getElementById('prev-avatar');
  const frameWrapper = document.getElementById('prev-frame-wrapper');
  const badgeEl = document.getElementById('prev-badge');

  if (userData.avatarUrl) {
    avatarBox.style.display = 'block';
    avatarImg.src = userData.avatarUrl;

    if (userData.discordFrame === 'cyber-neon') {
      frameWrapper.className = 'frame-cyber-3d';
    } else if (userData.discordFrame === 'fire-god') {
      frameWrapper.className = 'frame-fire-3d';
    } else {
      frameWrapper.className = '';
    }
  } else {
    avatarBox.style.display = 'none';
  }

  if (userData.badgeText) {
    badgeEl.style.display = 'block';
    badgeEl.innerText = userData.badgeText;
  } else {
    badgeEl.style.display = 'none';
  }

  document.getElementById('prev-name').innerText = userData.displayName;
  document.getElementById('prev-bio').innerText = userData.bioText;

  const linksBox = document.getElementById('prev-links');
  linksBox.innerHTML = userData.links.map(l => `
    <div class="btn-3d" style="font-size:13px; padding:10px 14px;">
      <span style="flex:1; text-align:center;">${l.title}</span>
    </div>
  `).join('');
}

// 4. PREVIEW PHONE TILT EFFECT
const phoneMockup = document.getElementById('phone-preview');
document.querySelector('.preview-area').addEventListener('mousemove', (e) => {
  const rect = phoneMockup.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  phoneMockup.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
});

renderSidebar();
renderContent();
updatePreview();
