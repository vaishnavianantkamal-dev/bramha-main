import { motion } from "framer-motion";
import Overview from "./Overview";
import BoardOfTrusties from "./BoardOfTrusties";
import Affilations from "./Affilations";
import Awards from "./Awards";
import ProgressHighlight from "./ProgressHighlight";

const AboutUs = () => {
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative bg-linear-to-r from-orange-600 to-orange-700 text-white py-20"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold mb-6"
          >
            About Brahma Valley University
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Excellence in education, innovation in learning, and commitment to shaping future leaders
          </motion.p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <motion.div {...fadeIn(0.1)}>
          <Overview />
        </motion.div>

        <motion.div {...fadeIn(0.2)}>
          <BoardOfTrusties />
        </motion.div>

        <motion.div {...fadeIn(0.3)}>
          <Affilations />
        </motion.div>

        <motion.div {...fadeIn(0.4)}>
          <Awards />
        </motion.div>

        <motion.div {...fadeIn(0.5)}>
          <ProgressHighlight />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
