import { useState, useEffect, useMemo } from 'react';
import { Search, Bell, ShoppingCart, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BannerSlider from './components/BannerSlider';
import CategoryItem from './components/CategoryItem';
import ProductCard from './components/ProductCard';
import BottomNavbar from './components/BottomNavbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { CATEGORIES, BANNERS, PRODUCTS } from './constants';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading for shimmer effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Premium Gradient Header */}
      <header className="gradient-header pt-12 pb-24 px-6 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-vlt-secondary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          <div className="flex flex-col gap-1">
            <div className="bg-white px-4 py-2 rounded-2xl shadow-2xl shadow-black/10">
              <img 
                src="/logo.png" 
                alt="Sri Vijayalakshmi Traders" 
                className="h-16 md:h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback: Show styled text if image doesn't exist yet
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden flex-col items-center">
                 <h1 className="text-vlt-primary text-3xl font-display font-black tracking-tight leading-none">VLT</h1>
                 <div className="h-[2px] w-full bg-vlt-secondary my-1" />
                 <p className="text-vlt-primary text-[8px] font-bold uppercase tracking-wider">Sri Vijayalakshmi Traders</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="relative bg-white/10 backdrop-blur-md p-2.5 rounded-xl text-white hover:bg-white/20 transition-all border border-white/10">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-vlt-secondary rounded-full border-2 border-vlt-primary" />
            </button>
            <button className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl text-white hover:bg-white/20 transition-all border border-white/10">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Search & Floating Content */}
      <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400 group-focus-within:text-vlt-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search products, brands and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-white border-transparent focus:border-vlt-primary/20 rounded-2xl pl-12 pr-12 shadow-xl shadow-black/5 focus:ring-4 focus:ring-vlt-primary/5 transition-all text-sm font-medium outline-none"
          />
          <button className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-vlt-primary">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Banner Slider */}
        <div className="mt-8">
          <BannerSlider banners={BANNERS} />
        </div>

        {/* Categories Grid */}
        <section className="mt-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-display font-bold text-gray-900">Top Categories</h2>
            <button className="text-vlt-primary text-[10px] font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            <CategoryItem 
              category={{ id: 'all', name: 'All', icon: 'LayoutGrid', color: 'bg-gray-100 text-gray-600' }}
              isActive={selectedCategory === 'All'}
              onClick={() => setSelectedCategory('All')}
            />
            {CATEGORIES.map((cat) => (
              <CategoryItem 
                key={cat.id}
                category={cat}
                isActive={selectedCategory === cat.name}
                onClick={() => setSelectedCategory(cat.name)}
              />
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="mt-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-display font-bold text-gray-900">
              {searchQuery ? 'Search Results' : 'Featured Products'}
            </h2>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {filteredProducts.length} Items Found
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProductCard key={i} loading />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <PackageSearch size={40} />
                </div>
                <h3 className="text-gray-900 font-bold font-display">No products found</h3>
                <p className="text-gray-500 text-xs mt-1">Try adjusting your search or category filter</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-6 text-vlt-primary font-bold text-[10px] uppercase tracking-widest border border-vlt-primary/20 px-4 py-2 rounded-lg hover:bg-vlt-primary hover:text-white transition-all shadow-sm active:scale-95"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Floating Elements */}
      <FloatingWhatsApp />
      <BottomNavbar />
    </div>
  );
}
