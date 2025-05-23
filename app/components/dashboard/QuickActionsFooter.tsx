import React from 'react';
import { Heart, Map, Camera, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function QuickActionsFooter() {
  const { t } = useTranslation();

  return (
    <div className="mt-24">
      <div className="relative">
        {/* Multi-layer Background Effects */}
        <div className="absolute inset-0 footer-bg-primary rounded-4xl blur-2xl animate-pulse" />
        <div className="absolute inset-0 footer-bg-secondary rounded-4xl blur-3xl" />

        {/* Main Footer Container with Enhanced Glassmorphism */}
        <div className="relative bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-3xl rounded-4xl p-16 border border-white/30 shadow-2xl overflow-hidden">
          {/* Floating Particles Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 footer-particle rounded-full animate-float blur-sm"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${5 + i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Enhanced Header Section */}
          <div className="relative z-10 text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute -inset-4 footer-heart-glow rounded-full blur-xl animate-pulse" />
                <div className="relative footer-heart-bg p-4 rounded-2xl backdrop-blur-sm border footer-heart-border">
                  <Heart className="w-10 h-10 footer-heart-icon animate-pulse" />
                </div>
              </div>
              <div className="text-left">
                <h3 className="footer-title text-5xl md:text-6xl font-black leading-tight">
                  Ready for the Adventure?
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 footer-action-dot rounded-full animate-pulse" />
                  <span className="footer-action-text text-sm font-semibold uppercase tracking-wider">Take Action Now</span>
                </div>
              </div>
            </div>

            <p className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Explore destinations, get travel tips, and stay updated with the latest match schedules
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mt-4 leading-relaxed">
              Your journey to the FIFA Club World Cup 2025™ starts with these essential tools
            </p>
          </div>

          {/* Enhanced Action Buttons Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Explore Destinations Button - Enhanced */}
            <div className="group relative">
              <div className="absolute -inset-2 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500 animate-pulse button-glow-gold" />
              <div className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 button-glow-gold-inner" />

              <button className="action-button-gold relative w-full text-black px-10 py-8 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl group overflow-hidden">
                {/* Button Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-black/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative bg-black/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300">
                      <Map className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-black tracking-wide text-2xl block mb-2">Explore Destinations</span>
                    <span className="text-base opacity-90 font-semibold">Discover amazing places</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Travel Tips Button - Enhanced */}
            <div className="group relative">
              <div className="absolute -inset-2 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500 animate-pulse button-glow-red" style={{ animationDelay: '0.3s' }} />
              <div className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 button-glow-red-inner" />

              <button className="action-button-red relative w-full text-black px-10 py-8 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl group overflow-hidden">
                {/* Button Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-black/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative bg-black/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300">
                      <Camera className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-black tracking-wide text-2xl block mb-2">Travel Tips</span>
                    <span className="text-base opacity-90 font-semibold">Expert advice & insider guides</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Match Schedule Button - Enhanced */}
            <div className="group relative">
              <div className="absolute -inset-2 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500 animate-pulse button-glow-gold" style={{ animationDelay: '0.6s' }} />
              <div className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 button-glow-gold-inner" />

              <button className="action-button-gold relative w-full text-black px-10 py-8 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl group overflow-hidden">
                {/* Button Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-black/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative bg-black/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300">
                      <Sparkles className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-black tracking-wide text-2xl block mb-2">Match Schedule</span>
                    <span className="text-base opacity-90 font-semibold">Latest fixtures & updates</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Footer Bottom Section */}
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-1 footer-line-left rounded-full shadow-lg" />
              <div className="w-8 h-8 bg-gradient-to-r from-[#FFD700] to-[#DC2626] rounded-full flex items-center justify-center shadow-xl">
                <Sparkles className="w-4 h-4 text-black animate-pulse" />
              </div>
              <div className="w-16 h-1 footer-line-right rounded-full shadow-lg" />
            </div>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              <span className="footer-premium-text font-semibold">Premium Experience</span> • 
              <span className="footer-sparkles"> ✨ </span>
              Official FIFA Club World Cup 2025™ Journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
