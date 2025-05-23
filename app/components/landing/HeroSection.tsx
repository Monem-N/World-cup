import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { SparklesIcon, ChartBarIcon, TrophyIcon, PlayIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const TRANSLATION_KEYS = {
  ALT_TEXT: 'landing.heroAltText',
  TITLE: 'landing.heroTitle',
  SUBTITLE: 'landing.heroSubtitle',
  GET_STARTED: 'landing.getStarted',
  VIEW_DASHBOARD: 'landing.viewDashboard'
};

// Floating particles animation
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -20, 20],
            x: [null, Math.random() * 100 - 50],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Stadium atmosphere effect
const StadiumLights = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(255, 215, 0, 0.8)' : 'rgba(220, 20, 60, 0.8)'
            } 0%, transparent 70%)`,
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 20}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      role="img"
      aria-label={t(TRANSLATION_KEYS.ALT_TEXT, 'Stadium filled with cheering fans')}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-900 via-black to-yellow-800"
    >
      {/* Animated background elements */}
      <StadiumLights />
      <FloatingParticles />
      
      {/* Dynamic mesh gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4) 0%, transparent 70%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4) 0%, transparent 70%)`,
            `radial-gradient(circle at 80% 30%, rgba(220, 20, 60, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 20% 70%, rgba(255, 215, 0, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 60% 40%, rgba(0, 0, 0, 0.3) 0%, transparent 70%)`,
            `radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4) 0%, transparent 70%)`
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Stadium crowd silhouette */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"
        style={{
          clipPath: 'polygon(0 100%, 5% 80%, 15% 85%, 25% 75%, 35% 90%, 45% 70%, 55% 85%, 65% 75%, 75% 90%, 85% 80%, 95% 85%, 100% 100%)'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Team Logo/Badge Animation */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.5)",
                    "0 0 40px rgba(220, 20, 60, 0.8)",
                    "0 0 20px rgba(255, 215, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrophyIcon className="w-12 h-12 text-white" />
              </motion.div>
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 border-4 border-yellow-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Main Title with Staggered Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-black tracking-tight mb-4"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-500 to-yellow-400 drop-shadow-2xl">
                ESPÉRANCE
              </span>
              <motion.span 
                className="block text-4xl md:text-6xl text-white/90 font-light mt-2"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Sportive de Tunis
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with typewriter effect */}
          <motion.p
            className="mt-8 text-xl md:text-3xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent font-bold">
              L'Excellence en Rouge et Or
            </span>
            <br />
            <span className="text-lg md:text-xl text-gray-300 mt-2 block">
              {t(TRANSLATION_KEYS.SUBTITLE, "Passion • Fierté • Victoire")}
            </span>
          </motion.p>

          {/* Enhanced Action Buttons */}
          <HeroActions />

          {/* Stats Banner */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { label: "Championnats", value: "30+" },
              { label: "Années de Gloire", value: "1919" },
              { label: "Supporters", value: "1M+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-300 font-medium mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-current text-white/5">
          <path d="M0,120 C200,80 400,40 600,60 C800,80 1000,40 1200,80 L1200,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}

function HeroActions() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      {/* Primary CTA with premium effect */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <Button asChild size="lg" className={cn(
          "relative px-10 py-5 text-lg font-bold transition-all duration-500 overflow-hidden",
          "bg-gradient-to-r from-red-600 to-yellow-500 text-white border-0",
          "hover:from-red-500 hover:to-yellow-400",
          "shadow-2xl hover:shadow-red-500/25",
          "rounded-full"
        )}>
          <Link to="/itinerary">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-400/20"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <PlayIcon className="w-5 h-5 mr-3 relative z-10" />
            <span className="relative z-10">{t(TRANSLATION_KEYS.GET_STARTED, "Découvrir l'Équipe")}</span>
          </Link>
        </Button>
        
        {/* Glowing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-yellow-400/50 -m-1"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Secondary CTA with glassmorphism */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button asChild variant="outline" size="lg" className={cn(
          "group relative px-10 py-5 text-lg font-semibold transition-all duration-300 overflow-hidden",
          "bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white",
          "hover:bg-white/20 hover:border-white/50 hover:text-white",
          "rounded-full shadow-xl",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
          "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
        )}>
          <Link to="/dashboard">
            <ChartBarIcon className="w-5 h-5 mr-3 relative z-10 text-yellow-400 group-hover:text-white transition-colors" />
            <span className="relative z-10">{t(TRANSLATION_KEYS.VIEW_DASHBOARD, "Statistiques")}</span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}