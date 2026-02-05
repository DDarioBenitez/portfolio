import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import AnimatedCounter from '../Animated/AnimatedText';
import PremiumButton from '../Animated/PremiumButton';

interface FooterProps {
  isDarkMode: boolean;
}

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/DDarioBenitez',
    icon: <SiGithub size={18} className="text-white" />,
    gradient: 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800'
  },
  {
    name: 'LinkedIn', 
    url: 'https://linkedin.com/in/darío-damián-benítez',
    icon: <SiLinkedin size={18} className="text-white" />,
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
  },
  {
    name: 'Email',
    url: 'mailto:benitez_trabaja@hotmail.com',
    icon: <Mail size={18} className="text-white" />,
    gradient: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/5493704009882',
    icon: <FaWhatsapp className="text-white" />,
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
  }
];

const AnimatedFooter: React.FC<FooterProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <footer className={`
      ${isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'}
      backdrop-filter backdrop-blur-lg border-t
      ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}
      px-[6%] py-12 relative z-10
    `}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Estadísticas animadas */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <motion.h3 
              className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedCounter value={3} suffix="+" />
            </motion.h3>
            <p className="text-slate-600 dark:text-slate-400">Proyectos Completados</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center"
          >
            <motion.h3 
              className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedCounter value={5} suffix="+" />
            </motion.h3>
            <p className="text-slate-600 dark:text-slate-400">Años de Experiencia</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <motion.h3 
              className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatedCounter value={12} suffix="+" />
            </motion.h3>
            <p className="text-slate-600 dark:text-slate-400">Tecnologías Dominadas</p>
          </motion.div>
        </motion.div>

        {/* Redes sociales con hover effects */}
        <motion.div 
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.15,
                rotate: [0, -10, 10, 0]
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: index * 0.1
              }}
              className={`
                p-3 rounded-full text-white shadow-lg hover:shadow-xl
                ${link.gradient}
              `}
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Sección de newsletter */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            ¿Interesado en colaborar?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Si tienes un proyecto en mente o simplemente quieres saludar, no dudes en contactarme.
          </p>
          <PremiumButton variant="primary" onClick={() => window.location.href = '#contact'}>
            Contactarme
          </PremiumButton>
        </motion.div>

        {/* Navegación rápida */}
        <motion.nav 
          className="flex flex-wrap justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {['Inicio', 'Sobre mí', 'Proyectos', 'Contacto'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-slate-600 dark:text-slate-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-text transition-all duration-300 text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>

        {/* Copyright */}
        <motion.div 
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} Dario Benitez. {t("footer.rights")}
          </p>
          <div className="flex flex-col items-center gap-2 text-xs md:flex-row md:gap-4">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
              {t("footer.stack")}
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text font-medium">
                React, Vite, TypeScript
              </span>
              &
              <span className="text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text font-medium">Tailwind CSS</span>
            </span>
            <span className="hidden md:inline text-slate-600 dark:text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400">Argentina</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default AnimatedFooter;