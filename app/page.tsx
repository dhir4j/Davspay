'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import UpiCarousel from '@/components/sections/UpiCarousel';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import PaymentScreenShowcase from '@/components/sections/PaymentScreenShowcase';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <UpiCarousel />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <PaymentScreenShowcase />
      <Footer />
    </main>
  );
}
