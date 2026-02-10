// App.jsx
import { useCallback, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Hero from "./section/hero/Hero";
import WhoIAmSection from "./section/about/WhoIAmSection";
import Keywordsection from "./section/about/Keywordsection";
import Work from "./section/work/Work";
import CloneCoding from "./section/work/CloneCoding";
import Hobby from "./section/work/Hobby";
import Contact from "./section/contact/Contact";

export default function App() {
  // ✅ 테마 상태 (App이 전역 테마의 주인)
  const [theme, setTheme] = useState("dark"); // "dark" | "light"

  // ✅ 테마 적용 함수
  const applyTheme = useCallback((next) => {
    const root = document.documentElement;

    if (next === "light") {
      root.style.setProperty("--bg", "#fee9ce");
      root.style.setProperty("--fg", "#0b0b0c");
    } else {
      root.style.setProperty("--bg", "#0b0b0c");
      root.style.setProperty("--fg", "#fee9ce");
    }

    setTheme(next);
  }, []);

  return (
    <>
      <Header theme={theme} />

      <main>
        <Hero />

        {/* ✅ WhoIAm 섹션 */}
        <WhoIAmSection theme={theme} onTheme={applyTheme} />
        <Keywordsection />
        <Work />
        <CloneCoding />
        <Hobby />

        <Contact />
      </main>
    </>
  );
}
