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
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);

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

      // text-left 글자 채우기 애니메이션
      if (textLeftRef.current) {
        const lines = textLeftRef.current.querySelectorAll(".text-line");

        lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            {
              backgroundImage:
                "linear-gradient(to right, currentColor 0%, currentColor 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
            {
              backgroundImage:
                "linear-gradient(to right, currentColor 0%, currentColor 100%, rgba(255, 255, 255, 0.3) 100%, rgba(255, 255, 255, 0.3) 100%)",
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              },
            },
          );
        });
      }

      // text-right 글자 채우기 애니메이션
      if (textRightRef.current) {
        const lines = textRightRef.current.querySelectorAll(".text-line");

        lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            {
              backgroundImage:
                "linear-gradient(to right, currentColor 0%, currentColor 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
            {
              backgroundImage:
                "linear-gradient(to right, currentColor 0%, currentColor 100%, rgba(255, 255, 255, 0.3) 100%, rgba(255, 255, 255, 0.3) 100%)",
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              },
            },
          );
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
    "/image/marquee_1.png",
    "/image/marquee_2.png",
    "/image/marquee_3.png",
    "/image/marquee_4.png",
    "/image/marquee_5.png",
  ];

  const bottomImages = [
    "/image/marquee_1.png",
    "/image/marquee_2.png",
    "/image/marquee_3.png",
    "/image/marquee_4.png",
    "/image/marquee_5.png",
  ];

  const projectsData = [
    {
      kind: "cover",
      eyebrow: "TEAM & PERSONAL",
      title: "PROJECT",
    },
    {
      type: "TEAM PROJECT",
      name: "DUGOUT",
      description: `덕아웃은 야구 관람 경험을 참여형 서비스로 확장한
      팀 프로젝트입니다.
      기획 단계부터 사용자 시나리오, UX 구조 설계까지
      팀 내 협업을 통해 진행했으며, 역할 간 조율과 구조
      설계를 중심으로 기획 및 인터랙션을 구현했습니다.`,
      image: "/image/project_1.png",
      link: "https://your-dugout-link.com",
    },
    {
      type: "TEAM PROJECT",
      name: "MONAMI",
      description: `모나미 웹 리뉴얼은 브랜드 정체성을
      디지털 경험으로 재구성한 팀 프로젝트입니다.
      기존 사이트의 구조와 사용자 흐름을 분석하고,
      브랜드 메시지가 명확히 전달되도록 UX 구조를
      재설계했습니다. 기획 단계에서 정보 구조와
      화면 흐름을 중심을 고려한 설계를 진행했습니다.`,
      image: "/image/marquee_3.png",
    },
    {
      type: "PERSONAL PROJECT",
      name: "MASHIL",
      description: `마실은 단순 정보 검색이 아닌,
      사용자 중심 흐름으로 재구성한 개인 프로젝트입니다.
      취향과 맥락을 고려한 정보 구조 설계와 인터랙션을 통해
      탐색의 부담을 줄이고, 겸험의 밀도를 높이고자 했습니다.
      기획, UX 구조 설계, UI 디자인, React 기반 구현까지
      전 과정을 일관된 방향성으로 완성한 공간 탐색 서비스입니다.`,
      image: "/image/marquee_7.png",
    },
    {
      type: "INTERNAL PROJECT",
      name: "DriveOps",
      description: `회사 내부 운영 효율화를 목적으로
      법인차량 관리 시스템을 신규 기획한 프로젝트입니다.
      차량 신청, 운영 기록, 정비 이력 등 운영에 필요한
      기능을 정의하고 역할별 사용 흐름을 설계했습니다. 
      실제 업무 환경을 고려해 정보 구조와 기능 우선순위를
      정리한 내부 운영 중심 시스템 기획 경헙니다.`,
      image: "/image/project_driver.png",
    },
    {
      type: "INTERNAL PROJECT",
      name: "PUPPY PAN",
      description: `퍼피판은 반려견의 일상 관리 기능과 커뮤니티 참여 구조를
      결합한 반려 라이프 플랫폼입니다. 기록 기반 기능 설계를 통해
      보호자가 반려견의 건강과 생활을 지속적으로 관리할 수 있도록
      UX 흐름을 구성했습니다.사용자 활동 데이터를 기반으로 지역
      정보를 연결하는 확장 구조까지 고려해 설계했습니다.`,
      image: "/image/project_puppy.png",
    },
    {
      type: "INTERNAL PROJECT",
      name: "COMMUNITY SITE",
      description: `사용자(Web·Mobile)와 운영자(Staff) 권한을 분리하여
      설계한 커뮤니티 플랫폼입니다. 콘텐츠 작성, 관리, 신고 및
      운영 기능을 역할 기반 구조로 정의해 효율적인 운영 흐름을
      기획했습니다. 플랫폼 구조와 권한 체계를 고려한 정보 구조
      설계 중심의 프로젝트입니다.`,
      image: "/image/project_cms.png",
    },
  ];

  const textLeftLines = [
    "팀 프로젝트에서는 협업 속에서 문제를 정리하고 서비스",
    "구조를 설계했으며, 개인 프로젝트에서는 기획·UX 설계·구현을",
    "하나의 흐름으로 연결해 모든 작업이 실행과 검증이 가능한",
    "결과물로 이어지도록 설계했습니다.",
  ];

  const textRightLines = [
    "HER WORK IS GROUNDED IN USER",
    "RESEARCH, STRUCTURED THINKING,",
    "AND REAL-WORLD CONSTRAINTS.",
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
          <p className="text-left" ref={textLeftRef}>
            {textLeftLines.map((line, index) => (
              <span
                key={index}
                className="text-line"
                style={{ display: "block" }}
              >
                {line}
              </span>
            ))}
          </p>

          <p className="text-right" ref={textRightRef}>
            {textRightLines.map((line, index) => (
              <span
                key={index}
                className="text-line"
                style={{ display: "block" }}
              >
                {line}
              </span>
            ))}
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
          {projectsData.map((item, index) => {
            // ✅ 1) Cover 카드
            if (item.kind === "cover") {
              return (
                <div
                  key={`cover-${index}`}
                  className="project-card project-card--cover"
                >
                  <div className="cover-inner">
                    <div className="cover-eyebrow">{item.eyebrow}</div>
                    <div className="cover-title">{item.title}</div>
                  </div>
                </div>
              );
            }

            // ✅ 2) 기존 Project 카드 (그대로)
            return (
              <div key={`${item.name}-${index}`} className="project-card">
                <div className="project-content">
                  <div className="project-info">
                    <h3 className="project-category">{item.type}</h3>
                    <h2 className="work-project-name">{item.name}</h2>
                    <p className="project-description">
                      {item.description.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    <div className="project-buttons">
                      <button className="btn-outline">VIEW PROJECT</button>
                      <button className="btn-outline">VIEW PROTOTYPE</button>
                    </div>
                  </div>

                  <div className="project-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>{" "}
    </div>
  );
};

export default Work;
