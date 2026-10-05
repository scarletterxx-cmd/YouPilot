import React, { useState, useEffect, useRef } from 'react';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  Play,
  Users,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Search,
  Sparkles,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export function App() {
  const [currency, setCurrency] = useState<'TRY' | 'USD' | 'BOB'>('TRY');
  const [timeframe, setTimeframe] = useState<'60m' | '24h' | '7d' | '28d'>('24h');
  const [activeMetric, setActiveMetric] = useState<'views' | 'ctr' | 'watchTime'>('views');
  const [titleInput, setTitleInput] = useState('Python ile 1 Günde Bot Nasıl Yapılır?');
  const [titleResult, setTitleResult] = useState<{ score: number; suggestions: string[] } | null>({
    score: 86,
    suggestions: [
      'Python ile 1 Günde Bot Yapmak: Adım Adım Rehber (+4.2% CTR)',
      'Kod Bilmeden Python Botu Yapılır mı? (Gerçek Sonuç) (+6.8% CTR)',
      '0\'dan İleri Seviyeye: Python Otomasyon Botu [2026] (+3.5% CTR)'
    ]
  });
  const [isTesting, setIsTesting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveViews, setLiveViews] = useState(48290);
  const [subscribers, setSubscribers] = useState(142850);
  const [selectedVideoModal, setSelectedVideoModal] = useState<any | null>(null);

  // Currency converters
  const currencySymbols = { TRY: '₺', USD: '$', BOB: 'Bs.' };
  const currencyRates = { TRY: 1, USD: 0.031, BOB: 0.213 };

  const formatRev = (tryAmount: number) => {
    const converted = tryAmount * currencyRates[currency];
    const formatted = converted.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return currency === 'BOB' ? `${formatted} ${currencySymbols[currency]}` : `${currencySymbols[currency]} ${formatted}`;
  };

  // Live simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViews(prev => prev + Math.floor(8 + Math.random() * 16));
      if (Math.random() > 0.7) setSubscribers(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Chart datasets
  const chartConfigs = {
    '60m': {
      labels: ['5 dk', '10 dk', '15 dk', '20 dk', '25 dk', '30 dk', '35 dk', '40 dk', '45 dk', '50 dk', '55 dk', '60 dk'],
      views: [280, 420, 390, 580, 710, 650, 890, 1120, 980, 1240, 1180, 1390],
      peak: '1,390 izlenme/5dk',
      topSource: 'Bildirimler (%52)',
      retention: '%64.8'
    },
    '24h': {
      labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      views: [1420, 980, 620, 850, 2100, 3450, 4800, 4200, 5600, 7890, 9200, 7180],
      peak: '9,200 izlenme (20:00)',
      topSource: 'Önerilen Videolar (%62.4)',
      retention: '%54.2'
    },
    '7d': {
      labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
      views: [28400, 32100, 29800, 41200, 52600, 68900, 61400],
      peak: '68,900 izlenme (Cmt)',
      topSource: 'YouTube Araması (%44.1)',
      retention: '%58.7'
    },
    '28d': {
      labels: ['Hafta 1', 'Hafta 2', 'Hafta 3', 'Hafta 4'],
      views: [184000, 212000, 265000, 318000],
      peak: '318,000 izlenme (H4)',
      topSource: 'Göz Atma (%58)',
      retention: '%56.1'
    }
  };

  const currentDataset = chartConfigs[timeframe];

  const chartData = {
    labels: currentDataset.labels,
    datasets: [
      {
        label: 'Görüntülenme Hızı',
        data: currentDataset.views,
        fill: true,
        borderColor: '#00E5FF',
        borderWidth: 2.5,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(0, 229, 255, 0.45)');
          gradient.addColorStop(0.65, 'rgba(50, 215, 75, 0.15)');
          gradient.addColorStop(1, 'rgba(18, 18, 18, 0)');
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#00E5FF',
        pointBorderColor: '#121212',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#32D74B'
      }
    ]
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
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
        displayColors: false
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
          callback: (val: any) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)
        }
      }
    }
  };

  const videos = [
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

  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleTestTitle = () => {
    if (!titleInput.trim()) return;
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setTitleResult({
        score: Math.floor(78 + Math.random() * 20),
        suggestions: [
          `${titleInput} (Kimsenin Bilmediği 3 Yöntem) (+4.8% CTR)`,
          `Bunu Yapmadan ${titleInput}! (+6.2% CTR)`,
          `0'dan İleri Seviyeye: ${titleInput} [2026] (+3.5% CTR)`
        ]
      });
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-hidden selection:bg-[#00E5FF] selection:text-black">
      
      {/* ========================================================
          ANIMATED GRADIENT BACKGROUND - INTEGRATED INTO DASHBOARD!
          Renders smoothly behind all dashboard cards & metrics
         ======================================================== */}
      <AnimatedGradientBackground
        Breathing={true}
        startingGap={115}
        animationSpeed={0.016}
        breathingRange={7}
        containerClassName="fixed inset-0 z-0 pointer-events-none opacity-80"
        gradientColors={[
          '#121212', // Base dark background
          '#00E5FF', // Neon Cyan glow
          '#32D74B', // Lime green accent
          '#1E1E1E', // Card blend
          '#121212'  // Outer fade
        ]}
        gradientStops={[30, 50, 70, 85, 100]}
      />

      {/* Main Dashboard Wrapper */}
      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6 font-sans">
        
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row items-center justify-between bg-[#1E1E1E]/90 backdrop-blur-md border border-[#2C2C2E] rounded-card p-4 px-6 gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.35)]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-base flex items-center gap-2">
                YOUPILOT CO-PILOT
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40">
                  v2.4 REACT
                </span>
              </div>
              <p className="text-xs text-[#98989D]">YouTube Creator Intelligence Kokpiti</p>
            </div>

            <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1 rounded-lg bg-[#141414] border border-[#2C2C2E]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-6 h-6 rounded-full border border-[#00E5FF] object-cover"
              />
              <span className="text-xs font-semibold">Scarlett Studio Tech</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#32D74B]/10 border border-[#32D74B]/30 text-[#32D74B] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#32D74B] animate-pulse shadow-[0_0_8px_#32D74B]"></span>
              CANLI VERİ AKIŞI
            </div>

            {/* Currency Selector */}
            <div className="flex bg-[#141414] border border-[#2C2C2E] rounded-lg p-1 gap-1">
              {(['TRY', 'USD', 'BOB'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    currency === curr
                      ? 'bg-[#1E1E1E] text-[#00E5FF] border border-[#2C2C2E] shadow-sm'
                      : 'text-[#98989D] hover:text-white'
                  }`}
                >
                  {curr === 'TRY' ? '₺ TRY' : curr === 'USD' ? '$ USD' : 'Bs. BOB'}
                </button>
              ))}
            </div>

            <a
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-[#FF0000] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#e60000] transition-all shadow-[0_0_15px_rgba(255,0,0,0.4)]"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              YouTube Hesabını Bağla
            </a>
          </div>
        </header>

        {/* 3 KPI Cards Row (JetBrains Mono numbers per design.md) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* KPI 1 */}
          <div className="bg-[#1E1E1E]/95 backdrop-blur-sm border border-[#2C2C2E] rounded-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[164px] hover:border-[#00E5FF] transition-all shadow-lg hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#98989D] uppercase tracking-wider">Canlı Trafik Hızı</span>
                <p className="text-[11px] text-[#98989D]">Son 60 Dakika İçi</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2C2C2E] flex items-center justify-center text-[#00E5FF]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="font-mono text-3xl font-bold tracking-tight my-2">
              {liveViews.toLocaleString('tr-TR')} <span className="text-sm font-sans font-normal text-[#98989D]">izlenme/saat</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-[#32D74B]/10 text-[#32D74B] font-semibold">+14.8%</span>
              <span className="text-[#98989D]">Normal ortalamanın üstünde</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-[#1E1E1E]/95 backdrop-blur-sm border border-[#2C2C2E] rounded-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[164px] hover:border-[#32D74B] transition-all shadow-lg hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#98989D] uppercase tracking-wider">Toplam Kitle</span>
                <p className="text-[11px] text-[#98989D]">Doğrulanmış YouTube Kanalı</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2C2C2E] flex items-center justify-center text-[#32D74B]">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="font-mono text-3xl font-bold tracking-tight my-2">
              {subscribers.toLocaleString('tr-TR')} <span className="text-sm font-sans font-normal text-[#98989D]">abone</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-[#32D74B]/10 text-[#32D74B] font-semibold">+340 bugün</span>
              <span className="text-[#98989D]">Dönüşüm Oranı: %3.4</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-[#1E1E1E]/95 backdrop-blur-sm border border-[#2C2C2E] rounded-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[164px] hover:border-[#00E5FF] transition-all shadow-lg hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#98989D] uppercase tracking-wider">Tahmini Gelir</span>
                <p className="text-[11px] text-[#98989D]">Bu Ay Kazanılan</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2C2C2E] flex items-center justify-center text-[#00E5FF]">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="font-mono text-3xl font-bold tracking-tight my-2 text-[#00E5FF]">
              {formatRev(18420.50)}
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-[#32D74B]/10 text-[#32D74B] font-semibold">+22.1%</span>
              <span className="text-[#98989D]">RPM: {formatRev(42.10)} / 1k</span>
            </div>
          </div>
        </section>

        {/* Main Grid: 8 Cols Chart + 4 Cols Critical Vampire Alert */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart (8 Cols) */}
          <div className="lg:col-span-8 bg-[#1E1E1E]/95 backdrop-blur-sm border border-[#2C2C2E] rounded-card p-6 flex flex-col justify-between shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
                  İzleyici Hızı ve Trafik Dinamiği
                </h2>
                <span className="text-xs text-[#98989D]">Yumuşatılmış Alan Eğrisi (Spline Area)</span>
              </div>

              {/* Timeframe buttons */}
              <div className="flex bg-[#141414] border border-[#2C2C2E] rounded-lg p-1 gap-1">
                {(['60m', '24h', '7d', '28d'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      timeframe === tf
                        ? 'bg-[#1E1E1E] text-[#00E5FF] border border-[#2C2C2E]'
                        : 'text-[#98989D] hover:text-white'
                    }`}
                  >
                    {tf === '60m' ? '60 Dk' : tf === '24h' ? '24 Saat' : tf === '7d' ? '7 Gün' : '28 Gün'}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72 w-full mt-2">
              <Line data={chartData} options={chartOptions} />
            </div>

            {/* Bottom summary strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-[#2C2C2E] text-xs">
              <div>
                <span className="text-[#98989D] uppercase text-[10px] block">Zirve Noktası (Peak)</span>
                <span className="font-mono font-bold text-white text-sm">{currentDataset.peak}</span>
              </div>
              <div>
                <span className="text-[#98989D] uppercase text-[10px] block">Birincil Kaynak</span>
                <span className="font-mono font-bold text-[#00E5FF] text-sm">{currentDataset.topSource}</span>
              </div>
              <div>
                <span className="text-[#98989D] uppercase text-[10px] block">Kitle Tutma</span>
                <span className="font-mono font-bold text-[#32D74B] text-sm">{currentDataset.retention}</span>
              </div>
            </div>
          </div>

          {/* Alerts & Optimization Panel (4 Cols per design.md) */}
          <div className="lg:col-span-4 bg-[#1E1E1E]/95 backdrop-blur-sm border border-[#2C2C2E] rounded-card p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#FF453A] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Kritik Uyarılar & Fırsatlar
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FF453A]/20 text-[#FF453A]">
                2 AKTİF
              </span>
            </div>

            {/* Vampire Alert Box strictly per design.md: #3A1C1C bg, 4px solid #FF453A left border */}
            <div className="bg-[#3A1C1C] border-l-4 border-[#FF453A] p-4 rounded-r-lg text-xs leading-relaxed text-[#ff9490] flex flex-col gap-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#FF453A]" />
                  Vampir Düşüşü Tespit Edildi!
                </span>
                <span className="font-mono text-[#FF453A]">01:42 Dk</span>
              </div>
              <p>
                <strong>"Yapay Zeka Destekli Kod Editörleri"</strong> videosunda 01:42 dakikasında izleyicilerin <strong className="text-white">%38'i</strong> videoyu terk ediyor.
              </p>
              <div className="bg-black/40 border border-[#FF453A]/30 p-2.5 rounded text-white text-[11px] mt-1">
                <span className="text-[#00E5FF] font-bold block mb-0.5">💡 CO-PILOT TAVSİYESİ:</span>
                Bu dakikadaki sessizliği kırpın veya ekranın sağ üstüne sonraki video yönlendirme kartı ekleyin.
              </div>
              <button
                onClick={() => setSelectedVideoModal(videos[1])}
                className="self-start text-[11px] font-bold text-[#FF453A] hover:text-white underline mt-1"
              >
                Kurgu Analizini Aç &rarr;
              </button>
            </div>

            {/* Opportunity Box */}
            <div className="bg-[#32D74B]/10 border-l-4 border-[#32D74B] p-4 rounded-r-lg text-xs leading-relaxed text-[#c7f9d1] flex flex-col gap-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-1.5 text-[#32D74B]">
                  <Zap className="w-3.5 h-3.5" />
                  Algoritma Sıçraması
                </span>
                <span className="font-mono text-[#32D74B]">+%84</span>
              </div>
              <p>
                <strong>"Claude 3.7 & Gemini 2.0"</strong> başlığı için arama hacminde ani patlama var. Video sıralamada 2. basamağa yükseldi!
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Section: 8 Cols Table + 4 Cols AI Hook Studio */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Table (8 Cols) */}
          <div className="lg:col-span-8 bg-[#1E1E1E]/95 backdrop-blur-sm border border-[#2C2C2E] rounded-card p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-base font-semibold">Son Yüklenen Videoların Performans Tablosu</h2>
              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-[#98989D] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Video ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2C2C2E] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#98989D] focus:border-[#00E5FF] focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#2C2C2E] text-[#98989D] uppercase text-[11px]">
                    <th className="py-3 px-3">Video İçeriği</th>
                    <th className="py-3 px-3">İzlenme</th>
                    <th className="py-3 px-3">CTR (%)</th>
                    <th className="py-3 px-3">Ort. Süre</th>
                    <th className="py-3 px-3">Tahmini Gelir</th>
                    <th className="py-3 px-3">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVideos.map((video) => (
                    <tr
                      key={video.id}
                      onClick={() => setSelectedVideoModal(video)}
                      className="border-b border-[#2C2C2E] hover:bg-[#252525] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-3 flex items-center gap-3">
                        <div className="w-16 h-10 rounded overflow-hidden bg-black flex-shrink-0 relative border border-[#2C2C2E]">
                          <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0.5 right-0.5 bg-black/80 font-mono text-[9px] px-1 rounded text-white">
                            {video.duration}
                          </span>
                        </div>
                        <div className="max-w-[200px] truncate font-medium text-white">
                          {video.title}
                          <span className="block text-[10px] text-[#98989D]">{video.date}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono">{video.views.toLocaleString('tr-TR')}</td>
                      <td className="py-3 px-3 font-mono text-[#00E5FF]">%{video.ctr}</td>
                      <td className="py-3 px-3 font-mono text-[#98989D]">{video.retention}</td>
                      <td className="py-3 px-3 font-mono text-[#32D74B]">{formatRev(video.revenueTRY)}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            video.status === 'attention'
                              ? 'bg-[#FF453A]/20 text-[#FF453A] border border-[#FF453A]/30'
                              : 'bg-[#32D74B]/20 text-[#32D74B] border border-[#32D74B]/30'
                          }`}
                        >
                          {video.statusText}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Hook Studio (4 Cols) */}
          <div className="lg:col-span-4 bg-[#1E1E1E]/95 backdrop-blur-sm border border-[#2C2C2E] rounded-card p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#00E5FF]/40 flex items-center justify-center overflow-hidden relative">
                  <DotLottieReact
                    src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                    loop
                    autoplay
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  <h2 className="text-base font-semibold flex items-center gap-1.5">
                    Co-Pilot AI Laboratuvarı
                  </h2>
                  <span className="text-[10px] text-[#98989D]">Başlık & Kanca Optimizasyonu</span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40">
                AI AKTİF
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-[#98989D] uppercase">Test Edilecek Başlık</label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full bg-[#141414] border border-[#2C2C2E] rounded-lg px-3 py-2 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
              />
              <button
                onClick={handleTestTitle}
                disabled={isTesting}
                className="w-full mt-1 py-2 rounded-lg bg-[#00E5FF] text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#33ebff] transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {isTesting ? 'Analiz Ediliyor...' : '🚀 Başlığı Co-Pilot ile Test Et'}
              </button>
            </div>

            {titleResult && (
              <div className="bg-[#141414] border border-[#2C2C2E] rounded-lg p-3 flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#98989D]">Viral Potansiyel:</span>
                  <span className="font-mono font-bold text-[#32D74B] text-sm">⚡ {titleResult.score}/100</span>
                </div>
                <div className="text-[11px] text-[#98989D] border-t border-[#2C2C2E] pt-2">
                  <span className="text-[#00E5FF] font-semibold block mb-1">Önerilen Alternatifler:</span>
                  {titleResult.suggestions.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => setTitleInput(s.split(' (+')[0])}
                      className="p-1.5 rounded bg-[#1E1E1E] hover:bg-[#252525] border border-[#2C2C2E] text-white my-1 cursor-pointer transition-colors"
                    >
                      {idx + 1}. {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-[#2C2C2E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#98989D] gap-4">
          <div>&copy; 2026 YouPilot Studio. Tüm hakları saklıdır.</div>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-white transition-colors">Ana Sayfa</a>
            <a href="/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="/tos" className="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Google İzinlerini Yönet
            </a>
          </div>
        </footer>

      </div>

      {/* Video Diagnosis Modal */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#2C2C2E] rounded-card p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2C2C2E] pb-3">
              <h3 className="font-bold text-white text-base">Video Kitle Tutma Teşhisi</h3>
              <button onClick={() => setSelectedVideoModal(null)} className="text-[#98989D] hover:text-white text-xl">
                &times;
              </button>
            </div>

            <p className="font-medium text-sm text-white">{selectedVideoModal.title}</p>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-[#141414] p-2.5 rounded border border-[#2C2C2E]">
                <span className="text-[#98989D] block">Toplam İzlenme</span>
                <span className="font-mono font-bold text-sm">{selectedVideoModal.views.toLocaleString('tr-TR')}</span>
              </div>
              <div className="bg-[#141414] p-2.5 rounded border border-[#2C2C2E]">
                <span className="text-[#98989D] block">CTR Oranı</span>
                <span className="font-mono font-bold text-sm text-[#00E5FF]">%{selectedVideoModal.ctr}</span>
              </div>
              <div className="bg-[#141414] p-2.5 rounded border border-[#2C2C2E]">
                <span className="text-[#98989D] block">Tahmini Gelir</span>
                <span className="font-mono font-bold text-sm text-[#32D74B]">{formatRev(selectedVideoModal.revenueTRY)}</span>
              </div>
            </div>

            {selectedVideoModal.status === 'attention' ? (
              <div className="bg-[#3A1C1C] border-l-4 border-[#FF453A] p-3 rounded text-xs text-[#ff9490]">
                <strong>⚠️ Vampir Düşüşü: {selectedVideoModal.dropTimestamp}</strong>
                <p className="mt-1">Bu dakikada izleyicilerin %38'i ayrılıyor. Kurguyu gözden geçirin.</p>
              </div>
            ) : (
              <div className="bg-[#32D74B]/10 border-l-4 border-[#32D74B] p-3 rounded text-xs text-[#c7f9d1]">
                <strong>⚡ Yüksek Kitle Tutulması</strong>
                <p className="mt-1">Bu içerik algoritma tarafından önerilenler havuzunda yükseliyor.</p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-[#2C2C2E]">
              <button
                onClick={() => setSelectedVideoModal(null)}
                className="px-4 py-2 rounded-lg border border-[#2C2C2E] text-xs font-semibold hover:bg-[#252525]"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
