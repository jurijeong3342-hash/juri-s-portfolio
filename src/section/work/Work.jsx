import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Work.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const containerRef = useRef(null);
  const topStripRef = useRef(null);
  const bottomStripRef = useRef(null);
  const horizontalSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 위쪽 띠
      if (topStripRef.current) {
        gsap.to(topStripRef.current, {
          x: -600,
          scrollTrigger: {
            trigger: ".diagonal-strips-section",
            start: "top center",
            end: "bottom center",
            scrub: 1.5,
          },
        });
      }

      // 아래쪽 띠
      if (bottomStripRef.current) {
        gsap.to(bottomStripRef.current, {
          x: 600,
          scrollTrigger: {
            trigger: ".diagonal-strips-section",
            start: "top center",
            end: "bottom center",
            scrub: 1.5,
          },
        });
      }

      // 가로 스크롤
      if (horizontalSectionRef.current) {
        const projects =
          horizontalSectionRef.current.querySelectorAll(".project-card");

        if (projects.length > 0) {
          gsap.to(projects, {
            xPercent: -100 * (projects.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSectionRef.current,
              start: "top top",
              pin: true,
              scrub: 1,
              snap: 1 / (projects.length - 1),
              end: () => `+=${horizontalSectionRef.current.offsetWidth * 2.5}`,
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const topImages = [
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  ];

  const bottomImages = [
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  ];

  return (
    <div ref={containerRef} className="work-container">
      <section className="header-section">
        <h1 className="work-title">WORK</h1>
      </section>
      <section className="diagonal-strips-section">
        <div ref={topStripRef} className="image-strip top-strip">
          {[...Array(4)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="strip-group">
              {topImages.map((src, index) => (
                <div
                  key={`top-${repeatIndex}-${index}`}
                  className="strip-image"
                >
                  <img src={src} alt={`Top ${index + 1}`} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-box">
          <p className="text-left">
            팀 프로젝트에서는 협업 속에서 문제를 정리하고 서비스
            <br />
            구조를 설계했으며, 개인 프로젝트에서는 <b>기획·UX 설계·구현</b>을
            <br />
            하나의 흐름으로 연결해 모든 작업이 실행과 검증이 가능한
            <br />
            결과물로 이어지도록 설계했습니다.
          </p>

          <p className="text-right">
            HER WORK IS GROUNDED IN USER
            <br />
            RESEARCH, STRUCTURED THINKING,
            <br />
            AND REAL-WORLD CONSTRAINTS.
          </p>
        </div>

        <div ref={bottomStripRef} className="image-strip bottom-strip">
          {[...Array(4)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="strip-group">
              {bottomImages.map((src, index) => {
                const uniqueNumber = repeatIndex * 5 + index + 1;
                return (
                  <div
                    key={`bottom-${repeatIndex}-${index}`}
                    className="strip-image"
                  >
                    <img src={src} alt={`Bottom ${index + 1}`} />
                    <div className="image-label">{uniqueNumber}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
      <section ref={horizontalSectionRef} className="horizontal-section">
        <div
          className="projects-wrapper"
          data-header-bg="#050505"
          data-header-theme="dark"
        >
          <div className="project-card">
            <div className="project-content">
              <div className="project-info">
                <h3 className="project-category">TEAM PROJECT</h3>
                <h2 className="work-project-name">DUGOUT</h2>
                <p className="project-description">
                  야구를 좋아 하는 골수 팬들을 위한 서비스로,
                  <br />
                  야구의 모든 정보를 담았으며 좋아하는 경기장과
                  <br />
                  팀 동료를 매칭하여 직관의 재미와 모임의
                  <br />
                  가능성을 높여주는 2주 프로젝트.
                </p>
                <div className="project-buttons">
                  <button className="btn-outline">VIEW PROJECT</button>
                  <button className="btn-outline">VIEW PROTOTYPE</button>
                </div>
              </div>
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                  alt="DUGOUT"
                />
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <div className="project-info">
                <h3 className="project-category">TEAM PROJECT</h3>
                <h2 className="work-project-name">MONAMI</h2>
                <p className="project-description">
                  모나미 리뉴얼 웹 프로젝트로서 디지털 시대에
                  <br />
                  브랜드를 재해석하고, 온라인 매체를 통해 디자인
                  <br />
                  소품 상점의 가능성을 증명하는 것이 목표입니다.
                  <br />
                  그와 동시에 다양한 체험과 전시를 통해 고객들을
                  <br />
                  오프라인으로 유입하는 것을 꾀합니다.
                </p>
                <div className="project-buttons">
                  <button className="btn-outline">VIEW PROJECT</button>
                  <button className="btn-outline">VIEW PROTOTYPE</button>
                </div>
              </div>
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="MONAMI"
                />
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <div className="project-info">
                <h3 className="project-category">PERSONAL PROJECT</h3>
                <h2 className="work-project-name">MASHIL</h2>
                <p className="project-description">
                  야구를 좋아 하는 골수 팬들을 위한 서비스로,
                  <br />
                  야구의 모든 정보를 담았으며 좋아하는 경기장과
                  <br />
                  팀 동료를 매칭하여 직관의 재미와 모임의
                  <br />
                  가능성을 높여주는 2주 프로젝트.
                </p>
                <div className="project-buttons">
                  <button className="btn-outline">VIEW PROJECT</button>
                  <button className="btn-outline">VIEW PROTOTYPE</button>
                </div>
              </div>
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                  alt="MASHIL"
                />
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </div>
  );
};

export default Work;
