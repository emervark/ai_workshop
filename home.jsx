// Home / Index page sections
const { useState: uS, useEffect: uE, useRef: uR } = React;

// ─── Section header ─────────────────────────────────────────────────
window.SectionHd = function SectionHd({ idx, title, kicker, right }) {
  return (
    <div className="reveal" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "var(--gap)", alignItems: "baseline", padding: "calc(var(--pad-y) * 0.6) 0 calc(var(--gap) * 1.4)" }}>
      <div className="kicker tn">{idx}</div>
      <div>
        <div className="kicker" style={{ marginBottom: 6 }}>{kicker}</div>
        <h2 className="h2">{title}</h2>
      </div>
      <div className="kicker" style={{ alignSelf: "end" }}>{right}</div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────
window.Hero = function Hero({ lang, t }) {
  const c = window.CONTENT[lang].home;
  // Allow tweak overrides for the two hero lines
  const line1 = lang === "et" ? (t.heroLine1Et || c.heroLine1) : (t.heroLine1En || c.heroLine1);
  const line2 = lang === "et" ? (t.heroLine2Et || c.heroLine2) : (t.heroLine2En || c.heroLine2);

  // For typewriter-ish effect on right rail
  const tags = ["ComfyUI", "Flux", "LoRA", "Runway", "Kling", "Veo", "ACE-Step", "TouchDesigner", "Notch", "Resolume", "fal.ai", "Nanobanana"];
  const tagsRef = uR(null);
  const [tagIdx, setTagIdx] = uS(0);
  uE(() => {
    const id = setInterval(() => setTagIdx((i) => (i + 1) % tags.length), 1700);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero shell" style={{ position: "relative", paddingTop: "calc(var(--pad-y) * 1.2)", paddingBottom: "calc(var(--pad-y) * 1)", minHeight: "min(92vh, 920px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {/* Decorative orb behind */}
      <div data-parallax="0.06" style={{ position: "absolute", inset: 0, opacity: 0.85 }}>
        <window.HeroOrb />
      </div>

      {/* Top meta strip */}
      <div className="reveal" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "var(--gap)", paddingTop: 24, color: "var(--fg-2)" }}>
        <div className="mono uc" style={{ fontSize: "var(--fs-mono)" }}>
          <div style={{ color: "var(--fg-3)", marginBottom: 4 }}>① TAGLINE</div>
          {window.CONTENT[lang].meta.tagline}
        </div>
        <div className="mono uc" style={{ fontSize: "var(--fs-mono)" }}>
          <div style={{ color: "var(--fg-3)", marginBottom: 4 }}>② BASED</div>
          {window.CONTENT[lang].meta.based}
        </div>
        <div className="mono uc" style={{ fontSize: "var(--fs-mono)" }}>
          <div style={{ color: "var(--fg-3)", marginBottom: 4 }}>③ ROLE</div>
          {window.CONTENT[lang].meta.role}
        </div>
        <div className="mono uc" style={{ fontSize: "var(--fs-mono)", textAlign: "right" }}>
          <div style={{ color: "var(--fg-3)", marginBottom: 4 }}>④ STACK</div>
          <span ref={tagsRef} style={{ color: "var(--accent)" }}>› {tags[tagIdx]}</span>
        </div>
      </div>

      {/* Center: massive title */}
      <div style={{ position: "relative", margin: "auto 0" }}>
        <h1 className="h1 reveal" style={{ maxWidth: "16ch", marginBottom: "calc(var(--gap) * 1.2)" }}>
          <span className="mask-line"><span>{line1}</span></span>
          <br />
          <span className="mask-line"><span style={{ color: "var(--accent)" }}>{line2}</span></span>
        </h1>
        <div className="reveal reveal-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap)", alignItems: "end" }}>
          <p style={{ fontSize: "var(--fs-lead)", lineHeight: 1.35, maxWidth: "44ch", color: "var(--fg-2)", margin: 0 }}>
            {c.heroSub}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <a href="services.html" className="btn btn-primary">
              {c.ctaPrimary}<span className="arrow">→</span>
            </a>
            <a href="contact.html" className="btn">
              {c.ctaSecondary}<span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom marker */}
      <div className="reveal reveal-d3" style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "calc(var(--gap) * 2)", color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-micro)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        <span>↓ INDEX 01—06</span>
        <span className="tn">{new Date().getFullYear()} — currently booking</span>
      </div>
    </section>
  );
};

// ─── Index list (museum-catalog-style) ─────────────────────────────────
window.IndexList = function IndexList({ lang }) {
  const c = window.CONTENT[lang].home;
  return (
    <section className="shell" style={{ paddingTop: "calc(var(--pad-y) * 0.7)", paddingBottom: "calc(var(--pad-y) * 0.5)" }}>
      <hr className="rule" />
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "calc(var(--gap) * 2)", padding: "calc(var(--gap) * 1.2) 0" }}>
        <div className="kicker">{c.indexTitle}</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 0 }}>
          {c.sections.map((s, i) => {
            const targets = ["#hero", "#why", "services.html", "portfolio.html", "about.html", "contact.html"];
            return (
              <li key={s.n}>
                <a href={targets[i]} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "var(--gap)", alignItems: "baseline", padding: "16px 0", borderTop: i === 0 ? "var(--rule) solid var(--rule-c)" : "0", borderBottom: "var(--rule) solid var(--rule-c)" }}>
                  <span className="kicker tn">{s.n}</span>
                  <span className="h3" style={{ fontSize: "clamp(22px, 2.4vw, 38px)" }}>{s.t}</span>
                  <span className="kicker tn" style={{ color: "var(--fg-3)" }}>SEE →</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

// ─── Why — 3 reasons ────────────────────────────────────────────────
window.Why = function Why({ lang }) {
  const c = window.CONTENT[lang].home;
  return (
    <section className="shell" id="why" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
      <window.SectionHd idx="02" kicker={c.whyKicker} title={c.whyTitle} right="01—03" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderTop: "var(--rule) solid var(--rule-c)" }}>
        {c.why.map((w, i) => (
          <div key={w.n} className={`reveal reveal-d${i + 1}`} style={{
            padding: "calc(var(--gap) * 1.4) calc(var(--gap) * 1.2)",
            borderRight: i < 2 ? "var(--rule) solid var(--rule-c)" : "0",
            borderBottom: "var(--rule) solid var(--rule-c)",
            display: "grid", gap: "calc(var(--gap) * 0.8)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="kicker tn" style={{ color: "var(--accent)" }}>{w.n}</span>
              <span className="kicker">{w.k}</span>
            </div>
            <h3 className="h3" style={{ fontSize: "clamp(20px, 1.8vw, 28px)" }}>{w.t}</h3>
            <p style={{ color: "var(--fg-2)", margin: 0 }}>{w.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Services preview (compact) ─────────────────────────────────────
window.ServicesPreview = function ServicesPreview({ lang }) {
  const home = window.CONTENT[lang].home;
  const services = window.CONTENT[lang].services;
  return (
    <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
      <window.SectionHd idx="03" kicker={home.servicesPreviewKicker} title={home.servicesPreviewTitle} right={`01—0${services.length}`} />
      <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "var(--rule) solid var(--rule-c)" }}>
        {services.map((s, i) => (
          <li key={s.idx} className="reveal" style={{ borderBottom: "var(--rule) solid var(--rule-c)" }}>
            <a href="services.html" style={{ display: "grid", gridTemplateColumns: "80px 1.4fr 1fr 1fr auto", gap: "var(--gap)", alignItems: "baseline", padding: "calc(var(--gap) * 0.9) 0" }}>
              <span className="kicker tn" style={{ color: "var(--fg-3)" }}>{s.idx}</span>
              <span className="h3" style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }}>{s.name}</span>
              <span className="mono uc" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)" }}>{s.format}</span>
              <span className="mono tn uc" style={{ fontSize: "var(--fs-mono)", color: "var(--accent)" }}>{s.price}<span style={{ color: "var(--fg-3)" }}> {s.unit}</span></span>
              <span className="kicker">→</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="reveal" style={{ paddingTop: "calc(var(--gap) * 1.5)", display: "flex", justifyContent: "flex-end" }}>
        <a href="services.html" className="btn">{home.servicesAll}<span className="arrow">→</span></a>
      </div>
    </section>
  );
};

// ─── Portfolio preview — asymmetric grid (small set) ───────────────
window.PortfolioPreview = function PortfolioPreview({ lang }) {
  const home = window.CONTENT[lang].home;
  const works = window.CONTENT[lang].portfolio.slice(0, 4);
  const sceneFor = (idx) => {
    const map = { "W/01": window.SceneProjection, "W/02": window.SceneMapping, "W/03": window.SceneStage, "W/04": window.SceneTraining, "W/05": window.SceneVision, "W/06": window.SceneFestival, "W/07": window.ScenePoster };
    return map[idx] || window.SceneNode;
  };
  return (
    <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
      <window.SectionHd idx="04" kicker={home.portfolioPreviewKicker} title={home.portfolioPreviewTitle} right="SELECT" />
      <div style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: "var(--gap)" }}>
        {/* Big left */}
        <div className="reveal">
          <window.WorkCard work={works[0]} Scene={sceneFor(works[0].idx)} lang={lang} />
        </div>
        {/* Right column stacks */}
        <div style={{ display: "grid", gap: "var(--gap)" }}>
          <div data-parallax="0.04" className="reveal reveal-d1">
            <window.WorkCard work={works[1]} Scene={sceneFor(works[1].idx)} lang={lang} />
          </div>
          <div className="reveal reveal-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap)" }}>
            <window.WorkCard work={works[2]} Scene={sceneFor(works[2].idx)} lang={lang} compact />
            <window.WorkCard work={works[3]} Scene={sceneFor(works[3].idx)} lang={lang} compact />
          </div>
        </div>
      </div>
      <div className="reveal" style={{ paddingTop: "calc(var(--gap) * 1.5)", display: "flex", justifyContent: "flex-end" }}>
        <a href="portfolio.html" className="btn">{home.portfolioAll}<span className="arrow">→</span></a>
      </div>
    </section>
  );
};

window.WorkCard = function WorkCard({ work, Scene, lang, compact }) {
  return (
    <a href="portfolio.html" style={{ display: "block" }}>
      <Scene label={`${work.idx} · ${work.title.toUpperCase()}`} meta={work.year} />
      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "auto 1fr auto", gap: "var(--gap)", padding: "calc(var(--gap) * 0.6) 4px", alignItems: "baseline" }}>
        {!compact && <span className="kicker tn" style={{ color: "var(--fg-3)" }}>{work.idx}</span>}
        <span className="h3" style={{ fontSize: compact ? "clamp(14px, 1.2vw, 18px)" : "clamp(18px, 1.6vw, 26px)" }}>{work.title}</span>
        {!compact && <span className="mono uc" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)" }}>{work.loc}</span>}
      </div>
      {!compact && (
        <div className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)", padding: "0 4px 8px", display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
          {work.stack.map((s, i) => (<span key={i}>› {s}</span>))}
        </div>
      )}
    </a>
  );
};

// ─── Process — 4 steps ─────────────────────────────────────────────
window.Process = function Process({ lang }) {
  const c = window.CONTENT[lang];
  return (
    <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
      <window.SectionHd idx="05" kicker={c.home.processKicker} title={c.home.processTitle} right="01—04" />
      <div style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "var(--rule) solid var(--rule-c)", borderBottom: "var(--rule) solid var(--rule-c)" }}>
          {c.process.map((p, i) => (
            <div key={p.n} className={`reveal reveal-d${i + 1}`} style={{
              padding: "calc(var(--gap) * 1.2)",
              borderRight: i < 3 ? "var(--rule) solid var(--rule-c)" : "0",
              display: "grid", gap: "calc(var(--gap) * 0.8)",
              alignContent: "start",
              minHeight: 240,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="kicker tn" style={{ color: "var(--accent)" }}>{p.n}</span>
                <span className="kicker">{p.d}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", border: "var(--rule) solid var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 10 }}>{i + 1}</span>
                {i < 3 && <span style={{ flex: 1, height: 1, background: "var(--rule-c)" }} />}
              </div>
              <h3 className="h3" style={{ fontSize: "clamp(18px, 1.4vw, 22px)" }}>{p.t}</h3>
              <p style={{ color: "var(--fg-2)", margin: 0, fontSize: "calc(var(--fs-body) * 0.95)" }}>{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA strip + marquee ────────────────────────────────────────────
window.CtaStrip = function CtaStrip({ lang }) {
  const c = window.CONTENT[lang];
  return (
    <section style={{ paddingTop: "calc(var(--pad-y) * 0.6)" }}>
      {/* Marquee */}
      <div className="reveal" style={{ overflow: "hidden", borderTop: "var(--rule) solid var(--rule-c)", borderBottom: "var(--rule) solid var(--rule-c)", padding: "calc(var(--gap) * 0.8) 0" }}>
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <React.Fragment key={k}>
              <span>EMER VÄRK</span>
              <span className="star" style={{ color: "var(--accent)" }}>✦</span>
              <span>AI · VISUAL PRODUCTION</span>
              <span className="star">✦</span>
              <span>PRACTITIONER</span>
              <span className="star">✦</span>
              <span>NOT A DEMO</span>
              <span className="star">✦</span>
              <span>EMER VÄRK</span>
              <span className="star">✦</span>
              <span>AI · VISUAL PRODUCTION</span>
              <span className="star">✦</span>
              <span>PRACTITIONER</span>
              <span className="star">✦</span>
              <span>NOT A DEMO</span>
              <span className="star">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="shell reveal" style={{ paddingTop: "calc(var(--pad-y) * 1.2)", paddingBottom: "calc(var(--pad-y) * 1.2)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap)", alignItems: "end" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 12 }}>06 · KONTAKT</div>
          <h2 className="h2" style={{ maxWidth: "16ch" }}>
            <span style={{ color: "var(--accent)" }}>↘</span> {c.home.footerCta}
          </h2>
        </div>
        <div style={{ display: "grid", gap: 16, justifyItems: "end" }}>
          <p style={{ color: "var(--fg-2)", maxWidth: "36ch", textAlign: "right", margin: 0 }}>{c.home.footerCtaSub}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href="contact.html" className="btn btn-primary">{c.nav.book}</a>
            <a href="mailto:emer@example.ee" className="btn">emer@example.ee</a>
          </div>
        </div>
      </div>
    </section>
  );
};
