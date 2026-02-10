import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const firstScreenRef = useRef(null);
  const secondScreenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 두 번째 화면이 아래에서 위로 올라와서 첫 번째 화면을 덮음
      if (secondScreenRef.current) {
        gsap.fromTo(
          secondScreenRef.current,
          {
            y: "100%",
          },
          {
            y: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=100%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="contact-container">
      {/* 첫 번째 화면 */}
      <section ref={firstScreenRef} className="contact-first-screen">
        <div className="contact-background">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
            alt="Contact background"
            className="contact-bg-image"
          />
          <div className="contact-overlay"></div>
        </div>

        <div className="contact-content">
          <h1 className="contact-title">
            LET'S <span className="design-text">DESIGN</span>
            <br />
            PLAN
            <br />
            TOGETHER
          </h1>

          <div className="contact-info-grid">
            <div className="contact-info-item">
              <p className="contact-label">INSTA</p>
              <a href="https://instagram.com/jjuriiya" className="contact-link">
                @jjuriiya
              </a>
            </div>

            <div className="contact-info-item">
              <p className="contact-label">SCHEDULE A CALL</p>
              <a href="tel:010-3342-2022" className="contact-link">
                010-3342-2022
              </a>
            </div>

            <div className="contact-info-item">
              <p className="contact-label">EMAIL</p>
              <a href="mailto:dkwidoo@naver.com" className="contact-link">
                dkwidoo@naver.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 두 번째 화면 */}
      <section ref={secondScreenRef} className="contact-second-screen">
        <div className="quote-container">
          <h2 className="quote-text">
            "GOOD IDEAS BECOME MEANINGFUL
            <br />
            THROUGH STRUCTURE AND EXECUTION."
          </h2>
          <p className="quote-korean">
            "나는 좋은 아이디어가 구조와 실행을 거칠 때 비로소 의미를 갖게
            된다고 믿는다"
          </p>

          <div className="signature">
            <img
              src="/image/signature.png"
              alt="Signature"
              className="signature-image"
            />
          </div>
        </div>

        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <span className="arrow-up">↑</span>
        </button>
      </section>
    </div>
  );
};

export default Contact;
