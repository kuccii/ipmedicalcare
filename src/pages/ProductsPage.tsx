import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Package, Star, ArrowRight, CheckCircle, Layers, TestTube, HeartPulse, Activity, Filter, ChevronDown, X } from 'lucide-react';

// Animation Variants remain the same
const fadeIn = (direction = 'up', type = 'tween', delay = 0, duration = 0.6) => ({
  hidden: { y: direction === 'up' ? 50 : 0, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type, delay, duration, ease: 'easeOut' } },
});
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// --- DATA (WITH VERIFIED, WORKING IMAGES) ---
const featuredProducts = [
    { id: 1, name: 'Littmann Classic III Stethoscope', brand: '3M Littmann', category: 'Diagnostics', image: 'https://cdn.shopify.com/s/files/1/0012/8440/7394/files/littmann-classic-iii-stethoscope-black-edition-5803-littmann-30886582714466.webp?v=1727168831&width=400', description: 'The industry standard for auscultation, offering high acoustic sensitivity for exceptional performance, plus a versatile two-sided chestpiece.', specs: ['Dual-sided Chestpiece', 'Tunable Diaphragm', '5-Year Warranty'] },
    { id: 3, name: 'High-Speed Lab Centrifuge', brand: 'Thermo Fisher', category: 'Laboratory', image: 'https://cdn4.volusion.store/vccfs-mvxtd/v/vspfiles/photos/TSo-MX1R-2.jpg?v-cache=1728547766', description: 'A robust and quiet centrifuge for high-throughput sample processing. Features advanced safety protocols and an intuitive interface.', specs: ['4000 RPM Max Speed', '24-Tube Capacity', 'Quiet Operation'] },
    { id: 4, name: 'Portable 12-Lead ECG Monitor', brand: 'Mindray', category: 'Monitoring', image: 'https://image.made-in-china.com/365f3j00KRavMFiglOcj/Mindray-Beneheart-R12-Best-Price-Electrocardiograph-12-Lead-Full-Screen-Display-of-12-Channel-Waveforms-Portable-ECG-Machine.webp', description: 'Compact and lightweight, this ECG machine provides comprehensive cardiac analysis on its high-resolution color touchscreen.', specs: ['12-Lead Analysis', '7" Color Display', 'Wireless Data Transfer'] },
];
const allProducts = [
    ...featuredProducts,
    { id: 2, name: 'Digital Pulse Oximeter', brand: 'Masimo', category: 'Monitoring', image: 'https://images.axios.com/FwULssiaIuGHUn7iHaF5QcpMVTM=/0x410:6123x3854/1920x1080/2024/02/01/1706819737544.jpg' },
    { id: 5, name: 'Automated Chemistry Analyzer', brand: 'Roche', category: 'Laboratory', image: 'https://www.human.de/01_CoreLab_DX/Clinical_Chemistry/HumaStar_Systems/HumaStar_300SR/Pictures/21944/image-thumb__21944__product-image-lightbox/16930_HumaStar_300SR_right_view.png' },
    { id: 6, name: 'Digital BP Monitor', brand: 'Omron', category: 'Diagnostics', image: 'https://5.imimg.com/data5/SELLER/Default/2023/3/HT/AA/EP/783049/wrist-blood-pressure-monitor-500x500.jpg' },
    { id: 7, name: 'Intensive Care Ventilator', brand: 'Dräger', category: 'ICU', image: 'https://utasco.com/wp-content/uploads/2022/02/icu-ventilator-uvent-t-s-product-image.png' },
    { id: 8, name: 'Surgical Instrument Set', brand: 'B. Braun', category: 'Surgical', image: 'https://clonallon.com/wp-content/uploads/2021/06/8087B-scaled.jpg' },
];
const categories = [
    { name: 'All Products', icon: Layers }, { name: 'Diagnostics', icon: HeartPulse }, { name: 'Monitoring', icon: Activity },
    { name: 'Laboratory', icon: TestTube }, { name: 'ICU', icon: Star }, { name: 'Surgical', icon: CheckCircle },
];
const brands = ['All Brands', '3M Littmann', 'Masimo', 'Thermo Fisher', 'Mindray', 'Roche', 'Omron', 'Dräger', 'B. Braun'];

// --- Reusable Components (Defined OUTSIDE the main component) ---
const PlusGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke=\'rgb(15 23 42 / 0.2)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")' }}></div>
);

// Unified Filter Panel Component - NOW DEFINED OUTSIDE
const FilterPanel = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedBrand, setSelectedBrand }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Search Products</label>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="e.g. Stethoscope..." className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm" />
            </div>
        </div>
        <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button key={category.name} onClick={() => setSelectedCategory(category.name)}
                        className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 flex items-center gap-2 ${selectedCategory === category.name ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-transparent hover:border-slate-300'}`}>
                        <category.icon className="h-4 w-4" />{category.name}
                    </button>
                ))}
            </div>
        </div>
        <div>
             <label className="block text-sm font-bold text-slate-800 mb-2">Filter by Brand</label>
             <div className="relative">
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none font-semibold">
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"/>
             </div>
        </div>
    </div>
);

// --- Main Page Component ---
const ProductsPage: React.FC = () => {
  const [activeFeatured, setActiveFeatured] = useState(featuredProducts[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedBrand]);

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" initial="hidden" animate="show" variants={staggerContainer(0.2)}>
          <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-blue-700 mb-4"><Package className="h-4 w-4" />Our Catalog</motion.div>
          <motion.h1 variants={fadeIn('down')} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">Certified Medical Equipment<span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">for Every Need</span></motion.h1>
          <motion.p variants={fadeIn('down')} className="mt-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">Explore our comprehensive range of professional medical equipment, trusted by healthcare facilities across East Africa.</motion.p>
        </motion.div>
      </section>

      {/* Featured Product Showcase */}
      <section className="py-20 lg:py-24 bg-white relative">
        <PlusGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeIn('down')} className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-blue-800 to-teal-800 bg-clip-text text-transparent mb-4">Flagship Products Showcase</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">An interactive look at our most trusted and high-performance equipment.</p>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-8 items-center">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn('right')} className="lg:col-span-2 relative h-[500px] w-full bg-slate-100 rounded-2xl shadow-2xl border border-slate-200/80 p-4">
                    <AnimatePresence mode="wait"><motion.img key={activeFeatured.id} src={activeFeatured.image} alt={activeFeatured.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="w-full h-full object-contain rounded-xl"/></AnimatePresence>
                </motion.div>
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer(0.1)} className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                    {featuredProducts.map(p => (
                        <motion.div key={p.id} variants={fadeIn('left')} onClick={() => setActiveFeatured(p)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer flex-shrink-0 lg:flex-shrink-auto flex items-center gap-4 ${activeFeatured.id === p.id ? 'bg-white border-blue-500 shadow-lg' : 'bg-white border-transparent hover:border-slate-300'}`}>
                            <img src={p.image} alt={p.name} className="w-16 h-16 object-contain rounded-lg p-1 bg-slate-100"/>
                            <div><h4 className="font-bold text-slate-800 leading-tight">{p.name}</h4><p className="text-xs text-slate-500">{p.brand}</p></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
             <div className="mt-8 lg:max-w-[calc(66.66%-1rem)]">
                <AnimatePresence mode="wait">
                    <motion.div key={activeFeatured.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">{activeFeatured.name}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">{activeFeatured.description}</p>
                        <div className="flex flex-wrap gap-4">
                            {activeFeatured.specs.map(spec => (<div key={spec} className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full"><CheckCircle className="h-4 w-4 text-emerald-500"/>{spec}</div>))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </section>
      
      {/* Main Catalog Section */}
      <section id="catalog" className="py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* --- Mobile Filter Button --- */}
            <div className="lg:hidden mb-8">
                <button onClick={() => setShowFilters(true)} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-xl shadow-md font-bold text-slate-800 border border-slate-200">
                    <Filter className="h-5 w-5 text-blue-600"/> Show Filters
                </button>
            </div>

            {/* --- Desktop Control Deck --- */}
            <div className="hidden lg:block sticky top-[72px] z-30 mb-12">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/80 p-6">
                    <FilterPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                </div>
            </div>

            <p className="text-center text-slate-500 mb-10 lg:-mt-6">Showing {filteredProducts.length} results.</p>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence>
                    {filteredProducts.map(product => (
                        <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200/80 flex flex-col">
                            <div className="relative overflow-hidden h-56 flex items-center justify-center bg-white p-4">
                                <img src={product.image} alt={product.name} className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                    <button className="bg-white text-slate-800 font-bold py-3 px-6 rounded-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">Request a Quote</button>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">{product.brand}</p>
                                <h3 className="font-bold text-lg text-slate-900 flex-grow">{product.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            
            {filteredProducts.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
                    <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3><p className="text-slate-500">Try adjusting your filter criteria.</p>
                </motion.div>
            )}
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
          {showFilters && (
              <>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden"/>
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                      className="fixed bottom-0 left-0 right-0 bg-slate-50 p-6 rounded-t-3xl shadow-2xl z-50 lg:hidden">
                      <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Filter Products</h3><button onClick={() => setShowFilters(false)}><X/></button></div>
                      <FilterPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                  </motion.div>
              </>
          )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-white relative">
        <PlusGrid />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn('up')}
                className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 text-white rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div><div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Need a Custom Quote or Consultation?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Our specialists are ready to help you find the perfect equipment solutions for your specific needs and budget.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="group flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"><span>Get a Free Quote</span><ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                        <Link to="/contact" className="group flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105">Schedule Consultation</Link>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;