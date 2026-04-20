import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { Category } from '../types';

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

export default function CategoryItem({ category, isActive, onClick }: CategoryItemProps) {
  // @ts-ignore
  const IconComponent = Icons[category.icon as keyof typeof Icons];

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 min-w-[72px]"
    >
      <div 
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
          isActive 
            ? 'bg-vlt-primary text-white shadow-vlt-primary/40 -translate-y-1' 
            : `${category.color} hover:bg-opacity-80`
        }`}
      >
        {IconComponent && <IconComponent size={24} />}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wide truncate w-full text-center ${
        isActive ? 'text-vlt-primary' : 'text-gray-500'
      }`}>
        {category.name}
      </span>
    </motion.button>
  );
}
