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
        lines.forEach((line) => {
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
        lines.forEach((line) => {
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

      // horizontal-section 진입/이탈 시 헤더 테마 + 전용 이벤트 발행
      if (horizontalSectionRef.current) {
        ScrollTrigger.create({
          trigger: horizontalSectionRef.current,
          start: "top 80%",
          end: "bottom top",

          onEnter: () => {
            // headerThemeChange: 배경·테마 변경
            window.dispatchEvent(
              new CustomEvent("headerThemeChange", {
                detail: { bg: "#050505", theme: "dark" },
              }),
            );
            // horizontalSectionEnter: Header가 inHorizontalRef를 true로 설정
            window.dispatchEvent(new CustomEvent("horizontalSectionEnter"));
          },

          onLeave: () => {
            // 가로 스크롤 끝나고 아래 섹션으로 넘어갈 때
            window.dispatchEvent(new CustomEvent("horizontalSectionLeave"));
          },

          onEnterBack: () => {
            // 역스크롤로 horizontal-section 재진입
            window.dispatchEvent(
              new CustomEvent("headerThemeChange", {
                detail: { bg: "#050505", theme: "dark" },
              }),
            );
            window.dispatchEvent(new CustomEvent("horizontalSectionEnter"));
          },

          onLeaveBack: () => {
            // 역스크롤로 horizontal-section 이탈 → work-container 상단(light)으로
            window.dispatchEvent(new CustomEvent("horizontalSectionLeave"));
            window.dispatchEvent(
              new CustomEvent("headerThemeChange", {
                detail: { bg: "#FEE9CE", theme: "light" },
              }),
            );
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
    "/image/marquee_1.png",
    "/image/marquee_2.png",
    "/image/marquee_3.png",
    "/image/marquee_4.png",
    "/image/marquee_5.png",
  ];

  const bottomImages = [
    "/image/marquee_6.png",
    "/image/marquee_7.png",
    "/image/marquee_8.png",
    "/image/marquee_9.png",
    "/image/marquee_10.png",
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
  description: `덕아웃은 야구 관람 경험을 참여형 서비스로 확장한 팀 프로젝트입니다. 기획 단계부터 사용자 시나리오와 UX 구조 설계까지 협업을 통해 진행했으며, 역할 간 조율과 구조 설계를 중심으로 기획과 인터랙션을 구현했습니다.`,
  image: "/image/project-1.png",
  caseStudyLink: "https://www.figma.com/proto/nSuzgw6WEP8UerDSyoMTHK/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_1%EC%A1%B0?page-id=4908%3A5891&node-id=4908-5897&viewport=416%2C330%2C0.02&t=4gns7P3zAo2coQ9B-1&scaling=scale-down-width&content-scaling=fixed",
  liveLink: "dugout-pink.vercel.app"
},

{
  type: "TEAM PROJECT",
  name: "MONAMI",
  description: `모나미 웹 리뉴얼은 브랜드 정체성을 디지털 경험으로 재구성한 팀 프로젝트입니다. 기존 사이트 구조와 사용자 흐름을 분석하고, 브랜드 메시지가 명확히 전달되도록 UX 구조를 재설계했습니다.`,
  image: "/image/project-2.png",
  caseStudyLink: "https://www.figma.com/proto/KTsLouDaCW93ePlDFLe27N/K-Brand-1%EC%A1%B0?page-id=6643%3A793&node-id=6758-3622&viewport=-7577%2C-148%2C0.28&t=vgcadWEHwQ3g5ct7-1&scaling=min-zoom&content-scaling=fixed",
  liveLink: "https://meongpunch.github.io/monamifinal/"
},

{
  type: "PERSONAL PROJECT",
  name: "MASHIL",
  description: `마실은 단순 정보 검색을 넘어 사용자 중심 흐름으로 재구성한 개인 프로젝트입니다. 취향과 맥락을 반영한 정보 구조와 인터랙션 설계를 통해 탐색 부담을 줄이고 경험의 밀도를 높이고자 했습니다. 기획부터 구현까지 전 과정을 일관된 방향성으로 완성했습니다.`,
  image: "/image/project-3.png",
  caseStudyLink: "https://figma.com/너기획서링크",
  liveLink: "https://실제사이트링크.com"
},

{
  type: "INTERNAL PROJECT",
  name: "DriveOps",
  description: `회사 내부 운영 효율화를 위해 법인 차량 관리 시스템을 신규 기획한 프로젝트입니다. 차량 신청, 운영 기록, 정비 이력 등 핵심 기능을 정의하고 역할별 사용 흐름을 설계했습니다. 실제 업무 환경을 반영한 정보 구조 중심의 내부 운영 시스템입니다.`,
  image: "/image/project-4.png",
  caseStudyLink: "https://figma.com/너기획서링크",
  liveLink: "https://실제사이트링크.com"
},

{
  type: "INTERNAL PROJECT",
  name: "PUPPY PAN",
  description: `퍼피판은 반려견의 일상 관리 기능과 커뮤니티 참여 구조를 결합한 반려 라이프 플랫폼입니다. 기록 기반 기능 설계를 통해 보호자가 건강과 생활을 지속적으로 관리할 수 있는 UX 흐름을 구축했습니다. 사용자 활동 데이터를 기반으로 지역 정보를 연결하는 확장 구조까지 고려했습니다.`,
  image: "/image/project-5.png",
  caseStudyLink: "https://figma.com/너기획서링크",
  liveLink: "https://실제사이트링크.com"
},

{
  type: "INTERNAL PROJECT",
  name: "COMMUNITY SITE",
  description: `사용자(Web·Mobile)와 운영자(Staff) 권한을 분리해 설계한 커뮤니티 플랫폼입니다. 콘텐츠 작성과 관리, 신고 및 운영 기능을 역할 기반 구조로 정의해 효율적인 운영 흐름을 기획했습니다. 플랫폼 구조와 권한 체계를 반영한 정보 구조 설계 중심 프로젝트입니다.`,
  image: "/image/project-6.png",
  caseStudyLink: "https://figma.com/너기획서링크",
  liveLink: "https://실제사이트링크.com"
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
    <div
      ref={containerRef}
      className="work-container"
      data-header-bg="#FEE9CE"
      data-header-theme="light"
    >
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
              {bottomImages.map((src, index) => (
                <div
                  key={`bottom-${repeatIndex}-${index}`}
                  className="strip-image"
                >
                  <img src={src} alt={`Bottom ${index + 1}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section
        ref={horizontalSectionRef}
        className="horizontal-section"
        data-header-bg="#050505"
        data-header-theme="dark"
      >
        <div
          className="projects-wrapper"
          data-header-bg="#050505"
          data-header-theme="dark"
        >
          {projectsData.map((item, index) => {
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
  <a
    href={item.caseStudyLink}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-outline"
  >
    VIEW CASE STUDY
  </a>

  <a
    href={item.liveLink}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-outline"
  >
    EXPLORE LIVE SERVICE
  </a>
</div>                    </div>
                  <div className="project-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Work;
