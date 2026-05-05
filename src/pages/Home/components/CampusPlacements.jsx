"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const stats = [
  {
    value: "13,000+",
    label: "Campus Placements in 2026",
  },
  {
    value: "1,250+",
    label: "Companies Visited in 2026",
  },
  {
    value: "62.7 LPA",
    label: "Highest Package Offered",
  },
];

const placementGallery = [
  "/images/placements/awards.jpg",
  "/images/placements/chemistry-lab.jpg",
  "/images/placements/collabration.jpg",
  "/images/placements/fifth-internation-climate.jpg",
  "/images/placements/placement-drive-rounds.jpg",
  "/images/placements/placement-drive.jpg",
  "/images/placements/tree.png",
];

const partners = [
  "/placements/accelfrontline.jpg",
  "/placements/johndeere.jpg",
  "/placements/plg.jpg",
  "/placements/application-nexus.jpg",
  "/placements/infosys.jpg",
  "/placements/ibm.jpg",
];

export default function CampusPlacements() {
  const [selectedImage, setSelectedImage] = useState(null);

  {
    selectedImage && (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        onClick={() => setSelectedImage(null)}
      >
        <div
          className="relative max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute -top-12 right-0 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Selected Placement"
            className="w-full max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>
    )
  }
  return (
    <section className="relative py-24 bg-linear-to-b from-emerald-900 to-emerald-800 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Campus Placements
          </h2>

          <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
            Our students receive offers from leading global and national
            corporations. We prepare every graduate for long-term success.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-3xl font-bold text-yellow-400">
                {stat.value}
              </h3>
              <p className="mt-3 text-emerald-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg md:text-xl leading-relaxed text-emerald-100 max-w-4xl mx-auto mb-16"
        >
          For years, our graduates have been the preferred choice of recruiters.
          Through personalized placement support and our Corporate Resource
          Centre (CRC), we ensure every student launches a successful career.
        </motion.p>

        {/* Placement Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={30}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {partners.map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl p-6 flex items-center justify-center h-28 shadow-md hover:shadow-xl transition">
                  <img
                    src={logo}
                    alt="Placement Partner"
                    className="max-h-20 object-contain grayscale hover:grayscale-0 transition"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Placement Highlights Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-semibold text-center mb-12">
            Placement Highlights
          </h3>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="rounded-2xl overflow-hidden"
          >
            {placementGallery.map((img, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div
                  className="relative group inline-block rounded-2xl overflow-hidden cursor-pointer bg-white/5"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt="Placement Highlight"
                    className="max-h-[500px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">
                      View Image
                    </span>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
