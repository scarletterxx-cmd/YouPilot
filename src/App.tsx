import React, { useState } from 'react';
import DemoVariant1 from '@/components/ui/demo';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  Play,
  Users,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'hero' | 'dashboard'>('hero');
  const [currency, setCurrency] = useState<'TRY' | 'USD' | 'BOB'>('TRY');

  const currencySymbols = {
    TRY: '₺',
    USD: '$',
    BOB: 'Bs.'
  };

  const currencyRates = {
    TRY: 1,
    USD: 0.031,
    BOB: 0.213
  };

  const formatRev = (tryAmount: number) => {
    const converted = tryAmount * currencyRates[currency];
    return `${currencySymbols[currency]} ${converted.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (activeTab === 'hero') {
    return <DemoVariant1 />;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 max-w-7xl mx-auto flex flex-col gap-6 font-sans">
      {/* Top Navbar */}
      <header className="flex flex-col md:flex-row items-center justify-between bg-[#1E1E1E] border border-[#2C2C2E] rounded-card p-4 px-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-base flex items-center gap-2">
              YOUPILOT STUDIO
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40">
                REACT + TS
              </span>
            </div>
            <p className="text-xs text-[#98989D]">YouTube Creator Intelligence Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setActiveTab('hero')}
            className="px-3.5 py-1.5 rounded-lg border border-[#2C2C2E] hover:bg-[#252525] text-xs font-semibold text-[#98989D] hover:text-white transition-all"
          >
            ← Hero Tanıtım
          </button>

          <div className="flex bg-[#141414] border border-[#2C2C2E] rounded-lg p-1 gap-1">
            {(['TRY', 'USD', 'BOB'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  currency === curr
                    ? 'bg-[#1E1E1E] text-[#00E5FF] border border-[#2C2C2E]'
                    : 'text-[#98989D] hover:text-white'
                }`}
              >
                {curr}
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

      {/* KPI Cards Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E1E1E] border border-[#2C2C2E] rounded-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px] hover:border-[#00E5FF] transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#98989D] uppercase tracking-wider">Canlı Hız</span>
              <p className="text-[11px] text-[#98989D]">Son 60 Dakika İçi</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2C2C2E] flex items-center justify-center text-[#00E5FF]">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="font-mono text-3xl font-bold tracking-tight my-2">
            48,290 <span className="text-sm font-sans font-normal text-[#98989D]">izlenme/saat</span>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-[#32D74B]/10 text-[#32D74B] font-semibold">+14.8%</span>
            <span className="text-[#98989D]">Normalin üstünde</span>
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2C2C2E] rounded-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px] hover:border-[#32D74B] transition-all">
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
            142,850 <span className="text-sm font-sans font-normal text-[#98989D]">abone</span>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-[#32D74B]/10 text-[#32D74B] font-semibold">+340 bugün</span>
            <span className="text-[#98989D]">Dönüşüm: %3.4</span>
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2C2C2E] rounded-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px] hover:border-[#00E5FF] transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#98989D] uppercase tracking-wider">Tahmini Gelir</span>
              <p className="text-[11px] text-[#98989D]">Aktif Ay Kazancı</p>
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

      {/* Main Grid: Chart Preview + Vampire Alert */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#1E1E1E] border border-[#2C2C2E] rounded-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
                İzleyici Hızı ve Trafik Dinamiği
              </h2>
              <span className="text-xs text-[#98989D]">Yumuşatılmış Alan Eğrisi (Spline Area)</span>
            </div>
            <span className="text-xs font-mono text-[#00E5FF] px-2 py-1 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30">
              ● TEPE: 9,200 izlenme (20:00)
            </span>
          </div>

          <div className="h-64 rounded-xl bg-[#141414] border border-[#2C2C2E] flex items-center justify-center relative overflow-hidden">
            {/* Ambient Background Glow inside chart */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/15 via-[#32D74B]/5 to-transparent"></div>
            <p className="text-sm text-[#98989D] relative z-10 font-mono">
              [ Chart.js Spline Area & React Canvas Rendering ]
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#1E1E1E] border border-[#2C2C2E] rounded-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#FF453A] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Kritik Vampir Düşüşü
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FF453A]/20 text-[#FF453A]">
              1 AKTİF
            </span>
          </div>

          <div className="bg-[#3A1C1C] border-l-4 border-[#FF453A] p-4 rounded-r-lg text-xs leading-relaxed text-[#ff9490] flex flex-col gap-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span>01:42 Dk Düşüşü</span>
              <span className="font-mono text-[#FF453A]">%38 Terk</span>
            </div>
            <p>
              Son videonuzun 01:42 dakikasında izleyicilerin %38'i videodan ayrılıyor. Giriş kısmı çok uzun tutulmuş.
            </p>
            <div className="bg-black/40 border border-[#FF453A]/30 p-2.5 rounded text-white text-[11px] mt-1">
              <span className="text-[#00E5FF] font-bold block mb-0.5">💡 CO-PILOT AKSİYONU:</span>
              YouTube Studio üzerinden kurgusal kırpma yapın veya açıklama kısmına o saniyeye yönlendirici soru pini ekleyin.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-[#2C2C2E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#98989D] gap-4">
        <div>&copy; 2026 YouPilot Studio. Tüm hakları saklıdır.</div>
        <div className="flex items-center gap-6">
          <a href="/" className="hover:text-white transition-colors">Ana Sayfa</a>
          <a href="/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</a>
          <a href="/tos" className="hover:text-white transition-colors">Kullanım Şartları</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
