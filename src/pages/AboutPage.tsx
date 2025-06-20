import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Shield, Clock, Target, CheckCircle, Heart, Building } from 'lucide-react';

// Re-using the animation variants from HomePage for consistency
const fadeIn = (direction = 'up', type = 'tween', delay = 0, duration = 0.6) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: 'easeOut' },
  },
});

const staggerContainer = (staggerChildren = 0.2, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

const AboutPage: React.FC = () => {
  const stats = [
    { number: 15, suffix: '+', label: 'Years of Expertise', icon: Award },
    { number: 200, suffix: '+', label: 'Healthcare Partners', icon: Building },
    { number: 50, suffix: '+', label: 'Countries Served', icon: Globe },
    { number: 5000, suffix: '+', label: 'Equipment Delivered', icon: CheckCircle },
  ];

  const values = [
    { icon: Heart, title: 'Integrity', description: 'Upholding the highest standards of honesty and ethics in all our operations.' },
    { icon: Shield, title: 'Quality First', description: 'Sourcing only from certified manufacturers and conducting rigorous quality checks.' },
    { icon: Users, title: 'Customer Focus', description: 'Providing personalized service and support to meet your specific healthcare needs.' },
    { icon: Clock, title: 'Reliability', description: 'Fast delivery, responsive support, and consistent availability when you need us most.' },
  ];

  const leadership = [
    { name: 'Dr. Amina Hassan', role: 'Chief Executive Officer', image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', expertise: '15+ years in medical device industry' },
    { name: 'Dr. John Mwalimu', role: 'Chief Operations Officer', image: 'https://images.pexels.com/photos/5327650/pexels-photo-5327650.jpeg?auto=compress&cs=tinysrgb&w=400', expertise: 'Global logistics and supply chain expert' },
    { name: 'Dr. Sarah Johnson', role: 'Chief Technology Officer', image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', expertise: 'Expert in medical device quality assurance' },
  ];
  
  // A component for animated number counters
  const AnimatedCounter = ({ value, suffix = '' }) => {
    // A simple placeholder. In a real app, you'd use a spring-based animation.
    return (
      <span className="font-bold text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
        {value}{suffix}
      </span>
    );
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      {/* Hero Section */}
      <section className="relative flex items-center bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 text-slate-800 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-0 -left-1/4 w-full h-full bg-gradient-to-r from-blue-200/50 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 -right-1/4 w-full h-full bg-gradient-to-l from-emerald-200/50 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-3000"></div>
        </div>
        
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={staggerContainer()}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-blue-700 mb-4">
            <Heart className="h-4 w-4" />
            Our Story, Our Commitment
          </motion.div>
          <motion.h1 variants={fadeIn('down', 'tween', 0.2)} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
            Empowering Global
            <span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
              Healthcare Excellence
            </span>
          </motion.h1>
          <motion.p variants={fadeIn('down', 'tween', 0.4)} className="mt-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Since 2009, we've been dedicated to providing healthcare professionals with the highest quality medical equipment and exceptional service across Tanzania, East Africa, and beyond.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeIn('up')} className="text-center flex flex-col items-center gap-2">
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-4 rounded-xl mb-3">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn('right')} className="relative">
                <img
                    src="https://i0.wp.com/u-volfoundation.org/wp-content/uploads/2024/07/image00052.jpg?resize=750%2C422&ssl=1"
                    alt="Healthcare Team"
                    className="rounded-2xl shadow-xl w-full"
                />
                <motion.div 
                    className="absolute -bottom-8 right-8 bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow-lg border border-slate-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl shadow-md">
                            <Target className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-xl text-slate-900">Precision in Practice</p>
                            <p className="text-sm text-slate-600">Improving Patient Outcomes</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div variants={fadeIn('left')} className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-blue-800 to-teal-800 bg-clip-text text-transparent">
                Our Mission & Vision
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To empower healthcare providers with access to premium medical equipment that enhances patient care and improves health outcomes globally. We envision a world where every healthcare facility, regardless of size or location, has the tools to provide world-class care.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Global Access:</strong> Breaking barriers to ensure every facility has access to top-tier equipment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Unwavering Quality:</strong> Committing to the highest standards in product selection and service.</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-blue-100/70 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium text-blue-800 mb-4">
              <Shield className="h-4 w-4" />
              Our Core Values
            </motion.div>
            <motion.h2 variants={fadeIn('down', 'tween', 0.2)} className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-blue-800 to-emerald-800 bg-clip-text text-transparent mb-4">
              The Principles That Guide Us
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeIn('up')} className="group bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80">
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <value.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-teal-100/70 border border-teal-200 px-4 py-2 rounded-full text-sm font-medium text-teal-800 mb-4">
              <Users className="h-4 w-4" />
              Our Leadership Team
            </motion.div>
            <motion.h2 variants={fadeIn('down', 'tween', 0.2)} className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-teal-800 to-emerald-800 bg-clip-text text-transparent mb-4">
              Experienced Professionals
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {leadership.map((leader, index) => (
              <motion.div key={index} variants={fadeIn('up')} className="group text-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="font-bold text-xl text-slate-900 mb-1">{leader.name}</h3>
                <p className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text mb-3">{leader.role}</p>
                <p className="text-sm text-slate-500">{leader.expertise}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;