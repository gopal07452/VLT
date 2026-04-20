import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product?: Product;
  loading?: boolean;
}

export default function ProductCard({ product, loading }: ProductCardProps) {
  if (loading || !product) {
    return (
      <div className="bg-white rounded-xl p-3 border border-gray-100 animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-lg mb-3 shimmer" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 shimmer" />
        <div className="h-3 bg-gray-100 rounded w-1/2 mb-4 shimmer" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-20 shimmer" />
          <div className="h-8 w-8 bg-gray-200 rounded-full shimmer" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl p-3 border border-transparent hover:border-vlt-primary/20 hover:shadow-xl transition-all duration-300 group relative"
    >
      {product.isNew && (
        <div className="absolute top-2 left-2 z-10 bg-vlt-accent text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          New
        </div>
      )}
      
      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gray-50 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      <p className="text-[10px] text-vlt-primary font-bold uppercase tracking-tight mb-1">{product.category}</p>
      <h3 className="text-gray-900 font-semibold text-sm line-clamp-1 mb-1 leading-tight">{product.name}</h3>
      
      <div className="flex items-center gap-1 mb-2">
        <Star size={12} className="fill-vlt-secondary text-vlt-secondary" />
        <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <div>
          <span className="text-vlt-primary font-display font-bold text-base">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-[10px] ml-1">₹{product.oldPrice}</span>
          )}
        </div>
        <button className="bg-vlt-primary text-white p-2 rounded-full hover:bg-vlt-primary/90 transition-colors shadow-sm shadow-vlt-primary/20 active:scale-90">
          <ShoppingCart size={16} />
        </button>
      </div>
    </motion.div>
  );
}
