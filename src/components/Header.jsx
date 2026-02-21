import { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
  const [headerBg, setHeaderBg] = useState("#050505");
  const [headerTheme, setHeaderTheme] = useState("dark");

  const lockRef = useRef(false);
  const lockTimerRef = useRef(null);
  const rafRef = useRef(null);
  const forcedNavRef = useRef(null);

  // horizontal-section(projects-wrapper) 진입 여부 추적
  const inHorizontalRef = useRef(false);

  const getHeaderOffset = () => {
    const header = document.querySelector(".header");
    return (header?.offsetHeight ?? 0) + 8;
  };

  // horizontal-section이 현재 뷰포트 상단에 pinned 중인지 확인
  const isHorizontalSectionActive = () => {
    const el = document.querySelector(".horizontal-section");
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // pin 상태이면 top이 헤더 높이 근처에 고정됨
    return (
      rect.top <= getHeaderOffset() + 2 &&
      rect.bottom > window.innerHeight * 0.5
    );
  };

  const getSectionMeta = useCallback(() => {
    const selectors = [
      { id: "hero", selector: "#hero" },
      { id: "who-i-am-section", selector: ".who-i-am-section" },
      {
        id: "keyword-section",
        selector: "#keyword-section",
        navId: "who-i-am-section",
      },
      { id: "work-container", selector: ".work-container" },
      { id: "hobby-container", selector: ".hobby-container" },
      { id: "contact", selector: "#contact" },
    ];

    const scrollTop = window.scrollY;
    const results = [];

    for (const item of selectors) {
      const el = document.querySelector(item.selector);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const top = rect.top + scrollTop;

      const parentSpacer = el.parentElement?.classList?.contains("pin-spacer")
        ? el.parentElement
        : null;
      const height = parentSpacer ? parentSpacer.offsetHeight : el.offsetHeight;

      results.push({
        navId: item.navId || item.id,
        el,
        top,
        bottom: top + height,
        bg: el.dataset.headerBg,
        theme: el.dataset.headerTheme,
      });
    }

    return results;
  }, []);

  const isNextSectionVisible = () => {
    const el = document.querySelector("#next-section");
    if (!el) return false;
    const opacity = parseFloat(getComputedStyle(el).opacity ?? "0");
    return opacity > 0.3;
  };

  const detectActiveSection = useCallback(() => {
    if (lockRef.current) return;

    // ① next-section(KeywordSection 마지막) 보이는 중 → WORK / light
    if (isNextSectionVisible()) {
      setActiveId("work-container");
      setHeaderBg("#FEE9CE");
      setHeaderTheme("light");
      return;
    }

    // ② horizontal-section(projects-wrapper) pinned 중 → WORK / dark
// inHorizontalRef가 true면 scroll 감지가 덮어쓰지 못하게 early return
  if (inHorizontalRef.current) {
    return; // ← 이미 onEnter에서 dark로 설정했으므로 그대로 유지
  }

  if (isHorizontalSectionActive()) {
    setActiveId("work-container");
    setHeaderBg("#050505");
    setHeaderTheme("dark");
    return;
  }
    forcedNavRef.current = null;

    const scrollTop = window.scrollY;
    const headerH = getHeaderOffset();
    const trigger = scrollTop + headerH + 10;

    const sections = getSectionMeta();
    if (sections.length === 0) return;

    let matched = sections[0];
    for (const sec of sections) {
      if (trigger >= sec.top) {
        matched = sec;
      }
    }

    setActiveId((prev) => (prev === matched.navId ? prev : matched.navId));
    if (matched.bg) setHeaderBg(matched.bg);
    if (matched.theme) setHeaderTheme(matched.theme);
  }, [getSectionMeta]);

  // scroll 이벤트
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(detectActiveSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    detectActiveSection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [detectActiveSection]);

  // headerThemeChange — Work.jsx의 horizontal-section onEnter/onLeaveBack에서 발행
  useEffect(() => {
    const onTheme = (e) => {
      const { bg, theme } = e.detail || {};
      if (bg) setHeaderBg(bg);
      if (theme) setHeaderTheme(theme);
    };
    window.addEventListener("headerThemeChange", onTheme);
    return () => window.removeEventListener("headerThemeChange", onTheme);
  }, []);

  // horizontalSectionEnter / horizontalSectionLeave 이벤트 (Work.jsx에서 발행)
  useEffect(() => {
    const onEnter = () => {
      inHorizontalRef.current = true;
      setActiveId("work-container");
      setHeaderBg("#050505");
      setHeaderTheme("dark");
    };
    const onLeave = () => {
      inHorizontalRef.current = false;
      // scroll 감지가 바로 다음 프레임에 올바른 섹션으로 복원
    };

    window.addEventListener("horizontalSectionEnter", onEnter);
    window.addEventListener("horizontalSectionLeave", onLeave);
    return () => {
      window.removeEventListener("horizontalSectionEnter", onEnter);
      window.removeEventListener("horizontalSectionLeave", onLeave);
    };
  }, []);

  // forceActiveNav
  useEffect(() => {
    const onForceActive = (e) => {
      const { id } = e.detail || {};
      if (!id) return;
      forcedNavRef.current = id;
      setActiveId(id);
    };
    window.addEventListener("forceActiveNav", onForceActive);
    return () => window.removeEventListener("forceActiveNav", onForceActive);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

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

  const scrollToId = (id) => {
    let el;
    if (
      id === "who-i-am-section" ||
      id === "work-container" ||
      id === "hobby-container"
    ) {
      el = document.querySelector(`.${id}`);
    } else {
      el = document.getElementById(id);
    }
    if (!el) return;

    setActiveId(id);
    setMenuOpen(false);
    forcedNavRef.current = null;
    inHorizontalRef.current = false;

    lockRef.current = true;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);

    const scrollTop = window.scrollY;
    const parentSpacer = el.parentElement?.classList?.contains("pin-spacer")
      ? el.parentElement
      : null;
    const targetEl = parentSpacer || el;
    const targetRect = targetEl.getBoundingClientRect();
    const y = targetRect.top + scrollTop - getHeaderOffset();

    window.scrollTo({ top: y, behavior: "smooth" });

    lockTimerRef.current = setTimeout(() => {
      lockRef.current = false;
    }, 1200);
  };

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
          <img src="/image/menu-icon.png" alt="" className="menuIcon" />
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
