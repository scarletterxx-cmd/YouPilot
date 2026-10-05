"use client";
import React from "react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Zap, Play, ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";

const DemoVariant1: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#121212] text-white flex flex-col items-center justify-between font-sans selection:bg-[#00E5FF] selection:text-black">
      {/* Dynamic Animated Gradient Background configured with YouPilot brand */}
      <AnimatedGradientBackground
        Breathing={true}
        startingGap={120}
        animationSpeed={0.018}
        gradientColors={[
          "#121212", // Primary dark background
          "#00E5FF", // Neon Cyan primary accent
          "#32D74B", // Lime Green live accent
          "#1E1E1E", // Card surface
          "#121212"  // Outer dark blend
        ]}
        gradientStops={[30, 50, 70, 85, 100]}
      />

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E1E1E] to-[#121212] border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight flex items-center gap-2">
              YOUPILOT
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[rgba(0,229,255,0.15)] text-[#00E5FF] border border-[#00E5FF]/40">
                AI CORE v2.4
              </span>
            </div>
            <p className="text-xs text-[#98989D]">YouTube Creator Intelligence Kokpiti</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#32D74B]/10 border border-[#32D74B]/30 text-[#32D74B] text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#32D74B] animate-pulse shadow-[0_0_8px_#32D74B]"></span>
            CANLI SİNYAL AKTİF
          </div>
          <a
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-[#00E5FF] text-black font-bold text-xs uppercase tracking-wide flex items-center gap-2 hover:bg-[#33ebff] transition-all shadow-[0_0_15px_rgba(0,229,255,0.35)] hover:scale-105 active:scale-95"
          >
            Dashboard
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto my-auto py-12">
        {/* Lottie Animation Container with YouTube/Analytics theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="w-48 h-48 md:w-56 md:h-56 relative flex items-center justify-center mb-4"
        >
          <div className="absolute inset-0 bg-[#00E5FF]/10 rounded-full blur-2xl"></div>
          <DotLottieReact
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            loop
            autoplay
            className="w-full h-full relative z-10"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
        >
          YouTube Kanalınızı <br />
          <span className="text-[#00E5FF] drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">
            Algoritmik Zeka
          </span>{" "}
          ile Büyütün
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-base md:text-lg text-[#98989D] max-w-2xl leading-relaxed"
        >
          Vampir düşüşlerini (kitle kaybı) saniyesinde yakalayın, gerçek zamanlı izlenme hızınızı pürüzsüz alan grafikleriyle takip edin ve yapay zeka ile tıklanma rekorları kıran başlıklar üretin.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-[#00E5FF] text-black font-bold text-sm flex items-center gap-2 hover:bg-[#33ebff] transition-all shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:-translate-y-0.5"
          >
            <TrendingUp className="w-4 h-4" />
            Canlı Dashboard'u Aç
          </a>
          <a
            href="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-[#1E1E1E] text-white font-semibold text-sm border border-[#2C2C2E] flex items-center gap-2 hover:bg-[#252525] hover:border-[#404044] transition-all hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-[#FF0000] text-[#FF0000]" />
            YouTube Hesabını Bağla
          </a>
        </motion.div>

        {/* Technical Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#98989D]"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#32D74B]" />
            <span>Google OAuth 2.0 Doğrulanmış</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00E5FF]" />
            <span>YouTube Data API v3 Entegre</span>
          </div>
          <span>•</span>
          <span>Sıfır Üçüncü Taraf Veri Paylaşımı</span>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-[#2C2C2E]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#98989D]">
        <div>&copy; 2026 YouPilot Studio. Tüm hakları saklıdır.</div>
        <div className="flex items-center gap-6">
          <a href="/" className="hover:text-white transition-colors">Ana Sayfa</a>
          <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <a href="/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</a>
          <a href="/tos" className="hover:text-white transition-colors">Kullanım Şartları</a>
        </div>
      </footer>
    </div>
  );
};

export default DemoVariant1;
export { DemoVariant1 };
