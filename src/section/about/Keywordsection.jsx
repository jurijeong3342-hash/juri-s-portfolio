import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./KeywordSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function KeywordSection() {
  const sectionRef = useRef(null);
  const keywordsContainerRef = useRef(null);
  const keywordRefs = useRef([]);
  const lastKeywordRef = useRef(null);
  const nextSectionRef = useRef(null);

  const keywords = [
    "Retrofuturist",
    "Visual Minimalist",
    "Tech Optimist",
    "Design Geek",
    "Change Agent",
    "Vibestigator",
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
      },
    });

    // 1단계: 키워드 컨테이너 등장
    tl.fromTo(
      keywordsContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
    );

    // 2단계: 키워드 스크롤 + 색 채움
    const totalScroll = keywordRefs.current.length * 150;

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
          color: "#EAC9A6",
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
          backgroundColor: "#EAC9A6",
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
    <section className="keyword-section" ref={sectionRef}>
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
      <div className="next-section" ref={nextSectionRef}>
        <h2>
          Won J. You is a seasoned design leader and educator who's spent over
          20 years designing and creating award-winning experiences. At WJY
          Studios, he leads the charge as chief disruptor and designer for
          social impact.
        </h2>
      </div>
    </section>
  );
}
