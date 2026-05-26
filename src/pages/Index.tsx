import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_TREAD = "https://cdn.poehali.dev/projects/cd77c19b-1bb8-44cb-9dc5-ad1e8637d438/files/1be376f3-c97d-4e46-94a6-5d208417e0af.jpg";
const IMG_RIM = "https://cdn.poehali.dev/projects/cd77c19b-1bb8-44cb-9dc5-ad1e8637d438/files/a735efb8-d006-42c9-88dc-f312b66522be.jpg";
const IMG_GARAGE = "https://cdn.poehali.dev/projects/cd77c19b-1bb8-44cb-9dc5-ad1e8637d438/files/6899abdc-1585-434d-8497-d3453a4a1c85.jpg";

const SERVICES = [
  { num: "01", title: "Замена шин", price: "800₽", tag: "4 колеса" },
  { num: "02", title: "Балансировка", price: "400₽", tag: "1 колесо" },
  { num: "03", title: "Ремонт прокола", price: "300₽", tag: "срочно" },
  { num: "04", title: "Развал-схождение", price: "1500₽", tag: "2 оси" },
  { num: "05", title: "Хранение шин", price: "2400₽", tag: "сезон" },
  { num: "06", title: "Подкачка азотом", price: "150₽", tag: "1 колесо" },
];

const REVIEWS = [
  { name: "Алексей П.", car: "Toyota Camry", text: "25 минут — и готово. Профессионалы.", stars: 5 },
  { name: "Марина С.", car: "Kia Sportage", text: "Третий год только сюда. Цены честные.", stars: 5 },
  { name: "Дмитрий В.", car: "BMW 3", text: "Гвоздь в центре — исправили за 15 минут.", stars: 5 },
  { name: "Ольга К.", car: "VW Polo", text: "Хранение шин — всегда идеальное состояние.", stars: 5 },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setRevealed((p) => new Set([...p, e.target.id])); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const vis = (id: string) => revealed.has(id);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#F5F0E8", color: "#0A0A0A", fontFamily: "'Oswald', sans-serif", overflowX: "hidden" }}>

      {/* ── TICKER ── */}
      <div style={{ background: "#0A0A0A", overflow: "hidden", borderBottom: "2px solid #E8C84A" }}>
        <div ref={tickerRef} style={{ display: "flex", gap: 0, animation: "ticker 18s linear infinite", whiteSpace: "nowrap", padding: "8px 0" }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} style={{ color: "#E8C84A", fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", paddingRight: 60 }}>
              ШИНОМОНТАЖ У РУСТАМА &nbsp;✦&nbsp; РАБОТАЕМ 8:00–22:00 &nbsp;✦&nbsp; БЕЗ ВЫХОДНЫХ &nbsp;✦&nbsp; МОСКВА &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 60 ? "rgba(245,240,232,0.97)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(8px)" : "none",
        borderBottom: scrollY > 60 ? "2px solid #0A0A0A" : "none",
        transition: "all 0.3s",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => go("hero")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, background: "#E8C84A", border: "2px solid #0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-12deg)" }}>
              <Icon name="Settings" size={18} />
            </div>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.05em" }}>У РУСТАМА</span>
          </button>

          <div className="hidden md:flex" style={{ gap: 32, alignItems: "center" }}>
            {[["hero","Главная"],["services","Услуги"],["portfolio","Работы"],["reviews","Отзывы"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => go(id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Golos Text', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", color: "#0A0A0A" }}>
                {label}
              </button>
            ))}
            <a href="tel:+79001234567" style={{ background: "#E8C84A", border: "2px solid #0A0A0A", padding: "8px 20px", fontWeight: 700, fontSize: 14, letterSpacing: "0.05em", textDecoration: "none", color: "#0A0A0A", fontFamily: "'Oswald', sans-serif", transition: "transform 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translate(-2px,-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "none")}>
              ЗАПИСАТЬСЯ
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "#F5F0E8", borderTop: "2px solid #0A0A0A", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {[["hero","Главная"],["services","Услуги"],["portfolio","Работы"],["reviews","Отзывы"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => go(id)}
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.05em", color: "#0A0A0A", borderBottom: "1px solid #ccc", paddingBottom: 8 }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 90, background: "#F5F0E8", position: "relative", overflow: "hidden" }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px 60px 32px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0A0A0A", color: "#E8C84A", padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 32, alignSelf: "flex-start" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
            ОТКРЫТО · ПН–ВС 8:00–22:00
          </div>

          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(64px, 8vw, 110px)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: 32, color: "#0A0A0A" }}>
            ШИ<br />
            НО<br />
            МОН<br />
            <span style={{ color: "#E8C84A", WebkitTextStroke: "2px #0A0A0A" }}>ТАЖ</span>
          </h1>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 40 }}>
            <div style={{ width: 3, background: "#E8C84A", alignSelf: "stretch", flexShrink: 0, minHeight: 40 }} />
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 17, lineHeight: 1.6, color: "#444", maxWidth: 340 }}>
              Профессиональный шиномонтаж в Москве. 8 лет опыта, 15 000+ клиентов, гарантия качества.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="tel:+79001234567" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#0A0A0A", color: "#E8C84A", padding: "14px 28px",
              fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "0.08em",
              textDecoration: "none", border: "2px solid #0A0A0A",
              boxShadow: "4px 4px 0 #E8C84A", transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translate(-3px,-3px)"; e.currentTarget.style.boxShadow = "7px 7px 0 #E8C84A"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "4px 4px 0 #E8C84A"; }}>
              <Icon name="Phone" size={18} />
              +7 (900) 123-45-67
            </a>
            <button onClick={() => go("services")} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#0A0A0A", padding: "14px 28px",
              fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "0.08em",
              border: "2px solid #0A0A0A", cursor: "pointer",
              boxShadow: "4px 4px 0 #0A0A0A", transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translate(-3px,-3px)"; e.currentTarget.style.boxShadow = "7px 7px 0 #0A0A0A"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "4px 4px 0 #0A0A0A"; }}>
              Услуги и цены
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={IMG_RIM} alt="диск" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) contrast(1.1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #F5F0E8 0%, transparent 30%)" }} />

          {/* Big rotated label */}
          <div style={{
            position: "absolute", right: -40, top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.3em", color: "#E8C84A", background: "#0A0A0A",
            padding: "6px 20px",
          }}>
            МОСКВА · АВТОМОБИЛЬНАЯ, 15
          </div>
        </div>

        {/* Stats bar bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          background: "#E8C84A", borderTop: "2px solid #0A0A0A",
        }}>
          {[["8 ЛЕТ", "опыт"],["15 000+", "клиентов"],["30 МИН", "среднее время"],["100%", "гарантия"]].map(([v, l], i) => (
            <div key={v} style={{ padding: "14px 0", textAlign: "center", borderRight: i < 3 ? "2px solid #0A0A0A" : "none" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 11, color: "#555", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: "#0A0A0A", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div id="svc-head" data-reveal style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 60,
            opacity: vis("svc-head") ? 1 : 0, transform: vis("svc-head") ? "none" : "translateY(30px)", transition: "all 0.7s",
          }}>
            <div>
              <div style={{ color: "#E8C84A", fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", marginBottom: 12 }}>ЧТО МЫ ДЕЛАЕМ</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
                УСЛУГИ<br /><span style={{ color: "#E8C84A" }}>&amp; ЦЕНЫ</span>
              </h2>
            </div>
            <a href="tel:+79001234567" style={{
              display: "none", background: "#E8C84A", border: "2px solid #E8C84A", padding: "12px 24px",
              fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", color: "#0A0A0A",
            }} className="hidden md:inline-flex">ЗАПИСАТЬСЯ →</a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {SERVICES.map((s, i) => (
              <div key={s.num} id={`sv-${i}`} data-reveal
                style={{
                  display: "grid", gridTemplateColumns: "80px 1fr auto auto",
                  alignItems: "center", gap: 24,
                  borderTop: `2px solid ${i === 0 ? "#E8C84A" : "#222"}`,
                  padding: "24px 0", cursor: "pointer",
                  opacity: vis(`sv-${i}`) ? 1 : 0,
                  transform: vis(`sv-${i}`) ? "none" : "translateX(-30px)",
                  transition: `all 0.6s ${i * 0.07}s`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#141414"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#E8C84A", letterSpacing: "0.1em" }}>{s.num}</span>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(20px,3vw,34px)", fontWeight: 600, color: "#F5F0E8", letterSpacing: "-0.01em" }}>{s.title}</span>
                <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 12, color: "#555", letterSpacing: "0.1em", border: "1px solid #333", padding: "3px 10px" }}>{s.tag}</span>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 700, color: "#E8C84A", minWidth: 100, textAlign: "right" }}>{s.price}</span>
              </div>
            ))}
            <div style={{ borderTop: "2px solid #333" }} />
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ background: "#F5F0E8", padding: "100px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div id="port-head" data-reveal style={{
            marginBottom: 60,
            opacity: vis("port-head") ? 1 : 0, transform: vis("port-head") ? "none" : "translateY(30px)", transition: "all 0.7s",
          }}>
            <div style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", marginBottom: 12, fontFamily: "'Golos Text', sans-serif" }}>НАШИ РАБОТЫ</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
              ПОРТ<span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>ФОЛИО</span>
            </h2>
          </div>

          {/* Asymmetric grid */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "300px 300px", gap: 4 }}>
            {[
              { title: "Замена R20", sub: "BMW X5", img: IMG_RIM, span: "1 / 2 / 3 / 2" },
              { title: "Балансировка R21", sub: "Mercedes GLE", img: IMG_TREAD, span: "1 / 2 / 2 / 3" },
              { title: "Ремонт прокола", sub: "Toyota RAV4", img: IMG_GARAGE, span: "1 / 3 / 2 / 4" },
              { title: "Развал-схождение", sub: "VW Tiguan", img: IMG_TREAD, span: "2 / 2 / 3 / 4" },
            ].map((item, i) => (
              <div key={i} id={`po-${i}`} data-reveal
                style={{
                  gridArea: item.span, position: "relative", overflow: "hidden", cursor: "pointer",
                  opacity: vis(`po-${i}`) ? 1 : 0, transition: `all 0.7s ${i * 0.1}s`,
                }}
              >
                <img src={item.img} alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(40%)", transition: "all 0.5s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) scale(1.05)"; (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(40%)"; (e.currentTarget as HTMLImageElement).style.transform = "none"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{item.title}</div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 12, color: "#E8C84A" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ background: "#0A0A0A", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div id="rev-head" data-reveal style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60,
            opacity: vis("rev-head") ? 1 : 0, transform: vis("rev-head") ? "none" : "translateY(30px)", transition: "all 0.7s",
          }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 0.95 }}>
              ОТ<span style={{ color: "#E8C84A" }}>ЗЫВЫ</span>
            </h2>
            <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 14, color: "#555", maxWidth: 200, textAlign: "right" }}>
              Реальные отзывы без редактуры
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} id={`rv-${i}`} data-reveal
                style={{
                  background: i % 2 === 0 ? "#111" : "#E8C84A",
                  padding: "40px 36px",
                  opacity: vis(`rv-${i}`) ? 1 : 0,
                  transform: vis(`rv-${i}`) ? "none" : "translateY(20px)",
                  transition: `all 0.6s ${i * 0.1}s`,
                }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array(r.stars).fill(0).map((_, j) => (
                    <Icon key={j} name="Star" size={14} style={{ color: i % 2 === 0 ? "#E8C84A" : "#0A0A0A" }} />
                  ))}
                </div>
                <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 18, lineHeight: 1.6, color: i % 2 === 0 ? "#ddd" : "#0A0A0A", marginBottom: 32 }}>
                  «{r.text}»
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, border: `2px solid ${i % 2 === 0 ? "#E8C84A" : "#0A0A0A"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, color: i % 2 === 0 ? "#E8C84A" : "#0A0A0A" }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 15, color: i % 2 === 0 ? "#fff" : "#0A0A0A" }}>{r.name}</div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 12, color: i % 2 === 0 ? "#555" : "#555" }}>{r.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" style={{ background: "#F5F0E8", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div id="cnt-head" data-reveal style={{
            marginBottom: 60,
            opacity: vis("cnt-head") ? 1 : 0, transform: vis("cnt-head") ? "none" : "translateY(30px)", transition: "all 0.7s",
          }}>
            <div style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", marginBottom: 12, fontFamily: "'Golos Text', sans-serif" }}>КАК НАС НАЙТИ</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
              КОН<span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>ТАКТЫ</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 4 }}>
            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                { icon: "MapPin", label: "АДРЕС", val: "Москва, ул. Автомобильная, 15", sub: "м. Автозаводская" },
                { icon: "Phone", label: "ТЕЛЕФОН", val: "+7 (900) 123-45-67", sub: "8:00–22:00 без выходных" },
                { icon: "Clock", label: "ВРЕМЯ", val: "Пн–Вс 8:00–22:00", sub: "Без выходных" },
                { icon: "MessageCircle", label: "МЕССЕНДЖЕРЫ", val: "WhatsApp / Telegram", sub: "Ответим за 5 минут" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0A0A0A", padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <Icon name={item.icon} size={18} style={{ color: "#E8C84A", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, color: "#F5F0E8" }}>{item.val}</div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 12, color: "#555" }}>{item.sub}</div>
                  </div>
                </div>
              ))}

              <a href="https://yandex.ru/maps/?rtext=~55.730051,37.661042&rtt=auto" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "#E8C84A", padding: "18px", border: "2px solid #0A0A0A",
                  fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.1em",
                  textDecoration: "none", color: "#0A0A0A",
                  boxShadow: "4px 4px 0 #0A0A0A", transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translate(-3px,-3px)"; e.currentTarget.style.boxShadow = "7px 7px 0 #0A0A0A"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "4px 4px 0 #0A0A0A"; }}>
                <Icon name="Navigation" size={18} />
                ПОСТРОИТЬ МАРШРУТ
              </a>
            </div>

            {/* Map */}
            <div id="map-c" data-reveal style={{
              overflow: "hidden", border: "2px solid #0A0A0A",
              boxShadow: "8px 8px 0 #0A0A0A",
              opacity: vis("map-c") ? 1 : 0, transition: "all 0.8s",
            }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.661042%2C55.730051&z=15&l=map&pt=37.661042%2C55.730051%2Cpm2rdl"
                width="100%" height="500"
                frameBorder="0" title="Карта"
                style={{ border: "none", display: "block", filter: "grayscale(30%) contrast(1.1)" }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#E8C84A", padding: "80px 24px", borderTop: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", opacity: 0.07, pointerEvents: "none" }}>
          <Icon name="Settings" size={400} />
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(44px,6vw,80px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 24 }}>
            ЗВОНИТЕ —<br />ПРИЕЗЖАЙТЕ
          </h2>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 18, color: "#555", marginBottom: 40 }}>
            Примем без записи. Сделаем быстро.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+79001234567" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#0A0A0A", color: "#E8C84A", padding: "16px 36px",
              fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.05em",
              textDecoration: "none", border: "2px solid #0A0A0A",
              boxShadow: "5px 5px 0 rgba(0,0,0,0.3)", transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translate(-3px,-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
              <Icon name="Phone" size={20} />
              +7 (900) 123-45-67
            </a>
            <a href="https://wa.me/79001234567" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "transparent", color: "#0A0A0A", padding: "16px 36px",
              fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.05em",
              textDecoration: "none", border: "2px solid #0A0A0A",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.color = "#E8C84A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0A0A0A"; }}>
              <Icon name="MessageCircle" size={20} />
              НАПИСАТЬ
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0A0A0A", padding: "28px 24px", borderTop: "2px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 18, color: "#F5F0E8" }}>
            У <span style={{ color: "#E8C84A" }}>РУСТАМА</span>
          </span>
          <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 13, color: "#444" }}>© 2024 Шиномонтаж «У Рустама»</span>
          <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 13, color: "#444" }}>Москва, ул. Автомобильная, 15</span>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 768px) {
          #hero { grid-template-columns: 1fr !important; }
          #hero > div:last-child { display: none; }
          .hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
