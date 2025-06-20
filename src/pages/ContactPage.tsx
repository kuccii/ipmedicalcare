import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

// Animation variants for a consistent feel
const fadeIn = (direction = 'up', type = 'tween', delay = 0, duration = 0.6) => ({
  hidden: {
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: 'easeOut' },
  },
});

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', category: '', message: '', urgency: 'normal' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will be in touch shortly.');
    setFormData({ name: '', email: '', company: '', phone: '', category: '', message: '', urgency: 'normal' });
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: ['+255621232883'], description: 'Available during business hours', color: 'from-blue-500 to-blue-600' },
    { icon: Mail, title: 'Email', details: ['info@ipmedicalcare.co.tz'], description: 'Response within 24 hours', color: 'from-teal-500 to-teal-600' },
    { icon: MapPin, title: 'Address', details: ['Kariakoo, Lumumba Complex', 'P.O.BOX 19876', 'Dar Es Salaam, Tanzania'], description: 'Visit our showroom by appointment', color: 'from-emerald-500 to-emerald-600' },
    { icon: Clock, title: 'Business Hours', details: ['Mon - Fri: 8:00 AM - 6:00 PM EAT', 'Sat: 9:00 AM - 2:00 PM EAT', 'Sun: Closed'], description: 'Emergency support available', color: 'from-blue-600 to-teal-600' }
  ];

  const productCategories = [
    'General Inquiry', 'Diagnostic Devices', 'Respiratory Care', 'Laboratory Equipment', 'Cardiac Monitoring', 'Surgical Instruments', 'Temperature Monitoring', 'Weighing & Measurement', 'PPE & Safety Equipment', 'Custom Solution Request'
  ];

  const quickActions = [
    { title: 'WhatsApp Quick Quote', description: 'Get instant quotes via WhatsApp', action: 'Chat Now', color: 'from-green-500 to-green-600', phone: '+255621232883' },
    { title: 'Schedule Consultation', description: 'Book a call with our specialists', action: 'Schedule Call', color: 'from-blue-600 to-teal-600' },
    { title: 'Download Catalog', description: 'Complete product catalog PDF', action: 'Download', color: 'from-purple-600 to-purple-700' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" initial="hidden" animate="show" variants={staggerContainer(0.2)}>
          <motion.div variants={fadeIn('down')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-blue-700 mb-4">
            <MessageSquare className="h-4 w-4" />Let's Connect
          </motion.div>
          <motion.h1 variants={fadeIn('down')} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter text-slate-800">
            Get in Touch <span className="block bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">With Our Experts</span>
          </motion.h1>
          <motion.p variants={fadeIn('down')} className="mt-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Ready to discuss your medical equipment needs? Our expert team in Tanzania is here to help you find the perfect solutions for your healthcare facility.
          </motion.p>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer()} className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.button key={index} variants={fadeIn('up')}
                onClick={() => { if (action.phone) { window.open(`https://wa.me/${action.phone.replace(/[^0-9]/g, '')}`, '_blank'); } }}
                className={`group relative overflow-hidden bg-gradient-to-br ${action.color} text-white p-8 rounded-3xl transition-all duration-300 text-left hover:scale-105 hover:shadow-2xl`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative"><h3 className="font-bold text-xl mb-3">{action.title}</h3><p className="text-sm opacity-90 mb-6">{action.description}</p><span className="inline-flex items-center gap-2 font-semibold">{action.action}<Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span></div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={fadeIn('up')} className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8"><h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-3">Request a Quote</h2><p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you within 24 hours with a detailed quote.</p></div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label><input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" placeholder="Your full name" /></div>
                  <div><label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label><input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" placeholder="your.email@example.com" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company/Organization *</label><input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" placeholder="Hospital/Clinic name" /></div>
                  <div><label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" placeholder="+255 XXX XXX XXX" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">Equipment Category *</label><select id="category" name="category" required value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"><option value="">Select a category</option>{productCategories.map((category) => (<option key={category} value={category}>{category}</option>))}</select></div>
                  <div><label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">Urgency Level</label><select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"><option value="normal">Normal (5-7 days)</option><option value="urgent">Urgent (2-3 days)</option><option value="emergency">Emergency (Same day)</option></select></div>
                </div>
                <div><label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Detailed Requirements *</label><textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none" placeholder="Please describe the specific medical equipment you need, quantities, budget range, and any special requirements..."/></div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-bold shadow-lg hover:shadow-xl hover:scale-105 group"><Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />Send Quote Request</button>
              </form>
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 via-teal-50 to-emerald-50 rounded-2xl border border-blue-100"><p className="text-sm text-gray-700 text-center"><span className="font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Fast Response Guarantee:</span> Call us at +255621232883 for urgent equipment needs or emergency support.</p></div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer(0.15, 0.3)} className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={fadeIn('up')} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4"><div className={`bg-gradient-to-br ${info.color} p-3 rounded-2xl shadow-lg`}><info.icon className="h-6 w-6 text-white" /></div><div className="flex-1"><h3 className="font-bold text-gray-900 mb-3 text-lg">{info.title}</h3><div className="space-y-1 mb-3">{info.details.map((detail, detailIndex) => (<p key={detailIndex} className="text-gray-700 font-medium">{detail}</p>))}</div><p className="text-xs text-gray-500 font-medium">{info.description}</p></div></div>
              </motion.div>
            ))}
            <motion.div variants={fadeIn('up')} className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4"><div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl"><MessageSquare className="h-6 w-6" /></div><div className="flex-1"><h3 className="font-bold mb-2 text-lg">WhatsApp Support</h3><p className="text-sm text-green-100 mb-4">Chat with our equipment specialists for instant answers to your questions.</p><button onClick={() => window.open('https://wa.me/255621232883', '_blank')} className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-200 text-sm shadow-lg hover:shadow-xl hover:scale-105">Start WhatsApp Chat</button></div></div>
            </motion.div>
            <motion.div variants={fadeIn('up')} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Visit Our Location</h3><div className="bg-gradient-to-br from-blue-100 to-teal-100 h-48 rounded-xl flex items-center justify-center"><div className="text-center text-gray-600"><MapPin className="h-12 w-12 mx-auto mb-3 text-blue-600" /><p className="font-semibold text-gray-900">Kariakoo, Lumumba Complex</p><p className="text-sm">Dar Es Salaam, Tanzania</p></div></div><p className="text-sm text-gray-600 mt-4 text-center">Schedule an appointment to see our equipment demonstrations and meet our team.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;