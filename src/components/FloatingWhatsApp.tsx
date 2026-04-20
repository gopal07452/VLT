import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingWhatsApp() {
  const openWhatsApp = () => {
    const url = "https://wa.me/9160966665";
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={openWhatsApp}
      className="fixed bottom-24 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center group"
    >
      <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
      <div className="absolute right-full mr-3 bg-white text-gray-900 border border-gray-100 py-1 px-3 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-3 group-hover:translate-x-0 pointer-events-none shadow-xl">
        Order on WhatsApp
      </div>
    </motion.button>
  );
}
