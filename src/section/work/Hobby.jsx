// Hobby.jsx (복붙 최종본) — ✅ 영상 기준 "손에 착 붙는 드래그 + 놓으면 정리되듯 복귀"
// ※ HOBBY 파트는 그대로 두고, SKILL만 "absolute draggable" 방식으로 완성

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hobby.css";

gsap.registerPlugin(ScrollTrigger);

const Hobby = () => {
  const containerRef = useRef(null);
  const hobbyRef = useRef(null);
  const skillRef = useRef(null);
  const [activeHobby, setActiveHobby] = useState(3);

  // ✅ 드래그 가능한 스킬 위치
  const [skillPositions, setSkillPositions] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  // ✅ 손맛(미끄러움 방지)용: 클릭 지점 오프셋 + 드래그 시작 위치
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SKILL 섹션이 오른쪽에서 왼쪽으로 슬라이드하여 사이드바 옆에 고정
      if (skillRef.current) {
        gsap.to(skillRef.current, {
          left: "80px",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=50%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const hobbies = [
    {
      title: "Exhibition & Digital Experience Exploration",
      image:
        "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=600&q=80",
      description:
        "Exploring digital exhibitions to understand innovative user experiences and design patterns.",
    },
    {
      title: "Design & UX Reference Archiving",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80",
      description:
        "Collecting and organizing design references to build a comprehensive UX knowledge base.",
    },
    {
      title: "Writing to Structure Thoughts",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
      description:
        "Using writing as a tool to clarify thinking and develop structured solutions.",
    },
    {
      title: "Travel for Observation",
      image:
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80",
      description:
        "Experiencing new environments to observe behavior, flow, and context.",
    },
    {
      title: "Photography for Visual Thinking",
      image:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80",
      description:
        "Capturing moments to develop visual awareness and composition skills.",
    },
  ];

  const skills = [
    {
      name: "Midjourney",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      x: 150,
      y: 100,
    },
    {
      name: "Illustrator",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
      x: 350,
      y: 100,
    },
    {
      name: "Java",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      x: 550,
      y: 100,
    },
    {
      name: "Figma",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      x: 750,
      y: 100,
    },
    {
      name: "GitHub",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      x: 950,
      y: 100,
    },
    {
      name: "ChatGPT",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      x: 250,
      y: 300,
    },
    {
      name: "HTML",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      x: 450,
      y: 300,
    },
    {
      name: "PowerPoint",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/16/Microsoft_PowerPoint_2013-2019_logo.svg",
      x: 650,
      y: 300,
    },
    {
      name: "CSS",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      x: 850,
      y: 300,
    },
    {
      name: "VS Code",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      x: 1050,
      y: 300,
    },
    {
      name: "React",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      x: 350,
      y: 500,
    },
    {
      name: "JavaScript",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      x: 550,
      y: 500,
    },
    {
      name: "Claude",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      x: 750,
      y: 500,
    },
  ];

  // ✅ 스킬 초기 위치 설정
  useEffect(() => {
    setSkillPositions(skills.map((s) => ({ x: s.x, y: s.y })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ 드래그 시작 (손에 착 붙는 버전)
  const handleMouseDown = (index, e) => {
    e.preventDefault();

    setDraggingIndex(index);

    // 클릭한 지점 오프셋(원 내부 어디를 잡아도 손에 붙게)
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // 드래그 시작 시점의 위치 저장(손맛 보정)
    const current = skillPositions[index];
    dragStartPos.current = {
      x: current?.x ?? skills[index].x,
      y: current?.y ?? skills[index].y,
    };

    // 드래그 시작 "장난감" 느낌 (영상 기준 과하지 않게)
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, {
      scale: 1.06,
      rotate: gsap.utils.random(-4, 4),
      duration: 0.12,
      ease: "power2.out",
      overwrite: true,
    });
  };

  // ✅ 드래그 중 (관성 없이, 즉각 반응)
  const handleMouseMove = (e) => {
    if (draggingIndex === null) return;

    const container = document.querySelector(".skills-draggable-area");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.current.x;
    const newY = e.clientY - rect.top - dragOffset.current.y;

    setSkillPositions((prev) => {
      const updated = [...prev];
      updated[draggingIndex] = { x: newX, y: newY };
      return updated;
    });
  };

  // ✅ 드래그 종료: "툭" 내려앉고 정리되듯 원위치 복귀 (영상 최적 세팅)
  const handleMouseUp = () => {
    if (draggingIndex === null) return;

    const idx = draggingIndex;
    setDraggingIndex(null);

    const target = skills[idx];
    if (!target) return;

    // 1) 아주 짧게 아래로 툭(바닥 느낌)
    const currentPos = skillPositions[idx] || { x: target.x, y: target.y };

    gsap.killTweensOf(currentPos);

    // onUpdate로 state 동기화 (부드럽게)
    const proxy = { x: currentPos.x, y: currentPos.y };

    gsap.to(proxy, {
      y: currentPos.y + 12,
      duration: 0.15,
      ease: "power2.in",
      onUpdate: () => {
        setSkillPositions((prev) => {
          const next = [...prev];
          next[idx] = { x: proxy.x, y: proxy.y };
          return next;
        });
      },
    });

    // 2) 원래 자리로 "정돈된 탄성" 복귀 (과한 튐 제거)
    gsap.to(proxy, {
      x: target.x,
      y: target.y,
      delay: 0.15,
      duration: 0.8,
      ease: "elastic.out(0.9, 0.25)",
      onUpdate: () => {
        setSkillPositions((prev) => {
          const next = [...prev];
          next[idx] = { x: proxy.x, y: proxy.y };
          return next;
        });
      },
    });
  };

  // ✅ 전역 이벤트 리스너
  useEffect(() => {
    if (draggingIndex !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggingIndex, skillPositions]);

  return (
    <div
      ref={containerRef}
      className="hobby-container"
      data-header-bg="#FEE9CE"
      data-header-theme="light"
    >
      {/* HOBBY 섹션 */}
      <section ref={hobbyRef} className="hobby-section">
        <div className="sidebar-label">
          <span className="label-text">MY HOBBY</span>
          <div className="scroll-indicator">
            <span className="arrow">→</span>
            <span className="scroll-text">SCROLL TO DISCOVER</span>
          </div>
        </div>

        <div className="hobby-content">
          <div className="hobby-image">
            <img
              src={hobbies[activeHobby].image}
              alt={hobbies[activeHobby].title}
              className="hobby-image-main"
            />
          </div>

          <div className="hobby-list">
            <h2 className="hobby-title">HOBBY</h2>
            {hobbies.map((hobby, index) => (
              <p
                key={index}
                className={`hobby-item ${activeHobby === index ? "highlight" : ""}`}
                onMouseEnter={() => setActiveHobby(index)}
              >
                {hobby.title}
              </p>
            ))}
            <p className="hobby-description">
              {hobbies[activeHobby].description}
            </p>
          </div>
        </div>
      </section>

      {/* SKILL 섹션 */}
      <section ref={skillRef} className="skill-section">
        <div className="sidebar-label-skill">
          <span className="label-text-skill">PROFESSIONAL SKILLS</span>
        </div>

        <div className="skill-content">
          <h2 className="skill-title">SKILL</h2>

          {/* ✅ 드래그 가능한 영역 */}
          <div className="skills-draggable-area">
            {skills.map((skill, index) => {
              const pos = skillPositions[index] || { x: skill.x, y: skill.y };
              const isDragging = draggingIndex === index;

              return (
                <div
                  key={skill.name}
                  className={`skill-draggable ${isDragging ? "dragging" : ""}`}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                  }}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                >
                  <img
                    className="skill-logo"
                    src={skill.image}
                    alt={skill.name}
                  />
                  <div className="skill-label">{skill.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="navigation-arrows">
          <span className="nav-arrow">→</span>
          <span className="nav-arrow">→</span>
        </div>
      </section>
    </div>
  );
};

export default Hobby;
