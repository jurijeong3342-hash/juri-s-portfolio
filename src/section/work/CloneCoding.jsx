import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CloneCoding.css";

gsap.registerPlugin(ScrollTrigger);

const CloneCoding = () => {
  const containerRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      name: "Musign",
      image: "./image/clone_musign.png",
    },
    {
      name: "Y Studio",
      image: "./image/clone_y.png",
    },
    {
      name: "Dopda",
      image: "./image/clone_dopda.png",
    },
    {
      name: "Crew a la Mode",
      image: "./image/clone_crew.png",
    },
    {
      name: "Daebang",
      image: "./image/clone_dea.png",
    },
    {
      name: "Phomein",
      image: "./image/clone_pho.png",
    },
    {
      name: "Hanhwa",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clone-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".clone-coding-section",
          start: "top center",
        },
      });

      gsap.from(".clone-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".clone-coding-section",
          start: "top center",
        },
      });

      // 리스트 애니메이션 (✅ 글자 안 보이는 문제 해결 버전)
      gsap.fromTo(
        ".project-item",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".clone-coding-section", // ✅ 섹션 진입하면 바로 발동
            start: "top center",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const active = hoveredProject !== null ? projects[hoveredProject] : null;

  return (
    <section
      ref={containerRef}
      id="clone-coding-section"
      className="clone-coding-section"
      data-header-bg="#EF5143"
      data-header-theme="light"
    >
      <div className="clone-content">
        <div className="clone-header">
          <h1 className="clone-title">CLONE CODING</h1>
          <p className="clone-subtitle">
            From UX Analysis to Functional Implementation
          </p>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-item"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <h2 className="project-name">{project.name}</h2>
            </div>
          ))}
        </div>

        {/* 호버 이미지 (이미지만) */}
        <div className="hover-image-container" aria-hidden="true">
          {active && (
            <div className="hover-card">
              <img
                src={active.image}
                alt={active.name}
                className="hover-image"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CloneCoding;
