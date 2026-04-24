const { useState, useEffect, useRef } = React;

// ========== Language Splash ==========
function LangSplash({ onPick }) {
  const [fading, setFading] = React.useState(false);
  function handlePick(code) {
    setFading(true);
    setTimeout(() => onPick(code), 400);
  }
  const langs = [
    { code: "ar", flag: "🇸🇦", name: "العربية", native: "Arabic" },
    { code: "en", flag: "🇬🇧", name: "English", native: "الإنجليزية" },
    { code: "ur", flag: "🇵🇰", name: "اُردُو", native: "Urdu" },
    { code: "hi", flag: "🇮🇳", name: "हिन्दी", native: "Hindi" },
  ];
  return (
    <section className="lang-screen" data-screen-label="Language Splash" style={{opacity: fading ? 0 : 1, transition: 'opacity 0.4s ease'}}>
      <div className="lang-card">
        <div className="lang-logos">
          <img src="assets/ministry-logo.png" alt="Ministry"/>
          <span className="divider"/>
          <img src="assets/festival-logo.png" alt="Festival"/>
        </div>
        <div className="lang-welcome">
          <span>مرحباً بكم</span>
        </div>
        <p className="lang-sub">اختر لغتك</p>
        <div className="lang-grid">
          {langs.map(l => (
            <button key={l.code} className="lang-btn" onClick={() => handlePick(l.code)}>
              <span className="flag">{l.flag}</span>
              <div>
                <span className="name">{l.name}</span>
                <span className="native">{l.native}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== Header ==========
function Header({ t, onChangeLang }) {
  return (
    <header className="site-header" data-screen-label="Header">
      <div className="header-inner">
        <div className="brand">
          <img src="assets/festival-logo.png" alt="Festival logo"/>
          <span className="v-div"/>
          <img src="assets/ministry-logo.png" alt="Ministry logo"/>
        </div>
        <div className="header-tools">
          <button className="tool-btn" onClick={onChangeLang} title={t.ui.language}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
            </svg>
            <span>{t.ui.language}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ========== Hero with video ==========
function Hero({ t }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", "#" + id);
  };

  return (
    <section className="hero" data-screen-label="Hero">
      <video className="hero-video"
        src="assets/hero.mp4"
        autoPlay muted loop playsInline preload="auto"/>
      <div className="hero-overlay"/>
      <div className="hero-overlay-2"/>
      <div className="hero-inner">
        <span className="hero-chip">✦ {t.hero.chip}</span>
        <h1 className="hero-title">{t.hero.title}</h1>
        <div className="hero-since">
          <b>{t.hero.years}</b>
          <span>· {t.hero.since}</span>
        </div>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-meta">
          <span className="mi">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>
            </svg>
            {t.hero.location}
          </span>
          <span className="mi">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>
            </svg>
            {t.hero.edition}
          </span>
        </div>
        <div className="hero-ctas">
          <button type="button" className="btn btn-primary" onClick={() => scrollToSection("about")}>{t.hero.cta_about}</button>
          <button type="button" className="btn btn-ghost" onClick={() => scrollToSection("events")}>{t.hero.cta_events}</button>
        </div>
      </div>
    </section>
  );
}

// ========== Quick Nav ==========
function QuickNav({ t }) {
  const items = [
    { href: "#about", key: "about" },
    { href: "#map", key: "map" },
    { href: "#offer", key: "offer" },
    { href: "#events", key: "events" },
    { href: "#location", key: "location" },
  ];
  return (
    <nav className="quick-nav">
      <div className="qn-inner">
        {items.map(i => (
          <a key={i.key} className="qn" href={i.href}>
            <span>{t.nav[i.key]}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// ========== About ==========
function About({ t }) {
  return (
    <section id="about" className="section" data-screen-label="About">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2>{t.about.title}</h2>
        </header>
        <div className="about-grid">
          <div className="about-text">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <div className="about-block reveal d1">
              <h3>{t.about.support_title}</h3>
              <p>{t.about.support}</p>
            </div>
            <div className="about-pills reveal d3">
              <h3>{t.about.goals_title}</h3>
              <div className="pill-grid pill-grid-wide">
                {t.about.goals.map((item, index) => (
                  <span className="info-pill info-pill-wide" key={index}>{item}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="stats">
            {t.about.stats.map((s, i) => (
              <div className={"stat reveal d" + ((i%3)+1)} key={i}>
                <b>{s.n}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== Interactive Map ==========
function FestivalMap({ t }) {
  const [active, setActive] = useState("pavilions");
  const [familiesOffset, setFamiliesOffset] = useState(() => {
    const v = localStorage.getItem("mf_families_offset");
    return v === null ? 0 : parseFloat(v);
  });
  useEffect(() => { localStorage.setItem("mf_families_offset", String(familiesOffset)); }, [familiesOffset]);
  useEffect(() => {
    const onTweak = (e) => {
      if (e.detail && typeof e.detail.familiesOffset === "number") {
        setFamiliesOffset(e.detail.familiesOffset);
      }
    };
    window.addEventListener("mf-tweaks-change", onTweak);
    return () => window.removeEventListener("mf-tweaks-change", onTweak);
  }, []);
  // Zones laid out to match the satellite image of the Qunfudhah public park
  // (long walkway from west toward a circular plaza to the east)
  const zones = [
    // 1) Parking — far-left street
    { key: "parking",   fill: "rgba(31,58,104,0.55)",  border: "rgba(80,130,220,0.95)", label: t.map.zones.parking.name,
      style: { left: "2%",  top: "4%",  width: "9%", height: "92%", borderRadius: "10px" } },

    // 2) Gate — start of the walkway (west end)
    { key: "gate",      fill: "rgba(255,255,255,0.95)", border: "rgba(200,200,200,1)",
      textColor: "#0c3b1f", label: t.map.zones.gate.name,
      style: { left: "12.5%", top: "42%", width: "8.5%", height: "14%", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 900, textShadow: "none" } },

    // 3) Farmers pavilions — aligned with the black kiosk rows on both sides
    { key: "pavilions", fill: "rgba(255,126,26,0.6)",  border: "rgba(255,126,26,1)", label: t.map.zones.pavilions.name,
      style: { left: "22%", top: "39%", width: "35%", height: "5%", borderRadius: "6px", fontSize: "0.72rem" } },
    { key: "pavilions2",fill: "rgba(255,126,26,0.6)",  border: "rgba(255,126,26,1)", label: t.map.zones.pavilions.name,
      linkTo: "pavilions",
      style: { left: "22%", top: "60%", width: "35%", height: "5%", borderRadius: "6px", fontSize: "0.72rem" } },

    // 4) Productive families — left edge of circular plaza (vertical strips)
    { key: "families",  fill: "rgba(184,137,90,0.9)",  border: "rgba(150,100,50,1)", label: t.map.zones.families.name,
      labelStyle: { whiteSpace: "pre-line", lineHeight: "1.1", fontSize: "0.6rem", fontWeight: 900 },
      style: { left: "59.5%", top: (20 - familiesOffset) + "%", width: "10.5%", height: "24%", borderRadius: "7px", transform: "rotate(40deg)", fontSize: "0.62rem", fontWeight: 900, textShadow: "0 1px 4px rgba(0,0,0,0.95)" } },
    { key: "families2", fill: "rgba(184,137,90,0.9)",  border: "rgba(150,100,50,1)", label: t.map.zones.families.name,
      linkTo: "families",
      labelStyle: { whiteSpace: "pre-line", lineHeight: "1.1", fontSize: "0.6rem", fontWeight: 900 },
      style: { left: "59.5%", top: (56 - familiesOffset) + "%", width: "10.5%", height: "24%", borderRadius: "7px", transform: "rotate(-45deg)", fontSize: "0.62rem", fontWeight: 900, textShadow: "0 1px 4px rgba(0,0,0,0.95)" } },

    // 5) Stage — square area inside the circular plaza
    { key: "stage",     fill: "rgba(42,167,101,0.55)",  border: "rgba(42,167,101,1)", label: t.map.zones.stage.name,
      style: { left: "78%", top: "40%", width: "15%", height: "25%", borderRadius: "10px" } },
  ];
  const activeKey = zones.find(z => z.key === active)?.linkTo || active;
  const current = t.map.zones[activeKey];
  const legendZones = zones.filter(z => !z.linkTo);
  const activeZone = zones.find(z => (z.linkTo || z.key) === activeKey) || zones[0];

  return (
    <section id="map" className="section section-alt" data-screen-label="Map">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">{t.map.eyebrow}</span>
          <h2>{t.map.title}</h2>
          <p className="section-sub">{t.map.sub}</p>
        </header>
        <div className="map-wrap">
          <div className="park-map">
            <img src="assets/park-satellite.png" alt={t.location.map_alt} className="park-map-bg"/>
            <div className="park-map-dim"/>
            {zones.map(z => {
              const clickKey = z.linkTo || z.key;
              const isActive = activeKey === (z.linkTo || z.key);
              return (
                <button
                  key={z.key}
                  className={"zone-btn" + (isActive ? " active" : "")}
                  onClick={() => setActive(clickKey)}
                  style={{
                    ...z.style,
                    background: z.fill,
                    borderColor: z.border,
                    clipPath: z.clipPath,
                    color: z.textColor || "#fff",
                  }}>
                  <span className="zone-label" style={z.labelStyle}>{z.label}</span>
                </button>
              );
            })}
            <div className="zone-inline-info" key={"inline-" + activeKey}>
              <span
                className="zone-chip"
                style={{
                  background: activeZone.fill,
                  border: "1px solid " + activeZone.border,
                  color: activeZone.textColor || "#fff",
                }}>
                {current.name}
              </span>
              <p>{current.desc}</p>
            </div>
          </div>
          <aside className="zone-info" key={activeKey}>
            <span className="zone-chip">{current.name}</span>
            <h3>{current.name}</h3>
            <p>{current.desc}</p>
            <div className="legend-grid">
              {legendZones.map(z => (
                <button
                  className={"lg" + (activeKey === z.key ? " active" : "")}
                  key={z.key}
                  onClick={() => setActive(z.key)}>
                  <span className="dot" style={{background: z.fill, borderColor: z.border}}/>
                  <span>{t.map.zones[z.key].name}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ========== Offer ==========
function Offer({ t }) {
  return (
    <section id="offer" className="section" data-screen-label="Offer">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">{t.offer.eyebrow}</span>
          <h2>{t.offer.title}</h2>
        </header>
        <div className="offer-grid offer-grid-compact">
          {t.offer.items.map((it, i) => (
            <article className={"offer-card reveal d" + ((i%3)+1)} key={i}>
              {it.img ? (
                <div className="offer-thumb">
                  <img src={it.img} alt={it.t} loading="lazy"/>
                  {it.badge ? <span className="offer-tag">{it.badge}</span> : null}
                </div>
              ) : null}
              <h4>{it.t}</h4>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== Events Timeline ==========
function Events({ t }) {
  const [activeDay, setActiveDay] = useState(3);
  const images = [
    "uploads/event-day-1.jpeg",
    "uploads/event-day-2.jpeg",
    "uploads/event-day-3.jpeg",
  ];

  return (
    <section id="events" className="section section-alt" data-screen-label="Events">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">{t.events.eyebrow}</span>
          <h2>{t.events.title}</h2>
          <p className="section-sub">{t.events.sub}</p>
        </header>
        <div className="events-ctrls">
          {t.events.list.map((event, i) => {
            const dayLabel = t.events.days[i] || "";
            const isActive = activeDay === event.day;
            return (
              <button
                key={event.day}
                className={"day-pill" + (isActive ? " active" : "")}
                onClick={() => setActiveDay(event.day)}>
                <b>{String(event.day).padStart(2, "0")}</b>
                <span>{dayLabel}</span>
              </button>
            );
          })}
        </div>

        {(() => {
          const selected = t.events.list.find(e => e.day === activeDay) || t.events.list[0];
          const selectedIndex = Math.max(0, t.events.list.findIndex(e => e.day === selected.day));
          const dayLabel = t.events.days[selectedIndex] || "";
          const thuImage = "uploads/event-day-4-thu.jpeg";
          const friImage = "uploads/event-day-5-fri.jpeg";

          const wedGallery = [
            "uploads/wed-extra1.jpeg",
            "uploads/wed-extra2.jpeg",
          ];

          if (selected.day === 1) {
            return (
              <div className="events-cards wed-cards-list">
                {wedGallery.map((src, gi) => (
                  <article className="event-day-card" key={gi}>
                    <div className="wed-single-img">
                      <img src={src} alt={selected.title + " " + (gi+1)} loading="lazy"/>
                    </div>
                    {gi === 0 && (
                      <div className="event-day-body">
                        <h3>{selected.title}</h3>
                        <div className="event-date-line">{selected.date}</div>
                        <p className="event-desc">{selected.desc}</p>
                        <div className="meta">
                          <span>{selected.time}</span>
                          <span>{selected.place}</span>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            );
          }

          if (selected.day === 2) {
            return (
              <div className="events-cards">
                <article className="event-day-card" key={selected.day}>
                  <div className="event-day-image">
                    <img src={thuImage} alt={selected.title} loading="lazy"/>
                    <span className="event-day-badge">{dayLabel}</span>
                  </div>
                  <div className="event-day-body">
                    <h3>{selected.title}</h3>
                    <div className="event-date-line">{selected.date}</div>
                    <p className="event-desc">{selected.desc}</p>
                    <div className="meta">
                      <span>{selected.time}</span>
                      <span>{selected.place}</span>
                    </div>
                  </div>
                </article>
              </div>
            );
          }

          if (selected.day === 3) {
            return (
              <div className="events-cards">
                <article className="event-day-card" key={selected.day}>
                  <div className="event-day-image">
                    <img src={friImage} alt={selected.title} loading="lazy"/>
                    <span className="event-day-badge">{dayLabel}</span>
                  </div>
                </article>
              </div>
            );
          }

          return (
            <div className="events-cards">
              <article className="event-day-card" key={selected.day}>
                <div className="event-day-image">
                  <img src={images[selectedIndex] || images[0]} alt={selected.title} loading="lazy"/>
                  <span className="event-day-badge">{dayLabel}</span>
                </div>
                <div className="event-day-body">
                  <h3>{selected.title}</h3>
                  <div className="event-date-line">{selected.date}</div>
                  <p className="event-desc">{selected.desc}</p>
                  <div className="meta">
                    <span>{selected.time}</span>
                    <span>{selected.place}</span>
                  </div>
                </div>
              </article>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

// ========== Location + Share ==========
function Location({ t }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = t.hero.title + " — " + t.hero.chip;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  const handleNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: shareText, text: t.hero.sub, url: shareUrl }); } catch {}
    } else { handleCopy(); }
  };
  const handlePlatformOpen = async (url) => {
    await handleCopy();
    window.open(url, "_blank", "noopener");
  };

  const q = encodeURIComponent(shareText + " — " + shareUrl);
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(t.location.map_query);
  const dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(t.location.map_query);

  return (
    <section id="location" className="section" data-screen-label="Location">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">{t.location.eyebrow}</span>
          <h2>{t.location.title}</h2>
        </header>
        <div className="loc-grid">
          <div className="loc-info">
            <div className="loc-row">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
              <div>
                <b>{t.location.addr_label}</b>
                <span>{t.location.addr_value}</span>
              </div>
            </div>
            <div className="loc-row">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
              </svg>
              <div>
                <b>{t.location.hours_label}</b>
                <span>{t.location.hours_value}</span>
              </div>
            </div>
            <div className="loc-cta-group">
              <a className="btn btn-primary" target="_blank" rel="noopener" href={dirUrl}>
                {t.location.directions}
              </a>
              <a className="btn btn-ghost" style={{color: "var(--green-deep)", borderColor: "var(--line)"}} target="_blank" rel="noopener" href={mapsUrl}>
                {t.location.open_maps}
              </a>
            </div>
          </div>
          <iframe className="loc-map" title={t.location.map_title} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(t.location.map_query)}&output=embed`}/>
        </div>

        <div className="share-box">
          <h3>{t.location.share}</h3>
          <p>{t.location.share_title}</p>
          <div className="share-grid">
            <button className="share-btn native" onClick={handleNative}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/>
              </svg>
              {t.location.share}
            </button>
            <a className="share-btn wa" target="_blank" rel="noopener" title={t.location.share_whatsapp}
               href={`https://wa.me/?text=${q}`}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .13 5.36.13 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.92 11.92 0 0 0 5.78 1.48h.01c6.56 0 11.93-5.36 11.93-11.93 0-3.19-1.24-6.19-3.47-8.43zM12.06 21.8c-1.82 0-3.6-.49-5.16-1.42l-.37-.22-3.72.98 1-3.63-.24-.38a9.85 9.85 0 0 1-1.52-5.2c0-5.45 4.44-9.88 9.9-9.88a9.84 9.84 0 0 1 9.89 9.89c0 5.46-4.44 9.86-9.78 9.86zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
              </svg>
            </a>
            <a className="share-btn x" target="_blank" rel="noopener" title={t.location.share_x}
               href={`https://twitter.com/intent/tweet?text=${q}`}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.244 2H21.5l-7.5 8.57L22.75 22h-6.914l-5.413-7.077L4.2 22H.943l7.98-9.12L.75 2h6.96l4.86 6.48L18.244 2zm-1.214 18h1.819L7.04 3.9H5.11L17.03 20z"/>
              </svg>
            </a>
            <button className="share-btn ig" onClick={() => handlePlatformOpen("https://www.instagram.com/")} title={t.location.share_instagram}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </button>
            <button className="share-btn snap" onClick={() => handlePlatformOpen("https://www.snapchat.com/")} title={t.location.share_snapchat}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2.2c-2.8 0-5.1 2.22-5.1 5.02 0 .63.12 1.19.26 1.69.12.42.19.79.19 1.12 0 .45-.19.82-.57 1.09-.36.25-.8.41-1.29.47-.29.04-.44.37-.24.59.55.62 1.22 1 2.01 1.14.28.05.49.28.49.56v.73c0 1.43 1.17 2.6 2.6 2.6.2 0 .34.11.41.29l.39.99c.11.29.39.47.7.47h.3c.31 0 .59-.18.7-.47l.39-.99c.07-.18.21-.29.41-.29 1.43 0 2.6-1.17 2.6-2.6v-.73c0-.28.21-.51.49-.56.79-.14 1.46-.52 2.01-1.14.2-.22.05-.55-.24-.59-.49-.06-.93-.22-1.29-.47-.38-.27-.57-.64-.57-1.09 0-.33.07-.7.19-1.12.14-.5.26-1.06.26-1.69 0-2.8-2.3-5.02-5.1-5.02z"/>
              </svg>
            </button>
            <button className="share-btn cp" onClick={handleCopy} title={t.location.share_copy}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>
              </svg>
              <span className={"copy-toast" + (copied ? " show" : "")}>{t.location.share_copied}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== Footer ==========
function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logos">
          <img src="assets/festival-logo.png" alt=""/>
          <img src="assets/ministry-logo.png" alt=""/>
          <img src="assets/municipality-logo.jpg" alt=""/>
          <img src="assets/emirate-logo.jpg" alt=""/>
        </div>
        <p className="line">{t.footer.line}</p>
        <div className="footer-meta">
          <small>{t.footer.copy}</small>
          <a className="footer-credit" href="https://www.linkin1.com/yasserbm" target="_blank" rel="noopener noreferrer">
            {t.footer.credit}
          </a>
          <a className="footer-contact-btn" href="https://www.linkin1.com/yasserbm" target="_blank" rel="noopener noreferrer">
            {t.footer.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  LangSplash, Header, Hero, QuickNav, About, FestivalMap, Offer, Events, Location, Footer,
});
