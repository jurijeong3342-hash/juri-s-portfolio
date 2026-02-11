import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hobby.css";

gsap.registerPlugin(ScrollTrigger);

const Hobby = () => {
  const containerRef = useRef(null);
  const hobbyRef = useRef(null);
  const skillRef = useRef(null);
  const [activeHobby, setActiveHobby] = useState(0);
  const descriptionRefs = useRef([]); // description ref 추가

  // 드래그 가능한 스킬 위치
  const [skillPositions, setSkillPositions] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  // 손맛(미끄러움 방지)용: 클릭 지점 오프셋 + 드래그 시작 위치
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (skillRef.current && containerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400vh",
            scrub: 2,
            pin: true,
            anticipatePin: 1,
          },
        });

        // 1) 오른쪽에서 왼쪽으로 "드르륵" 슬라이드
        tl.fromTo(
          skillRef.current,
          { left: "100vw" },
          {
            left: "150px",
            ease: "power2.inOut",
            duration: 1.1,
          },
        );

        // 2) 고정 상태 유지
        tl.to({}, { duration: 1.1 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ✅ description 애니메이션
  useEffect(() => {
    descriptionRefs.current.forEach((desc, index) => {
      if (!desc) return;
      
      if (index === activeHobby) {
        gsap.to(desc, {
          height: "auto",
          opacity: 1,
          marginTop: 15,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(desc, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  }, [activeHobby]);

  const hobbies = [
    {
      title: "Travel for Observation",
      image: "./image/hobby-travel.png",
      description:
        "낯선 곳을 천천히 걷는 걸 좋아합니다. \n 익숙한 일상에서 잠시 떨어져 있으면, 생각도 조금은 가벼워집니다. \n크게 특별하지 않은 순간들이 오래 기억에 남습니다.",
    },
    {
      title: "Photography for Visual Thinking",
      image: "./image/hobby-photo.png",
      description:
        "눈에 띄는 장면보다, 그냥 지나칠 법한 풍경을 담습니다. \n그날의 빛과 공기를 기록해두는 느낌이 좋습니다. \n나중에 다시 보면 그때의 기분이 자연스럽게 떠오릅니다.",
    },
    {
      title: "Interface Deconstruction",
      image: "./image/hobby-interface.png",
      description:
        "복잡해 보이는 숫자를 가만히 들여다보는 시간을 좋아합니다. \n흩어져 있던 것들이 하나로 이어질 때 마음이 차분해집니다. \n조용히 집중하는 그 과정이 생각보다 즐겁습니다.",
    },
    {
      title: "Reading a Book",
      image: "./image/hobby-reading.png",
      description:
        "책을 읽는 시간은 하루를 정리하는 방법입니다. \n누군가의 생각을 따라가다 보면 \n제 생각도 조금은 또렷해집니다. \n한 문장이 오래 남아 조용히 맴돌 때가 있습니다.",
    },
    {
      title: "Space & Brand Experience Exploration",
      image: "./image/hobby-space.png",
      description:
        "전시장이나 미술관에 가는 것을 즐깁니다. \n작품 앞에 서서 잠시 멈추는 시간이 좋습니다. \n설명보다 느낌이 먼저 남는 순간을 기억합니다.",
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

  // ✅ 드래그 시작 (통통: squash & stretch)
  const handleMouseDown = (index, e) => {
    e.preventDefault();
    e.stopPropagation();

    setDraggingIndex(index);

    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const current = skillPositions[index];
    dragStartPos.current = {
      x: current?.x ?? skills[index].x,
      y: current?.y ?? skills[index].y,
    };

    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, {
      scaleX: 1.08,
      scaleY: 0.94,
      rotate: gsap.utils.random(-6, 6),
      duration: 0.12,
      ease: "power2.out",
      transformOrigin: "50% 80%",
      overwrite: true,
    });
  };

  // ✅ 드래그 중 (즉각 반응)
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

  // ✅ 드래그 종료: 툭(바닥) → 통통(반발) → 천천히 원위치
  const handleMouseUp = () => {
    if (draggingIndex === null) return;

    const idx = draggingIndex;
    setDraggingIndex(null);

    const target = skills[idx];
    if (!target) return;

    const els = document.querySelectorAll(".skill-draggable");
    const el = els && els.length > idx ? els[idx] : null;

    const currentPos = skillPositions[idx] || { x: target.x, y: target.y };
    const proxy = { x: currentPos.x, y: currentPos.y };

    gsap.killTweensOf(proxy);

    // 1) 바닥으로 '툭'
    gsap.to(proxy, {
      y: currentPos.y + 18,
      duration: 0.16,
      ease: "power3.in",
      onUpdate: () => {
        setSkillPositions((prev) => {
          const next = [...prev];
          next[idx] = { x: proxy.x, y: proxy.y };
          return next;
        });
      },
    });

    // 2) '통통' 한 번
    gsap.to(proxy, {
      x: target.x,
      y: target.y - 10,
      delay: 0.16,
      duration: 0.22,
      ease: "power2.out",
      onUpdate: () => {
        setSkillPositions((prev) => {
          const next = [...prev];
          next[idx] = { x: proxy.x, y: proxy.y };
          return next;
        });
      },
    });

    // 3) 천천히 정리되며 원위치
    gsap.to(proxy, {
      x: target.x,
      y: target.y,
      delay: 0.38,
      duration: 0.85,
      ease: "expo.out",
      onUpdate: () => {
        setSkillPositions((prev) => {
          const next = [...prev];
          next[idx] = { x: proxy.x, y: proxy.y };
          return next;
        });
      },
    });

    // ✅ DOM(스케일/회전) 복구도 안전하게 (el 있을 때만)
    if (el) {
      gsap.killTweensOf(el);
      gsap.timeline()
        .to(
          el,
          {
            scaleX: 0.96,
            scaleY: 1.06,
            rotate: 0,
            duration: 0.14,
            ease: "power2.out",
            overwrite: true,
          },
          0
        )
        .to(
          el,
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.55,
            ease: "expo.out",
            overwrite: true,
          },
          0.14
        );
    }
  };

  // ✅ 전역 이벤트 리스너 (드래그 중에만)
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
      {/* HOBBY */}
      <section ref={hobbyRef} className="hobby-section">
        <div className="sidebar-label">
          <div className="scroll-indicator">
            <span className="scroll-text">MY HOBBY</span>
          </div>
        </div>

        <div className="hobby-content">
          <div className="hobby-top-box">
<div className="hobby-image">
  {activeHobby !== null && (
    <img
      src={hobbies[activeHobby].image}
      alt={hobbies[activeHobby].title}
      className="hobby-image-main"
    />
  )}
</div>
            <div className="hobby-list"
                onMouseLeave={() => setActiveHobby(0)}>

              {hobbies.map((hobby, index) => (
                <div key={index} className="hobby-item-wrapper">
                  <p
                    className={`hobby-item ${activeHobby === index ? "highlight" : ""}`}
                    onMouseEnter={() => setActiveHobby(index)}
                  >
                    {hobby.title}
                  </p>
                  <div
                    ref={(el) => (descriptionRefs.current[index] = el)}
                    className="hobby-description-inline"
                  >
                    {hobby.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILL 섹션 */}
      <section ref={skillRef} className="skill-section">
        <div className="sidebar-label-skill">
          <span className="label-text-skill">MY SKILL</span>
        </div>

        <div className="skill-content">
          <div className="skills-draggable-area">
            {skills.map((skill, index) => {
              const pos = skillPositions[index] || { x: skill.x, y: skill.y };
              const isDragging = draggingIndex === index;

              return (
                <div
                  key={skill.name}
                  className={`skill-draggable ${isDragging ? "dragging" : ""}`}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                >
                  <img
                    className="skill-logo"
                    src={skill.image}
                    alt={skill.name}
                    draggable={false}
                  />
                  <div className="skill-label">{skill.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hobby;