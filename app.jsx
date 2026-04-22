const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "familiesOffset": 0
}/*EDITMODE-END*/;

function TweaksPanel({ open, onClose }) {
  const [familiesOffset, setFamiliesOffset] = useState(() => {
    const v = localStorage.getItem("mf_families_offset");
    return v === null ? TWEAK_DEFAULTS.familiesOffset : parseFloat(v);
  });
  useEffect(() => {
    localStorage.setItem("mf_families_offset", String(familiesOffset));
    // trigger re-render of FestivalMap by dispatching a storage-like event
    window.dispatchEvent(new CustomEvent("mf-tweaks-change", { detail: { familiesOffset } }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { familiesOffset } }, "*");
  }, [familiesOffset]);
  if (!open) return null;
  return (
    <div className="tweaks-panel" dir="rtl">
      <div className="tweaks-head">
        <strong>Tweaks</strong>
        <button className="tweaks-close" onClick={onClose} aria-label="close">×</button>
      </div>
      <div className="tweaks-body">
        <label className="tweaks-row">
          <span>رفع "الأسر المنتجة" للأعلى</span>
          <input type="range" min="0" max="35" step="0.5" value={familiesOffset}
                 onChange={e => setFamiliesOffset(parseFloat(e.target.value))}/>
          <span className="tweaks-val">{familiesOffset}%</span>
        </label>
        <p className="tweaks-note">
          يرفع شريطي "الأسر المنتجة" (شمال وجنوب) للأعلى مع ثبات بقية المناطق.
        </p>
      </div>
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
    scan();
    const t = setTimeout(scan, 300);
    return () => { clearTimeout(t); io.disconnect(); };
  });
}

function useActiveSection() {
  useEffect(() => {
    const sections = ["about","map","offer","events","location"];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          document.querySelectorAll(".qn").forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("mf_lang") || null);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const resolvedLang = lang && window.I18N[lang] ? lang : (lang ? "en" : null);
  const t = resolvedLang ? window.I18N[resolvedLang] : null;
  useScrollReveal();
  useActiveSection();

  // Tweaks protocol
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    if (!t) return;
    document.documentElement.setAttribute("dir", t.dir);
    document.documentElement.setAttribute("lang", resolvedLang);
    document.body.style.setProperty("--font", t.font);
    localStorage.setItem("mf_lang", resolvedLang);
  }, [resolvedLang, t]);

  // Smooth-scroll hash links that account for sticky header
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", "#" + id);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (!lang) {
    return <LangSplash onPick={setLang}/>;
  }

  return (
    <div className="app">
      <Header t={t} onChangeLang={() => setLang(null)}/>
      <Hero t={t}/>
      <QuickNav t={t}/>
      <About t={t}/>
      <FestivalMap t={t}/>
      <Offer t={t}/>
      <Events t={t}/>
      <Location t={t}/>
      <Footer t={t}/>
      <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
