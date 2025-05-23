import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Star,
  Trophy,
  Zap,
  ArrowRight,
  Flame
} from "lucide-react";

// Animated stadium crowd effect
const StadiumCrowd = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
      <motion.div
        className="flex items-end h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-red-900/80 to-yellow-600/60 min-h-[20px]"
            style={{
              height: `${Math.random() * 60 + 20}px`,
              transformOrigin: 'bottom'
            }}
            animate={{
              scaleY: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Floating chant bubbles
const ChantBubbles = () => {
  const chants = ["TARAJI!", "ALLEZ!", "EST!", "ROUGE ET OR!", "CHAMPION!"];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {chants.map((chant, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20 font-bold text-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            y: -100,
            scale: [0, 1, 0],
            rotate: Math.random() * 360 + 180,
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
        >
          {chant}
        </motion.div>
      ))}
    </div>
  );
};

// Pulsing energy rings
const EnergyRings = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-yellow-400/30"
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 2, 3],
            opacity: [1, 0.5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
          style={{
            width: '200px',
            height: '200px'
          }}
        />
      ))}
    </div>
  );
};

// Statistics counter animation
interface StatCounterProps {
  end: number;
  label: string;
  duration?: number;
}

const StatCounter = ({ end, label, duration = 2 }: StatCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
        {count.toLocaleString()}+
      </div>
      <div className="text-gray-300 text-sm mt-1 font-medium">{label}</div>
    </motion.div>
  );
};

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative py-section bg-gradient-cta overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Animated background elements */}
      <ChantBubbles />
      <EnergyRings />
      <StadiumCrowd />

      {/* Dynamic gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 30% 20%, rgba(220, 38, 38, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 80%, rgba(251, 191, 36, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 20%, rgba(220, 38, 38, 0.4) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floodlight effects */}
      <div className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-yellow-400/50 to-transparent transform -skew-x-12" />
      <div className="absolute top-0 right-1/4 w-1 h-32 bg-gradient-to-b from-red-400/50 to-transparent transform skew-x-12" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">

          {/* Pre-header with flame icon */}
          <motion.div
            className="flex items-center justify-center space-x-3 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <span className="text-yellow-400 font-bold text-lg tracking-wider uppercase">
              La Passion Taraji
            </span>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-8 h-8 text-red-500" />
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            id="cta-heading"
            className="text-4xl md:text-7xl font-black tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400">
              {t('landing.ctaTitle', 'Rejoins la Légende')}
            </span>
            <motion.span
              className="block text-3xl md:text-5xl text-white/90 font-light mt-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Taraji Forever
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('landing.ctaDescription', 'Rejoins des millions de supporters qui vivent la passion rouge et or. Accède à du contenu exclusif, connecte-toi avec la communauté taraji et ne rate jamais un moment de gloire.')}
          </motion.p>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
           {/*  <StatCounter end={1000000} label="Supporters" />*/}
            <StatCounter end={30} label="Championnats" />
            <StatCounter end={104} label="Années" />
            <StatCounter end={500} label="Victoires" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Primary CTA */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className={cn(
                "relative px-12 py-6 text-xl font-bold transition-all duration-500 overflow-hidden border-0",
                "bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white",
                "hover:from-red-500 hover:via-yellow-500 hover:to-red-500",
                "shadow-2xl hover:shadow-red-500/30 rounded-full"
              )}>
                <Link to="/itinerary">
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Heart className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">
                    {t('landing.joinCommunity', 'Rejoindre la Famille')}
                  </span>
                  <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-yellow-400/50 -m-2"
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

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg" className={cn(
                "px-12 py-6 text-xl font-semibold transition-all duration-300",
                "bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-full",
                "hover:bg-white/20 hover:border-white/50 hover:text-white",
                "shadow-xl hover:shadow-white/20"
              )}>
                <Link to="/dashboard">
                  <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
                  {t('landing.viewStats', 'Voir les Stats')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Bottom social proof */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-yellow-400" />
              <span>Communauté Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Contenu Exclusif</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Actualités en Temps Réel</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-16 fill-current text-red-600/20"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,120 C200,80 400,40 600,60 C800,80 1000,40 1200,80 L1200,120 Z"
            animate={{
              d: [
                "M0,120 C200,80 400,40 600,60 C800,80 1000,40 1200,80 L1200,120 Z",
                "M0,120 C200,100 400,60 600,80 C800,60 1000,60 1200,100 L1200,120 Z",
                "M0,120 C200,80 400,40 600,60 C800,80 1000,40 1200,80 L1200,120 Z"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}