import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, MapPin, Users, TrendingUp, CheckCircle, ArrowRight, 
  BookOpen, Quote, Target, Award 
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


const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      title: 'Muhimbili National Hospital ICU Expansion',
      client: 'Muhimbili National Hospital',
      location: 'Dar es Salaam, Tanzania',
      date: '2023',
      category: 'Hospital Solutions',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'A fully equipped, modern ICU room at Muhimbili National Hospital.',
      challenge: 'The hospital needed to rapidly expand its ICU capacity by 50 beds to meet increased demand while maintaining the highest standards of patient care.',
      solution: 'We provided a complete, turnkey ICU setup including patient monitors, ventilators, infusion pumps, and hospital beds for all 50 new units.',
      results: [
        { metric: '50', label: 'ICU Beds Equipped', icon: Award },
        { metric: '3 Weeks', label: 'To Full Deployment', icon: Calendar },
        { metric: '30%', label: 'Reduction in Patient Transfer Times', icon: TrendingUp },
        { metric: '99.8%', label: 'Equipment Uptime', icon: CheckCircle }
      ],
      testimonial: {
        quote: 'IP Medical Care delivered beyond our expectations. Their rapid response and quality equipment helped us save more lives during a critical period.',
        author: 'Dr. Hassan Idd',
        role: 'ICU Director'
      },
    },
    {
      title: 'KCMC Laboratory Modernization Project',
      client: 'Kilimanjaro Christian Medical Centre',
      location: 'Moshi, Tanzania',
      date: '2023',
      category: 'Laboratory Solutions',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'A scientist working with advanced analysis equipment in the modernized KCMC laboratory.',
      challenge: 'Outdated laboratory equipment was causing significant delays in test results, affecting patient care across multiple departments.',
      solution: 'A complete laboratory modernization with automated hematology and chemistry analyzers, high-speed centrifuges, and an integrated lab information system.',
      results: [
        { metric: '60%', label: 'Faster Test Processing', icon: TrendingUp },
        { metric: '95%', label: 'Reduction in Manual Errors', icon: CheckCircle },
        { metric: '15', label: 'Departments Served', icon: Award },
        { metric: 'Full', label: 'Team Training Provided', icon: Users }
      ],
      testimonial: {
        quote: 'The new equipment has transformed our lab operations. Test turnaround times have improved dramatically, which directly benefits our patient care standards.',
        author: 'Dr. Mohamed Zaiid',
        role: 'Laboratory Director'
      },
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      <Helmet>
        <title>Case Studies | IP Medical Care Success Stories in Tanzania</title>
        <meta name="description" content="Discover real-world examples of how IP Medical Care has empowered healthcare providers in Tanzania with our advanced medical equipment and dedicated support. Read our success stories." />
        <link rel="canonical" href="https://ipmedicare.co.tz/case-studies" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden" animate="show" variants={staggerContainer(0.2)}
        >
          <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-blue-700 mb-4">
            <BookOpen className="h-4 w-4" />
            Success Stories
          </motion.div>
          <motion.h1 variants={fadeIn('down')} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
            Real-World Impact,
            <span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
              Proven Results
            </span>
          </motion.h1>
          <motion.p variants={fadeIn('down')} className="mt-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Explore how our tailored medical equipment solutions have empowered healthcare providers and improved patient outcomes across East Africa.
          </motion.p>
        </motion.div>
      </section>

      {/* Case Studies */}
      <div className="space-y-16 md:space-y-24 py-24">
        {caseStudies.map((study, index) => (
          <motion.section 
            key={index}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer(0.2)}
          >
            <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left Column: Narrative */}
              <motion.div variants={fadeIn(index % 2 === 0 ? 'right' : 'left')} className={index % 2 === 0 ? 'lg:order-1' : ''}>
                <div className="mb-6">
                  <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {study.category}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter text-slate-900">{study.title}</h2>
                  <div className="flex items-center gap-6 mt-3 text-sm text-slate-500">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4"/><span>{study.client}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{study.location}</span></div>
                  </div>
                </div>

                <div className="space-y-6 text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">The Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">Our Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Visuals & Results */}
              <motion.div variants={fadeIn(index % 2 === 0 ? 'left' : 'right')} className="mt-10 lg:mt-0">
                <img src={study.image} alt={study.alt} className="rounded-2xl shadow-2xl w-full h-auto object-cover"/>
                <div className="mt-8">
                  <h4 className="font-bold text-slate-800 text-lg mb-4">Key Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {study.results.map((result, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-2.5 rounded-lg"><result.icon className="h-6 w-6 text-blue-600"/></div>
                        <div>
                          <p className="font-bold text-xl text-slate-800">{result.metric}</p>
                          <p className="text-xs text-slate-500">{result.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Testimonial Section */}
            <motion.div variants={fadeIn('up')} className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 relative">
              <Quote className="absolute top-6 right-6 h-16 w-16 text-slate-100" />
              <div className="relative z-10">
                <p className="text-slate-700 mb-6 italic text-lg leading-relaxed">"{study.testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={index === 0 ? "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2" : "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2"} alt={`Headshot of ${study.testimonial.author}`} className="w-14 h-14 rounded-full object-cover shadow-md" />
                  <div>
                    <p className="font-bold text-slate-900">{study.testimonial.author}</p>
                    <p className="text-sm text-slate-600">{study.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        ))}
      </div>


      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn('up')}
            className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 text-white rounded-3xl p-12 lg:p-20 text-center overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Let us help you achieve your healthcare goals with tailored equipment solutions and expert support. Become our next success story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="group flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <span>Start Your Project</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="group flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Request a Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;