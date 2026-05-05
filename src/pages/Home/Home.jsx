import React from "react";
import HeroSection from "./components/Hero";
import WorldClassFacility from "./components/WorldClassFacility";
import StudentsActivities from "./components/StudentsActivities";
import AboutSection from "./components/Aboutsection";
import ProgramsSection from "./components/Programssection";
import CampusPlacements from "./components/CampusPlacements";
import GallerySection from "./components/GallerySection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <CampusPlacements />
      <GallerySection />
      <BlogSection />
      <ContactSection />
      {/* <StudentsActivities /> */}
    </div>
  );
};

export default Home;
