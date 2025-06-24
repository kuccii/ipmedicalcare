import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, User, ArrowRight, Tag, Search, Feather, BookOpen, Microscope, HeartPulse, HardHat 
} from 'lucide-react';
import { Variants } from 'framer-motion';

// Re-using animation variants for consistency
const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', type: 'tween' | 'spring' = 'tween', delay = 0, duration = 0.6): Variants => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: 'easeOut' },
  },
});

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

const blogPosts = [
    {
        id: 1,
        title: 'How to Choose the Right Infrared Thermometer for Your Facility',
        excerpt: 'A comprehensive guide to selecting the most suitable infrared thermometer based on your specific needs, accuracy requirements, and budget considerations.',
        author: 'Dr. Sarah Johnson',
        date: '2024-01-15',
        category: 'Equipment Guide',
        image: 'https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg?auto=compress&cs=tinysrgb&w=800', // African nurse with thermometer
        alt: 'A nurse carefully using a modern infrared thermometer to check a patient\'s temperature.',
        readTime: '5 min read',
        tags: ['Temperature Monitoring', 'Diagnostic Equipment']
    },
    {
        id: 2,
        title: 'The Importance of Regular Medical Equipment Calibration',
        excerpt: 'Understanding why regular calibration is crucial for patient safety, regulatory compliance, and maintaining accurate diagnostics.',
        author: 'Mark Thompson',
        date: '2024-01-10',
        category: 'Maintenance',
        image: 'https://www.sgs.com/-/media/sgscorp/images/temporary/tablet-showing-heart-test-result.cdn.en-TZ.1.jpg', // African technician calibrating equipment
        alt: 'A technician calibrating a complex piece of medical equipment to ensure accuracy.',
        readTime: '7 min read',
        tags: ['Maintenance', 'Quality Assurance']
    },
    {
        id: 3,
        title: '2024 Trends in Laboratory Equipment Technology',
        excerpt: 'Explore the latest innovations in laboratory equipment, from automated analyzers to AI-powered diagnostic tools that are reshaping modern healthcare.',
        author: 'Dr. Michael Chen',
        date: '2024-01-05',
        category: 'Technology',
        image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800', // African scientist in lab
        alt: 'A scientist looking into a microscope in a brightly lit, modern laboratory.',
        readTime: '8 min read',
        tags: ['Lab Equipment', 'Innovation']
    },
    {
        id: 4,
        title: 'Cost-Effective Strategies for Hospital Equipment Procurement',
        excerpt: 'Practical tips for administrators to optimize equipment purchasing decisions while maintaining quality and staying within budget.',
        author: 'Lisa Rodriguez',
        date: '2023-12-28',
        category: 'Procurement',
        image: 'https://softpromedical.com/wp-content/uploads/2022/09/procurement-hospital-healthcare-softpro.png', // African doctor with patient
        alt: 'A hospital administrator discussing procurement options with a medical professional.',
        readTime: '6 min read',
        tags: ['Procurement', 'Budgeting']
    },
    {
        id: 5,
        title: 'Understanding CE Marking for Medical Devices',
        excerpt: 'A comprehensive overview of CE marking requirements, helping healthcare buyers make informed purchasing decisions.',
        author: 'Dr. Emily Watson',
        date: '2023-12-20',
        category: 'Compliance',
        image: 'https://dicentra.com/wp-content/uploads/2022/04/CE_Mark_Medical_Device_Blog_V1D1_ML-1024x576.jpg', // Stethoscope close-up
        alt: 'A close-up view of the CE marking on a piece of medical equipment.',
        readTime: '9 min read',
        tags: ['Compliance', 'Regulation']
    },
    {
        id: 6,
        title: 'Mobile Healthcare: Equipment for Remote Care',
        excerpt: 'Discover the essential equipment needed for mobile healthcare units and how to optimize portable solutions for rural areas.',
        author: 'David Park',
        date: '2023-12-15',
        category: 'Mobile Healthcare',
        image: 'https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=800', // African mobile healthcare team
        alt: 'A team of healthcare workers standing by a mobile clinic van in a rural setting.',
        readTime: '7 min read',
        tags: ['Mobile Health', 'Rural Medicine']
    },
];

const categories = ['All Posts', 'Equipment Guide', 'Technology', 'Maintenance', 'Procurement', 'Compliance', 'Mobile Healthcare'];
const topCategories = [
    { name: 'Equipment Guide', icon: BookOpen, color: 'text-blue-500' },
    { name: 'Technology', icon: Microscope, color: 'text-teal-500' },
    { name: 'Maintenance', icon: HardHat, color: 'text-emerald-500' },
    { name: 'Procurement', icon: HeartPulse, color: 'text-sky-500' },
];

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
  alt: string;
};

const BlogCard = ({ post }: { post: BlogPost }) => (
    <motion.div layout variants={fadeIn('up')}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 overflow-hidden">
      <Link to={`/blog/${post.id}`} className="block">
        <div className="relative overflow-hidden">
          <img src={post.image} alt={post.alt} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6 flex flex-col">
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold self-start mb-3">{post.category}</span>
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2 h-14">{post.title}</h3>
          <p className="text-slate-600 text-sm flex-grow line-clamp-3 mb-4 h-18">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <div className="flex items-center gap-1.5"><User className="h-3 w-3" />{post.author}</div>
            <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
          <div className="mt-auto pt-4 border-t border-slate-100">
            <span className="font-semibold text-blue-600 flex items-center gap-1 text-sm">Read More<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
          </div>
        </div>
      </Link>
    </motion.div>
);

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All Posts');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-slate-800 antialiased">
      <Helmet>
        <title>Medical Equipment Blog & Healthcare Insights | IP Medical Care Tanzania</title>
        <meta name="description" content="Read the IP Medical Care blog for expert insights, equipment guides, and the latest trends in healthcare technology for professionals in Tanzania." />
        <link rel="canonical" href="https://ipmedicare.co.tz/blog" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" initial="hidden" animate="show" variants={staggerContainer(0.2)}>
          <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-blue-700 mb-4"><Feather className="h-4 w-4" />Insights & Resources</motion.div>
          <motion.h1 variants={fadeIn('down')} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">Stay Ahead in<span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">Healthcare Technology</span></motion.h1>
          <motion.p variants={fadeIn('down')} className="mt-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">Your expert source for the latest trends, equipment guides, and best practices in the medical industry.</motion.p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
          {/* Blog Posts */}
          <main className="lg:col-span-3">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={fadeIn('up')} className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search articles..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm" />
            </motion.div>
            <AnimatePresence>
              {filteredPosts.length > 0 ? (
                <motion.div layout variants={staggerContainer(0.1)} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (<BlogCard key={post.id} post={post} />))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-800 mb-2">No Articles Found</h3><p className="text-slate-500">Try a different search term or category.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-24 space-y-10">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer()}>
                <motion.h3 variants={fadeIn('up')} className="text-2xl font-bold text-slate-900 mb-6">Top Categories</motion.h3>
                <div className="space-y-4">
                  {topCategories.map(cat => (
                    <motion.button key={cat.name} variants={fadeIn('up')} onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left font-semibold transition-all duration-300 ${selectedCategory === cat.name ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'}`}>
                      <cat.icon className={`h-6 w-6 ${selectedCategory === cat.name ? 'text-white' : cat.color}`} />
                      <span>{cat.name}</span>
                    </motion.button>
                  ))}
                  {selectedCategory !== 'All Posts' && (
                    <motion.button variants={fadeIn('up')} onClick={() => setSelectedCategory('All Posts')}
                      className="w-full flex items-center gap-4 p-4 rounded-xl text-left font-semibold transition-all duration-300 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900">
                      <span>View All Posts</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer()}>
                <motion.h3 variants={fadeIn('up')} className="text-2xl font-bold text-slate-900 mb-6">Recent Posts</motion.h3>
                <div className="space-y-5">
                  {blogPosts.slice(0, 3).map(post => (
                    <motion.div key={post.id} variants={fadeIn('up')}>
                      <Link to={`/blog/${post.id}`} className="group block">
                        <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-1">{post.title}</p>
                        <p className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* Newsletter CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn('up')}
            className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 text-white rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div><div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Get Expert Insights in Your Inbox</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Subscribe to our newsletter for the latest articles, product updates, and exclusive industry analysis.</p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/50 transition" />
                <button type="submit" className="group flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"><span>Subscribe</span></button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;