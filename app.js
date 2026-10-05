/**
 * YOUTUBE CO-PILOT DASHBOARD - APPLICATION LOGIC
 * Full-stack integration with Real Google OAuth 2.0 & YouTube Data API v3
 * Strictly following design.md specs:
 * - High-contrast technical dashboard
 * - Smooth area charts with #00E5FF and #32D74B gradient
 * - Multi-currency support (₺ TRY, $ USD, Bs. BOB)
 * - Real YouTube channel authentication & live real-time simulation
 */

// ==================== STATE MANAGEMENT ====================
const state = {
  currency: 'TRY', // 'TRY' (₺), 'USD' ($), 'BOB' (Bs.)
  currencyRates: {
    TRY: { symbol: '₺', rate: 1, prefix: true },
    USD: { symbol: '$', rate: 0.031, prefix: true },
    BOB: { symbol: 'Bs.', rate: 0.213, prefix: false }
  },
  timeframe: '24h',
  activeMetric: 'views',
  
  // Real Channel State
  isConnected: false,
  channel: null,
  realVideos: [],
  
  // Simulated / Baseline Metrics
  liveViews: 48290,
  subscribers: 142850,
  baseRevenueTRY: 18420.50,
  isLiveActive: true,
  liveInterval: null,
  chartInstance: null
};

// ==================== MOCK DATASETS (FOR CHARTS & DEMO) ====================
const chartDataSets = {
  '60m': {
    labels: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 5} dk`),
    views: [280, 420, 390, 580, 710, 650, 890, 1120, 980, 1240, 1180, 1390],
    ctr: [4.8, 5.1, 5.0, 5.6, 6.2, 5.9, 6.8, 7.4, 7.1, 7.8, 7.6, 8.2],
    watchTime: [24, 38, 35, 52, 68, 62, 85, 108, 94, 118, 112, 134],
    peak: '1,390 izlenme/5dk',
    topSource: 'Bildirimler (%52)',
    retention: '%64.8'
  },
  '24h': {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    views: [1420, 980, 620, 850, 2100, 3450, 4800, 4200, 5600, 7890, 9200, 7180],
    ctr: [5.2, 5.0, 4.8, 5.3, 6.1, 6.5, 7.0, 6.8, 7.4, 8.6, 9.1, 7.9],
    watchTime: [120, 82, 54, 72, 185, 310, 430, 380, 510, 720, 840, 650],
    peak: '9,200 izlenme (20:00)',
    topSource: 'Önerilen Videolar (%62.4)',
    retention: '%54.2'
  },
  '7d': {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    views: [28400, 32100, 29800, 41200, 52600, 68900, 61400],
    ctr: [6.1, 6.4, 6.0, 7.1, 7.8, 8.5, 8.0],
    watchTime: [2450, 2810, 2600, 3650, 4720, 6150, 5480],
    peak: '68,900 izlenme (Cumartesi)',
    topSource: 'YouTube Araması (%44.1)',
    retention: '%58.7'
  },
  '28d': {
    labels: ['Hafta 1', 'Hafta 2', 'Hafta 3', 'Hafta 4'],
    views: [184000, 212000, 265000, 318000],
    ctr: [6.5, 6.8, 7.4, 7.9],
    watchTime: [16200, 18900, 23800, 28500],
    peak: '318,000 izlenme (4. Hafta)',
    topSource: 'Göz Atma Özellikleri (%58)',
    retention: '%56.1'
  }
};

const demoVideos = [
  {
    id: 'v1',
    title: 'Claude 3.7 & Gemini 2.0 ile Sıfırdan SaaS Kurmak (Adım Adım)',
    date: 'Dün yüklendi',
    duration: '18:42',
    views: 34820,
    ctr: 8.9,
    retention: '08:14 (%44)',
    revenueTRY: 1480.00,
    status: 'stellar',
    statusText: 'Viral Hızda',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    dropTimestamp: '02:15'
  },
  {
    id: 'v2',
    title: 'Yapay Zeka Destekli Kod Editörleri Karşılaştırması 2026',
    date: '3 gün önce',
    duration: '12:05',
    views: 19400,
    ctr: 3.4,
    retention: '01:42 (%28)',
    revenueTRY: 710.50,
    status: 'attention',
    statusText: 'Vampir Düşüşü',
    thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=160&auto=format&fit=crop&q=80',
    dropTimestamp: '01:42'
  },
  {
    id: 'v3',
    title: 'Geliştiriciler İçin Otomasyon: 10 Kat Daha Hızlı Çalışın',
    date: '6 gün önce',
    duration: '15:20',
    views: 45200,
    ctr: 7.2,
    retention: '07:30 (%49)',
    revenueTRY: 2190.00,
    status: 'stellar',
    statusText: 'Yüksek Gelir',
    thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&auto=format&fit=crop&q=80',
    dropTimestamp: '04:10'
  },
  {
    id: 'v4',
    title: 'Büyük Dil Modelleri Nasıl Eğitilir? (Donanım & Mimari)',
    date: '10 gün önce',
    duration: '22:15',
    views: 12100,
    ctr: 4.8,
    retention: '09:12 (%41)',
    revenueTRY: 920.00,
    status: 'normal',
    statusText: 'Kararlı',
    thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=160&auto=format&fit=crop&q=80',
    dropTimestamp: '03:50'
  }
];

// ==================== HELPER FUNCTIONS ====================
function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return new Intl.NumberFormat('tr-TR').format(num);
}

function formatCurrency(amountInTRY) {
  const current = state.currencyRates[state.currency];
  const converted = (amountInTRY * current.rate);
  const formattedVal = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(converted);

  if (current.prefix) {
    return `${current.symbol} ${formattedVal}`;
  }
  return `${formattedVal} ${current.symbol}`;
}

function showToast(message, isAlert = false) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.style.borderColor = isAlert ? 'var(--accent-alert)' : 'var(--accent-primary)';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ==================== REAL AUTH & API ENGINE ====================
async function checkAuthStatus() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return;
    const config = await res.json();

    state.isConnected = config.isConnected;

    // Check URL parameters for OAuth return
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('connected')) {
      showToast('🎉 YouTube kanalınız başarıyla bağlandı!');
      window.history.replaceState({}, document.title, window.location.pathname);
      state.isConnected = true;
    } else if (urlParams.has('error')) {
      const err = urlParams.get('error');
      showToast(`Bağlantı hatası: ${err}`, true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    updateAuthUI(config);

    if (state.isConnected) {
      await fetchRealChannelData();
      await fetchRealVideos();
    } else {
      renderKPIs();
      renderTable(demoVideos);
    }
  } catch (err) {
    console.warn('API config check failed, running in offline demo mode:', err);
    renderKPIs();
    renderTable(demoVideos);
  }
}

function updateAuthUI(config) {
  const container = document.getElementById('authBtnContainer');
  const statusLabel = document.getElementById('channelStatusLabel');
  const tableBadge = document.getElementById('tableModeBadge');

  if (state.isConnected) {
    statusLabel.innerHTML = '● CANLI HESAP BAĞLI';
    statusLabel.style.color = 'var(--accent-secondary)';
    if (tableBadge) {
      tableBadge.textContent = 'CANLI KANAL VERİSİ';
      tableBadge.style.color = 'var(--accent-secondary)';
      tableBadge.style.borderColor = 'var(--accent-secondary)';
    }

    container.innerHTML = `
      <button class="btn-disconnect" id="btnLogoutBtn" title="YouTube Hesabı Bağlantısını Kes">
        🚪 Bağlantıyı Kes
      </button>
    `;

    document.getElementById('btnLogoutBtn').addEventListener('click', handleLogout);
  } else {
    statusLabel.innerHTML = '● DEMO MODU';
    statusLabel.style.color = 'var(--accent-primary)';
    if (tableBadge) {
      tableBadge.textContent = 'DEMO VERİSİ';
      tableBadge.style.color = 'var(--text-secondary)';
      tableBadge.style.borderColor = 'var(--border-subtle)';
    }

    container.innerHTML = `
      <button class="btn-youtube" id="btnOpenAuthModal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        YouTube Hesabını Bağla
      </button>
    `;

    document.getElementById('btnOpenAuthModal').addEventListener('click', () => {
      document.getElementById('authSetupModal').classList.add('active');
    });
  }
}

async function fetchRealChannelData() {
  try {
    const res = await fetch('/api/channel');
    if (!res.ok) throw new Error('Kanal verisi çekilemedi');
    const data = await res.json();
    if (!data.success || !data.channel) return;

    state.channel = data.channel;

    // Update Navbar Brand / Channel Chip
    document.getElementById('channelName').textContent = state.channel.title;
    if (state.channel.avatar) {
      document.getElementById('channelAvatar').src = state.channel.avatar;
    }

    // Update KPI metrics with real channel numbers
    state.subscribers = state.channel.subscribers;
    state.liveViews = state.channel.views;
    state.baseRevenueTRY = (state.channel.views * 0.042); // Estimated lifetime / active RPM

    document.getElementById('kpi-views-title').textContent = 'Toplam Kanal İzlenmesi';
    document.getElementById('kpi-views-sub').textContent = 'Doğrulanmış YouTube İstatistiği';
    document.getElementById('kpi-subs-sub').textContent = `${state.channel.customUrl || '@kanal'}`;
    document.getElementById('kpi-subs-extra').textContent = `Toplam Video: ${state.channel.videoCount}`;

    renderKPIs();
    showToast(`"${state.channel.title}" kanalı senkronize edildi!`);
  } catch (err) {
    console.error('Channel fetch error:', err);
  }
}

async function fetchRealVideos() {
  try {
    const res = await fetch('/api/videos');
    if (!res.ok) throw new Error('Videolar çekilemedi');
    const data = await res.json();
    if (data.success && data.videos && data.videos.length > 0) {
      state.realVideos = data.videos;
      renderTable(state.realVideos);

      // Adapt Co-Pilot Alerts based on real videos
      const lowestVideo = [...data.videos].sort((a, b) => a.views - b.views)[0];
      const highestVideo = [...data.videos].sort((a, b) => b.views - a.views)[0];

      if (lowestVideo) {
        document.getElementById('alertVampireDesc').innerHTML = `
          <strong>"${lowestVideo.title.slice(0, 45)}..."</strong> videosunda izleyici etkileşimi beklenenin altında kaldı.
        `;
      }
      if (highestVideo) {
        document.getElementById('alertOpportunityDesc').innerHTML = `
          <strong>"${highestVideo.title.slice(0, 45)}..."</strong> kanalınızın en çok izlenen içeriği! Toplulukta ankete açın.
        `;
      }
    }
  } catch (err) {
    console.error('Videos fetch error:', err);
  }
}

async function handleLogout() {
  try {
    const res = await fetch('/api/logout', { method: 'POST' });
    const data = await res.json();
    state.isConnected = false;
    state.channel = null;
    state.realVideos = [];

    // Reset UI to demo
    document.getElementById('channelName').textContent = 'Scarlett Studio Tech';
    document.getElementById('channelAvatar').src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80';
    state.liveViews = 48290;
    state.subscribers = 142850;
    state.baseRevenueTRY = 18420.50;

    checkAuthStatus();
    showToast('YouTube hesabı bağlantısı kesildi. Demo moduna dönüldü.');
  } catch (err) {
    console.error('Logout error:', err);
  }
}

// ==================== INITIALIZE CHART ====================
function initChart() {
  const ctx = document.getElementById('mainMetricsChart');
  if (!ctx) return;

  const currentDataset = chartDataSets[state.timeframe];
  const dataValues = currentDataset[state.activeMetric];

  const chartCanvas = ctx.getContext('2d');
  const gradient = chartCanvas.createLinearGradient(0, 0, 0, 320);
  gradient.addColorStop(0, 'rgba(0, 229, 255, 0.42)');
  gradient.addColorStop(0.65, 'rgba(50, 215, 75, 0.15)');
  gradient.addColorStop(1, 'rgba(18, 18, 18, 0)');

  const metricLabelMap = {
    views: 'Görüntülenme (Hız)',
    ctr: 'Tıklanma Oranı (CTR %)',
    watchTime: 'İzlenme Süresi (Saat)'
  };

  state.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: currentDataset.labels,
      datasets: [{
        label: metricLabelMap[state.activeMetric],
        data: dataValues,
        borderColor: '#00E5FF',
        borderWidth: 2.5,
        backgroundColor: gradient,
        fill: true,
        tension: 0.4, // Smooth area chart per design.md rule
        pointBackgroundColor: '#00E5FF',
        pointBorderColor: '#121212',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#32D74B',
        pointHoverBorderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1E1E1E',
          titleColor: '#98989D',
          titleFont: { family: 'Inter', size: 12 },
          bodyColor: '#FFFFFF',
          bodyFont: { family: 'JetBrains Mono', size: 14, weight: 'bold' },
          borderColor: '#2C2C2E',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              const val = context.raw;
              if (state.activeMetric === 'ctr') return `CTR: %${val}`;
              if (state.activeMetric === 'watchTime') return `Süre: ${val} saat`;
              return `Hız: ${formatNumber(val)} izlenme`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#2C2C2E', drawBorder: false },
          ticks: { color: '#98989D', font: { family: 'Inter', size: 11 } }
        },
        y: {
          grid: { color: '#2C2C2E', drawBorder: false },
          ticks: {
            color: '#98989D',
            font: { family: 'JetBrains Mono', size: 11 },
            callback: function(value) {
              if (state.activeMetric === 'ctr') return `%${value}`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
              return value;
            }
          }
        }
      }
    }
  });

  updateChartStrip();
}

function updateChartStrip() {
  const currentDataset = chartDataSets[state.timeframe];
  document.getElementById('strip-peak').textContent = currentDataset.peak;
  document.getElementById('strip-source').textContent = currentDataset.topSource;
  document.getElementById('strip-retention').textContent = currentDataset.retention;
}

function updateChartData() {
  if (!state.chartInstance) return;
  const currentDataset = chartDataSets[state.timeframe];
  const dataValues = currentDataset[state.activeMetric];

  const metricLabelMap = {
    views: 'Görüntülenme (Hız)',
    ctr: 'Tıklanma Oranı (CTR %)',
    watchTime: 'İzlenme Süresi (Saat)'
  };

  state.chartInstance.data.labels = currentDataset.labels;
  state.chartInstance.data.datasets[0].data = dataValues;
  state.chartInstance.data.datasets[0].label = metricLabelMap[state.activeMetric];
  state.chartInstance.update();

  updateChartStrip();
}

// ==================== RENDER KPI VALUES ====================
function renderKPIs() {
  document.getElementById('kpi-views-val').textContent = formatNumber(state.liveViews);
  document.getElementById('kpi-subs-val').textContent = formatNumber(state.subscribers);
  document.getElementById('kpi-rev-val').textContent = formatCurrency(state.baseRevenueTRY);

  const rpm = (state.baseRevenueTRY / (state.liveViews / 1000 || 1));
  document.getElementById('kpi-rpm-sub').textContent = `RPM: ${formatCurrency(rpm)} / 1k izlenme`;
}

// ==================== RENDER VIDEO TABLE ====================
function renderTable(videos = (state.realVideos.length > 0 ? state.realVideos : demoVideos)) {
  const tbody = document.getElementById('videos-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (videos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 32px;">
          Henüz video bulunamadı veya aranılan kriterde sonuç yok.
        </td>
      </tr>
    `;
    return;
  }

  videos.forEach(video => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.title = 'Co-Pilot detay analizi için tıklayın';

    tr.innerHTML = `
      <td>
        <div class="video-cell">
          <div class="video-thumb-wrap">
            <img src="${video.thumb}" alt="Thumbnail" loading="lazy">
            <span class="video-duration">${video.duration}</span>
          </div>
          <div class="video-meta">
            <span class="video-title">${video.title}</span>
            <span class="video-pub-date">${video.date}</span>
          </div>
        </div>
      </td>
      <td>
        <span class="mono-metric">${formatNumber(video.views)}</span>
      </td>
      <td>
        <span class="mono-metric ${video.ctr >= 6 ? 'cyan' : ''}">%${video.ctr}</span>
      </td>
      <td>
        <span class="mono-metric">${video.duration || '12:00'}</span>
      </td>
      <td>
        <span class="mono-metric cyan">${formatCurrency(video.revenueTRY)}</span>
      </td>
      <td>
        <span class="status-badge ${video.status}">
          ${video.status === 'attention' ? '⚠️' : '⚡'} ${video.statusText}
        </span>
      </td>
    `;

    tr.addEventListener('click', () => openVideoModal(video));
    tbody.appendChild(tr);
  });
}

// ==================== MODAL HANDLERS ====================
function openVideoModal(video) {
  const modal = document.getElementById('videoDetailModal');
  if (!modal) return;

  document.getElementById('modal-video-title').textContent = video.title;
  document.getElementById('modal-video-views').textContent = formatNumber(video.views);
  document.getElementById('modal-video-ctr').textContent = `%${video.ctr}`;
  document.getElementById('modal-video-rev').textContent = formatCurrency(video.revenueTRY);

  const ytBtn = document.getElementById('btnWatchOnYouTube');
  if (ytBtn) {
    ytBtn.href = video.id && !video.id.startsWith('v') ? `https://www.youtube.com/watch?v=${video.id}` : 'https://youtube.com';
  }

  const adviceBox = document.getElementById('modal-copilot-advice');
  if (video.status === 'attention') {
    adviceBox.innerHTML = `
      <div class="alert-box" style="margin: 0;">
        <div class="alert-header">
          <span>⚠️ Vampir Düşüş Uyarısı: ${video.dropTimestamp || '01:30'}</span>
        </div>
        <p class="alert-body">İzleyicilerin %38'i bu videonun başlarında videodan ayrılıyor. Giriş kısmı çok uzun tutulmuş veya tempo düşmüş.</p>
        <div class="alert-recommendation">
          <span class="alert-rec-title">💡 Co-Pilot Aksiyonu</span>
          YouTube Studio'dan kurgusal kırpma yapın veya açıklama kısmına o saniyeye yönlendirici soru pini ekleyin.
        </div>
      </div>
    `;
  } else {
    adviceBox.innerHTML = `
      <div class="opportunity-box" style="margin: 0;">
        <div class="alert-header">
          <span>⚡ Yüksek Etkileşim ve Performans</span>
        </div>
        <p class="alert-body">Bu video algoritmanın önerilen videolar havuzuna girdi. Kitle tutma oranı ortalamanın %24 üzerinde.</p>
        <div class="alert-recommendation">
          <span class="alert-rec-title" style="color: var(--accent-secondary);">🎯 Co-Pilot Aksiyonu</span>
          Bu videonun sonuna izlenme sayısı düşük olan ilgili videonuzu 'Bitiş Kartı' olarak ekleyin.
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
}

// ==================== AI CO-PILOT TITLE & HOOK TESTER ====================
function setupCopilotTester() {
  const input = document.getElementById('titleTestInput');
  const btn = document.getElementById('btnTestTitle');
  const resultsDiv = document.getElementById('copilotResults');

  if (!btn || !input || !resultsDiv) return;

  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) {
      showToast('Lütfen test etmek için bir video başlığı veya fikri girin.', true);
      return;
    }

    btn.textContent = 'Analiz Ediliyor...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '🚀 Başlığı Co-Pilot ile Test Et';
      btn.disabled = false;

      const score = Math.floor(75 + Math.random() * 23);
      resultsDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-weight: 700; color: #fff;">Viral Potansiyel Skoru:</span>
          <span class="score-badge">⚡ ${score}/100</span>
        </div>
        <p style="color: var(--text-secondary); margin: 4px 0 8px;">
          Co-Pilot Analizi: Başlıkta merak unsuru güçlü ancak aciliyet ve vaat biraz daha keskinleştirilebilir.
        </p>
        <span style="font-weight: 600; color: var(--accent-primary); font-size: 11px; text-transform: uppercase;">
          Önerilen Yüksek CTR Alternatifleri:
        </span>
        <div class="suggestion-item" onclick="applySuggestion('${text} (Saklanan Yöntem)')">
          1. ${text} (Kimsenin Bilmediği 3 Yöntem) <span style="color: var(--accent-secondary); float: right;">+4.8% CTR</span>
        </div>
        <div class="suggestion-item" onclick="applySuggestion('Neden ${text}? (Büyük Değişim)')">
          2. Bunu Yapmadan ${text}! <span style="color: var(--accent-secondary); float: right;">+6.2% CTR</span>
        </div>
        <div class="suggestion-item" onclick="applySuggestion('${text} Rehberi [2026]')">
          3. 0'dan İleri Seviyeye: ${text} <span style="color: var(--accent-secondary); float: right;">+3.5% CTR</span>
        </div>
      `;
      showToast('Co-Pilot 3 yeni yüksek CTR alternatifi üretti!');
    }, 600);
  });
}

window.applySuggestion = function(newTitle) {
  const input = document.getElementById('titleTestInput');
  if (input) input.value = newTitle;
  showToast(`"${newTitle.slice(0, 30)}..." panoya aktarıldı!`);
};

// ==================== LIVE SIMULATION ENGINE ====================
function startLiveSimulation() {
  if (state.liveInterval) clearInterval(state.liveInterval);

  state.liveInterval = setInterval(() => {
    if (!state.isLiveActive) return;

    // Small realistic ticks
    const viewIncrement = Math.floor(8 + Math.random() * 18);
    state.liveViews += viewIncrement;

    if (Math.random() > 0.7) {
      state.subscribers += 1;
    }

    state.baseRevenueTRY += (viewIncrement * 0.042);
    renderKPIs();

    if (state.timeframe === '60m' && state.chartInstance && state.activeMetric === 'views') {
      const dataArr = state.chartInstance.data.datasets[0].data;
      dataArr[dataArr.length - 1] += viewIncrement;
      state.chartInstance.update('none');
    }
  }, 3000);
}

// ==================== EVENT LISTENERS SETUP ====================
function setupEventListeners() {
  // Currency Selector
  document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.currency = e.target.getAttribute('data-currency');
      renderKPIs();
      renderTable();
      showToast(`Para birimi ${state.currency} olarak güncellendi.`);
    });
  });

  // Timeframe Selector
  document.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.timeframe = e.target.getAttribute('data-timeframe');
      updateChartData();
    });
  });

  // Chart Metric Filter Chips
  document.querySelectorAll('.chart-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.chart-chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      state.activeMetric = e.target.getAttribute('data-metric');
      updateChartData();
    });
  });

  // Live Stream Toggle Pill
  const livePill = document.getElementById('liveStatusToggle');
  if (livePill) {
    livePill.addEventListener('click', () => {
      state.isLiveActive = !state.isLiveActive;
      if (state.isLiveActive) {
        livePill.innerHTML = '<span class="pulse-dot"></span> CANLI YAYINDA';
        livePill.style.color = 'var(--accent-secondary)';
        showToast('Canlı veri akışı senkronizasyonu başlatıldı.');
      } else {
        livePill.innerHTML = '<span class="pulse-dot" style="background: #98989D; box-shadow: none;"></span> DURAKLATILDI';
        livePill.style.color = '#98989D';
        showToast('Canlı veri akışı duraklatıldı.');
      }
    });
  }

  // Quick Action Buttons
  const runCopilotBtn = document.getElementById('btnRunCopilot');
  if (runCopilotBtn) {
    runCopilotBtn.addEventListener('click', () => {
      const modal = document.getElementById('copilotAnalysisModal');
      if (modal) modal.classList.add('active');
    });
  }

  // Table Search Filter
  const searchInput = document.getElementById('videoSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const dataset = state.realVideos.length > 0 ? state.realVideos : demoVideos;
      const filtered = dataset.filter(v => v.title.toLowerCase().includes(query));
      renderTable(filtered);
    });
  }

  // Close modals on clicking overlay or close button
  document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close-btn')) {
        closeModals();
      }
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  // Alert Action Buttons inside Alert Panel
  const fixVampireBtn = document.getElementById('btnFixVampire');
  if (fixVampireBtn) {
    fixVampireBtn.addEventListener('click', () => {
      const dataset = state.realVideos.length > 0 ? state.realVideos : demoVideos;
      const v = dataset.find(x => x.status === 'attention') || dataset[0];
      if (v) openVideoModal(v);
    });
  }

  const applyOpportunityBtn = document.getElementById('btnApplyOpportunity');
  if (applyOpportunityBtn) {
    applyOpportunityBtn.addEventListener('click', () => {
      showToast('⚡ Etiketler ve SEO optimizasyonları videoya uygulandı!');
    });
  }

  // OAuth Setup Modal Buttons
  const btnSaveConfigOnly = document.getElementById('btnSaveConfigOnly');
  const btnStartOAuthLogin = document.getElementById('btnStartOAuthLogin');

  if (btnSaveConfigOnly) {
    btnSaveConfigOnly.addEventListener('click', async () => {
      const clientId = document.getElementById('oauthClientId').value.trim();
      const clientSecret = document.getElementById('oauthClientSecret').value.trim();

      if (!clientId || !clientSecret) {
        showToast('Lütfen hem Client ID hem de Client Secret alanlarını doldurun.', true);
        return;
      }

      try {
        const res = await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId, clientSecret })
        });
        const data = await res.json();
        if (data.success) {
          showToast('Google API kimlik bilgileri başarıyla kaydedildi!');
          closeModals();
        } else {
          showToast(data.error || 'Kaydedilemedi.', true);
        }
      } catch (err) {
        showToast('Sunucu bağlantı hatası.', true);
      }
    });
  }

  if (btnStartOAuthLogin) {
    btnStartOAuthLogin.addEventListener('click', async () => {
      const clientId = document.getElementById('oauthClientId').value.trim();
      const clientSecret = document.getElementById('oauthClientSecret').value.trim();

      // If user typed new values, save first
      if (clientId && clientSecret) {
        await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId, clientSecret })
        });
      }

      // Start Google OAuth redirect
      window.location.href = '/auth/google';
    });
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initChart();
  setupCopilotTester();
  setupEventListeners();
  startLiveSimulation();
  checkAuthStatus();
});
