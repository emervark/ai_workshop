/* eslint-disable */
// Dedicated full-page components for About / Services / Portfolio / Contact

// ─── About ─────────────────────────────────────────────────────────
window.AboutPage = function AboutPage({ lang }) {
  const a = window.CONTENT[lang].about;
  return (
    <main className="page" data-screen-label="About">
      {/* Hero/intro band */}
      <section className="shell" style={{ paddingTop: "calc(var(--pad-y) * 1.4)", paddingBottom: "var(--pad-y)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--gap)", alignItems: "baseline", borderBottom: "var(--rule) solid var(--rule-c)", paddingBottom: "calc(var(--gap) * 1.2)" }}>
          <span className="kicker tn" style={{ color: "var(--fg-3)" }}>00</span>
          <span className="kicker">{a.kicker.toUpperCase()}</span>
        </div>
        <div className="reveal" style={{ paddingTop: "calc(var(--gap) * 2)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "calc(var(--gap) * 2)", alignItems: "start" }}>
          <h1 className="display" style={{ fontSize: "clamp(38px, 5.6vw, 88px)", lineHeight: 0.98, margin: 0, letterSpacing: "-0.02em" }}>
            Emer<br/>Värk<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <div style={{ display: "grid", gap: "calc(var(--gap) * 1.2)" }}>
            <p className="lead" style={{ fontSize: "clamp(18px, 1.6vw, 24px)", lineHeight: 1.35, margin: 0, color: "var(--fg)" }}>{a.lead}</p>
            <div className="mono uc" style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", fontSize: "var(--fs-mono)", color: "var(--fg-2)" }}>
              <span>› EE</span><span>› NORDICS</span><span>› EST. 2018</span><span>› ET / EN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bio body */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "calc(var(--gap) * 2)" }}>
          <div className="kicker tn" style={{ color: "var(--fg-3)" }}>BIO</div>
          <div style={{ display: "grid", gap: "calc(var(--gap) * 1.2)" }}>
            {a.bio.map((p, i) => (
              <p key={i} className="reveal" style={{ fontSize: "clamp(15px, 1.15vw, 18px)", lineHeight: 1.6, margin: 0, color: "var(--fg)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <window.SectionHd idx="A1" kicker={lang === "et" ? "Mis tööriistadega päriselt töötan" : "Tools I actually work with"} title={a.stackTitle} right={`0${a.stack.length}`} />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${a.stack.length}, 1fr)`, borderTop: "var(--rule) solid var(--rule-c)", borderBottom: "var(--rule) solid var(--rule-c)" }}>
          {a.stack.map((g, i) => (
            <div key={i} className={`reveal reveal-d${i + 1}`} style={{
              padding: "calc(var(--gap) * 1.2)",
              borderRight: i < a.stack.length - 1 ? "var(--rule) solid var(--rule-c)" : "0",
              display: "grid", gap: "calc(var(--gap) * 0.7)", alignContent: "start",
              minHeight: 200,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="kicker tn" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="kicker">{g.g.toUpperCase()}</span>
              </div>
              <ul className="mono" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6, fontSize: "var(--fs-mono)", color: "var(--fg)" }}>
                {g.items.map((it, j) => (
                  <li key={j} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--fg-3)" }}>›</span><span>{it}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What/where */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <window.SectionHd idx="A2" kicker={lang === "et" ? "Praegu" : "Right now"} title={a.whatTitle} right="—" />
        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "var(--rule) solid var(--rule-c)" }}>
          {a.what.map((w, i) => (
            <li key={i} className={`reveal reveal-d${i + 1}`} style={{ borderBottom: "var(--rule) solid var(--rule-c)", display: "grid", gridTemplateColumns: "60px 1.2fr 2fr", gap: "var(--gap)", alignItems: "baseline", padding: "calc(var(--gap) * 1) 0" }}>
              <span className="kicker tn" style={{ color: "var(--fg-3)" }}>{w.n}</span>
              <span className="h3" style={{ fontSize: "clamp(20px, 1.8vw, 28px)" }}>{w.t}</span>
              <span className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)" }}>{w.d}</span>
            </li>
          ))}
        </ul>
      </section>

      <window.CtaStrip lang={lang} />
    </main>
  );
};

// ─── Services (full) ───────────────────────────────────────────────
window.ServicesPage = function ServicesPage({ lang }) {
  const c = window.CONTENT[lang];
  const services = c.services;
  return (
    <main className="page" data-screen-label="Services">
      {/* Hero */}
      <section className="shell" style={{ paddingTop: "calc(var(--pad-y) * 1.4)", paddingBottom: "var(--pad-y)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "var(--gap)", alignItems: "baseline", borderBottom: "var(--rule) solid var(--rule-c)", paddingBottom: "calc(var(--gap) * 1.2)" }}>
          <span className="kicker tn" style={{ color: "var(--fg-3)" }}>02</span>
          <span className="kicker">{lang === "et" ? "TEENUSED" : "SERVICES"}</span>
          <span className="kicker tn">{`01—0${services.length}`}</span>
        </div>
        <div className="reveal" style={{ paddingTop: "calc(var(--gap) * 1.6)", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "calc(var(--gap) * 2)", alignItems: "end" }}>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5.4vw, 84px)", lineHeight: 0.98, margin: 0, letterSpacing: "-0.02em" }}>
            {lang === "et" ? "Viis viisi" : "Five ways"}<br/>
            {lang === "et" ? "koos töötada" : "to work together"}<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)", lineHeight: 1.55, margin: 0 }}>
            {lang === "et"
              ? "Hinnad on stardihinnad esimeseks 6 kuuks. Kõik teenused sisaldavad järeltuge. Mahukate produktsioonide jaoks PoCo Experience kaudu."
              : "Starter rates for the first 6 months. All engagements include after-care. Larger productions go through PoCo Experience."}
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "var(--rule) solid var(--rule-c)" }}>
          {services.map((s, i) => (
            <li key={s.idx} className={`reveal reveal-d${(i % 4) + 1}`} style={{ borderBottom: "var(--rule) solid var(--rule-c)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 280px", gap: "var(--gap)", padding: "calc(var(--gap) * 1.2) 0", alignItems: "start" }}>
                {/* idx column */}
                <div style={{ display: "grid", gap: 8 }}>
                  <span className="kicker tn" style={{ color: "var(--accent)" }}>{s.idx}</span>
                  <span className="kicker tn" style={{ color: "var(--fg-3)" }}>{String(i + 1).padStart(2, "0")}/{String(services.length).padStart(2, "0")}</span>
                </div>
                {/* main column */}
                <div style={{ display: "grid", gap: "calc(var(--gap) * 0.6)" }}>
                  <h2 className="h2" style={{ fontSize: "clamp(22px, 2.4vw, 38px)", lineHeight: 1.05, margin: 0, letterSpacing: "-0.01em" }}>{s.name}</h2>
                  <div className="mono uc" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
                    <span>› {s.format}</span>
                    <span style={{ color: "var(--fg-3)" }}>· {lang === "et" ? "kellele" : "for"}: {s.for}</span>
                  </div>
                  <p style={{ margin: "calc(var(--gap) * 0.4) 0 0", maxWidth: 720, fontSize: "clamp(14px, 1.05vw, 17px)", lineHeight: 1.55, color: "var(--fg)" }}>{s.body}</p>
                </div>
                {/* price column */}
                <div style={{ display: "grid", gap: 6, justifyItems: "end", textAlign: "right" }}>
                  <span className="mono tn uc" style={{ fontSize: "clamp(18px, 1.6vw, 24px)", color: "var(--accent)", letterSpacing: "0.02em" }}>{s.price}</span>
                  <span className="mono uc" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-3)" }}>{s.unit}</span>
                  <a href="contact.html" className="btn" style={{ marginTop: 12 }}>
                    {lang === "et" ? "Päri pakkumist" : "Request quote"}
                    <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Process inline */}
      <window.Process lang={lang} />

      {/* Notes */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--gap)", borderTop: "var(--rule) solid var(--rule-c)", borderBottom: "var(--rule) solid var(--rule-c)" }}>
          {[
            { k: "01", l: lang === "et" ? "Hindade kohta" : "On pricing", b: lang === "et" ? "Hinnad on stardihinnad esimeseks 6 kuuks. Lõplik hind kinnitatakse pärast vajaduste kaarti." : "Starter rates for the first 6 months. Final price is confirmed after the needs map." },
            { k: "02", l: lang === "et" ? "Mida teenused EI sisalda" : "What's NOT included", b: lang === "et" ? "Kasutaja-litsentsid (Runway, fal.ai, Midjourney). GPU-rent suuremate produktsioonide korral. Need vajaks eraldi pakkumist." : "User licenses (Runway, fal.ai, Midjourney). GPU rental for larger productions. Quoted separately." },
            { k: "03", l: lang === "et" ? "Tühistamine" : "Cancellation", b: lang === "et" ? "30 päeva varem 100% tagasi. 14 päeva varem 50%. Hilisem tühistamine — vaatame koos läbi." : "30 days before: 100% refund. 14 days: 50%. Later: we look at it together." },
          ].map((n, i) => (
            <div key={i} style={{ padding: "calc(var(--gap) * 1)", borderRight: i < 2 ? "var(--rule) solid var(--rule-c)" : "0", display: "grid", gap: 10, alignContent: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="kicker tn" style={{ color: "var(--accent)" }}>{n.k}</span>
                <span className="kicker">{n.l.toUpperCase()}</span>
              </div>
              <p className="mono" style={{ margin: 0, fontSize: "var(--fs-mono)", color: "var(--fg-2)", lineHeight: 1.55 }}>{n.b}</p>
            </div>
          ))}
        </div>
      </section>

      <window.CtaStrip lang={lang} />
    </main>
  );
};

// ─── Portfolio (full) ──────────────────────────────────────────────
window.PortfolioPage = function PortfolioPage({ lang }) {
  const c = window.CONTENT[lang];
  const works = c.portfolio;
  const sceneFor = (idx) => {
    const map = { "W/01": window.SceneProjection, "W/02": window.SceneMapping, "W/03": window.SceneStage, "W/04": window.SceneTraining, "W/05": window.SceneVision, "W/06": window.SceneFestival, "W/07": window.ScenePoster };
    return map[idx] || window.SceneNode;
  };
  // Filter chips
  const allTags = Array.from(new Set(works.flatMap(w => w.tags)));
  const [active, setActive] = React.useState("all");
  const filtered = active === "all" ? works : works.filter(w => w.tags.includes(active));

  return (
    <main className="page" data-screen-label="Portfolio">
      {/* Hero */}
      <section className="shell" style={{ paddingTop: "calc(var(--pad-y) * 1.4)", paddingBottom: "var(--pad-y)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "var(--gap)", alignItems: "baseline", borderBottom: "var(--rule) solid var(--rule-c)", paddingBottom: "calc(var(--gap) * 1.2)" }}>
          <span className="kicker tn" style={{ color: "var(--fg-3)" }}>03</span>
          <span className="kicker">{lang === "et" ? "TÖÖD · ARHIIV" : "WORK · ARCHIVE"}</span>
          <span className="kicker tn">{`0${works.length} ${lang === "et" ? "tk" : "ITEMS"}`}</span>
        </div>
        <div className="reveal" style={{ paddingTop: "calc(var(--gap) * 1.6)", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "calc(var(--gap) * 2)", alignItems: "end" }}>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5.4vw, 84px)", lineHeight: 0.98, margin: 0, letterSpacing: "-0.02em" }}>
            {lang === "et" ? "Tööd, mida saab" : "Work that can"}<br/>
            {lang === "et" ? "näidata" : "be shown"}<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)", lineHeight: 1.55, margin: 0 }}>
            {lang === "et"
              ? "Live-event, immersive, custom mudelid, computer vision. Aastatel 2024–2025. Mõned kliendid on nime all, mõned NDA all — pildikeel on vahel pelgalt skemaatiline."
              : "Live event, immersive, custom models, computer vision. 2024–2025. Some clients are named, others NDA — the imagery is sometimes only schematic."}
          </p>
        </div>
      </section>

      {/* Filter chips */}
      <section className="shell" style={{ paddingTop: 0, paddingBottom: "calc(var(--gap) * 1.2)" }}>
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 10, paddingTop: "calc(var(--gap) * 0.8)" }}>
          <FilterChip label={lang === "et" ? "kõik" : "all"} k="all" active={active} setActive={setActive} count={works.length} />
          {allTags.map(tg => (
            <FilterChip key={tg} label={tg} k={tg} active={active} setActive={setActive} count={works.filter(w => w.tags.includes(tg)).length} />
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="shell" style={{ paddingTop: "calc(var(--gap) * 0.6)", paddingBottom: "var(--pad-y)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "minmax(120px, auto)",
          gap: "var(--gap)",
        }}>
          {filtered.map((w, i) => {
            const span = w.size === "lg" ? "span 4" : w.size === "md" ? "span 3" : "span 2";
            const rowSpan = w.size === "lg" ? "span 2" : "span 1";
            return (
              <article key={w.idx} className={`reveal reveal-d${(i % 4) + 1}`}
                style={{ gridColumn: span, gridRow: rowSpan, display: "grid", gap: "calc(var(--gap) * 0.5)" }}>
                <window.WorkCard work={w} Scene={sceneFor(w.idx)} lang={lang} />
              </article>
            );
          })}
        </div>
      </section>

      {/* Index list (all) */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <window.SectionHd idx="P/IX" kicker={lang === "et" ? "Indeks · kogu portfoolio" : "Index · full archive"} title={lang === "et" ? "Indeks" : "Index"} right={`0${works.length}`} />
        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "var(--rule) solid var(--rule-c)" }}>
          {works.map((w, i) => (
            <li key={w.idx} className="reveal" style={{ borderBottom: "var(--rule) solid var(--rule-c)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "70px 60px 1.6fr 1.2fr 1.4fr auto", gap: "var(--gap)", alignItems: "baseline", padding: "calc(var(--gap) * 0.9) 0" }}>
                <span className="kicker tn" style={{ color: "var(--fg-3)" }}>{w.idx}</span>
                <span className="kicker tn" style={{ color: "var(--accent)" }}>{w.year}</span>
                <span className="h3" style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}>{w.title}</span>
                <span className="mono uc" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)" }}>{w.loc}</span>
                <span className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)" }}>{w.role}</span>
                <span className="mono uc" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-3)" }}>{w.tags.join(" · ")}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <window.CtaStrip lang={lang} />
    </main>
  );
};

function FilterChip({ label, k, active, setActive, count }) {
  const isActive = active === k;
  return (
    <button
      type="button"
      onClick={() => setActive(k)}
      className="mono uc"
      style={{
        appearance: "none",
        cursor: "pointer",
        padding: "8px 14px",
        background: isActive ? "var(--accent)" : "transparent",
        color: isActive ? "var(--accent-fg)" : "var(--fg)",
        border: "var(--rule) solid " + (isActive ? "var(--accent)" : "var(--rule-c)"),
        borderRadius: 999,
        fontSize: "var(--fs-mono)",
        letterSpacing: "0.06em",
        display: "inline-flex",
        gap: 8,
        alignItems: "baseline",
      }}
    >
      <span>{label}</span>
      <span style={{ opacity: 0.6, fontSize: "calc(var(--fs-mono) - 1px)" }}>{String(count).padStart(2, "0")}</span>
    </button>
  );
}

// ─── Contact (full) ────────────────────────────────────────────────
window.ContactPage = function ContactPage({ lang }) {
  const k = window.CONTENT[lang].contact;
  return (
    <main className="page" data-screen-label="Contact">
      {/* Hero */}
      <section className="shell" style={{ paddingTop: "calc(var(--pad-y) * 1.4)", paddingBottom: "var(--pad-y)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "var(--gap)", alignItems: "baseline", borderBottom: "var(--rule) solid var(--rule-c)", paddingBottom: "calc(var(--gap) * 1.2)" }}>
          <span className="kicker tn" style={{ color: "var(--fg-3)" }}>04</span>
          <span className="kicker">{k.kicker.toUpperCase()}</span>
          <span className="kicker tn">{lang === "et" ? "VASTAN < 2 PÄEVA" : "REPLY < 2 DAYS"}</span>
        </div>
        <div className="reveal" style={{ paddingTop: "calc(var(--gap) * 1.6)" }}>
          <h1 className="display" style={{ fontSize: "clamp(40px, 7vw, 120px)", lineHeight: 0.92, margin: 0, letterSpacing: "-0.025em" }}>
            {k.title}<br/>
            <span style={{ color: "var(--accent)" }}>{k.title2}</span><br/>
            <span style={{ color: "var(--fg-2)" }}>{k.title3}</span>
          </h1>
          <p style={{ marginTop: "calc(var(--gap) * 1.4)", maxWidth: 720, fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.5, color: "var(--fg)" }}>{k.lead}</p>
        </div>
      </section>

      {/* Form + channels */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "calc(var(--gap) * 2)", borderTop: "var(--rule) solid var(--rule-c)", borderBottom: "var(--rule) solid var(--rule-c)", padding: "calc(var(--gap) * 1.6) 0" }}>
          {/* Form */}
          <form className="reveal" onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: "calc(var(--gap) * 1)" }}>
            <FormRow label={lang === "et" ? "Nimi" : "Name"} idx="01">
              <input type="text" name="name" autoComplete="name" required className="cf-input" placeholder={lang === "et" ? "Eesnimi Perekonnanimi" : "First Last"} />
            </FormRow>
            <FormRow label={lang === "et" ? "Organisatsioon" : "Organisation"} idx="02">
              <input type="text" name="org" className="cf-input" placeholder={lang === "et" ? "Agentuur, brändimeeskond, …" : "Agency, brand team, …"} />
            </FormRow>
            <FormRow label="E-mail" idx="03">
              <input type="email" name="email" required className="cf-input" placeholder="you@example.com" />
            </FormRow>
            <FormRow label={lang === "et" ? "Vajadus" : "Need"} idx="04">
              <select name="need" className="cf-input">
                <option>{lang === "et" ? "1-päevane töötuba" : "1-day workshop"}</option>
                <option>{lang === "et" ? "Workflow-disain (2–4 nädalat)" : "Workflow design (2–4 weeks)"}</option>
                <option>{lang === "et" ? "Brändi pildi-stiili LoRA" : "Brand-style LoRA"}</option>
                <option>{lang === "et" ? "1-1 mentorlus" : "1-1 mentoring"}</option>
                <option>{lang === "et" ? "Custom konsultatsioon" : "Custom consultation"}</option>
                <option>{lang === "et" ? "Veel ei tea — vaja arutada" : "Don't know yet — let's talk"}</option>
              </select>
            </FormRow>
            <FormRow label={lang === "et" ? "Lühike kirjeldus" : "Short brief"} idx="05">
              <textarea name="brief" rows="5" className="cf-input" placeholder={lang === "et" ? "Praegune workflow, valupunktid, ajakava…" : "Current workflow, pain points, timeline…"} />
            </FormRow>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "calc(var(--gap) * 0.6)" }}>
              <span className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-3)" }}>
                {lang === "et" ? "› Vorm ei jõua nüüd kuhugi — saatke parem e-mailile" : "› Form is just a mock — please email"}
              </span>
              <button type="submit" className="btn" style={{ background: "var(--accent)", color: "var(--accent-fg)", borderColor: "var(--accent)" }}>
                {lang === "et" ? "Saada (mock)" : "Send (mock)"}
                <span className="arrow">→</span>
              </button>
            </div>
          </form>

          {/* Channels + book */}
          <aside style={{ display: "grid", gap: "calc(var(--gap) * 1.4)", alignContent: "start" }}>
            <div className="reveal">
              <div className="kicker tn" style={{ color: "var(--fg-3)", marginBottom: 12 }}>{lang === "et" ? "OTSE" : "DIRECT"}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                {k.channels.map((ch, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 12, paddingBottom: 10, borderBottom: "var(--rule) solid var(--rule-c)", alignItems: "baseline" }}>
                    <span className="kicker tn" style={{ color: "var(--fg-3)" }}>{ch.l.toUpperCase()}</span>
                    <span className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg)" }}>{ch.v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" style={{ padding: "calc(var(--gap) * 1.2)", border: "var(--rule) solid var(--accent)", display: "grid", gap: 10 }}>
              <span className="kicker tn" style={{ color: "var(--accent)" }}>{lang === "et" ? "TUTVUMISVESTLUS" : "INTRO CALL"}</span>
              <span className="h2" style={{ fontSize: "clamp(22px, 2vw, 30px)", lineHeight: 1.05, margin: 0 }}>{lang === "et" ? "30 min · tasuta" : "30 min · free"}</span>
              <p className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)", lineHeight: 1.55, margin: 0 }}>
                {lang === "et" ? "Otse kalendrist. Ei vaja vahel-vahetamist." : "Straight from the calendar. No back-and-forth."}
              </p>
              <a href="#" onClick={(e) => e.preventDefault()} className="btn" style={{ marginTop: 6, justifyContent: "center" }}>
                {k.book}<span className="arrow">→</span>
              </a>
            </div>

            <div className="reveal">
              <div className="kicker tn" style={{ color: "var(--fg-3)", marginBottom: 10 }}>{lang === "et" ? "MIS SIIN POLE" : "WHAT'S NOT HERE"}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
                {k.not.map((n, i) => (
                  <li key={i} className="mono" style={{ fontSize: "var(--fs-mono)", color: "var(--fg-2)", display: "flex", gap: 10 }}>
                    <span style={{ color: "var(--accent)" }}>×</span><span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <window.SectionHd idx="C/FAQ" kicker={lang === "et" ? "Korduvad küsimused" : "Frequently asked"} title="FAQ" right={`0${k.faq.length}`} />
        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "var(--rule) solid var(--rule-c)" }}>
          {k.faq.map((f, i) => (
            <FAQRow key={i} q={f.q} a={f.a} idx={String(i + 1).padStart(2, "0")} initial={i === 0} />
          ))}
        </ul>
      </section>
    </main>
  );
};

function FormRow({ label, idx, children }) {
  return (
    <label style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "var(--gap)", alignItems: "baseline", paddingBottom: 4 }}>
      <span className="kicker tn" style={{ color: "var(--fg-3)" }}>
        <span style={{ color: "var(--accent)" }}>{idx}</span> · {label.toUpperCase()}
      </span>
      <div>{children}</div>
    </label>
  );
}

function FAQRow({ q, a, idx, initial }) {
  const [open, setOpen] = React.useState(!!initial);
  return (
    <li className="reveal" style={{ borderBottom: "var(--rule) solid var(--rule-c)" }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{
        appearance: "none", background: "transparent", border: 0, padding: "calc(var(--gap) * 1) 0",
        width: "100%", textAlign: "left", cursor: "pointer", color: "var(--fg)",
        display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "var(--gap)", alignItems: "baseline",
      }}>
        <span className="kicker tn" style={{ color: open ? "var(--accent)" : "var(--fg-3)" }}>{idx}</span>
        <span className="h3" style={{ fontSize: "clamp(17px, 1.4vw, 22px)", margin: 0 }}>{q}</span>
        <span className="kicker tn" style={{ color: "var(--accent)", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", display: "inline-block", fontSize: 18 }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 600 : 0,
        overflow: "hidden",
        transition: "max-height 0.3s ease",
      }}>
        <p style={{
          margin: 0, padding: "0 0 calc(var(--gap) * 1.2) calc(60px + var(--gap))",
          maxWidth: 760, fontSize: "clamp(14px, 1.05vw, 17px)", lineHeight: 1.6, color: "var(--fg-2)",
        }}>{a}</p>
      </div>
    </li>
  );
}
