import { useEffect, useMemo, useRef, useState } from "react";
import "./Header.css";

export default function Header() {
  const navItems = useMemo(
    () => [
      { id: "hero", label: "HOME" },
      { id: "about", label: "ABOUT" },
      { id: "work", label: "WORK" },
    ],
    [],
  );

  const [activeId, setActiveId] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // 헤더 배경/테마 상태
  const [headerBg, setHeaderBg] = useState("#050505"); // ✅ 초기값: 히어로
  const [headerTheme, setHeaderTheme] = useState("dark"); // dark | light

  // 스크롤 중 observer 튐 방지
  const lockRef = useRef(false);
  const lockTimerRef = useRef(null);

  const getHeaderOffset = () => {
    const header = document.querySelector(".header");
    return (header?.offsetHeight ?? 0) + 8;
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    setMenuOpen(false);

    lockRef.current = true;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);

    const y =
      el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top: y, behavior: "smooth" });

    lockTimerRef.current = setTimeout(() => {
      lockRef.current = false;
    }, 900);
  };

  // ✅ 섹션 진입 감지: activeId + header bg/theme 업데이트
  useEffect(() => {
    const sectionIds = ["hero", "about", "work", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
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

        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            el: e.target,
            id: e.target.id,
            ratio: e.intersectionRatio ?? 0,
            top: e.boundingClientRect?.top ?? 999999,
          }))
          .sort((a, b) => {
            // 위에 가까운 섹션 우선, 비슷하면 ratio 큰 쪽
            if (Math.abs(a.top - b.top) > 40) return a.top - b.top;
            return b.ratio - a.ratio;
          })[0];

        if (!visible?.el) return;

        setActiveId((prev) => (prev === visible.id ? prev : visible.id));
        applyFromSection(visible.el);
      },
      {
        threshold: [0.15, 0.25, 0.4, 0.55],
        rootMargin: `-${getHeaderOffset()}px 0px -60% 0px`,
      },
    );

    sections.forEach((s) => io.observe(s));

    // 첫 렌더 시 hero 기준 적용(혹시 스크롤된 상태로 로딩될 수 있으니까)
    const first = document.getElementById("hero");
    if (first) applyFromSection(first);

    return () => io.disconnect();
  }, []);

  // 메뉴 열렸을 때 body 스크롤 잠그고 싶으면(선택)
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
        {/* 2) 좌측 메뉴 아이콘(이미지) + 토글 */}
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

        {/* 3) 중앙 섹션 이름: HOME ABOUT WORK */}
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

        {/* 4) 우측 LET'S CONTACT 버튼 */}
        <button
          className="cta"
          type="button"
          onClick={() => scrollToId("contact")}
        >
          LET&apos;S CONTACT
        </button>
      </div>

      {/* 모바일/좌측 메뉴 패널 */}
      <div
        className={`menuPanel ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="menuPanelInner">
          <button className="menuItem" onClick={() => scrollToId("hero")}>
            HOME
          </button>
          <button className="menuItem" onClick={() => scrollToId("about")}>
            ABOUT
          </button>
          <button className="menuItem" onClick={() => scrollToId("work")}>
            WORK
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
