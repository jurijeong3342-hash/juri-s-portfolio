import { motion } from "framer-motion";
import "./Hero.css";

const ease = [0.22, 1, 0.36, 1];

const fadeSlide = (dir = 1, delay = 0) => ({
  hidden: { opacity: 0, y: 18 * dir },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease },
  },
});

const staggerLines = (delay = 0, dir = 1) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: delay },
  },
  line: {
    hidden: { opacity: 0, y: 16 * dir },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
  },
});

export default function Hero() {
  const left = staggerLines(0.05, 1); // 아래→위
  const right = staggerLines(0.18, -1); // 위→아래

  return (
    <section
      id="hero"
      className="hero hero--portfolio"
      data-header-bg="#050505"
      data-header-theme="dark"
      data-header-solid="0"
    >
      <div className="hero__inner">
        <div className="hero__layout">
          <div className="hero__left">
            <motion.h1
              className="hero__headline hero__headline--left"
              variants={left}
              initial="hidden"
              animate="show"
            >
              <motion.span variants={left.line}>WE TURN</motion.span>
              <motion.span variants={left.line}>COMPLEX</motion.span>
              <motion.span variants={left.line}>PROBLEMS</motion.span>
            </motion.h1>
          </div>

          {/* RIGHT */}
          <motion.div
            className="hero__right"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.22 },
              },
            }}
          >
            {/* ● INTO */}
            <motion.div className="hero__meta" variants={fadeSlide(-1, 0)}>
              <span className="hero__dot" aria-hidden="true" />
              <span className="hero__into">INTO</span>
            </motion.div>

            {/* CLEAR / STRUCTURE */}
            <motion.h2
              className="hero__headline hero__headline--right"
              variants={right}
            >
              <motion.span variants={right.line}>CLEAR</motion.span>
              <motion.span variants={right.line}>STRUCTURE</motion.span>
            </motion.h2>

            {/* Sub text */}
            <motion.div className="hero__sub" variants={fadeSlide(1, 0.1)}>
              <p>I translate ideas into buildable UX flows.</p>
              <p>Prioritizing what matters most at each stage.</p>
              <p>Aligning designers, developers, and stakeholders.</p>

              <div className="hero__subFooter">
                <p className="hero__subStrong">Making strategy executable.</p>
                <span className="hero__line" aria-hidden="true" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
