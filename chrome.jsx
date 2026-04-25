// Shared chrome: nav, custom cursor, footer, scroll reveal, lang toggle, scene placeholders.
// Loaded on every page. Renders into body-level mount points.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── Language store ────────────────────────────────────────────────────────
const LANG_KEY = "ev_lang";
window.useLang = function useLang() {
  const initial = (typeof localStorage !== "undefined" && localStorage.getItem(LANG_KEY)) || "et";
  const [lang, setLang] = useState(initial);
  useEffect(() => {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    window.dispatchEvent(new CustomEvent("ev:lang", { detail: lang }));
  }, [lang]);
  useEffect(() => {
    const onStorage = (e) => { if (e.key === LANG_KEY && e.newValue) setLang(e.newValue); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return [lang, setLang];
};

// ─── Tweaks store (theme, accent, fonts, density, hero copy) ──────────────
window.useThemeTweaks = function useThemeTweaks() {
  const TWEAK_DEFAULTS = window.__TWEAK_DEFAULTS;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply CSS root attributes/vars whenever tweaks change
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme);
    r.setAttribute("data-density", t.density);
    if (t.accent) r.style.setProperty("--accent", t.accent);
    if (t.accentFg) r.style.setProperty("--accent-fg", t.accentFg);
    if (t.fontMono) {
      r.style.setProperty("--font-mono", `'${t.fontMono}', ui-monospace, monospace`);
    }
    if (t.fontSans) {
      r.style.setProperty("--font-sans", `'${t.fontSans}', ui-sans-serif, system-ui, sans-serif`);
    }
    if (t.displayFamily === "mono") {
      r.style.setProperty("--font-display", `var(--font-mono)`);
    } else {
      r.style.setProperty("--font-display", `var(--font-sans)`);
    }
  }, [t.theme, t.density, t.accent, t.accentFg, t.fontMono, t.fontSans, t.displayFamily]);

  return [t, setTweak];
};

// ─── Custom cursor ────────────────────────────────────────────────────────
window.CustomCursor = function CustomCursor() {
  const dotRef = useRef(null);
  const trailRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const trailPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let raf;
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const tick = () => {
      const t = trailPosRef.current;
      const tg = targetRef.current;
      t.x += (tg.x - t.x) * 0.18;
      t.y += (tg.y - t.y) * 0.18;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    // Hover affordances
    const onOver = (e) => {
      const el = e.target.closest("a,button,[data-cursor]");
      if (!el) return;
      const k = el.getAttribute("data-cursor");
      const dot = dotRef.current, tr = trailRef.current;
      if (!dot || !tr) return;
      dot.classList.remove("--lg", "--text");
      tr.classList.remove("--lg");
      if (k === "lg" || el.tagName === "A" || el.tagName === "BUTTON") {
        tr.classList.add("--lg");
        dot.classList.add("--lg");
      } else if (k === "text") {
        dot.classList.add("--text");
      }
    };
    const onOut = (e) => {
      const el = e.target.closest("a,button,[data-cursor]");
      if (!el) return;
      const dot = dotRef.current, tr = trailRef.current;
      if (!dot || !tr) return;
      dot.classList.remove("--lg", "--text");
      tr.classList.remove("--lg");
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="cursor-trail" />
      <div ref={dotRef} className="cursor" />
    </>
  );
};

// ─── Scroll-reveal hook (uses IntersectionObserver) ───────────────────────
window.useReveal = function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
};

// ─── Subtle parallax ──────────────────────────────────────────────────────
window.useParallax = function useParallax() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!els.length) return;
    let raf;
    const tick = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const k = parseFloat(el.dataset.parallax) || 0.15;
        const cy = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-cy * k).toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
};

// ─── Nav ──────────────────────────────────────────────────────────────────
window.Nav = function Nav({ active, lang, setLang }) {
  const c = window.CONTENT[lang].nav;
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-logo">
        <span className="dot" />
        <b>EMER&nbsp;VÄRK</b>
        <span style={{ opacity: 0.5 }}>// AI&nbsp;VP</span>
      </div>
      <div className="nav-links">
        <a className="nav-link" data-active={active === "home"} href="index.html">{c.home}</a>
        <a className="nav-link" data-active={active === "services"} href="services.html">{c.services}</a>
        <a className="nav-link" data-active={active === "portfolio"} href="portfolio.html">{c.portfolio}</a>
        <a className="nav-link" data-active={active === "about"} href="about.html">{c.about}</a>
        <a className="nav-link" data-active={active === "contact"} href="contact.html">{c.contact}</a>
      </div>
      <div className="nav-right">
        <button className="lang-toggle" onClick={() => setLang(lang === "et" ? "en" : "et")}>
          <b style={{ opacity: lang === "et" ? 1 : 0.5 }}>ET</b>
          <span className="sep">/</span>
          <b style={{ opacity: lang === "en" ? 1 : 0.5 }}>EN</b>
        </button>
      </div>
    </nav>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────
window.Footer = function Footer({ lang }) {
  const c = window.CONTENT[lang];
  const [time, setTime] = useState(() => fmtTime());
  useEffect(() => {
    const id = setInterval(() => setTime(fmtTime()), 1000);
    return () => clearInterval(id);
  }, []);
  function fmtTime() {
    const d = new Date();
    const tz = -d.getTimezoneOffset() / 60;
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss} GMT${tz >= 0 ? "+" : ""}${tz}`;
  }
  return (
    <footer className="foot">
      <div>
        <div style={{ color: "var(--fg-3)", marginBottom: 6 }}>{c.foot.colophon}</div>
        <div>{c.foot.author}</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <pre className="ascii" aria-hidden>
{`  ╱╲    ╱╲
 ╱  ╲  ╱  ╲
╱    ╲╱    ╲
╲    ╱╲    ╱
 ╲  ╱  ╲  ╱
  ╲╱    ╲╱`}
        </pre>
      </div>
      <div className="col-r">
        <div style={{ color: "var(--fg-3)", marginBottom: 6 }}>{c.foot.tech}</div>
        <div className="tn">{time} · TLN</div>
      </div>
    </footer>
  );
};

// ─── Page chrome wrapper (mounts cursor, runs reveal/parallax) ───────────
window.PageChrome = function PageChrome({ active, children }) {
  const [t, setTweak] = window.useThemeTweaks();
  const [lang, setLang] = window.useLang();
  window.useReveal();
  window.useParallax();
  return (
    <>
      <window.CustomCursor />
      <window.Nav active={active} lang={lang} setLang={setLang} />
      {children({ lang, setLang, t, setTweak })}
      <window.Footer lang={lang} />
      <window.TweaksUI t={t} setTweak={setTweak} />
    </>
  );
};

// ─── Tweaks UI ────────────────────────────────────────────────────────────
window.TweaksUI = function TweaksUI({ t, setTweak }) {
  const monoOptions = ["JetBrains Mono", "IBM Plex Mono", "Space Mono", "DM Mono", "Fira Code"];
  const sansOptions = ["Inter", "DM Sans", "Space Grotesk", "Manrope", "Geist"];
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme" />
      <TweakRadio
        label="Color direction"
        value={t.theme}
        options={[{ value: "a", label: "A · mono" }, { value: "b", label: "B · warm" }]}
        onChange={(v) => {
          setTweak("theme", v);
          // sensible accent defaults per theme
          if (v === "a") {
            setTweak("accent", "#DAFE00");
            setTweak("accentFg", "#0A0A0A");
          } else {
            setTweak("accent", "#E97B3D");
            setTweak("accentFg", "#1B1410");
          }
        }}
      />
      <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak("accent", v)} />
      <TweakRadio
        label="Density"
        value={t.density}
        options={[{ value: "compact", label: "Tight" }, { value: "regular", label: "Reg" }, { value: "spacious", label: "Loose" }]}
        onChange={(v) => setTweak("density", v)}
      />

      <TweakSection label="Type" />
      <TweakSelect
        label="Mono"
        value={t.fontMono}
        options={monoOptions}
        onChange={(v) => setTweak("fontMono", v)}
      />
      <TweakSelect
        label="Sans"
        value={t.fontSans}
        options={sansOptions}
        onChange={(v) => setTweak("fontSans", v)}
      />
      <TweakRadio
        label="Display"
        value={t.displayFamily}
        options={[{ value: "mono", label: "Mono" }, { value: "sans", label: "Sans" }]}
        onChange={(v) => setTweak("displayFamily", v)}
      />

      <TweakSection label="Hero copy" />
      <TweakText
        label="Line 1 (ET)"
        value={t.heroLine1Et}
        onChange={(v) => setTweak("heroLine1Et", v)}
      />
      <TweakText
        label="Line 2 (ET)"
        value={t.heroLine2Et}
        onChange={(v) => setTweak("heroLine2Et", v)}
      />
      <TweakText
        label="Line 1 (EN)"
        value={t.heroLine1En}
        onChange={(v) => setTweak("heroLine1En", v)}
      />
      <TweakText
        label="Line 2 (EN)"
        value={t.heroLine2En}
        onChange={(v) => setTweak("heroLine2En", v)}
      />
    </TweaksPanel>
  );
};

// ─── Scenes — stylized SVG/CSS placeholders ──────────────────────────────
// These reference immersive / projection / concert / model-training aesthetics.
// They are designed to read well at any size and sit in <div class="scene">.

window.SceneProjection = function SceneProjection({ label = "PHX/IMM·VAN_GOGH", meta = "001" }) {
  return (
    <div className="scene ar-32" data-cursor="lg">
      <svg viewBox="0 0 800 533" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="proj1" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid1" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--rule-c)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="ray1" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--fg)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--fg)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--fg)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="533" fill="url(#grid1)" />
        {/* projection cone */}
        <polygon points="400,0 720,533 80,533" fill="url(#proj1)" />
        {/* concentric rings (lens / iris) */}
        {[60,120,180,240,300].map((r, i) => (
          <circle key={i} cx="400" cy="293" r={r} fill="none" stroke="var(--accent)" strokeOpacity={0.12 + i * 0.04} strokeWidth="0.6" />
        ))}
        {/* projector beams */}
        <g opacity="0.5">
          <line x1="400" y1="0" x2="400" y2="533" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 6" />
          <line x1="0" y1="293" x2="800" y2="293" stroke="var(--rule-c)" strokeWidth="0.5" />
        </g>
        {/* scan lines */}
        <g opacity="0.35">
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 24 + 4} x2="800" y2={i * 24 + 4} stroke="url(#ray1)" />
          ))}
        </g>
        {/* corner ticks */}
        <g stroke="var(--fg)" strokeWidth="1" fill="none">
          <path d="M 16 16 L 16 28 M 16 16 L 28 16" />
          <path d="M 784 16 L 784 28 M 784 16 L 772 16" />
          <path d="M 16 517 L 16 505 M 16 517 L 28 517" />
          <path d="M 784 517 L 784 505 M 784 517 L 772 517" />
        </g>
        <text x="400" y="305" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">⌬ &nbsp; PROJECTION_001 &nbsp; ⌬</text>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

window.SceneStage = function SceneStage({ label = "STAGE/CONCERT_VIS", meta = "002" }) {
  return (
    <div className="scene ar-43" data-cursor="lg">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="stage1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="var(--bg-2)" />
        {/* truss / lights overhead */}
        <line x1="0" y1="80" x2="800" y2="80" stroke="var(--fg-2)" strokeWidth="0.6" />
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={i}>
            <rect x={50 + i * 70} y="70" width="20" height="20" fill="none" stroke="var(--fg-2)" strokeWidth="0.6" />
            <line x1={60 + i * 70} y1="90" x2={60 + i * 70} y2="600" stroke="var(--accent)" strokeOpacity={i % 2 === 0 ? 0.18 : 0.08} strokeWidth="0.5" />
          </g>
        ))}
        {/* stage glow */}
        <rect x="0" y="80" width="800" height="520" fill="url(#stage1)" />
        {/* silhouettes */}
        <g fill="var(--bg)" stroke="var(--fg)" strokeWidth="0.6">
          <path d="M 320 600 L 320 500 Q 320 470 350 470 Q 380 470 380 500 L 380 600 Z" />
          <circle cx="350" cy="455" r="14" />
          <path d="M 420 600 L 420 510 Q 420 480 450 480 Q 480 480 480 510 L 480 600 Z" />
          <circle cx="450" cy="465" r="14" />
        </g>
        {/* projected logo back */}
        <g opacity="0.6">
          <text x="400" y="260" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="56" letterSpacing="6">5MIINUST</text>
          <line x1="200" y1="290" x2="600" y2="290" stroke="var(--accent)" strokeOpacity="0.6" />
        </g>
        {/* foreground crowd dots */}
        <g fill="var(--fg)" opacity="0.6">
          {Array.from({ length: 80 }).map((_, i) => (
            <circle key={i} cx={(i * 47) % 800} cy={560 + (i % 4) * 8} r="1.6" />
          ))}
        </g>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

window.SceneTraining = function SceneTraining({ label = "LOKR/TRAIN·EPOCH_27", meta = "003" }) {
  return (
    <div className="scene ar-1" data-cursor="lg">
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="600" height="600" fill="var(--bg-2)" />
        {/* dataset thumbnails grid */}
        <g>
          {Array.from({ length: 27 }).map((_, i) => {
            const c = i % 9, r = Math.floor(i / 9);
            const x = 30 + c * 60, y = 30 + r * 60;
            const fill = i === 13 ? "var(--accent)" : "var(--bg-card)";
            return (
              <g key={i}>
                <rect x={x} y={y} width="50" height="50" fill={fill} stroke="var(--rule-c)" strokeWidth="0.5" />
                <line x1={x} y1={y + 25} x2={x + 50} y2={y + 25} stroke="var(--fg-3)" strokeWidth="0.4" />
                <line x1={x + 25} y1={y} x2={x + 25} y2={y + 50} stroke="var(--fg-3)" strokeWidth="0.4" />
              </g>
            );
          })}
        </g>
        {/* loss curve */}
        <g transform="translate(30 230)">
          <rect width="540" height="200" fill="none" stroke="var(--rule-c)" strokeWidth="0.5" />
          <text x="6" y="14" fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-3)">LOSS</text>
          <text x="510" y="14" fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-3)">EPOCH</text>
          <path d="M 0 20 C 100 70, 180 140, 260 160 S 460 188, 540 192"
                fill="none" stroke="var(--accent)" strokeWidth="1.2" />
          <path d="M 0 30 C 100 80, 180 150, 260 165 S 460 192, 540 195"
                fill="none" stroke="var(--fg-2)" strokeWidth="0.6" strokeDasharray="2 3" />
          {/* axis ticks */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={i * 54} y1="200" x2={i * 54} y2="195" stroke="var(--rule-c)" />
          ))}
        </g>
        {/* readout */}
        <g transform="translate(30 460)" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)">
          <text x="0" y="0">› ACE-STEP 1.5 XL TURBO</text>
          <text x="0" y="18">› RTX 4080 SUPER · 27 SAMPLES</text>
          <text x="0" y="36">› STYLE: RASTER-NOTON / ALVA NOTO</text>
          <text x="0" y="60" fill="var(--accent)">› STATUS: CONVERGED ✓</text>
        </g>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

window.SceneMapping = function SceneMapping({ label = "MAP/360·KUMU", meta = "004" }) {
  return (
    <div className="scene ar-169" data-cursor="lg">
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="800" height="450" fill="var(--bg-2)" />
        {/* unwrapped 360 panorama */}
        <g>
          {Array.from({ length: 36 }).map((_, i) => {
            const x = i * 22 + 4;
            return <line key={i} x1={x} y1="40" x2={x} y2="410" stroke="var(--rule-c)" strokeWidth="0.4" />;
          })}
          <line x1="0" y1="40" x2="800" y2="40" stroke="var(--fg-2)" strokeWidth="0.5" />
          <line x1="0" y1="410" x2="800" y2="410" stroke="var(--fg-2)" strokeWidth="0.5" />
        </g>
        {/* warped horizon */}
        <path d="M 0 250 Q 200 180, 400 240 T 800 220" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
        <path d="M 0 280 Q 200 210, 400 270 T 800 250" fill="none" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.8" />
        {/* projector marks */}
        <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--fg-3)" letterSpacing="1.5">
          <text x="20" y="30">P1</text><text x="220" y="30">P2</text><text x="420" y="30">P3</text><text x="620" y="30">P4</text>
        </g>
        <g stroke="var(--fg-2)" strokeWidth="0.5" fill="none">
          <polygon points="20,40 220,40 120,250 20,250" />
          <polygon points="220,40 420,40 320,250 120,250" />
          <polygon points="420,40 620,40 520,250 320,250" />
          <polygon points="620,40 800,40 800,250 520,250" />
        </g>
        {/* sun/moon orb */}
        <circle cx="600" cy="170" r="44" fill="var(--accent)" opacity="0.85" />
        <circle cx="600" cy="170" r="44" fill="none" stroke="var(--fg)" strokeWidth="0.4" />
        {/* scrim layer */}
        <rect x="0" y="40" width="800" height="370" fill="var(--fg)" opacity="0.04" />
        {/* readout */}
        <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-2)" letterSpacing="1.4">
          <text x="20" y="430">DISGUISE GX 3 · 4× PROJ · 360°</text>
          <text x="700" y="430" textAnchor="end">OP_PANK / KUMU</text>
        </g>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

window.SceneVision = function SceneVision({ label = "CV/YOLO·DETECT", meta = "005" }) {
  return (
    <div className="scene ar-32" data-cursor="lg">
      <svg viewBox="0 0 800 533" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="800" height="533" fill="var(--bg-2)" />
        {/* viewfinder */}
        <g stroke="var(--fg)" strokeWidth="0.6" fill="none" opacity="0.6">
          <line x1="0" y1="266" x2="800" y2="266" />
          <line x1="400" y1="0" x2="400" y2="533" />
          <line x1="266" y1="0" x2="266" y2="533" strokeDasharray="2 4" />
          <line x1="533" y1="0" x2="533" y2="533" strokeDasharray="2 4" />
        </g>
        {/* detection boxes */}
        {[
          [120, 130, 110, 180, "person·0.94"],
          [320, 160, 130, 220, "person·0.97"],
          [560, 110, 100, 170, "person·0.88"],
        ].map(([x, y, w, h, lbl], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill="none" stroke="var(--accent)" strokeWidth="1.2" />
            <rect x={x} y={y - 14} width={lbl.length * 6} height="14" fill="var(--accent)" />
            <text x={x + 3} y={y - 4} fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent-fg)">{lbl}</text>
          </g>
        ))}
        {/* face landmarks */}
        <g fill="var(--accent)">
          {[[180,180],[200,180],[195,205],[182,222],[206,222]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="1.5" />))}
        </g>
        {/* readout */}
        <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)" letterSpacing="1.3">
          <text x="20" y="30">▦ YOLO v8 · DEEPFACE</text>
          <text x="780" y="30" textAnchor="end">RPI 5</text>
          <text x="20" y="510">▶ FRAME 11342 · 30 FPS</text>
          <text x="780" y="510" textAnchor="end" fill="var(--accent)">DETECT 3</text>
        </g>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

window.SceneNode = function SceneNode({ label = "COMFY/NODE_GRAPH", meta = "006" }) {
  return (
    <div className="scene ar-43" data-cursor="lg">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="800" height="600" fill="var(--bg-2)" />
        {/* dot grid */}
        <g fill="var(--rule-c)">
          {Array.from({ length: 30 }).map((_, r) =>
            Array.from({ length: 40 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 20 + 10} r="0.6" />
            ))
          )}
        </g>
        {/* nodes */}
        {[
          { x: 40, y: 60, w: 160, h: 80, t: "LOAD CHECKPOINT" },
          { x: 40, y: 200, w: 160, h: 80, t: "CLIP TEXT (POS)" },
          { x: 40, y: 320, w: 160, h: 80, t: "CLIP TEXT (NEG)" },
          { x: 280, y: 140, w: 200, h: 220, t: "K·SAMPLER" },
          { x: 560, y: 200, w: 200, h: 100, t: "VAE DECODE" },
          { x: 560, y: 360, w: 200, h: 80, t: "SAVE IMAGE" },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} fill="var(--bg-card)" stroke="var(--fg-2)" strokeWidth="0.6" />
            <rect x={n.x} y={n.y} width={n.w} height="18" fill="var(--accent)" />
            <text x={n.x + 8} y={n.y + 13} fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-fg)" letterSpacing="1">{n.t}</text>
          </g>
        ))}
        {/* wires */}
        <g fill="none" stroke="var(--accent)" strokeWidth="1.1">
          <path d="M 200 100 C 240 100, 240 200, 280 200" />
          <path d="M 200 240 C 240 240, 240 240, 280 240" />
          <path d="M 200 360 C 240 360, 240 300, 280 300" />
          <path d="M 480 250 C 520 250, 520 250, 560 250" />
          <path d="M 660 300 C 660 360, 660 400, 660 360" />
          <path d="M 660 300 L 660 360" />
        </g>
        <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-3)">
          <text x="20" y="580">▦ COMFYUI · WORKFLOW · v3</text>
          <text x="780" y="580" textAnchor="end">FLUX · 1024² · 28 STEP</text>
        </g>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

window.SceneFestival = function SceneFestival({ label = "FEST/PROJ·LIVE", meta = "007" }) {
  return (
    <div className="scene ar-23" data-cursor="lg">
      <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="festsky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--bg-2)" />
            <stop offset="100%" stopColor="var(--bg)" />
          </linearGradient>
        </defs>
        <rect width="400" height="600" fill="url(#festsky)" />
        {/* pillars of light */}
        {[80, 160, 240, 320].map((x, i) => (
          <polygon key={i} points={`${x - 12},600 ${x + 12},600 ${x + 4},80 ${x - 4},80`} fill="var(--accent)" opacity={0.18 + (i % 2) * 0.1} />
        ))}
        {/* particles */}
        <g fill="var(--accent)">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 79) % 400} cy={(i * 53) % 580 + 20} r={(i % 3) * 0.6 + 0.6} opacity={0.4 + (i % 3) * 0.2} />
          ))}
        </g>
        {/* horizon */}
        <line x1="0" y1="500" x2="400" y2="500" stroke="var(--fg-2)" strokeWidth="0.5" />
        {/* skyline */}
        <g fill="var(--bg)" stroke="var(--fg)" strokeWidth="0.6">
          {Array.from({ length: 14 }).map((_, i) => {
            const x = i * 30, h = 30 + ((i * 17) % 60);
            return <rect key={i} x={x} y={500 - h} width="22" height={h} />;
          })}
        </g>
        {/* center logo */}
        <g transform="translate(200 280)">
          <circle r="58" fill="none" stroke="var(--accent)" strokeWidth="1" />
          <circle r="44" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
          <text textAnchor="middle" y="4" fontFamily="var(--font-mono)" fontSize="14" fill="var(--accent)" letterSpacing="3">EV/24</text>
        </g>
        <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-2)" letterSpacing="1.2">
          <text x="20" y="30">FESTIVAL · LIVE</text>
          <text x="380" y="30" textAnchor="end">EE/FI</text>
          <text x="20" y="580">TOUCHDESIGNER · NOTCH</text>
        </g>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

window.ScenePoster = function ScenePoster({ label = "FLUX/POSTER·v.04", meta = "008" }) {
  return (
    <div className="scene ar-23" data-cursor="lg">
      <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="600" fill="var(--bg-card)" />
        {/* poster */}
        <rect x="40" y="60" width="320" height="480" fill="var(--bg-2)" stroke="var(--fg-2)" strokeWidth="0.6" />
        {/* abstract shapes */}
        <g>
          <circle cx="200" cy="240" r="100" fill="var(--accent)" opacity="0.92" />
          <rect x="60" y="200" width="280" height="6" fill="var(--fg)" />
          <rect x="60" y="260" width="180" height="6" fill="var(--fg)" />
          {/* halftone speckle */}
          <g fill="var(--bg)" opacity="0.8">
            {Array.from({ length: 60 }).map((_, i) => (
              <circle key={i} cx={120 + ((i * 19) % 160)} cy={170 + ((i * 23) % 140)} r={(i % 3) * 0.6 + 0.4} />
            ))}
          </g>
        </g>
        {/* type stack */}
        <g fontFamily="var(--font-mono)" fill="var(--fg)">
          <text x="60" y="400" fontSize="38" letterSpacing="1">VEEBI/</text>
          <text x="60" y="438" fontSize="38" letterSpacing="1">KOOL</text>
          <text x="60" y="478" fontSize="11" fill="var(--fg-2)" letterSpacing="2">TLN · 24.04</text>
        </g>
        <text x="200" y="570" fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-3)" textAnchor="middle" letterSpacing="2">CUSTOM LoRA · FLUX · v04</text>
      </svg>
      <div className="scene-meta">{meta}</div>
      <div className="scene-label">{label}</div>
    </div>
  );
};

// Orb / hero centerpiece — reactive spinner
window.HeroOrb = function HeroOrb() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* halo */}
        <circle cx="900" cy="400" r="320" fill="url(#orb1)" />
        {/* concentric rings */}
        <g transform="translate(900 400)" fill="none" stroke="var(--accent)" strokeOpacity="0.6">
          <circle r="40" />
          <circle r="80" strokeOpacity="0.4" />
          <circle r="140" strokeOpacity="0.25" strokeDasharray="2 6" />
          <circle r="220" strokeOpacity="0.18" strokeDasharray="1 9" />
          <circle r="320" strokeOpacity="0.1" strokeDasharray="1 14" />
        </g>
        {/* horizon */}
        <line x1="0" y1="540" x2="1200" y2="540" stroke="var(--rule-c)" strokeWidth="0.6" />
        {/* tick markers */}
        <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-3)" letterSpacing="2">
          <text x="40" y="40">N 59°26'</text>
          <text x="40" y="780">E 24°45'</text>
          <text x="1160" y="40" textAnchor="end">001/006</text>
          <text x="1160" y="780" textAnchor="end">PRJ_2026.04</text>
        </g>
        {/* crosshair on orb */}
        <g stroke="var(--accent)" strokeOpacity="0.8" strokeWidth="0.6">
          <line x1="900" y1="370" x2="900" y2="430" />
          <line x1="870" y1="400" x2="930" y2="400" />
        </g>
      </svg>
    </div>
  );
};
