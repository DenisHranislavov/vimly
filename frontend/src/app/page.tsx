"use client";
import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";
import Features from "@/components/Landing/Features";
import ToolsSection from "@/components/Landing/Tools";
import Credits from "@/components/Landing/Credits";
import Testimonials from "@/components/Landing/Testimonial";
import FAQSection from "@/components/Landing/Faq";
import { fetchItems } from "@/lib/getItems";

export default function Home() {
  fetchItems();
  return (
    <div>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="features-tools">
        <Features />
      </div>
      <ToolsSection />
      <div id="credits">
        <Credits />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}
