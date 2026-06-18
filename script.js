// script.js — MediFlow CRM Smart Engine & Full Dashboard

// ===================== MOCK DATABASE =====================
const DB = {
  inventory: [
    { id:1, name:"Insulin Glargine (Lantus)", batch:"LN-2026", category:"Diabetes", stock:0, reorder:10, status:"out", supplier:"Novo Nordisk", price:1850, expiry:"2027-03-15", arrived:true },
    { id:2, name:"Amoxicillin 500mg", batch:"AMX-99", category:"Antibiotic", stock:15, reorder:20, status:"expired", supplier:"Cipla Ltd", price:45, expiry:"2026-05-15", arrived:true },
    { id:3, name:"Metformin 1000mg", batch:"MT-881", category:"Diabetes", stock:0, reorder:30, status:"out", supplier:"Sun Pharma", price:32, expiry:"2027-08-01", arrived:false },
    { id:4, name:"Atorvastatin 20mg", batch:"AT-442", category:"Cholesterol", stock:85, reorder:25, status:"ok", supplier:"Zydus Cadila", price:68, expiry:"2027-11-20", arrived:true },
    { id:5, name:"Amlodipine 5mg", batch:"AM-220", category:"Hypertension", stock:12, reorder:30, status:"low", supplier:"Dr Reddy's", price:28, expiry:"2027-06-10", arrived:true },
    { id:6, name:"Pantoprazole 40mg", batch:"PT-610", category:"Gastro", stock:120, reorder:20, status:"ok", supplier:"Mankind Pharma", price:55, expiry:"2028-01-05", arrived:true },
    { id:7, name:"Salbutamol Inhaler", batch:"SB-331", category:"Respiratory", stock:5, reorder:10, status:"low", supplier:"Cipla Ltd", price:185, expiry:"2027-09-18", arrived:true },
    { id:8, name:"Thyroxine 100mcg", batch:"TX-789", category:"Thyroid", stock:200, reorder:30, status:"ok", supplier:"Abbott India", price:120, expiry:"2028-04-22", arrived:true },
    { id:9, name:"Losartan 50mg", batch:"LS-155", category:"Hypertension", stock:45, reorder:25, status:"ok", supplier:"Torrent Pharma", price:42, expiry:"2027-07-30", arrived:true },
    { id:10, name:"Diclofenac 75mg", batch:"DC-908", category:"Pain Relief", stock:0, reorder:15, status:"out", supplier:"Lupin Ltd", price:18, expiry:"2027-05-12", arrived:false },
    { id:11, name:"Sertraline 50mg", batch:"SR-467", category:"Mental Health", stock:60, reorder:15, status:"ok", supplier:"Sun Pharma", price:95, expiry:"2028-02-28", arrived:true },
    { id:12, name:"Calcium + D3", batch:"CD-202", category:"Supplements", stock:8, reorder:20, status:"low", supplier:"Abbott India", price:155, expiry:"2027-12-01", arrived:true },
    { id:13, name:"Ecospirin 75mg", batch:"EC-111", category:"Cardiac", stock:300, reorder:50, status:"ok", supplier:"USV Pvt Ltd", price:22, expiry:"2028-06-15", arrived:true },
    { id:14, name:"Glimepiride 2mg", batch:"GM-344", category:"Diabetes", stock:18, reorder:20, status:"low", supplier:"Sanofi India", price:48, expiry:"2027-10-08", arrived:true },
    { id:15, name:"Montelukast 10mg", batch:"MK-556", category:"Respiratory", stock:90, reorder:15, status:"ok", supplier:"Mankind Pharma", price:75, expiry:"2028-03-20", arrived:true },
  ],

  patients: [
    { id:101, name:"Ramesh Sharma", phone:"+91-98765-43210", condition:"Type 2 Diabetes", meds:"Insulin Glargine, Metformin", lastVisit:14, ltv:45200, color:"#6366f1" },
    { id:102, name:"Ananya Deshmukh", phone:"+91-87654-32109", condition:"Pediatric Care", meds:"Amoxicillin 500mg", lastVisit:7, ltv:8900, color:"#f43f5e" },
    { id:103, name:"Vijay Kulkarni", phone:"+91-76543-21098", condition:"Hypertension", meds:"Amlodipine 5mg, Losartan", lastVisit:21, ltv:22400, color:"#06b6d4" },
    { id:104, name:"Meena Iyer", phone:"+91-65432-10987", condition:"Hypothyroidism", meds:"Thyroxine 100mcg", lastVisit:3, ltv:18600, color:"#f59e0b" },
    { id:105, name:"Priya Patel", phone:"+91-54321-09876", condition:"Asthma", meds:"Salbutamol, Montelukast", lastVisit:10, ltv:31200, color:"#8b5cf6" },
    { id:106, name:"Rajesh Kumar", phone:"+91-43210-98765", condition:"High Cholesterol", meds:"Atorvastatin 20mg", lastVisit:28, ltv:15800, color:"#10b981" },
    { id:107, name:"Sunita Devi", phone:"+91-32109-87654", condition:"Rheumatoid Arthritis", meds:"Diclofenac 75mg", lastVisit:5, ltv:12400, color:"#ec4899" },
    { id:108, name:"Arun Nair", phone:"+91-21098-76543", condition:"Depression", meds:"Sertraline 50mg", lastVisit:15, ltv:28900, color:"#14b8a6" },
    { id:109, name:"Kavitha Reddy", phone:"+91-10987-65432", condition:"Type 2 Diabetes", meds:"Glimepiride 2mg, Metformin", lastVisit:12, ltv:36700, color:"#f97316" },
    { id:110, name:"Mohan Das", phone:"+91-09876-54321", condition:"Hypertension", meds:"Losartan 50mg", lastVisit:18, ltv:19200, color:"#0ea5e9" },
    { id:111, name:"Lakshmi Bai", phone:"+91-98712-34567", condition:"Osteoporosis", meds:"Calcium + D3", lastVisit:30, ltv:14500, color:"#a855f7" },
    { id:112, name:"Deepak Joshi", phone:"+91-87612-34567", condition:"GERD / Acidity", meds:"Pantoprazole 40mg", lastVisit:6, ltv:9800, color:"#22c55e" },
    { id:113, name:"Neha Gupta", phone:"+91-76512-34567", condition:"Chronic Migraine", meds:"Sumatriptan 50mg", lastVisit:22, ltv:21300, color:"#e11d48" },
    { id:114, name:"Sanjay Verma", phone:"+91-65412-34567", condition:"Cardiac Care", meds:"Ecospirin 75mg", lastVisit:9, ltv:42100, color:"#2563eb" },
    { id:115, name:"Fatima Sheikh", phone:"+91-54312-34567", condition:"Hypothyroidism", meds:"Levothyroxine 50mcg", lastVisit:17, ltv:16800, color:"#d946ef" },
    { id:116, name:"Amit Chauhan", phone:"+91-43212-34567", condition:"Hypertension", meds:"Telmisartan 40mg", lastVisit:25, ltv:11200, color:"#0891b2" },
    { id:117, name:"Pooja Sharma", phone:"+91-32112-34567", condition:"Asthma", meds:"Montelukast 10mg", lastVisit:4, ltv:24600, color:"#7c3aed" },
    { id:118, name:"Ravi Menon", phone:"+91-21012-34567", condition:"High Cholesterol", meds:"Rosuvastatin 10mg", lastVisit:19, ltv:17400, color:"#059669" },
    { id:119, name:"Geeta Kumari", phone:"+91-10912-34567", condition:"Type 2 Diabetes", meds:"Glimepiride 2mg", lastVisit:11, ltv:29800, color:"#dc2626" },
    { id:120, name:"Vikram Singh", phone:"+91-09812-34567", condition:"Hypertension", meds:"Enalapril 5mg", lastVisit:8, ltv:20100, color:"#4f46e5" },
  ],

  followUps: [],

  messageLog: [],

  stats: {
    totalRevenue: 245800,
    todayRevenue: 12400,
    weekRevenue: 68200,
    monthGrowth: 12.4,
    totalMessagesSent: 847,
    delivered: 812,
    read: 764,
    responded: 698,
    activePatients: 234,
    refillsThisMonth: 156,
    successRate: 94,
    avgBasketSize: 680,
  }
};

// Generate follow-ups dynamically with varying offsets
(function generateFollowUps() {
  const drugs = [
    { name:"Thyroxine 100mcg", supply:30 },
    { name:"Insulin Glargine", supply:30 },
    { name:"Amlodipine 5mg", supply:30 },
    { name:"Atorvastatin 20mg", supply:30 },
    { name:"Salbutamol Inhaler", supply:60 },
    { name:"Metformin 1000mg", supply:30 },
    { name:"Losartan 50mg", supply:30 },
    { name:"Diclofenac 75mg", supply:15 },
    { name:"Sertraline 50mg", supply:30 },
    { name:"Calcium + D3", supply:60 },
    { name:"Pantoprazole 40mg", supply:14 },
    { name:"Ecospirin 75mg", supply:30 },
    { name:"Glimepiride 2mg", supply:30 },
    { name:"Montelukast 10mg", supply:30 },
    { name:"Rosuvastatin 10mg", supply:30 },
    { name:"Telmisartan 40mg", supply:30 },
    { name:"Enalapril 5mg", supply:30 },
    { name:"Levothyroxine 50mcg", supply:30 },
    { name:"Sumatriptan 50mg", supply:30 },
    { name:"Glimepiride 2mg", supply:30 },
  ];
  const patientNames = DB.patients.map(p => p.name);
  const offsets = [-32,-30,-29,-28,-27,-26,-25,-24,-22,-20,-18,-16,-14,-12,-10,-8,-6,-5,-4,-3];

  const today = new Date();
  for (let i = 0; i < 20; i++) {
    const lp = new Date(today);
    lp.setDate(lp.getDate() + offsets[i]);
    DB.followUps.push({
      id: 400 + i,
      patientName: patientNames[i],
      drugName: drugs[i].name,
      daysOfSupply: drugs[i].supply,
      lastPurchaseDate: lp,
      alertSent: false,
      confirmed: false,
    });
  }
})();

// Generate message log
(function generateMessageLog() {
  const types = ["Refill Alert","Stock Arrival","Vaccine Reminder","Follow-up","Refill Alert","Stock Arrival","Refill Alert","Follow-up","Vaccine Reminder","Refill Alert"];
  const statuses = ["Delivered","Read","Responded","Delivered","Read","Responded","Delivered","Read","Responded","Delivered"];
  const now = new Date();
  for (let i = 0; i < 20; i++) {
    const t = new Date(now);
    t.setMinutes(t.getMinutes() - (i * 47 + i * 13));
    DB.messageLog.push({
      id: 600 + i,
      patientName: DB.patients[i].name,
      type: types[i % types.length],
      status: statuses[i % statuses.length],
      timestamp: t,
    });
  }
})();

// Daily message counts for chart (last 7 days)
const dailyMessages = [24, 31, 18, 42, 37, 28, 35];
const dailyLabels = [];
(function() {
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const dd = new Date(d);
    dd.setDate(dd.getDate() - i);
    dailyLabels.push(dd.toLocaleDateString('en-US', { weekday: 'short' }));
  }
})();

// ===================== ENGINE STATE =====================
let currentDate = new Date();
let whatsappMsgCount = 0;

// ===================== UTILITIES =====================
function formatDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function formatDateShort(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function formatCurrency(n) {
  return '\u20B9' + n.toLocaleString('en-IN');
}
function timeAgo(d) {
  const diff = Math.floor((new Date() - d) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return diff + 'm ago';
  if (diff < 1440) return Math.floor(diff / 60) + 'h ago';
  return Math.floor(diff / 1440) + 'd ago';
}
function getTimeStr() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + (m < 10 ? '0' + m : m) + ' ' + ap;
}
function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}

// ===================== TAB SWITCHING =====================
const tabConfig = {
  dashboard: { title: "Dashboard", subtitle: "Overview of pharmacy operations" },
  inventory: { title: "Inventory Management", subtitle: "Monitor stock levels, expiry, and reorder status" },
  patients: { title: "Patient Directory", subtitle: "All registered patients and their care profiles" },
  followups: { title: "Follow-up Reminders", subtitle: "Smart refill alerts powered by the engine formula" },
  analytics: { title: "Analytics & Reports", subtitle: "Revenue, messaging, and operational insights" },
};

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  
  const tabEl = document.getElementById('tab-' + tabName);
  const navEl = document.getElementById('nav-' + tabName);
  if (tabEl) tabEl.classList.add('active');
  if (navEl) navEl.classList.add('active');
  
  document.getElementById('page-title').textContent = tabConfig[tabName].title;
  document.getElementById('page-subtitle').textContent = tabConfig[tabName].subtitle;

  // Render tab content
  renderTab(tabName);
}

function renderTab(tabName) {
  switch(tabName) {
    case 'dashboard': renderDashboard(); break;
    case 'inventory': renderInventory(); break;
    case 'patients': renderPatients(); break;
    case 'followups': renderFollowups(); break;
    case 'analytics': renderAnalytics(); break;
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ===================== DASHBOARD =====================
function renderDashboard() {
  const el = document.getElementById('tab-dashboard');
  const s = DB.stats;
  const alertItems = DB.inventory.filter(i => i.status !== 'ok');
  const pendingFollowups = DB.followUps.filter(f => !f.alertSent);

  el.innerHTML = `
    <!-- Stats Row -->
    <div class="stats-row">
      <div class="stat-card emerald">
        <div class="stat-header">
          <div><div class="stat-label">Monthly Revenue</div><div class="stat-value">${formatCurrency(s.totalRevenue)}</div><div class="stat-change up"><i data-lucide="trending-up" style="width:12px;height:12px"></i> +${s.monthGrowth}% vs last month</div></div>
          <div class="stat-icon-box emerald"><i data-lucide="indian-rupee"></i></div>
        </div>
      </div>
      <div class="stat-card sky">
        <div class="stat-header">
          <div><div class="stat-label">Messages Sent</div><div class="stat-value">${s.totalMessagesSent}</div><div class="stat-change up"><i data-lucide="trending-up" style="width:12px;height:12px"></i> ${s.successRate}% success rate</div></div>
          <div class="stat-icon-box sky"><i data-lucide="message-circle"></i></div>
        </div>
      </div>
      <div class="stat-card violet">
        <div class="stat-header">
          <div><div class="stat-label">Active Patients</div><div class="stat-value">${s.activePatients}</div><div class="stat-change up"><i data-lucide="trending-up" style="width:12px;height:12px"></i> +18 this month</div></div>
          <div class="stat-icon-box violet"><i data-lucide="users"></i></div>
        </div>
      </div>
      <div class="stat-card amber">
        <div class="stat-header">
          <div><div class="stat-label">Refills This Month</div><div class="stat-value">${s.refillsThisMonth}</div><div class="stat-change up"><i data-lucide="trending-up" style="width:12px;height:12px"></i> Avg ${formatCurrency(s.avgBasketSize)}/basket</div></div>
          <div class="stat-icon-box amber"><i data-lucide="repeat"></i></div>
        </div>
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="dash-grid">
      <!-- Messages Chart -->
      <div class="dash-card">
        <div class="dash-card-header">
          <div class="dash-card-title">Messages Sent (Last 7 Days)</div>
          <span class="badge badge-emerald">Live</span>
        </div>
        <div class="dash-card-body">
          <div class="chart-container">
            ${dailyMessages.map((v, i) => {
              const pct = (v / Math.max(...dailyMessages)) * 100;
              return `<div class="chart-col"><div class="chart-bar-wrap"><div class="chart-bar" style="height:${pct}%"><span class="chart-bar-val">${v}</span></div></div><div class="chart-label">${dailyLabels[i]}</div></div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Delivery Success -->
      <div class="dash-card">
        <div class="dash-card-header">
          <div class="dash-card-title">Message Delivery Funnel</div>
          <span class="badge badge-sky">This Month</span>
        </div>
        <div class="dash-card-body">
          <div class="progress-ring-container">
            <div class="progress-ring">
              <svg viewBox="0 0 100 100">
                <circle class="progress-ring-bg" cx="50" cy="50" r="42"/>
                <circle class="progress-ring-fill" cx="50" cy="50" r="42" stroke="var(--emerald-500)" stroke-dasharray="${2 * Math.PI * 42}" stroke-dashoffset="${2 * Math.PI * 42 * (1 - s.successRate / 100)}"/>
              </svg>
              <div class="progress-ring-text">${s.successRate}%</div>
            </div>
            <div class="progress-stats">
              <div class="progress-stat"><span class="progress-dot" style="background:var(--sky-500)"></span> Sent: <strong>${s.totalMessagesSent}</strong></div>
              <div class="progress-stat"><span class="progress-dot" style="background:var(--indigo-500)"></span> Delivered: <strong>${s.delivered}</strong></div>
              <div class="progress-stat"><span class="progress-dot" style="background:var(--emerald-500)"></span> Read: <strong>${s.read}</strong></div>
              <div class="progress-stat"><span class="progress-dot" style="background:var(--amber-500)"></span> Responded: <strong>${s.responded}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity + Alerts -->
    <div class="dash-grid">
      <!-- Recent Activity -->
      <div class="dash-card">
        <div class="dash-card-header">
          <div class="dash-card-title">Recent Message Activity</div>
          <span class="badge badge-gray">${DB.messageLog.length} messages</span>
        </div>
        <div class="activity-feed" style="max-height:300px;overflow-y:auto">
          ${DB.messageLog.slice(0, 8).map(msg => {
            const iconMap = { "Refill Alert":"repeat", "Stock Arrival":"package-check", "Vaccine Reminder":"syringe", "Follow-up":"bell" };
            const colorMap = { "Refill Alert":"emerald", "Stock Arrival":"cyan", "Vaccine Reminder":"indigo", "Follow-up":"amber" };
            const bgMap = { "Refill Alert":"var(--emerald-bg)", "Stock Arrival":"var(--cyan-bg)", "Vaccine Reminder":"var(--indigo-bg)", "Follow-up":"var(--amber-bg)" };
            const clrMap = { "Refill Alert":"var(--emerald-text)", "Stock Arrival":"var(--cyan-text)", "Vaccine Reminder":"var(--indigo-text)", "Follow-up":"var(--amber-text)" };
            return `<div class="activity-item">
              <div class="activity-icon" style="background:${bgMap[msg.type]};color:${clrMap[msg.type]}"><i data-lucide="${iconMap[msg.type]}"></i></div>
              <div><div class="activity-text"><strong>${msg.patientName}</strong> — ${msg.type}</div><div class="activity-time">${timeAgo(msg.timestamp)} · <span class="badge badge-${colorMap[msg.type]}">${msg.status}</span></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Stock Alerts -->
      <div class="dash-card">
        <div class="dash-card-header">
          <div class="dash-card-title">Stock Alerts</div>
          <span class="badge badge-rose">${alertItems.length} issues</span>
        </div>
        <div class="activity-feed" style="max-height:300px;overflow-y:auto">
          ${alertItems.map(item => {
            const statusLabel = item.status === 'out' ? 'Out of Stock' : item.status === 'low' ? 'Low Stock' : 'Expired';
            const statusColor = item.status === 'out' ? 'rose' : item.status === 'low' ? 'amber' : 'amber';
            const statusIcon = item.status === 'out' ? 'package-x' : item.status === 'low' ? 'alert-triangle' : 'calendar-x';
            return `<div class="activity-item">
              <div class="activity-icon" style="background:var(--${statusColor}-bg);color:var(--${statusColor}-text)"><i data-lucide="${statusIcon}"></i></div>
              <div><div class="activity-text"><strong>${item.name}</strong></div><div class="activity-time">${item.supplier} · <span class="badge badge-${statusColor}">${statusLabel}</span></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// ===================== INVENTORY =====================
function renderInventory() {
  const el = document.getElementById('tab-inventory');
  const statusLabel = { ok:"In Stock", low:"Low Stock", out:"Out of Stock", expired:"Expired" };
  const statusBadge = { ok:"emerald", low:"amber", out:"rose", expired:"rose" };

  el.innerHTML = `
    <div class="table-card">
      <div class="table-card-header">
        <div>
          <div class="table-card-title">Medicine Inventory</div>
          <div class="table-card-sub">${DB.inventory.length} items tracked · ${DB.inventory.filter(i=>i.status!=='ok').length} need attention</div>
        </div>
        <div class="table-toolbar">
          <button class="table-filter-btn active" onclick="filterInventory('all')">All</button>
          <button class="table-filter-btn" onclick="filterInventory('out')">Out of Stock</button>
          <button class="table-filter-btn" onclick="filterInventory('low')">Low Stock</button>
          <button class="table-filter-btn" onclick="filterInventory('expired')">Expired</button>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead><tr>
            <th>Medicine</th><th>Category</th><th>Stock</th><th>Status</th>
            <th>Supplier</th><th>Price</th><th>Expiry</th><th style="text-align:right">Action</th>
          </tr></thead>
          <tbody id="inventory-tbody">
            ${DB.inventory.map(item => {
              const arrivedHtml = item.arrived
                ? `<span class="status-indicator emerald"><i data-lucide="circle-check"></i> In Shop</span>`
                : `<span class="status-indicator amber"><i data-lucide="truck"></i> In-Transit</span>`;
              const actionHtml = item.status === 'out' && item.arrived
                ? `<button class="btn btn-emerald" onclick="notifyPatientForDrug('${item.name}','Arrived')"><i data-lucide="send"></i> Notify</button>`
                : item.status === 'out' && !item.arrived
                ? `<button class="btn btn-disabled">Awaiting</button>`
                : item.status === 'low'
                ? `<button class="btn btn-outline" onclick="alert('Reorder placed for ${item.name}')"><i data-lucide="shopping-cart"></i> Reorder</button>`
                : item.status === 'expired'
                ? `<button class="btn btn-rose" onclick="notifyPatientForDrug('${item.name}','Arrived')"><i data-lucide="send"></i> Notify Fresh</button>`
                : `<span class="badge badge-emerald">Stocked</span>`;
              return `<tr class="${item.status === 'out' && !item.arrived ? 'disabled' : ''}" data-status="${item.status}">
                <td><div class="cell-title">${item.name}</div><div class="cell-sub">Batch: ${item.batch}</div></td>
                <td><span class="badge badge-gray">${item.category}</span></td>
                <td><strong style="color:${item.stock <= item.reorder ? 'var(--rose-500)' : 'var(--text-main)'}">${item.stock}</strong> <span style="font-size:10px;color:var(--text-light)">/ ${item.reorder} min</span></td>
                <td><span class="badge badge-${statusBadge[item.status]}">${statusLabel[item.status]}</span></td>
                <td style="font-size:12px;color:var(--text-muted)">${item.supplier}</td>
                <td style="font-weight:600">${formatCurrency(item.price)}</td>
                <td style="font-size:12px;color:var(--text-muted)">${item.expiry}</td>
                <td style="text-align:right">${actionHtml}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function filterInventory(status) {
  document.querySelectorAll('.table-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('#inventory-tbody tr').forEach(tr => {
    tr.style.display = (status === 'all' || tr.dataset.status === status) ? '' : 'none';
  });
}

function notifyPatientForDrug(drugName, type) {
  // Find a patient linked to this drug (simplified)
  const patient = DB.patients.find(p => p.meds.includes(drugName.split(' ')[0]));
  if (patient) {
    simulateWhatsApp(patient.name, drugName, type);
  } else {
    simulateWhatsApp(DB.patients[0].name, drugName, type);
  }
}

// ===================== PATIENTS =====================
function renderPatients() {
  const el = document.getElementById('tab-patients');
  el.innerHTML = `
    <div class="section-gap">
      <div class="section-title-row">
        <div><div class="section-title">All Patients</div><div class="section-sub">${DB.patients.length} registered patients</div></div>
        <button class="btn btn-emerald" onclick="openAddPatientModal()" style="padding:10px 20px;font-size:13px">
          <i data-lucide="user-plus" style="width:15px;height:15px"></i> Add Patient
        </button>
      </div>
      <div class="patient-grid">
        ${DB.patients.map(p => {
          const safeName = p.name.replace(/'/g, "\\'");
          const safeMed = p.meds.split(',')[0].trim().replace(/'/g, "\\'");
          return `
          <div class="patient-card">
            <div class="patient-card-top">
              <div class="patient-avatar" style="background:${p.color}">${p.name.charAt(0)}</div>
              <div>
                <div class="patient-name">${p.name}</div>
                <div class="patient-condition">${p.condition}</div>
              </div>
            </div>
            <div class="patient-details">
              <div class="patient-detail-row"><span class="patient-detail-label">Phone</span><span class="patient-detail-value">${p.phone}</span></div>
              <div class="patient-detail-row"><span class="patient-detail-label">Medications</span><span class="patient-detail-value" style="font-size:10px;text-align:right;max-width:160px">${p.meds}</span></div>
              <div class="patient-detail-row"><span class="patient-detail-label">Last Visit</span><span class="patient-detail-value">${p.lastVisit} days ago</span></div>
              <div class="patient-detail-row"><span class="patient-detail-label">Lifetime Value</span><span class="patient-detail-value" style="color:var(--emerald-500)">${formatCurrency(p.ltv)}</span></div>
            </div>
            <div style="margin-top:12px">
              <button class="btn btn-emerald" style="width:100%;justify-content:center" onclick="simulateWhatsApp('${safeName}','${safeMed}','Chronic')">
                <i data-lucide="send"></i> Send Refill Alert
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ===================== FOLLOW-UPS =====================
function renderFollowups() {
  const el = document.getElementById('tab-followups');

  const rows = DB.followUps.map(f => {
    const refillDate = new Date(f.lastPurchaseDate);
    refillDate.setDate(refillDate.getDate() + f.daysOfSupply);
    const alertDate = new Date(refillDate);
    alertDate.setDate(alertDate.getDate() - 3);
    const daysLeft = daysBetween(currentDate, alertDate);

    let statusBadge, statusLabel;
    if (f.confirmed) {
      statusBadge = 'emerald'; statusLabel = 'Confirmed';
    } else if (f.alertSent) {
      statusBadge = 'sky'; statusLabel = 'Alert Sent';
    } else if (daysLeft < 0) {
      statusBadge = 'rose'; statusLabel = 'Overdue';
    } else if (daysLeft <= 3) {
      statusBadge = 'amber'; statusLabel = 'Due Soon';
    } else {
      statusBadge = 'gray'; statusLabel = 'Scheduled';
    }

    const countdownClass = daysLeft < 0 ? 'urgent' : daysLeft <= 3 ? 'warning' : 'safe';
    const actionHtml = f.alertSent
      ? `<span class="badge badge-emerald"><i data-lucide="check" style="width:10px;height:10px"></i> Sent</span>`
      : `<button class="btn btn-emerald" onclick="sendFollowupAlert(${f.id})"><i data-lucide="send"></i> Send Alert</button>`;

    return `<tr>
      <td><div class="cell-title">${f.patientName}</div></td>
      <td><div class="cell-title">${f.drugName}</div><div class="cell-sub">${f.daysOfSupply}-day supply</div></td>
      <td style="font-size:12px">${formatDate(f.lastPurchaseDate)}</td>
      <td>
        <div class="followup-formula">Alert = (Purchase + ${f.daysOfSupply}d) - 3d = ${formatDateShort(alertDate)}</div>
      </td>
      <td style="text-align:center">
        <div class="days-countdown ${countdownClass}">${daysLeft < 0 ? Math.abs(daysLeft) : daysLeft}</div>
        <div class="days-countdown-label">${daysLeft < 0 ? 'days overdue' : 'days left'}</div>
      </td>
      <td><span class="badge badge-${statusBadge}">${statusLabel}</span></td>
      <td style="text-align:right">${actionHtml}</td>
    </tr>`;
  });

  el.innerHTML = `
    <div class="table-card">
      <div class="table-card-header">
        <div>
          <div class="table-card-title">Smart Refill Follow-ups</div>
          <div class="table-card-sub">Formula: Alert Date = (Last Purchase + Days of Supply) - 3 Days</div>
        </div>
        <div class="table-toolbar">
          <span class="badge badge-amber">${DB.followUps.filter(f => !f.alertSent).length} Pending</span>
          <span class="badge badge-emerald">${DB.followUps.filter(f => f.alertSent).length} Sent</span>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead><tr>
            <th>Patient</th><th>Medicine</th><th>Last Purchase</th>
            <th>Smart Formula</th><th style="text-align:center">Countdown</th>
            <th>Status</th><th style="text-align:right">Action</th>
          </tr></thead>
          <tbody>${rows.join('')}</tbody>
        </table>
      </div>
    </div>
  `;
}

function sendFollowupAlert(id) {
  const f = DB.followUps.find(x => x.id === id);
  if (f) {
    f.alertSent = true;
    simulateWhatsApp(f.patientName, f.drugName, 'Chronic');
    renderFollowups();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

// ===================== ANALYTICS =====================
function renderAnalytics() {
  const el = document.getElementById('tab-analytics');
  const s = DB.stats;
  const revDays = [8200, 11400, 9800, 14600, 12400, 10800, 13200];

  el.innerHTML = `
    <!-- Top Metrics -->
    <div class="metric-row">
      <div class="metric-card">
        <div class="metric-label">Today's Revenue</div>
        <div class="metric-value">${formatCurrency(s.todayRevenue)}</div>
        <div class="metric-sub">42 transactions</div>
        <div class="revenue-bar"><div class="revenue-bar-fill" style="width:${(s.todayRevenue / 20000) * 100}%;background:var(--emerald-500)"></div></div>
      </div>
      <div class="metric-card">
        <div class="metric-label">This Week</div>
        <div class="metric-value">${formatCurrency(s.weekRevenue)}</div>
        <div class="metric-sub">189 transactions</div>
        <div class="revenue-bar"><div class="revenue-bar-fill" style="width:${(s.weekRevenue / 100000) * 100}%;background:var(--sky-500)"></div></div>
      </div>
      <div class="metric-card">
        <div class="metric-label">This Month</div>
        <div class="metric-value">${formatCurrency(s.totalRevenue)}</div>
        <div class="metric-sub">+${s.monthGrowth}% growth</div>
        <div class="revenue-bar"><div class="revenue-bar-fill" style="width:${(s.totalRevenue / 300000) * 100}%;background:var(--violet-500)"></div></div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Avg Basket Size</div>
        <div class="metric-value">${formatCurrency(s.avgBasketSize)}</div>
        <div class="metric-sub">per patient visit</div>
        <div class="revenue-bar"><div class="revenue-bar-fill" style="width:${(s.avgBasketSize / 1000) * 100}%;background:var(--amber-500)"></div></div>
      </div>
    </div>

    <div class="analytics-grid">
      <!-- Revenue Chart -->
      <div class="dash-card">
        <div class="dash-card-header">
          <div class="dash-card-title">Daily Revenue Trend (Last 7 Days)</div>
          <span class="badge badge-emerald">Healthy</span>
        </div>
        <div class="dash-card-body">
          <div class="chart-container">
            ${revDays.map((v, i) => {
              const pct = (v / Math.max(...revDays)) * 100;
              return `<div class="chart-col"><div class="chart-bar-wrap"><div class="chart-bar" style="height:${pct}%;background:linear-gradient(180deg,var(--violet-500),#a78bfa)"><span class="chart-bar-val">${formatCurrency(v)}</span></div></div><div class="chart-label">${dailyLabels[i]}</div></div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- WhatsApp Performance -->
      <div class="dash-card">
        <div class="dash-card-header">
          <div class="dash-card-title">WhatsApp Messaging Performance</div>
          <span class="badge badge-sky">Automated</span>
        </div>
        <div class="dash-card-body">
          <div class="progress-ring-container">
            <div class="progress-ring">
              <svg viewBox="0 0 100 100">
                <circle class="progress-ring-bg" cx="50" cy="50" r="42"/>
                <circle class="progress-ring-fill" cx="50" cy="50" r="42" stroke="var(--sky-500)" stroke-dasharray="${2 * Math.PI * 42}" stroke-dashoffset="${2 * Math.PI * 42 * (1 - s.responded / s.totalMessagesSent)}"/>
              </svg>
              <div class="progress-ring-text">${Math.round(s.responded / s.totalMessagesSent * 100)}%</div>
            </div>
            <div class="progress-stats">
              <div class="progress-stat"><span class="progress-dot" style="background:var(--sky-500)"></span> Total Sent: <strong>${s.totalMessagesSent}</strong></div>
              <div class="progress-stat"><span class="progress-dot" style="background:var(--emerald-500)"></span> Delivered: <strong>${s.delivered}</strong> (${Math.round(s.delivered/s.totalMessagesSent*100)}%)</div>
              <div class="progress-stat"><span class="progress-dot" style="background:var(--indigo-500)"></span> Read: <strong>${s.read}</strong> (${Math.round(s.read/s.totalMessagesSent*100)}%)</div>
              <div class="progress-stat"><span class="progress-dot" style="background:var(--amber-500)"></span> Replied: <strong>${s.responded}</strong> (${Math.round(s.responded/s.totalMessagesSent*100)}%)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Patients by Revenue -->
      <div class="dash-card analytics-wide">
        <div class="dash-card-header">
          <div class="dash-card-title">Top 10 Patients by Lifetime Value</div>
          <span class="badge badge-violet">Revenue Leaders</span>
        </div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead><tr><th>#</th><th>Patient</th><th>Condition</th><th>Medications</th><th>Lifetime Value</th><th>Last Visit</th></tr></thead>
            <tbody>
              ${[...DB.patients].sort((a,b) => b.ltv - a.ltv).slice(0, 10).map((p, i) => `
                <tr>
                  <td style="font-weight:700;color:var(--text-light)">${i + 1}</td>
                  <td><div class="cell-title">${p.name}</div><div class="cell-sub">${p.phone}</div></td>
                  <td><span class="badge badge-gray">${p.condition}</span></td>
                  <td style="font-size:11px;color:var(--text-muted);max-width:200px">${p.meds}</td>
                  <td><strong style="color:var(--emerald-500)">${formatCurrency(p.ltv)}</strong></td>
                  <td style="font-size:12px;color:var(--text-muted)">${p.lastVisit} days ago</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ===================== ENGINE SIMULATION =====================
function updateDateDisplay() {
  const el = document.getElementById('engine-current-date');
  if (el) el.textContent = formatDate(currentDate);
}

function simulateNextDay() {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDateDisplay();
  checkEngineRules();
  // Re-render current active tab
  const activeTab = document.querySelector('.nav-item.active');
  if (activeTab) renderTab(activeTab.dataset.tab);
}

function checkEngineRules() {
  DB.followUps.forEach(f => {
    if (f.alertSent) return;
    const refillDate = new Date(f.lastPurchaseDate);
    refillDate.setDate(refillDate.getDate() + f.daysOfSupply);
    const alertDate = new Date(refillDate);
    alertDate.setDate(alertDate.getDate() - 3);

    if (currentDate.toDateString() === alertDate.toDateString() || currentDate > alertDate) {
      f.alertSent = true;
      simulateWhatsApp(f.patientName, f.drugName, 'Chronic');
    }
  });
}

// ===================== WHATSAPP SIMULATION =====================
function simulateWhatsApp(patientName, drugName, templateType) {
  const contactEl = document.getElementById('whatsapp-contact-name');
  const chatBody = document.getElementById('whatsapp-chat-body');
  const emptyPrompt = document.getElementById('empty-state-prompt');

  if (contactEl) contactEl.textContent = patientName + ' (Patient)';
  if (emptyPrompt) emptyPrompt.remove();

  let msg = '';
  if (templateType === 'Arrived') {
    msg = `Hello <b>${patientName}</b>, your requested medication <b>${drugName}</b> has arrived at our pharmacy and is kept reserved for you. Would you like us to deliver it to your address today?\n\nReply <b>YES</b> to confirm pickup/delivery.`;
  } else if (templateType === 'Vaccine') {
    msg = `Dear <b>${patientName}</b>, this is a wellness notification from MediFlow Pharmacy. Your child's <b>${drugName}</b> is scheduled for next Tuesday.\n\nReply <b>1</b> for morning slot or <b>2</b> for afternoon.`;
  } else if (templateType === 'Chronic') {
    msg = `Hi <b>${patientName}</b>, our records indicate your monthly stock of <b>${drugName}</b> will run out in 3 days. We have pre-allocated your refill batch.\n\nReply <b>YES</b> to package for pickup/delivery.`;
  } else if (templateType === 'Welcome') {
    msg = `Welcome to MediFlow Pharmacy, <b>${patientName}</b>! \ud83c\udf1f\n\nYou have been registered for automated refill reminders for <b>${drugName}</b>. We will notify you 3 days before your supply runs out.\n\nReply <b>OK</b> to confirm or <b>STOP</b> to opt out.`;
  } else {
    msg = `Hello <b>${patientName}</b>, you have a pending follow-up for <b>${drugName}</b>. Please visit MediFlow Pharmacy at your earliest convenience or reply <b>YES</b> to schedule delivery.`;
  }

  whatsappMsgCount++;
  // Update FAB badge
  const fabBadge = document.getElementById('wa-fab-badge');
  if (fabBadge) {
    fabBadge.textContent = whatsappMsgCount;
    fabBadge.dataset.count = whatsappMsgCount;
  }
  showTypingIndicator(chatBody, () => {
    const div = document.createElement('div');
    div.className = 'wa-message';
    div.innerHTML = `<div class="wa-message-text">${msg.replace(/\n/g, '<br>')}</div>
      <div class="wa-message-meta">${getTimeStr()} <span class="wa-read-receipt">\u2713\u2713</span></div>`;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  });
}

function showTypingIndicator(chatBody, callback) {
  let ind = document.getElementById('typing-indicator');
  if (!ind) {
    ind = document.createElement('div');
    ind.id = 'typing-indicator';
    ind.className = 'typing-indicator';
    ind.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chatBody.appendChild(ind);
  }
  ind.style.display = 'flex';
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(() => { ind.style.display = 'none'; callback(); }, 600);
}

// ===================== ADD PATIENT MODAL =====================
function openAddPatientModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('open');
  // Set default date to today
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  document.getElementById('f-lastpurchase').value = dateStr;
  document.getElementById('f-name').focus();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeAddPatientModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('add-patient-form').reset();
}

function handleAddPatient(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const condition = document.getElementById('f-condition').value.trim();
  const medicine = document.getElementById('f-medicine').value.trim();
  const supply = parseInt(document.getElementById('f-supply').value, 10);
  const lastPurchaseStr = document.getElementById('f-lastpurchase').value;

  if (!name || !phone || !condition || !medicine || !supply || !lastPurchaseStr) return;

  const lastPurchase = new Date(lastPurchaseStr);
  const colors = ['#6366f1','#f43f5e','#06b6d4','#f59e0b','#8b5cf6','#10b981','#ec4899','#14b8a6','#f97316','#0ea5e9','#a855f7','#22c55e','#e11d48','#2563eb','#d946ef'];
  const color = colors[DB.patients.length % colors.length];

  // Create patient
  const newPatient = {
    id: 200 + DB.patients.length,
    name: name,
    phone: phone,
    condition: condition,
    meds: medicine,
    lastVisit: 0,
    ltv: 0,
    color: color,
  };
  DB.patients.push(newPatient);

  // Create follow-up
  const newFollowup = {
    id: 500 + DB.followUps.length,
    patientName: name,
    drugName: medicine,
    daysOfSupply: supply,
    lastPurchaseDate: lastPurchase,
    alertSent: false,
    confirmed: false,
  };
  DB.followUps.push(newFollowup);

  // Close modal and re-render
  closeAddPatientModal();
  renderPatients();
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Send welcome WhatsApp
  simulateWhatsApp(name, medicine, 'Welcome');
}

// ===================== MOBILE: SIDEBAR TOGGLE =====================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-backdrop').classList.remove('open');
}

// ===================== MOBILE: WHATSAPP FAB TOGGLE =====================
function toggleWhatsAppPanel() {
  const panel = document.querySelector('.whatsapp-panel');
  panel.classList.toggle('open');
}

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Initialize date
  updateDateDisplay();

  // Render default tab
  renderDashboard();

  // Sidebar nav clicks
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
      // Auto-close sidebar on mobile after navigation
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // Simulate button
  document.getElementById('btn-simulate-day').addEventListener('click', simulateNextDay);

  // Hamburger toggle
  document.getElementById('hamburger-btn').addEventListener('click', toggleSidebar);
  document.getElementById('sidebar-backdrop').addEventListener('click', closeSidebar);

  // WhatsApp FAB toggle
  document.getElementById('wa-fab').addEventListener('click', toggleWhatsAppPanel);

  // Modal controls
  document.getElementById('modal-close-btn').addEventListener('click', closeAddPatientModal);
  document.getElementById('modal-cancel-btn').addEventListener('click', closeAddPatientModal);
  document.getElementById('add-patient-form').addEventListener('submit', handleAddPatient);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddPatientModal();
  });
});
