import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhoIAmSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function WhoIAmSection() {
  const sectionRef = useRef(null);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  const whoiamNextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    gsap.set(whoiamNextRef.current, {
      autoAlpha: 0,
      y: 40,
      pointerEvents: "none",
    });

    // 1단계: 3개의 WHO I AM 등장
    tl.fromTo(
      [text1Ref.current, text2Ref.current, text3Ref.current],
      {
        xPercent: (i) => (i === 0 ? -100 : i === 2 ? 100 : 0),
        opacity: 0,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
      },
    )

      // 2단계: 위/아래 합쳐짐
      .to(
        [text1Ref.current, text3Ref.current],
        {
          yPercent: (i) => (i === 0 ? 100 : -100),
          opacity: 0,
          duration: 1,
        },
        "+=0.5",
      )

      // 3단계: 중앙 축소 + 상단 이동
      // 3단계: 중앙 축소 + 상단 이동
      .to(text2Ref.current, {
        fontSize: "clamp(20px, 5vw, 26px)",
        letterSpacing: "-0.02em", // 👈 자간 조정 추가
        y: 50, // 👈 y값으로 상하 위치 조정 (음수: 위로, 양수: 아래로)
        top: "80px", // 👈 top값으로 절대 위치 조정
        duration: 1,
        ease: "power2.out",
      })
      // 4단계: WHO I AM 축소된 상태로 유지

      // 키워드 나오기 전 Next Scene 등장
      .to(
        whoiamNextRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.15",
      )

      // Next Scene 잠깐 보여준 뒤 사라지게
      .to(
        whoiamNextRef.current,
        {
          autoAlpha: 0,
          duration: 0.35,
        },
        "+=0.4",
      )

      // 5단계: 섹션 종료 전에 WHO I AM 사라지기
      .to(
        text2Ref.current,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        "+=0.2",
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className="who-i-am-section"
      ref={sectionRef}
      data-header-bg="#050505"
      data-header-theme="dark"
    >
      {/* WHO I AM 텍스트 */}
      <div className="who-i-am-text top" ref={text1Ref}>
        <span>WHO I AM</span>
      </div>
      <div className="who-i-am-text middle" ref={text2Ref}>
        <span>WHO I AM</span>
      </div>
      <div className="who-i-am-text bottom" ref={text3Ref}>
        <span>WHO I AM</span>
      </div>

      {/* Next Scene */}
      <div className="whoiamNext" ref={whoiamNextRef} aria-hidden="true">
        <div className="whoiamNext__inner">
          <div className="whoiamNext__hero">
            <h2 className="whoiamNext__name">JURI. JUNG</h2>

            <div className="whoiamNext__layout">
              <div className="whoiamNext__left">
                <div className="whoiamNext__photo">
                  <img src="/image/profile.png" alt="profile" />
                </div>
              </div>

              <div className="whoiamNext__right">
                <h3 className="whoiamNext__title">
                  문제를 <b>정의</b>하고,
                  <br />
                  구조를 <b>설계</b>하는 UI·UX <b>기획자</b>
                </h3>

                <p className="whoiamNext__desc">
                  문제를 탐색하고, 구조로 해답을 설계하는 UI/UX 기획자
                  정주리입니다.
                  <br />
                  서비스 기획과 UX 구조 설계를 기반으로, 사용자·협업·데이터
                  중심의
                  <br />
                  실행 가능한 B2C·B2B 경험을 만듭니다.
                </p>

                <div className="whoiamNext__toolkit">
                  <div className="whoiamNext__toolkitTitle">Toolkit</div>
                  <ul className="whoiamNext__chips">
                    <li>Figma</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>React</li>
                    <li>midjourney</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
