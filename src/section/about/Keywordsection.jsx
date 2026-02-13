// KeywordSection.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin"; // 👈 추가
import "./Keywordsection.css";

gsap.registerPlugin(ScrollTrigger, TextPlugin); // 👈 TextPlugin 등록

export default function KeywordSection() {
  const sectionRef = useRef(null);
  const keywordsContainerRef = useRef(null);
  const keywordRefs = useRef([]);
  const lastKeywordRef = useRef(null);
  const nextSectionRef = useRef(null);
  const textLineRefs = useRef([]);

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

  const textLines = [
    '"I structure ambiguous',
    "problems into clear UX flows",
    "and buildable solutions.",
    "UX-driven planning",
    "from problem definition",
    'to execution."',
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
      },
    });

    // 1단계: 키워드 컨테이너 등장
    tl.fromTo(
      keywordsContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
    );

    // 2단계: 키워드 스크롤 + 타이핑 효과
    keywordRefs.current.forEach((keyword, index) => {
      // 스크롤 이동
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

      // 타이핑 효과 👇
      const fullText = keywords[index];

      tl.fromTo(
        keyword,
        {
          opacity: 1,
          text: "", // 빈 텍스트에서 시작
        },
        {
          text: fullText, // 전체 텍스트로
          color: "#FEE9CE",
          duration: 0.8, // 타이핑 속도 조절
          ease: "none",
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
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          onStart: () => {
            window.dispatchEvent(
              new CustomEvent("headerThemeChange", {
                detail: { bg: "#FEE9CE", theme: "light" },
              }),
            );
          },
          onReverseComplete: () => {
            window.dispatchEvent(
              new CustomEvent("headerThemeChange", {
                detail: { bg: "#050505", theme: "dark" },
              }),
            );
          },
        },
        "-=0.8",
      );

    // 5단계: 텍스트 라인별로 채워지면서 올라오기
    textLineRefs.current.forEach((line, index) => {
      tl.fromTo(
        line,
        {
          y: 30,
          opacity: 0,
          backgroundImage:
            "linear-gradient(to right, #d84315 0%, #d84315 0%, rgba(216, 67, 21, 0.2) 0%, rgba(216, 67, 21, 0.2) 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        {
          y: 0,
          opacity: 1,
          backgroundImage:
            "linear-gradient(to right, #d84315 0%, #d84315 100%, rgba(216, 67, 21, 0.2) 100%, rgba(216, 67, 21, 0.2) 100%)",
          duration: 0.6,
          ease: "power2.out",
        },
        index === 0 ? "-=0.4" : "-=0.2",
      );
    });

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
            {/* 초기값은 빈 문자열, GSAP가 채움 */}
          </h1>
        ))}
      </div>

      {/* 다음 섹션 */}
      <div
        id="next-section"
        className="next-section"
        ref={nextSectionRef}
        data-header-bg="#FEE9CE"
        data-header-theme="light"
      ></div>
      <div id="next-section" className="next-section" ref={nextSectionRef}>
        <h2>
          {textLines.map((line, index) => (
            <span
              key={index}
              className="text-line"
              ref={(el) => (textLineRefs.current[index] = el)}
              style={{ display: "block" }}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
