import { motion } from "framer-motion";
import "./Hero.css";

import heroImg from "/image/Hero_1.png";

const serviceGroup = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const serviceItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero"
      data-header-bg="#050505"
      data-header-theme="dark"
      data-header-solid="0"
    >
      {/* BG */}
      <div className="hero__bg" aria-hidden="true">
        <img className="hero__bgImg" src={heroImg} alt="" />
        <div className="hero__bgOverlay" />
      </div>

      {/* Safe-area container */}
      <div className="hero__inner">
        {/* Title: Defining */}
        <motion.h1
          className="hero__title hero__title--defining"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Defining
        </motion.h1>

        {/* Title: Service + Signature */}
        <motion.div variants={serviceGroup} initial="hidden" animate="show">
          <motion.div
            className="hero__signature"
            aria-hidden="true"
            variants={serviceItem}
          >
            <img
              src="/image/Hero_sign.png"
              alt=""
              className="hero__signatureImg"
              draggable="false"
            />
          </motion.div>

          <motion.h2
            className="hero__title hero__title--service"
            variants={serviceItem}
          >
            Service
          </motion.h2>
        </motion.div>

        {/* Left bottom copy */}
        <motion.p
          className="hero__copy"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Preparing Tomorrow’s
          <br />
          Service Strategists Today
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__scrollText">SCROLL TO DISCOVER</span>
        </motion.div>
      </div>
    </section>
  );
}
