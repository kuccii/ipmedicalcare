import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, FlaskConical, Heart, Users, Shield, Truck, 
  CheckCircle, Zap, Star, ArrowRight, Quote 
} from 'lucide-react';

// Re-using animation variants for consistency
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

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

const IndustriesPage: React.FC = () => {
  const industries = [
    { icon: Building2, name: 'Hospitals', description: 'Comprehensive equipment solutions for large-scale healthcare facilities.', image: 'https://medeviva.com/wp-content/custom_uploads/2023/06/1642537612-akhs-tanzania-main_entrance_3252_abdul_mohamed.jpg', services: ['ICU & Emergency Equipment', 'Surgical Instruments', 'Patient Monitoring Systems'], caseStudy: 'Equipped 50+ ICU beds at Metropolitan General Hospital with complete monitoring solutions.', alt: 'The entrance of a modern hospital building in Tanzania.' },
    { icon: Heart, name: 'Clinics & Practices', description: 'Essential, reliable medical equipment for primary care and specialty clinics.', image: 'https://www.swisstph.ch/fileadmin/_processed_/c/c/csm_Tanzania_CDCI_O.Brandenberg_388_4ae5e6761d.jpg', services: ['Examination Equipment', 'Basic Diagnostic Tools', 'Medical Scales'], caseStudy: 'Outfitted 25 primary care clinics with essential diagnostic equipment across the region.', alt: 'A clean and welcoming clinic waiting area in a Tanzanian community.' },
    { icon: FlaskConical, name: 'Laboratories', description: 'Precision instruments for accurate laboratory testing and analysis.', image: 'https://www.hlpc.go.tz/img/slider/benchwork.jpg', services: ['Centrifuges & Analyzers', 'Microscopes', 'Sample Processing Equipment'], caseStudy: 'Installed a complete hematology lab setup for the Regional Diagnostic Center.', alt: 'A state-of-the-art medical laboratory with advanced testing equipment.' },
    { icon: Users, name: 'Government & NGOs', description: 'Reliable equipment for public health initiatives and humanitarian programs.', image: 'https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/https://lh6.googleusercontent.com/L86U_JSCKUrMWJqJW_4oyQA9bGI1Rd6r7Vrz5ys7SBmpEBCDSw1Rc7Dw5L7LS4xNCkdNgosZS4FcCxtR6kP5W_Oc44FdGoAmQ0fswKvTQmW1963WgcnfmdgHjeWV5Eq05AlII-NC', services: ['Mobile Health Units', 'Vaccination Equipment', 'Emergency Response Gear'], caseStudy: 'Supported a national vaccination campaign with portable cold chain equipment.', alt: 'Healthcare workers providing services to a community as part of a government health program.' },
    { icon: Shield, name: 'Emergency Services', description: 'Critical, life-saving equipment for first responders and disaster relief.', image: 'https://images.squarespace-cdn.com/content/v1/55d6cd72e4b041b04b5e65a7/1c15beb9-2d44-45cd-8218-853e751a40b0/_ARV3180.jpg', services: ['Portable Defibrillators', 'Emergency Transport', 'Trauma Care Supplies'], caseStudy: 'Equipped emergency response teams with portable life-saving devices.', alt: 'An ambulance with its lights on, ready for an emergency response.' },
    { icon: Truck, name: 'Mobile Healthcare', description: 'Compact and portable solutions for mobile medical units and remote care.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXwkcuV2lPziAZFz2qvzaEG1pna62xgGHTyPGX-qLcdd6sSA2YvbPVV8gMwK7GZvK-OpU&usqp=CAU', services: ['Portable Diagnostics', 'Telemedicine Solutions', 'Battery-Powered Devices'], caseStudy: 'Outfitted mobile health vans serving rural communities with full diagnostic capabilities.', alt: 'A mobile healthcare van providing medical services in a rural area.' },
  ];

  const advantages = [
    { icon: Zap, title: 'Tailored Solutions', description: 'Custom equipment packages designed for your specific industry needs and budget.' },
    { icon: Star, title: 'Compliance & Quality', description: 'All equipment meets the highest industry standards and regulatory requirements for your sector.' },
    { icon: Users, title: 'Expert Partnership', description: 'Professional installation, training, and ongoing technical support from specialists.' },
    { icon: CheckCircle, title: 'Bulk & Project Pricing', description: 'Competitive pricing for large orders with flexible payment terms and volume discounts.' },
  ];

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      <Helmet>
        <title>Industries We Serve | IP Medical Care | Tanzania</title>
        <meta name="description" content="IP Medical Care provides specialized medical equipment solutions for hospitals, clinics, laboratories, government, and NGOs in Tanzania. Discover our tailored services for every healthcare sector." />
        <link rel="canonical" href="https://ipmedicare.co.tz/industries" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden" animate="show" variants={staggerContainer(0.2)}
        >
          <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-blue-700 mb-4">
            <Building2 className="h-4 w-4" />
            Our Expertise
          </motion.div>
          <motion.h1 variants={fadeIn('down')} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
            Specialized Solutions for
            <span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
              Every Healthcare Sector
            </span>
          </motion.h1>
          <motion.p variants={fadeIn('down')} className="mt-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We provide tailored medical equipment and dedicated support for hospitals, clinics, labs, and public health initiatives across East Africa.
          </motion.p>
        </motion.div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up')}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img src={industry.image} alt={industry.alt} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-3 rounded-xl">
                      <industry.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{industry.name}</h3>
                  </div>
                  <p className="text-slate-600 mb-5 text-sm flex-grow">{industry.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-700 text-sm mb-3">Key Solutions:</h4>
                    <ul className="space-y-2">
                      {industry.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-center gap-3 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-sm text-slate-700 italic">
                      <Quote className="inline h-4 w-4 -mt-1 mr-1 text-slate-400"/>
                      {industry.caseStudy}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Advantages Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
              <Star className="h-4 w-4" />
              Your Partnership Advantage
            </motion.div>
            <motion.h2 variants={fadeIn('down', 'tween', 0.2)} className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-blue-800 to-teal-800 bg-clip-text text-transparent mb-4">
              Beyond Equipment Supply
            </motion.h2>
            <motion.p variants={fadeIn('down', 'tween', 0.3)} className="text-lg text-slate-600 max-w-2xl mx-auto">
              We provide end-to-end support to ensure your facility operates at peak efficiency.
            </motion.p>
          </motion.div>
          <motion.div
            variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {advantages.map((item, index) => (
              <motion.div key={index} variants={fadeIn('up')} className="group bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80">
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <item.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn('up')}
            className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 text-white rounded-3xl p-12 lg:p-20 text-center overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                Ready to Discuss Your Sector's Needs?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Our specialists are ready to help you find the perfect equipment solutions for your specific healthcare requirements and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="group flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <span>Get Industry-Specific Quote</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="group flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;