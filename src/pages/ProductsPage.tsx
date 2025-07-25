import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Package, Star, ArrowRight, CheckCircle, Layers, TestTube, HeartPulse, Activity, Filter, ChevronDown, X } from 'lucide-react';

// Animation Variants remain the same
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
  show: { transition: { staggerChildren, delayChildren } },
});

// Utility function to convert Google Drive links to direct image URLs
const convertGoogleDriveLink = (driveLink: string): string => {
  if (!driveLink) return '';
  if (driveLink.includes('drive.google.com')) {
    const fileId = driveLink.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : driveLink;
  }
  return driveLink;
};

// --- DATA FROM CSV ---
const csvData = [
  { id: 1, name: 'Littmann Classic III Stethoscope', brand: '3M Littmann', category: 'Diagnostics', image: '', alt: 'Littmann Classic III Stethoscope in black' },
  { id: 3, name: 'High-Speed Lab Centrifuge', brand: 'Thermo Fisher', category: 'Laboratory', image: 'https://drive.google.com/file/d/1t5rVKgIcUapjONVqbItr1VbbaLVtUoaJ/view?usp=drive_link', alt: 'Thermo Fisher high-speed lab centrifuge' },
  { id: 4, name: 'Portable 12-Lead ECG Monitor', brand: 'Mindray', category: 'Monitoring', image: 'https://drive.google.com/file/d/1xPuGTutLxeTJC-vobezHxQbVBpULgSG4/view?usp=drive_link', alt: 'Mindray portable 12-lead ECG monitor' },
  { id: 2, name: 'Digital Pulse Oximeter', brand: 'Masimo', category: 'Monitoring', image: 'https://drive.google.com/file/d/18cVgE-uXhIQ7xQgX3bA2ir-jYUngKPNS/view?usp=drive_link', alt: 'Masimo digital pulse oximeter' },
  { id: 19, name: 'Pulse Oximeter Edan H100B', brand: 'Edan', category: 'Monitoring', image: 'https://drive.google.com/file/d/1jOEvcpPozL0FriLXwDf9hYmlQiuU59w8/view?usp=drive_link', alt: 'Edan H100B pulse oximeter' },
  { id: 20, name: 'Pulse Oximeter Contec CMS60D', brand: 'Contec', category: 'Monitoring', image: 'https://drive.google.com/file/d/1WEj6Fg3p9Qa8DL0LmcKQiYhhyOjlcCz8/view?usp=drive_link', alt: 'Contec CMS60D pulse oximeter' },
  { id: 21, name: 'Handheld Pulse Oximeter', brand: 'Generic', category: 'Monitoring', image: 'https://drive.google.com/file/d/1B261hKPbPPBAdDq8aBAnUbdXEKZGAcW_/view?usp=drive_link', alt: 'Handheld pulse oximeter for mobile monitoring' },
  { id: 22, name: 'Fingertip Pulse Oximeter (Benemed BX-11)', brand: 'Benemed', category: 'Monitoring', image: '', alt: 'Benemed BX-11 fingertip pulse oximeter' },
  { id: 23, name: 'Infrared Thermometer Berrcom', brand: 'Berrcom', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1wzLKGi5nS68U3_-5KBCc6rkGa3NHQ9Jc/view?usp=drive_link', alt: 'Berrcom non-contact infrared thermometer' },
  { id: 24, name: 'Infrared Thermometer Wiselion', brand: 'Wiselion', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1ry_1-N4Mvnt8I111OxH5umlRvyYGFz61/view?usp=drive_link', alt: 'Wiselion infrared thermometer' },
  { id: 25, name: 'Digital BP Monitor', brand: 'Omron', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1eD-S-i05_23M1hMRIL9L3clif-k_KfRf/view?usp=drive_link', alt: 'Omron digital blood pressure monitor' },
  { id: 26, name: 'BP Machine Armstyle', brand: 'Generic', category: 'Diagnostics', image: 'https://drive.google.com/file/d/19uiwS6-cY2DSMFfz2UKaV8PTeGZTivj3/view?usp=drive_link', alt: 'Arm-style blood pressure machine' },
  { id: 27, name: 'BP Machine Wrist (CK-101S)', brand: 'CK', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1tLDoV_DxPx3w4JTon7rWURxsX9H2g0fF/view?usp=drive_link', alt: 'CK-101S wrist blood pressure machine' },
  { id: 28, name: 'BP Machine Wrist (CK-W132)', brand: 'CK', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1tLDoV_DxPx3w4JTon7rWURxsX9H2g0fF/view?usp=drive_link', alt: 'CK-W132 wrist blood pressure machine' },
  { id: 29, name: 'Blood Glucose Monitor Gluconavii', brand: 'Gluconavii', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1K0jH3xTFE4Wexzs_BA5JNHpwCEnqgyVl/view?usp=drive_link', alt: 'Gluconavii blood glucose monitor' },
  { id: 30, name: 'Quantum Analyzer Gold', brand: 'Quantum', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1GhVrA7I0wp5joJ-jpVnTsdCwMBWxM3HS/view?usp=drive_link', alt: 'Gold Quantum resonance magnetic analyzer' },
  { id: 31, name: 'Quantum Analyzer Black', brand: 'Quantum', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1FD8-PO6vpSgvPTUTC3n44A_6fOzLs_F_/view?usp=drive_link', alt: 'Black Quantum resonance magnetic analyzer' },
  { id: 32, name: 'Tens Massager', brand: 'Generic', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1h2UoD-mvfVtxTfPRosecmS1zZNlJDfa6/view?usp=drive_link', alt: 'TENS unit muscle stimulator and massager' },
  { id: 33, name: 'Personal Weight Scale Digital', brand: 'Generic', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1zeWBAofZYZa1Uili9j3H3YM7uY2zoHp9/view?usp=drive_link', alt: 'Digital personal weight scale' },
  { id: 34, name: 'Personal Weight Scale Manual', brand: 'Generic', category: 'Diagnostics', image: 'https://drive.google.com/file/d/16X4srKEGVtVEclSmNNyVpRt3Cv_Jm2qB/view?usp=drive_link', alt: 'Manual personal weight scale' },
  { id: 35, name: 'Seca Weight Scale Seca 700', brand: 'Seca', category: 'Diagnostics', image: 'https://drive.google.com/file/d/17xIF3JXilaXhHCwUCkNUbsNNa-0A-j2V/view?usp=drive_link', alt: 'Seca 700 mechanical column weight scale' },
  { id: 36, name: 'Seca Weight and Height Scale Seca 777', brand: 'Seca', category: 'Diagnostics', image: 'https://drive.google.com/file/d/19vJGV_8OPyIdgH6caz2GBKfEj-7npvRw/view?usp=drive_link', alt: 'Seca 777 digital weight and height scale' },
  { id: 5, name: 'Automated Chemistry Analyzer', brand: 'Roche', category: 'Laboratory', image: 'https://drive.google.com/file/d/1zj5zDpRfQamA_9nx5TPNJtkryLM30593/view?usp=drive_link', alt: 'Roche automated chemistry analyzer' },
  { id: 10, name: 'Vacutainer Needle', brand: 'BD', category: 'Laboratory', image: 'https://drive.google.com/file/d/1CFRIKzvhxVKBR6QTd6QcbFhF5L_YY2an/view?usp=drive_link', alt: 'BD Vacutainer needle for blood collection' },
  { id: 37, name: 'Test Tube Rack White', brand: 'Generic', category: 'Laboratory', image: 'https://drive.google.com/file/d/1_FZUA7Pdl_FQeg5YxASwIWnNmMTkVOMb/view?usp=drive_link', alt: 'White laboratory test tube rack' },
  { id: 38, name: 'Test Tube Rack Pale Green', brand: 'Generic', category: 'Laboratory', image: 'https://drive.google.com/file/d/1K_GI90GevLu4qrmf8XAJBQXBpH-Wu_F6/view?usp=drive_link', alt: 'Pale green laboratory test tube rack' },
  { id: 39, name: 'Falcon Tubes', brand: 'Falcon', category: 'Laboratory', image: 'https://drive.google.com/file/d/1IVeKapjbSMxh-bHFLM57xc9qKbO8An18/view?usp=drive_link', alt: 'Falcon conical centrifuge tubes' },
  { id: 40, name: 'Centrifuge Tubes', brand: 'Servicebio', category: 'Laboratory', image: 'https://drive.google.com/file/d/1Gy4rZ2rTeVDbco8befDkh--Dj-Rq8jcR/view?usp=drive_link', alt: 'Servicebio centrifuge tubes' },
  { id: 41, name: 'Falcon Tube Large', brand: 'Falcon', category: 'Laboratory', image: 'https://drive.google.com/file/d/1IVeKapjbSMxh-bHFLM57xc9qKbO8An18/view?usp=drive_link', alt: 'Large Falcon conical centrifuge tube' },
  { id: 42, name: 'Sterile Swab Stick', brand: 'Rabex', category: 'Laboratory', image: 'https://drive.google.com/file/d/1ntRfkAB4-LJReJj1LgjesaegaG2wJfim/view?usp=drive_link', alt: 'Rabex sterile swab stick' },
  { id: 43, name: 'Stool Container', brand: 'Generic', category: 'Laboratory', image: 'https://drive.google.com/file/d/1ZNURaInrcYHhXdO3ZxtFioP3zIojMVa-/view?usp=drive_link', alt: 'Sterile stool sample container' },
  { id: 44, name: 'Timer TA732', brand: 'Generic', category: 'Laboratory', image: 'https://drive.google.com/file/d/1rXDv2baA7W_shOBhz2FuDKIAvclqG8U3/view?usp=drive_link', alt: 'TA732 laboratory timer' },
  { id: 7, name: 'Intensive Care Ventilator', brand: 'Dräger', category: 'ICU', image: 'https://drive.google.com/file/d/1Bmsf0S-kB83MhLKrxIzIU7g304cxnbDR/view?usp=drive_link', alt: 'Dräger intensive care ventilator' },
  { id: 9, name: 'Emergency Ventilator', brand: 'Oxivent', category: 'ICU', image: 'https://drive.google.com/file/d/1M5zJX1S8DgKOMFGTWeIYsZk-FEyQ2lJU/view?usp=drive_link', alt: 'Emergency transport ventilator' },
  { id: 45, name: 'Infusion Pump Mindray (Benefusion Uvp)', brand: 'Mindray', category: 'ICU', image: 'https://drive.google.com/file/d/1WTW0FN02TSVbpjZ7iynOCedx6jAFyRMQ/view?usp=drive_link', alt: 'Mindray Benefusion UVP infusion pump' },
  { id: 46, name: 'Infusion Pump Mindray (Benefusion VP3)', brand: 'Mindray', category: 'ICU', image: 'https://drive.google.com/file/d/1aCoH0sp6jM26SOlk4b2BJyN33snCt5Hr/view?usp=drive_link', alt: 'Mindray Benefusion VP3 infusion pump' },
  { id: 47, name: 'Infrared Vein Finder XG-900', brand: 'Generic', category: 'ICU', image: 'https://drive.google.com/file/d/1CspERAHkFbgp7aqcyWVB5LooecEV5h-t/view?usp=drive_link', alt: 'XG-900 infrared vein finder' },
  { id: 8, name: 'Surgical Instrument Set', brand: 'B. Braun', category: 'Surgical', image: 'https://drive.google.com/file/d/1GWGdZTcF7PSLK4ZwDCctZM2GzSMoAaFI/view?usp=drive_link', alt: 'B. Braun surgical instrument set' },
  { id: 48, name: 'Ambu Bag Infant/Neonate', brand: 'Generic', category: 'Surgical', image: 'https://drive.google.com/file/d/1ocsI0WtTdZUJ2rpxX-i0Mfyr-tG30EkJ/view?usp=drive_link', alt: 'Infant/neonate ambu bag resuscitator' },
  { id: 49, name: 'Manual Resuscitator', brand: 'Generic', category: 'Surgical', image: 'https://drive.google.com/file/d/1qKmmfQdcjNyvAifcGrYoiO6FNF_YfRUq/view?usp=drive_link', alt: 'Manual resuscitator (ambu bag)' },
  { id: 50, name: 'Mama Delivery Kit', brand: 'Generic', category: 'Surgical', image: '', alt: 'Mama delivery kit for childbirth' },
  { id: 51, name: 'Surgical Equips', brand: 'Generic', category: 'Surgical', image: 'https://drive.google.com/file/d/1GWGdZTcF7PSLK4ZwDCctZM2GzSMoAaFI/view?usp=drive_link', alt: 'Assorted surgical equipment' },
  { id: 11, name: 'Hospital Bed', brand: 'Generic', category: 'Mobility', image: 'https://drive.google.com/file/d/1T5PMNWOJ4Sdvv24Gp6NbKFdpVe4JGaWM/view?usp=drive_link', alt: 'Adjustable hospital bed' },
  { id: 12, name: 'Wheelchair', brand: 'Generic', category: 'Mobility', image: 'https://drive.google.com/file/d/14oFeT-46Jgy_LEWFaYhV3d3zDaj1ORB_/view?usp=drive_link', alt: 'Standard manual wheelchair' },
  { id: 13, name: 'Crutches', brand: 'Generic', category: 'Mobility', image: 'https://drive.google.com/file/d/19aBIC5w8pT53Iey6HnzporpfIzhIQFkm/view?usp=drive_link', alt: 'Underarm crutches for mobility support' },
  { id: 14, name: 'Walking Aid', brand: 'Generic', category: 'Mobility', image: 'https://drive.google.com/file/d/1lW87jXOiF1wmKobKkue_hJCQgjeAUR_8/view?usp=drive_link', alt: 'Walking frame aid for mobility support' },
  { id: 15, name: 'Orthopaedic Support', brand: 'Generic', category: 'Orthopaedics', image: 'https://drive.google.com/file/d/18VN9Fw8k2zbQP-7WnbDQ58GS1asgvMr0/view?usp=drive_link', alt: 'Orthopaedic support brace' },
  { id: 16, name: 'Commode Chair', brand: 'Generic', category: 'Mobility', image: 'https://drive.google.com/file/d/1SDoRcJ5Wg0OTrwe0rdrV_W2svordKjM8/view?usp=drive_link', alt: 'Bedside commode chair' },
  { id: 17, name: 'Air Mattress', brand: 'Generic', category: 'Mobility', image: 'https://drive.google.com/file/d/1tFcVAgA_SXvLnbPqe8ApbWzgMBtIKD7O/view?usp=drive_link', alt: 'Alternating pressure air mattress for bedsore prevention' },
  { id: 18, name: 'Nebulizer Machine', brand: 'Generic', category: 'Diagnostics', image: 'https://drive.google.com/file/d/1atnwkDk87Yix8H7tAxwvR0-Y_mE5_SPG/view?usp=drive_link', alt: 'Portable nebulizer machine for respiratory therapy' },
  { id: 52, name: 'Face Mask KN95 Folding', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/1xp8IaHMl6lCgS8EQdCrtu9qd0c2rG-hF/view?usp=drive_link', alt: 'KN95 folding face mask' },
  { id: 53, name: 'Face Mask KN95', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/18eXNtPM4x5zNs44ubkNpzTokvahm17H8/view?usp=drive_link', alt: 'KN95 face mask' },
  { id: 54, name: 'Face Shield', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/1-SUFc-LBoz4dP2WfRyVwz3VDW881gpSa/view?usp=drive_link', alt: 'Protective face shield' },
  { id: 55, name: 'Cotton Wool Neosafe', brand: 'Neosafe', category: 'Consumables', image: 'https://drive.google.com/file/d/1VkwhxNj6YYlfHuf3bjxJrasfXlow7wZY/view?usp=drive_link', alt: 'Neosafe medical cotton wool' },
  { id: 56, name: 'Cotton WOW Bandages Neosafe', brand: 'Neosafe', category: 'Consumables', image: 'https://drive.google.com/file/d/1L4kd5ig2X2r1KzV4cEjHr8HYhtRtic20/view?usp=drive_link', alt: 'Neosafe cotton WOW bandages' },
  { id: 57, name: 'Tongue Depressor Wooden Type', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/1huhXnZkMISNdWLsMI_gqtCt47YP960tT/view?usp=drive_link', alt: 'Wooden tongue depressor' },
  { id: 58, name: 'IV Cannula Neovac', brand: 'Neovac', category: 'Consumables', image: 'https://drive.google.com/file/d/1sRnKOYjdqexCZFJBVcAcX1RQrY7L-usM/view?usp=drive_link', alt: 'Neovac IV cannula' },
  { id: 59, name: 'Zinc Oxide Plaster', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/1e2kx8PQdhr4b7stavWBSEPHFziyhS-Gt/view?usp=drive_link', alt: 'Roll of zinc oxide adhesive plaster' },
  { id: 60, name: 'Biohazard Bags Red', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/1G0pgGaw8YlrczEYI_Dcr3pC0qDfpF9g3/view?usp=drive_link', alt: 'Red biohazard waste bag' },
  { id: 61, name: 'Biohazard Bags Black', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/1vV8jTzez8zWtFhsDbogkYOvapUMnYpKJ/view?usp=drive_link', alt: 'Black biohazard waste bag' },
  { id: 62, name: 'Biohazard Bags Yellow', brand: 'Generic', category: 'Consumables', image: 'https://drive.google.com/file/d/1S3vx6F9qguYkt9ogc7rLybABjyD7EoyK/view?usp=drive_link', alt: 'Yellow biohazard waste bag' },
  { id: 63, name: 'Aniosept Tabs Laboratoires', brand: 'Laboratoires', category: 'Consumables', image: 'https://drive.google.com/file/d/17YJtWFsqgSpxSFdjYKSErEG2AwGKk5Vv/view?usp=drive_link', alt: 'Laboratoires Aniosept disinfectant tablets' },
  { id: 64, name: 'First Aid Box', brand: 'Generic', category: 'Miscellaneous', image: 'https://drive.google.com/file/d/1jw6ybAwgeydvnY6ZyPaxUAuyuWCzOtFu/view?usp=drive_link', alt: 'First aid box' },
  { id: 65, name: 'Examination Light', brand: 'Generic', category: 'Miscellaneous', image: 'https://drive.google.com/file/d/1aS78z4xjphwZ43Ml5LSOOuScPYCyRjYT/view?usp=drive_link', alt: 'Medical examination light' },
  { id: 66, name: 'Florican Anklet', brand: 'Florican', category: 'Orthopaedics', image: 'https://drive.google.com/file/d/1xZKMC0APGgHYcbB9OuY4Q2TCM0oTZdxc/view?usp=drive_link', alt: 'Florican orthopaedic anklet support' },
  { id: 67, name: 'Sensors Probe', brand: 'Generic', category: 'Monitoring', image: 'https://drive.google.com/file/d/16LbiVAq9BfjtHrhjiyLLm_t0NhCB5Vst/view?usp=drive_link', alt: 'Medical sensor probe' },
  { id: 68, name: 'Infant Sensor', brand: 'Generic', category: 'Monitoring', image: 'https://drive.google.com/file/d/1cY5J2GqhmlWbVFJdkb6wnQqGODZ4awsl/view?usp=drive_link', alt: 'Infant medical monitoring sensor' },
  { id: 69, name: 'Rapid Diagnostic Test Medsource', brand: 'Medsource', category: 'Diagnostics', image: '', alt: 'Medsource rapid diagnostic test kit' },
  { id: 70, name: 'Triple Blood Bag', brand: 'Generic', category: 'Laboratory', image: 'https://drive.google.com/file/d/1R5uIaXC83FN6EFb4AdcuVkSS0D9n225A/view?usp=drive_link', alt: 'Triple blood bag for blood collection and separation' },
  { id: 71, name: 'Crocs', brand: 'Generic', category: 'Miscellaneous', image: 'https://drive.google.com/file/d/1KzuUtIkTNfwMLt2Gc6CfNSujFNbzXtMo/view?usp=drive_link', alt: 'Medical clogs (Crocs)' },
  { id: 72, name: 'Yellow Tips', brand: 'Generic', category: 'Laboratory', image: 'https://drive.google.com/file/d/1IdPaX_USyYLsb5EZMDoBgaihTYX0mXBK/view?usp=drive_link', alt: 'Yellow pipette tips for laboratory use' },
  { id: 73, name: 'Blue Tips', brand: 'Generic', category: 'Laboratory', image: '', alt: 'Blue pipette tips for laboratory use' },
];

// Process the data to convert Google Drive links and add fallback images
const processedProducts = csvData.map(product => ({
  ...product,
  image: product.image ? convertGoogleDriveLink(product.image) : '/medical-icon.svg',
  description: getProductDescription(product.name, product.brand, product.category),
  specs: getProductSpecs(product.name, product.brand, product.category)
}));

// Featured products (first 3 with images)
const featuredProducts = processedProducts.filter(p => p.image !== '/medical-icon.svg').slice(0, 3);

// All products
const allProducts = processedProducts;
const allProductsWithAlts = allProducts.map(p => ({...p, alt: p.alt || `${p.brand} ${p.name}`}));

// Helper functions for product descriptions and specs
function getProductDescription(name: string, brand: string, category: string): string {
  const descriptions: { [key: string]: string } = {
    'Littmann Classic III Stethoscope': 'The industry standard for auscultation, offering high acoustic sensitivity for exceptional performance, plus a versatile two-sided chestpiece.',
    'High-Speed Lab Centrifuge': 'A robust and quiet centrifuge for high-throughput sample processing. Features advanced safety protocols and an intuitive interface.',
    'Portable 12-Lead ECG Monitor': 'Compact and lightweight, this ECG machine provides comprehensive cardiac analysis on its high-resolution color touchscreen.',
    'Digital Pulse Oximeter': 'Advanced pulse oximetry technology for accurate oxygen saturation and heart rate monitoring.',
    'Automated Chemistry Analyzer': 'High-throughput automated chemistry analyzer for comprehensive laboratory testing.',
    'Intensive Care Ventilator': 'Advanced ICU ventilator with multiple ventilation modes and comprehensive monitoring capabilities.',
    'Surgical Instrument Set': 'Complete set of precision surgical instruments for various medical procedures.',
    'Hospital Bed': 'Adjustable hospital bed with multiple positioning options for patient comfort and care.',
    'Wheelchair': 'Standard manual wheelchair for patient mobility and transportation.',
  };
  
  return descriptions[name] || `Professional ${category.toLowerCase()} equipment from ${brand}. High-quality medical device designed for healthcare professionals.`;
}

function getProductSpecs(name: string, brand: string, category: string): string[] {
  const specs: { [key: string]: string[] } = {
    'Littmann Classic III Stethoscope': ['Dual-sided Chestpiece', 'Tunable Diaphragm', '5-Year Warranty'],
    'High-Speed Lab Centrifuge': ['4000 RPM Max Speed', '24-Tube Capacity', 'Quiet Operation'],
    'Portable 12-Lead ECG Monitor': ['12-Lead Analysis', '7" Color Display', 'Wireless Data Transfer'],
    'Digital Pulse Oximeter': ['SpO2 Monitoring', 'Heart Rate Display', 'Battery Powered'],
    'Automated Chemistry Analyzer': ['High Throughput', 'Multiple Test Panels', 'Automated Calibration'],
    'Intensive Care Ventilator': ['Multiple Modes', 'Advanced Monitoring', 'Touch Screen Interface'],
    'Surgical Instrument Set': ['Sterile Packaged', 'High-Grade Steel', 'Complete Set'],
    'Hospital Bed': ['Electric Adjustment', 'Side Rails', 'Trendelenburg Position'],
    'Wheelchair': ['Lightweight Frame', 'Folding Design', 'Comfortable Seating'],
  };
  
  return specs[name] || ['Professional Grade', 'CE Certified', 'Warranty Included'];
}

const categories = [
    { name: 'All Products', icon: Layers }, 
    { name: 'Diagnostics', icon: HeartPulse }, 
    { name: 'Monitoring', icon: Activity },
    { name: 'Laboratory', icon: TestTube }, 
    { name: 'ICU', icon: Star }, 
    { name: 'Surgical', icon: CheckCircle },
    { name: 'Mobility', icon: Activity },
    { name: 'Orthopaedics', icon: HeartPulse },
    { name: 'Consumables', icon: Package },
    { name: 'Miscellaneous', icon: Package },
];

// Extract unique brands from the data
const uniqueBrands = [...new Set(csvData.map(p => p.brand))].sort();
const brands = ['All Brands', ...uniqueBrands];

// --- Reusable Components (Defined OUTSIDE the main component) ---
const PlusGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke=\'rgb(15 23 42 / 0.2)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")' }}></div>
);

// Unified Filter Panel Component - NOW DEFINED OUTSIDE
type FilterPanelProps = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedBrand: string;
  setSelectedBrand: (v: string) => void;
};

const FilterPanel = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedBrand, setSelectedBrand }: FilterPanelProps) => (
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
    return allProductsWithAlts.filter(product => {
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedBrand]);

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      <Helmet>
        <title>Medical Equipment Catalog | IP Medical Care Tanzania</title>
        <meta name="description" content="Browse our extensive catalog of certified medical equipment. From diagnostics to surgical tools, find high-quality products from leading brands for your hospital, clinic, or laboratory in Tanzania." />
        <link rel="canonical" href="https://ipmedicare.co.tz/products" />
      </Helmet>
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
                    <AnimatePresence mode="wait"><motion.img key={activeFeatured.id} src={activeFeatured.image} alt={activeFeatured.alt} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="w-full h-full object-contain rounded-xl"/></AnimatePresence>
                </motion.div>
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer(0.1)} className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                    {featuredProducts.map(p => (
                        <motion.div key={p.id} variants={fadeIn('left')} onClick={() => setActiveFeatured(p)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer flex-shrink-0 lg:flex-shrink-auto flex items-center gap-4 ${activeFeatured.id === p.id ? 'bg-white border-blue-500 shadow-lg' : 'bg-white border-transparent hover:border-slate-300'}`}>
                            <img src={p.image} alt={p.alt} className="w-16 h-16 object-contain rounded-lg p-1 bg-slate-100"/>
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
                                <img src={product.image} alt={product.alt || product.name} className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
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