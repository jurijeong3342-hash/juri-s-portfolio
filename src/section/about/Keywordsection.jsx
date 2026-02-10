import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Keywordsection.css";

gsap.registerPlugin(ScrollTrigger);

export default function KeywordSection() {
  const sectionRef = useRef(null);
  const keywordsContainerRef = useRef(null);
  const keywordRefs = useRef([]);
  const lastKeywordRef = useRef(null);
  const nextSectionRef = useRef(null);

  const keywords = [
    "Planning Thinker",
    "UX Structrue Builder",
    "TCode-Aware Planner",
    "Experience Architect",
    "Build-Ready Design",
    "Product  Solver",
    "Caffeine Addict",
    "Community Builder",
  ];

  useEffect(() => {
    const section = sectionRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=8000",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // next-section의 opacity를 기준으로 테마 변경
          const nextSectionOpacity = gsap.getProperty(
            nextSectionRef.current,
            "opacity",
          );

          // next-section이 나타나기 시작하면(opacity > 0) light 테마로 변경
          if (nextSectionOpacity > 0) {
            section.dataset.headerBg = "#FEE9CE";
            section.dataset.headerTheme = "light";
          } else {
            section.dataset.headerBg = "#050505";
            section.dataset.headerTheme = "dark";
          }
        },
      },
    });

    // 1단계: 키워드 컨테이너 등장
    tl.fromTo(
      keywordsContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
    );

    // 2단계: 키워드 스크롤 + 색 채움
    keywordRefs.current.forEach((keyword, index) => {
      if (index > 0) {
        tl.to(
          keywordsContainerRef.current,
          {
            y: -150 * index,
            duration: 0.6,
            ease: "none",
          },
          index === 1 ? "+=0.3" : undefined,
        );
      }

      tl.to(
        keyword,
        {
          opacity: 1,
          color: "#FEE9CE",
          duration: 0.4,
        },
        "-=0.4",
      );
    });

    // 3단계: 마지막 키워드는 위치 이동 없이 바로 확대
    tl.to(
      lastKeywordRef.current,
      {
        scale: 12,
        duration: 2.5,
      },
      "+=0.2",
    )

      // 4단계: 배경 전환 + 다음 섹션
      .to(
        section,
        {
          backgroundColor: "#FEE9CE",
          duration: 1,
        },
        "-=1.5",
      )
      .fromTo(
        nextSectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8",
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="keyword-section"
      className="keyword-section"
      ref={sectionRef}
      data-header-bg="#050505"
      data-header-theme="dark"
    >
      {/* 키워드 */}
      <div className="keywords-container" ref={keywordsContainerRef}>
        {keywords.map((keyword, i) => (
          <h1
            key={i}
            className={`keyword ${i === keywords.length - 1 ? "last" : ""}`}
            ref={(el) => {
              keywordRefs.current[i] = el;
              if (i === keywords.length - 1) lastKeywordRef.current = el;
            }}
          >
            {keyword}
          </h1>
        ))}
      </div>

      {/* 다음 섹션 */}
      <div id="next-section" className="next-section" ref={nextSectionRef}>
        <h2>
          "I structure ambiguous <br />
          problems into clear UX flows <br />
          and buildable solutions. <br />
          UX-driven planning <br />
          from problem definition <br />
          to execution. "
        </h2>
      </div>
    </section>
  );
}
