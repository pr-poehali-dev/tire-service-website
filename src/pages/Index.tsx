import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/cd77c19b-1bb8-44cb-9dc5-ad1e8637d438/files/6899abdc-1585-434d-8497-d3453a4a1c85.jpg";
const TIRE_IMAGE = "https://cdn.poehali.dev/projects/cd77c19b-1bb8-44cb-9dc5-ad1e8637d438/files/937a2fda-c6e8-43d1-89e4-e49b84022139.jpg";

const services = [
  { icon: "Wrench", title: "Замена шин", desc: "Сезонная смена резины за 30 минут", price: "от 800 ₽" },
  { icon: "Settings", title: "Балансировка", desc: "Точная балансировка всех колёс", price: "от 400 ₽" },
  { icon: "Shield", title: "Ремонт проколов", desc: "Устраняем любые повреждения", price: "от 300 ₽" },
  { icon: "RefreshCw", title: "Хранение шин", desc: "Безопасное хранение до сезона", price: "от 200 ₽/мес" },
  { icon: "Gauge", title: "Подкачка азотом", desc: "Стабильное давление в колёсах", price: "от 150 ₽" },
  { icon: "Car", title: "Компьютерный развал", desc: "Регулировка углов установки", price: "от 1500 ₽" },
];

const prices = [
  { name: "Замена R13–R15", price: "800 ₽", per: "4 колеса" },
  { name: "Замена R16–R18", price: "1 200 ₽", per: "4 колеса" },
  { name: "Замена R19–R21", price: "1 600 ₽", per: "4 колеса" },
  { name: "Балансировка", price: "400 ₽", per: "1 колесо" },
  { name: "Ремонт прокола", price: "300 ₽", per: "1 колесо" },
  { name: "Развал-схождение", price: "1 500 ₽", per: "2 оси" },
  { name: "Хранение шин", price: "2 400 ₽", per: "сезон" },
  { name: "Подкачка азотом", price: "150 ₽", per: "1 колесо" },
];

const reviews = [
  { name: "Алексей П.", stars: 5, text: "Приехал без записи, обслужили за 25 минут. Ребята профессионалы, всё чисто и аккуратно!", car: "Toyota Camry" },
  { name: "Марина С.", stars: 5, text: "Третий год езжу только сюда на сезонную смену. Цены честные, качество отличное. Рекомендую всем!", car: "Kia Sportage" },
  { name: "Дмитрий В.", stars: 5, text: "Поймал гвоздь в центре города, заехал к Рустаму — за 15 минут починили и отпустили. Спасибо огромное!", car: "BMW 3 Series" },
  { name: "Ольга К.", stars: 5, text: "Хранение шин — отличный сервис. Всегда в идеальном состоянии возвращают. Персонал очень вежливый.", car: "Volkswagen Polo" },
  { name: "Игорь М.", stars: 5, text: "Развал-схождение сделали идеально, машина стала держать дорогу гораздо лучше. Отличная работа!", car: "Lada Vesta" },
  { name: "Наталья Р.", stars: 5, text: "Обратилась первый раз — осталась в полном восторге! Быстро, дёшево и главное качественно.", car: "Hyundai Creta" },
];

const portfolio = [
  { title: "Замена летней резины", desc: "BMW X5, R20", img: TIRE_IMAGE },
  { title: "Балансировка дисков", desc: "Mercedes GLE, R21", img: HERO_IMAGE },
  { title: "Ремонт прокола", desc: "Toyota RAV4, R17", img: TIRE_IMAGE },
  { title: "Развал-схождение", desc: "Volkswagen Tiguan, R18", img: HERO_IMAGE },
  { title: "Хранение комплекта", desc: "Kia Sportage, R18", img: TIRE_IMAGE },
  { title: "Подкачка азотом", desc: "Lada Vesta Sport, R16", img: HERO_IMAGE },
];

const stats = [
  { val: "8 лет", label: "на рынке" },
  { val: "15 000+", label: "довольных клиентов" },
  { val: "30 мин", label: "среднее время работ" },
  { val: "100%", label: "гарантия качества" },
];

const promos = [
  {
    badge: "🔥 Хит",
    title: "Сезонная замена «Всё включено»",
    desc: "Замена 4 колёс + балансировка + подкачка азотом",
    old: "2 000 ₽",
    price: "1 500 ₽",
    saving: "Экономия 500 ₽",
    until: "до 30 июня",
    color: "#f97316",
  },
  {
    badge: "⚡ Быстро",
    title: "Экспресс-монтаж за 20 минут",
    desc: "Замена 4 колёс до R18 без очереди по записи",
    old: "1 200 ₽",
    price: "900 ₽",
    saving: "Экономия 300 ₽",
    until: "постоянная",
    color: "#3b82f6",
  },
  {
    badge: "🎁 Новым",
    title: "Скидка 15% для новых клиентов",
    desc: "На любую услугу при первом обращении",
    old: null,
    price: "−15%",
    saving: "На первый визит",
    until: "бессрочно",
    color: "#22c55e",
  },
  {
    badge: "❄️ Зима",
    title: "Зимний комплект под ключ",
    desc: "Замена + балансировка + хранение летней резины (1 мес)",
    old: "3 800 ₽",
    price: "2 900 ₽",
    saving: "Экономия 900 ₽",
    until: "с 1 октября",
    color: "#a855f7",
  },
  {
    badge: "🚗 Авто+",
    title: "Развал + балансировка",
    desc: "Развал-схождение 2 оси + балансировка всех колёс",
    old: "2 900 ₽",
    price: "2 200 ₽",
    saving: "Экономия 700 ₽",
    until: "до 15 июля",
    color: "#f97316",
  },
  {
    badge: "💼 Корп.",
    title: "Корпоративный договор",
    desc: "Обслуживание парка от 5 авто — индивидуальные цены",
    old: null,
    price: "−20%",
    saving: "На весь парк",
    until: "бессрочно",
    color: "#eab308",
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "prices", label: "Прайс" },
    { id: "promos", label: "Акции" },
    { id: "portfolio", label: "Портфолио" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--dark)", color: "#fff", fontFamily: "'Golos Text', sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(15,15,15,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(249,115,22,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-fire flex items-center justify-center">
              <Icon name="Settings" size={16} className="text-white animate-spin-slow" />
            </div>
            <span className="font-oswald text-xl font-bold tracking-wide">
              У <span className="text-gradient">РУСТАМА</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium transition-all duration-200 hover:text-orange-400"
                style={{ color: activeSection === link.id ? "#f97316" : "#aaa", fontFamily: "'Golos Text', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <a href="tel:+79001234567" className="bg-fire px-4 py-2 rounded-lg text-white font-semibold text-sm hover-glow transition-all duration-300 hover:scale-105">
              Записаться
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} className="text-orange-400" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-2" style={{ background: "rgba(15,15,15,0.98)" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left py-2 text-sm font-medium border-b border-gray-800 hover:text-orange-400 transition-colors"
                style={{ color: "#ccc" }}
              >
                {link.label}
              </button>
            ))}
            <a href="tel:+79001234567" className="mt-2 bg-fire px-4 py-3 rounded-lg text-white font-semibold text-center text-sm">
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Шиномонтаж" className="w-full h-full object-cover" style={{ filter: "brightness(0.25)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,15,15,0.9) 0%, rgba(249,115,22,0.1) 50%, rgba(15,15,15,0.95) 100%)" }} />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] opacity-10 pointer-events-none">
          <div className="w-full h-full rounded-full border-4 border-orange-500 animate-spin-slow" style={{ borderStyle: "dashed" }} />
          <div className="absolute inset-8 rounded-full border-2 border-orange-400" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)", color: "#fb923c" }}>
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Открыто сейчас · Пн–Вс 8:00–22:00
            </div>

            <h1 className="font-oswald text-5xl sm:text-6xl md:text-7xl font-bold leading-none mb-6 animate-fade-in"
              style={{ animationFillMode: "forwards" }}>
              ШИНОМОНТАЖ<br />
              <span className="text-gradient">«У РУСТАМА»</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed animate-fade-in animate-delay-200"
              style={{ animationFillMode: "forwards" }}>
              Профессиональный шиномонтаж в Москве. Замена, балансировка, ремонт — быстро, качественно, с гарантией.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-300" style={{ animationFillMode: "forwards" }}>
              <a href="tel:+79001234567"
                className="bg-fire px-8 py-4 rounded-xl text-white font-bold text-lg hover-glow transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Icon name="Phone" size={20} />
                +7 (900) 123-45-67
              </a>
              <button onClick={() => scrollTo("services")}
                className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                style={{ border: "2px solid rgba(249,115,22,0.5)", color: "#f97316", background: "transparent" }}>
                Наши услуги
                <Icon name="ArrowRight" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0" style={{ background: "rgba(249,115,22,0.95)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.val} className="text-center">
                <div className="font-oswald text-2xl font-bold text-white">{s.val}</div>
                <div className="text-orange-100 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 section-pattern" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div id="services-title" data-animate className={`text-center mb-16 transition-all duration-700 ${visibleItems.has("services-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Что мы делаем</div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold mb-4">НАШИ <span className="text-gradient">УСЛУГИ</span></h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Полный спектр услуг для ваших колёс — от замены до хранения</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                id={`svc-${i}`}
                data-animate
                className={`bg-dark-card rounded-2xl p-6 hover-glow transition-all duration-500 hover:scale-105 cursor-pointer group ${visibleItems.has(`svc-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-fire flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={s.icon} size={24} className="text-white" />
                </div>
                <h3 className="font-oswald text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{s.desc}</p>
                <div className="font-bold text-orange-400 text-lg">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div id="prices-title" data-animate className={`text-center mb-16 transition-all duration-700 ${visibleItems.has("prices-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Прозрачные цены</div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold mb-4">ПРАЙС-<span className="text-gradient">ЛИСТ</span></h2>
            <p className="text-gray-400 text-lg">Честные цены без скрытых доплат</p>
          </div>

          <div id="prices-table" data-animate className={`rounded-2xl overflow-hidden transition-all duration-700 ${visibleItems.has("prices-table") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ border: "1px solid rgba(249,115,22,0.2)" }}>
            {prices.map((p, i) => (
              <div key={p.name}
                className="flex items-center justify-between px-6 py-4 hover:bg-orange-500/5 transition-colors duration-200"
                style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)", borderBottom: i < prices.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-fire" />
                  <span className="font-medium text-white">{p.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">{p.per}</span>
                  <span className="font-oswald text-xl font-bold text-orange-400 min-w-[100px] text-right">{p.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="tel:+79001234567"
              className="inline-flex items-center gap-2 bg-fire px-8 py-4 rounded-xl text-white font-bold text-lg hover-glow transition-all duration-300 hover:scale-105">
              <Icon name="Phone" size={20} />
              Узнать точную цену
            </a>
          </div>
        </div>
      </section>

      {/* PROMOS */}
      <section id="promos" className="py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div id="promos-title" data-animate className={`text-center mb-16 transition-all duration-700 ${visibleItems.has("promos-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Выгодные предложения</div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold mb-4">АК<span className="text-gradient">ЦИИ</span></h2>
            <p className="text-gray-400 text-lg">Специальные цены и комплексные предложения</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.map((promo, i) => (
              <div
                key={promo.title}
                id={`promo-${i}`}
                data-animate
                className={`relative rounded-2xl p-6 flex flex-col transition-all duration-500 hover:scale-105 hover-glow ${visibleItems.has(`promo-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  background: "var(--dark-2)",
                  border: `1px solid ${promo.color}33`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Top stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: promo.color }} />

                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: `${promo.color}22`, color: promo.color }}>
                    {promo.badge}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">{promo.until}</span>
                </div>

                <h3 className="font-oswald text-xl font-bold mb-2 leading-tight">{promo.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{promo.desc}</p>

                <div className="flex items-end justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    {promo.old && (
                      <div className="text-gray-600 text-sm line-through mb-0.5">{promo.old}</div>
                    )}
                    <div className="font-oswald text-3xl font-bold" style={{ color: promo.color }}>{promo.price}</div>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: `${promo.color}22`, color: promo.color }}>
                    {promo.saving}
                  </div>
                </div>

                <a
                  href="tel:+79001234567"
                  className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style={{ background: promo.color, color: "#fff" }}
                >
                  <Icon name="Phone" size={16} />
                  Воспользоваться
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div id="portfolio-title" data-animate className={`text-center mb-16 transition-all duration-700 ${visibleItems.has("portfolio-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Наши работы</div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold mb-4">ПОРТ<span className="text-gradient">ФОЛИО</span></h2>
            <p className="text-gray-400 text-lg">Примеры выполненных работ за последний месяц</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item, i) => (
              <div
                key={item.title}
                id={`port-${i}`}
                data-animate
                className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 ${visibleItems.has(`port-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ border: "1px solid rgba(249,115,22,0.15)", transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                </div>
                <div className="p-4" style={{ background: "var(--dark-2)" }}>
                  <h3 className="font-oswald text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div id="reviews-title" data-animate className={`text-center mb-16 transition-all duration-700 ${visibleItems.has("reviews-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Клиенты говорят</div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold mb-4">ОТ<span className="text-gradient">ЗЫВЫ</span></h2>
            <p className="text-gray-400 text-lg">Реальные отзывы наших клиентов</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                id={`rev-${i}`}
                data-animate
                className={`bg-dark-card rounded-2xl p-6 transition-all duration-500 ${visibleItems.has(`rev-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array(r.stars).fill(0).map((_, j) => (
                    <Icon key={j} name="Star" size={16} className="text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-full bg-fire flex items-center justify-center font-oswald font-bold text-white text-sm">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{r.name}</div>
                    <div className="text-gray-500 text-xs">{r.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP & CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div id="contacts-title" data-animate className={`text-center mb-16 transition-all duration-700 ${visibleItems.has("contacts-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Приезжайте к нам</div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold mb-4">КОН<span className="text-gradient">ТАКТЫ</span></h2>
            <p className="text-gray-400 text-lg">Найти нас очень легко</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col gap-5">
              {[
                { icon: "MapPin", title: "Адрес", val: "Москва, ул. Автомобильная, д. 15", val2: "м. Автозаводская, 5 мин пешком" },
                { icon: "Phone", title: "Телефон", val: "+7 (900) 123-45-67", val2: "Принимаем звонки 8:00–22:00" },
                { icon: "Clock", title: "Режим работы", val: "Пн–Вс: 8:00 – 22:00", val2: "Без выходных и праздников" },
                { icon: "MessageCircle", title: "WhatsApp / Telegram", val: "+7 (900) 123-45-67", val2: "Ответим в течение 5 минут" },
              ].map((item) => (
                <div key={item.title} className="bg-dark-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-fire flex-shrink-0 flex items-center justify-center">
                    <Icon name={item.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{item.title}</div>
                    <div className="font-semibold text-white">{item.val}</div>
                    <div className="text-gray-500 text-sm">{item.val2}</div>
                  </div>
                </div>
              ))}

              <a
                href="https://yandex.ru/maps/?rtext=~55.730051,37.661042&rtt=auto"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-fire px-6 py-4 rounded-xl text-white font-bold text-base hover-glow transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mt-2"
              >
                <Icon name="Navigation" size={20} />
                Построить маршрут
              </a>
            </div>

            <div id="map-block" data-animate className={`lg:col-span-3 rounded-2xl overflow-hidden transition-all duration-700 ${visibleItems.has("map-block") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ border: "2px solid rgba(249,115,22,0.25)", height: "460px" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.661042%2C55.730051&z=15&l=map&pt=37.661042%2C55.730051%2Cpm2rdl"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта — Шиномонтаж У Рустама"
                style={{ border: "none", filter: "invert(0.9) hue-rotate(180deg) saturate(0.8)" }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 relative overflow-hidden bg-fire">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-4 border-white -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full border-4 border-white translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-4">ЗАПИШИТЕСЬ ПРЯМО СЕЙЧАС</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">Позвоните или напишите — ответим мгновенно и подберём удобное время</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+79001234567"
              className="bg-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{ color: "#f97316" }}>
              <Icon name="Phone" size={20} />
              Позвонить
            </a>
            <a href="https://wa.me/79001234567"
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-white"
              style={{ border: "2px solid rgba(255,255,255,0.6)", background: "transparent" }}>
              <Icon name="MessageCircle" size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(249,115,22,0.15)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-fire flex items-center justify-center">
              <Icon name="Settings" size={14} className="text-white" />
            </div>
            <span className="font-oswald font-bold">У <span className="text-gradient">РУСТАМА</span></span>
          </div>
          <p className="text-gray-600 text-sm">© 2024 Шиномонтаж «У Рустама». Все права защищены.</p>
          <p className="text-gray-600 text-sm">Москва, ул. Автомобильная, 15</p>
        </div>
      </footer>
    </div>
  );
}