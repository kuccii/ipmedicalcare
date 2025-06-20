import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  ArrowRight, Shield, Truck, Users, Star, Stethoscope, Activity, Microscope,
  Heart, Award, CheckCircle, Globe, Quote, Zap
} from 'lucide-react';
import { Variant, Variants } from 'framer-motion';

// Animation Variants remain the same
const fadeIn = (direction = 'up', type: 'tween' | 'spring' = 'tween', delay = 0, duration = 0.6): Variants => ({
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
const staggerContainer = (staggerChildren = 0.2, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Data for the page sections
const solutions = [
    { name: 'Diagnostic Devices', icon: Stethoscope, description: 'Superior tools for accurate diagnosis.', products: [
        { name: 'Stethoscope', image: 'https://th.bing.com/th/id/OSK.HEROcTwEymS_OlN67Nr6CRVLbJWwKCaYxCGqT2BLeVms3ls?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3' },
        { name: 'Oximeter', image: 'https://i5.walmartimages.com/asr/3260dc22-17ff-4c92-ae3e-fc2b1cd5f534.ee04ba6022bb0937d7b37dea3d7aa2c9.jpeg' },
        { name: 'BP Monitor', image: 'https://i5.walmartimages.com/asr/c1dbdcfc-1af4-42a7-9b3b-7c4dd2ee0b94.aa9043b2f0eac498724d0fc5e8bf7775.jpeg' },
        { name: 'Thermometer', image: 'https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ]},
    { name: 'Laboratory Equipment', icon: Microscope, description: 'Precision instruments for analysis.', products: [
        { name: 'Microscope', image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Centrifuge', image: 'https://www.akadeum.com/wp-content/uploads/2023/07/centrifugation-1024x683.jpg' },
        { name: 'Analyzer', image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Pipette', image: 'https://www.shutterstock.com/image-photo/medical-development-laboratory-black-scientist-260nw-1884612799.jpg' },
    ]},
    { name: 'Surgical & ICU', icon: Activity, description: 'Critical care and surgical solutions.', products: [
        { name: 'Ventilator', image: 'https://i.guim.co.uk/img/media/60bba82aaeedb75bb5d1d50e51f5e64283ae491a/0_325_4879_2928/master/4879.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0efc31f82c2f34c94c9c7b54f20cb2b2' },
        { name: 'Surgical Tools', image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'ECG Machine', image: 'https://cdn11.bigcommerce.com/s-a1hrl7fudh/product_images/uploaded_images/ekg-machine-monitoring-heart-rate-in-icu.jpg' },
        { name: 'Suction Unit', image: 'https://images.pexels.com/photos/7108110/pexels-photo-7108110.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ]},
];

const flagshipProducts = [
    { id: 1, name: 'Advanced Diagnostic Tools', category: 'Diagnostics', image: 'https://minoritynurse.com/wp-content/uploads/2021/02/medical-tools.jpg', description: 'High-precision stethoscopes, BP monitors, and oximeters for accurate patient assessment in any clinical setting.' },
    { id: 2, name: 'Modern Laboratory Analyzers', category: 'Laboratory', image: 'https://www.shutterstock.com/image-photo/black-man-scientist-microscope-analysis-600nw-2451041229.jpg', description: 'State-of-the-art centrifuges and analyzers for rapid and reliable sample processing and diagnostics.' },
    { id: 3, name: 'Life-Support & ICU Systems', category: 'Monitoring', image: 'https://advinhealthcare.com/wp-content/uploads/2022/10/Intensive-Care-Unit-ICU-1.jpg', description: 'Compact and intuitive ECG machines and ventilators, providing critical data for patient care in high-stakes environments.' },
];

const partnershipProof = [
    { pillar: 'Certified Quality', icon: Shield, testimonial: 'Their equipment meets the highest international standards. We trust IP Medical Care for all our critical care needs.', author: 'Dr. Amina Hassan, Muhimbili Hospital' },
    { pillar: 'Reliable Logistics', icon: Truck, testimonial: 'Fast, dependable delivery across Tanzania is crucial for us. IP Medical Care has never let us down.', author: 'Dr. John Mwalimu, KCMC' },
    { pillar: 'Expert Support', icon: Award, testimonial: 'The post-installation training and 24/7 support are invaluable. They are more than suppliers; they are partners.', author: 'Sister Maria, St. Gemma Hospital' },
];

const stats = [
    { number: 200, suffix: '+', label: 'Healthcare Partners in TZ', icon: Users },
    { number: 15, suffix: '+', label: 'Years of Experience', icon: Award },
    { number: 99, suffix: '%', label: 'Client Satisfaction', icon: Star },
];

const PlusGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke=\'rgb(15 23 42 / 0.2)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")' }}></div>
);

const HomePage: React.FC = () => {
    const [hoveredSolution, setHoveredSolution] = useState(solutions[0]);
    const [activePillar, setActivePillar] = useState(partnershipProof[0]);
    const [activeProduct, setActiveProduct] = useState(flagshipProducts[0]);

    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
    <div className="bg-slate-50 text-slate-800 antialiased">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 text-slate-800 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '1.5rem 1.5rem' }}></div>
            <motion.div initial="hidden" animate="show" variants={staggerContainer()} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <motion.div variants={fadeIn('up')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200"><div className="w-2 h-2 bg-emerald-400 rounded-full"></div>Serving Tanzania & East Africa</motion.div>
                        <motion.h1 variants={fadeIn('up', 'tween', 0.2)} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">Equipping Healthcare with<span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">Precision & Trust</span></motion.h1>
                        <motion.p variants={fadeIn('up', 'tween', 0.4)} className="text-xl text-slate-600 leading-relaxed max-w-2xl">The premier supplier of certified medical equipment for hospitals, clinics, and laboratories across the region.</motion.p>
                        <motion.div variants={fadeIn('up', 'tween', 0.5)} className="flex flex-col sm:flex-row gap-4">
                            <Link to="/products" className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"><span>Explore Catalog</span><ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                            <Link to="/contact" className="group flex items-center justify-center bg-white/60 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all duration-300 border border-slate-200 hover:scale-105">Request a Quote</Link>
                        </motion.div>
                    </div>
                    <div className="relative h-96 lg:h-[600px] hidden lg:block">
                        <motion.img style={{ y: y1 }} src="https://th.bing.com/th/id/OSK.HEROcTwEymS_OlN67Nr6CRVLbJWwKCaYxCGqT2BLeVms3ls?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3" alt="Stethoscope" className="absolute top-10 left-0 w-2/5 rounded-2xl shadow-2xl" />
                        <motion.img style={{ y: y2 }} src="https://penntoday.upenn.edu/sites/default/files/2021-10/stroke-disparity-main.jpg" alt="ECG Monitor" className="absolute top-1/4 right-0 w-3/4 rounded-2xl shadow-2xl" />
                        <motion.img style={{ y: y3 }} src="https://www.shutterstock.com/image-photo/regular-prenatal-checkup-maternity-center-600nw-2315571749.jpg" alt="Medical Scale" className="absolute bottom-10 left-1/4 w-1/2 rounded-2xl shadow-2xl" />
                    </div>
                </div>
            </motion.div>
        </section>

        {/* The IP Medical Promise Section */}
        <section className="py-20 lg:py-28 bg-white relative">
            <PlusGrid />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn('right')}>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-6">Your Partner in <br /><span className="text-blue-600">Healthcare Excellence.</span></h2>
                        <p className="text-lg text-slate-600 leading-relaxed">We are more than a supplier; we are a dedicated partner committed to elevating healthcare standards in Tanzania. By providing internationally certified equipment and robust local support, we empower medical professionals to deliver the best possible care.</p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer()} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div key={index} variants={fadeIn('up')} className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200/80">
                                <stat.icon className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                                <div className="text-4xl font-bold text-slate-800">
                                    <CountUp end={stat.number} duration={3} enableScrollSpy />{stat.suffix}
                                </div>
                                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Interactive Solutions Showcase */}
        <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeIn('down')} className="text-center mb-16"><h2 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-blue-800 to-teal-800 bg-clip-text text-transparent mb-4">A Solution for Every Specialization</h2><p className="text-lg text-slate-600 max-w-3xl mx-auto">Hover to explore our core specializations and the quality products within each.</p></motion.div>
                <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
                    <div className="relative h-96 lg:h-full w-full bg-white p-6 rounded-2xl shadow-2xl border border-slate-200/80">
                        <AnimatePresence mode="wait">
                            <motion.div key={hoveredSolution.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
                                <div className="grid grid-cols-2 gap-4 flex-grow">
                                    {hoveredSolution.products.map((p, i) => (
                                        <div key={i} className="bg-slate-100 rounded-lg overflow-hidden group/thumb"><img src={p.image} alt={p.name} className="w-full h-24 md:h-32 object-cover group-hover/thumb:scale-105 transition-transform" /><p className="p-2 text-xs text-center font-medium text-slate-600">{p.name}</p></div>
                                    ))}
                                </div>
                                <Link to="/products" className="mt-4 block text-center w-full bg-slate-800 hover:bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">View All {hoveredSolution.name}</Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer()} className="space-y-4">
                        {solutions.map((sol, index) => (
                            <motion.div key={sol.name} variants={fadeIn('left', 'tween', index * 0.1)} onMouseEnter={() => setHoveredSolution(sol)}
                                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${hoveredSolution.name === sol.name ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white border-blue-600 shadow-xl' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-lg'}`}>
                                <div className="flex items-center gap-4 mb-2"><sol.icon className={`h-8 w-8 transition-colors ${hoveredSolution.name === sol.name ? 'text-white' : 'text-blue-500'}`} /><h3 className="text-xl font-bold">{sol.name}</h3></div>
                                <p className={`transition-colors ${hoveredSolution.name === sol.name ? 'text-blue-100' : 'text-slate-500'}`}>{sol.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Flagship Product Showcase */}
        <section className="py-20 lg:py-28 bg-white relative">
            <PlusGrid />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeIn('down')} className="text-center mb-16"><h2 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-teal-800 to-emerald-800 bg-clip-text text-transparent mb-4">Trusted By Professionals</h2><p className="text-lg text-slate-600 max-w-2xl mx-auto">Explore our flagship equipment, renowned for reliability and precision.</p></motion.div>
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 relative h-[500px] w-full bg-slate-100 rounded-2xl shadow-lg border border-slate-200/80 p-4">
                        <AnimatePresence mode="wait">
                            <motion.img key={activeProduct.id} src={activeProduct.image} alt={activeProduct.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="w-full h-full object-cover rounded-xl"/>
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-col gap-4">
                        {flagshipProducts.map(p => (
                            <motion.div key={p.id} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeIn('left')} onClick={() => setActiveProduct(p)}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-4 ${activeProduct.id === p.id ? 'bg-white border-blue-500 shadow-md' : 'bg-white border-transparent hover:border-slate-300'}`}>
                                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0"/>
                                <div><h4 className="font-bold text-slate-800">{p.name}</h4><p className="text-xs text-slate-500">{p.category}</p></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 lg:mt-0 lg:max-w-[calc(66.66%-1rem)]">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeProduct.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{activeProduct.name}</h3>
                            <p className="text-slate-600 leading-relaxed">{activeProduct.description}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>

        {/* Partnership Proof Section */}
        <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeIn('down')} className="text-center mb-16"><h2 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-blue-800 to-teal-800 bg-clip-text text-transparent mb-4">Our Commitment, Confirmed by Partners</h2><p className="text-lg text-slate-600 max-w-3xl mx-auto">Our dedication to quality, logistics, and support is proven by the leaders we serve.</p></motion.div>
                <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                    <div className="flex flex-col gap-4">
                        {partnershipProof.map(pillar => (
                            <motion.div key={pillar.pillar} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeIn('right')}
                                className={`p-6 rounded-2xl transition-all duration-500 relative overflow-hidden ${activePillar.pillar === pillar.pillar ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}>
                                <div className="flex items-center gap-4 mb-2"><pillar.icon className={`h-8 w-8 transition-colors ${activePillar.pillar === pillar.pillar ? 'text-white' : 'text-blue-500'}`} /><h3 className="text-xl font-bold">{pillar.pillar}</h3></div>
                                <AnimatePresence>
                                    {activePillar.pillar === pillar.pillar && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            className="overflow-hidden">
                                            <div className="pt-4 border-t mt-4" style={{ borderColor: activePillar.pillar === pillar.pillar ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
                                                <Quote className="h-10 w-10 float-left mr-4 opacity-20" />
                                                <p className="italic leading-relaxed">"{pillar.testimonial}"</p>
                                                <p className="font-semibold mt-4 text-right">- {pillar.author}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <button onClick={() => setActivePillar(pillar)} className="absolute inset-0" aria-label={`Select ${pillar.pillar}`}></button>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn('left')} className="hidden lg:block relative bg-cover bg-center rounded-2xl shadow-xl" style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/healthcare-black-man-doctor-clipboard-600nw-2284538255.jpg')" }}></motion.div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white relative">
            <PlusGrid />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn('up')} className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 text-white rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div><div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Ready to Upgrade Your Medical Equipment?</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Get a personalized quote for your facility's needs. Our experts are ready to help you find the perfect solutions for Tanzania's healthcare sector.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="group flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"><span>Get a Free Quote</span><ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                            <Link to="/products" className="group flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105">Browse Catalog</Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    </div>
    );
};

export default HomePage;