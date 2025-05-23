import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trophy, Calendar, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

// Background pattern component
const FootballPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <svg width="60" height="60" viewBox="0 0 60 60" className="fill-current text-red-500">
        <pattern id="football-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="3" fill="currentColor"/>
          <polygon points="30,15 35,25 25,25" fill="currentColor"/>
          <polygon points="30,45 25,35 35,35" fill="currentColor"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#football-pattern)"/>
      </svg>
    </div>
  );
};

// Animated card component
interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    titleKey: string;
    defaultTitle: string;
    descriptionKey: string;
    defaultDescription: string;
    gradient: { from: string; to: string };
    accentColor: string;
    stats: string[];
  };
  index: number;
  isHovered: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
}

const FeatureCard = ({ feature, index, isHovered, onHover, onLeave }: FeatureCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Card background with gradient */}
      <motion.div
        className="relative h-full p-8 rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${feature.gradient.from}, ${feature.gradient.to})`
            : 'rgba(255, 255, 255, 0.05)'
        }}
        whileHover={{ y: -10 }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
          style={{ background: feature.accentColor }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? [0, 180, 360] : 0
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Icon container with floating effect */}
        <motion.div
          className="relative z-10 mb-6"
          animate={{
            y: isHovered ? [-5, 5, -5] : 0,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${feature.gradient.from}, ${feature.gradient.to})`,
              boxShadow: `0 10px 30px ${feature.accentColor}40`
            }}
          >
            <feature.icon className="w-8 h-8 text-white" />
          </div>

          {/* Floating particles around icon */}
          {isHovered && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: feature.accentColor }}
              initial={{
                x: 32, y: 32, scale: 0, opacity: 0
              }}
              animate={{
                x: 32 + Math.cos(i * 60 * Math.PI / 180) * 40,
                y: 32 + Math.sin(i * 60 * Math.PI / 180) * 40,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            className="text-2xl font-bold text-white mb-4"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {t(feature.titleKey, feature.defaultTitle)}
          </motion.h3>

          <motion.p
            className="text-gray-200 leading-relaxed mb-6"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {t(feature.descriptionKey, feature.defaultDescription)}
          </motion.p>

          {/* Feature stats/highlights */}
          <motion.div
            className="flex items-center space-x-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {feature.stats.map((stat, statIndex) => (
              <div key={statIndex} className="flex items-center space-x-1 text-gray-300">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: feature.accentColor }}
                />
                <span>{stat}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
          style={{
            boxShadow: `0 0 50px ${feature.accentColor}30, inset 0 0 50px ${feature.accentColor}10`
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export function FeaturesSection() {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Trophy,
      titleKey: 'landing.feature1Title',
      defaultTitle: 'Palmarès & Trophées',
      descriptionKey: 'landing.feature1Description',
      defaultDescription: 'Découvrez l\'histoire glorieuse d\'Espérance avec ses 30+ championnats nationaux, ses titres continentaux et ses moments légendaires.',
      gradient: { from: '#dc2626', to: '#fbbf24' },
      accentColor: '#fbbf24',
      stats: ['30+ Titres', 'CAF Champions', 'Légende']
    },
    {
      icon: Users,
      titleKey: 'landing.feature2Title',
      defaultTitle: 'Équipe & Joueurs',
      descriptionKey: 'landing.feature2Description',
      defaultDescription: 'Suivez nos stars, découvrez les statistiques détaillées, les transferts et les performances de chaque joueur taraji.',
      gradient: { from: '#dc2626', to: '#7c2d12' },
      accentColor: '#dc2626',
      stats: ['25 Joueurs', 'Stats Live', 'Transferts']
    },
    {
      icon: Calendar,
      titleKey: 'landing.feature3Title',
      defaultTitle: 'Calendrier & Matchs',
      descriptionKey: 'landing.feature3Description',
      defaultDescription: 'Ne ratez aucun match ! Calendrier complet, résultats en temps réel, et toutes les informations sur les rencontres.',
      gradient: { from: '#fbbf24', to: '#f59e0b' },
      accentColor: '#f59e0b',
      stats: ['30 Matchs/Saison', 'Résultats Live', 'Notifications']
    }/*,

    {
      icon: BarChart3,
      titleKey: 'landing.feature4Title',
      defaultTitle: 'Statistiques Avancées',
      descriptionKey: 'landing.feature4Description',
      defaultDescription: 'Analyses détaillées, statistiques de performance, classements et comparaisons pour une vision complète du club.',
      gradient: { from: '#7c2d12', to: '#dc2626' },
      accentColor: '#dc2626',
      stats: ['Analytics', 'Classements', 'Tendances']
    },
    {
      icon: Heart,
      titleKey: 'landing.feature5Title',
      defaultTitle: 'Communauté Taraji',
      descriptionKey: 'landing.feature5Description',
      defaultDescription: 'Rejoignez la famille taraji ! Forums, actualités exclusives, et connectez-vous avec des millions de supporters.',
      gradient: { from: '#fbbf24', to: '#dc2626' },
      accentColor: '#fbbf24',
      stats: ['1M+ Fans', 'Forums', 'Actualités']
    },
    {
      icon: Star,
      titleKey: 'landing.feature6Title',
      defaultTitle: 'Expérience Premium',
      descriptionKey: 'landing.feature6Description',
      defaultDescription: 'Accès VIP aux contenus exclusifs, interviews privées, et expériences uniques réservées aux vrais supporters.',
      gradient: { from: '#dc2626', to: '#fbbf24' },
      accentColor: '#fbbf24',
      stats: ['Exclusif', 'VIP Access', 'Premium']
    }*/
  ];

  return (
    <section
      className="relative py-section bg-gradient-features overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Background elements */}
      <FootballPattern />

      {/* Animated background shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? 'var(--animation-color-primary)' : 'var(--animation-color-secondary)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Excellence Sportive</span>
          </motion.div>

          <h2
            id="features-heading"
            className="text-4xl md:text-6xl font-black tracking-tight text-center mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400">
              {t('landing.features', 'Univers Taraji')}
            </span>
          </h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Plongez dans l'univers complet d'Espérance Sportive de Tunis avec des fonctionnalités
            exclusives conçues pour les vrais supporters taraji.
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isHovered={hoveredCard === index}
              onHover={setHoveredCard}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full px-8 py-4 text-white font-bold text-lg shadow-2xl"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Trophy className="w-6 h-6" />
            <span>Rejoindre la Famille Taraji</span>
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}