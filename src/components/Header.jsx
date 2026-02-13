import { useEffect, useMemo, useRef, useState } from "react";
import "./Header.css";

export default function Header() {
  const navItems = useMemo(
    () => [
      { id: "hero", label: "HOME" },
      { id: "who-i-am-section", label: "ABOUT" },
      { id: "work-container", label: "WORK" },
      { id: "hobby-container", label: "OTHER" },
    ],
    [],
  );

  const [activeId, setActiveId] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // 헤더 배경/테마 상태
  const [headerBg, setHeaderBg] = useState("#050505"); // 초기값: 히어로
  const [headerTheme, setHeaderTheme] = useState("dark"); // dark | light

  // 스크롤 중 observer 튐 방지
  const lockRef = useRef(false);
  const lockTimerRef = useRef(null);

  const getHeaderOffset = () => {
    const header = document.querySelector(".header");
    return (header?.offsetHeight ?? 0) + 8;
  };

  const scrollToId = (id) => {
    let el;

    // 클래스 기반 섹션들
    if (
      id === "who-i-am-section" ||
      id === "work-container" ||
      id === "hobby-container"
    ) {
      el = document.querySelector(`.${id}`);
    } else {
      // ID 기반 섹션 (hero, contact)
      el = document.getElementById(id);
    }

    if (!el) {
      console.log(`Section not found: ${id}`);
      return;
    }

    setActiveId(id);
    setMenuOpen(false);

    // 클릭 시 즉시 lock 활성화
    lockRef.current = true;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);

    // who-i-am-section은 pinned 섹션이므로 정확한 시작 위치로 이동
    let y;
    if (id === "who-i-am-section") {
      const rect = el.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      y = rect.top + scrollTop - getHeaderOffset();
    } else {
      y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    }

    // 스크롤 실행
    window.scrollTo({ top: y, behavior: "smooth" });

    // 스크롤 완료 후 lock 해제
    lockTimerRef.current = setTimeout(() => {
      lockRef.current = false;
    }, 1200);
  };

  // 새로고침 시 HERO 섹션으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  //  GSAP(KeywordSection)에서 헤더 테마 강제 변경 이벤트 받기
  useEffect(() => {
    const onTheme = (e) => {
      const { bg, theme } = e.detail || {};
      lockRef.current = true;
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        lockRef.current = false;
      }, 700);

      if (bg) setHeaderBg(bg);
      if (theme) setHeaderTheme(theme);
    };

    window.addEventListener("headerThemeChange", onTheme);
    return () => window.removeEventListener("headerThemeChange", onTheme);
  }, []);

  // 섹션 진입 감지: activeId + header bg/theme 업데이트
  useEffect(() => {
    // 헤더 배경색이 바뀌어야 하는 모든 섹션
    const sectionSelectors = [
      "#hero",
      ".who-i-am-section",
      "#keyword-section",
      "#contact",
      ".work-container",
      ".hobby-container",
    ];

    const sections = sectionSelectors
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);

    if (sections.length === 0) return;

    const applyFromSection = (sectionEl) => {
      const bg = sectionEl.dataset.headerBg;
      const theme = sectionEl.dataset.headerTheme;
      if (bg) setHeaderBg(bg);
      if (theme) setHeaderTheme(theme);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;

        // 화면에 보이는 모든 섹션 찾기
        const visibleSections = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            el: e.target,
            ratio: e.intersectionRatio ?? 0,
            top: e.boundingClientRect?.top ?? 999999,
            opacity: parseFloat(getComputedStyle(e.target).opacity || "1"),
          }))
          .filter((s) => s.opacity > 0.6) // ✅ next-section이 opacity 0~0.5면 무시
          .sort((a, b) => a.top - b.top);

        // 가장 위에 있는 섹션의 테마 적용
        const topSection = visibleSections[0];

        if (topSection?.el) {
          // activeId 업데이트
          if (topSection.el.id) {
            setActiveId((prev) =>
              prev === topSection.id ? prev : topSection.id,
            );
          } else if (topSection.el.classList.contains("who-i-am-section")) {
            setActiveId("who-i-am-section");
          } else if (topSection.el.classList.contains("work-container")) {
            setActiveId("work-container");
          } else if (topSection.el.classList.contains("hobby-container")) {
            setActiveId("hobby-container");
          }

          // 헤더 테마 적용
          applyFromSection(topSection.el);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.5],
        rootMargin: `-${getHeaderOffset()}px 0px -40% 0px`,
      },
    );

    sections.forEach((s) => io.observe(s));

    // 첫 렌더 시 hero 기준 적용
    const first = document.getElementById("hero");
    if (first) applyFromSection(first);

    return () => io.disconnect();
  }, []);

  // 메뉴 열렸을 때 body 스크롤 잠그기
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  return (
    <header
      className={`header ${headerTheme === "light" ? "themeLight" : "themeDark"}`}
      style={{ background: headerBg }}
    >
      <div className="header-inner">
        <button
          className="menuBtn"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <img
            src={menuOpen ? "/image/menu-icon.png" : "/image/menu-icon.png"}
            alt=""
            className="menuIcon"
          />
        </button>

        <nav className="centerNav" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`navLink ${activeId === item.id ? "active" : ""}`}
              onClick={() => scrollToId(item.id)}
              aria-current={activeId === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="cta"
          type="button"
          onClick={() => scrollToId("contact")}
        >
          LET&apos;S CONTACT
        </button>
      </div>

      <div
        className={`menuPanel ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="menuPanelInner">
          <button className="menuItem" onClick={() => scrollToId("hero")}>
            HOME
          </button>
          <button
            className="menuItem"
            onClick={() => scrollToId("who-i-am-section")}
          >
            ABOUT
          </button>
          <button
            className="menuItem"
            onClick={() => scrollToId("work-container")}
          >
            WORK
          </button>
          <button
            className="menuItem"
            onClick={() => scrollToId("hobby-container")}
          >
            OTHER
          </button>
          <button className="menuItem" onClick={() => scrollToId("contact")}>
            CONTACT
          </button>
        </div>

        <button
          className="menuDim"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
}
