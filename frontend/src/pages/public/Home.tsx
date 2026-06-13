import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, MapPin, Clock, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import HorizontalScrollInfo from "@/components/sections/HorizontalScrollInfo";

const HeroBackground = lazy(() => import("@/components/canvas/HeroBackground"));

// ─── DATA ────────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  "Ibadah Minggu","✦","Komunitas Sel","✦","Pelayanan Anak","✦",
  "Pemuda & Remaja","✦","Misi & Penginjilan","✦","Karawang","✦",
  "Ibadah Minggu","✦","Komunitas Sel","✦","Pelayanan Anak","✦",
  "Pemuda & Remaja","✦","Misi & Penginjilan","✦","Karawang","✦",
];

const QUICK_ACCESS = [
  { icon:"🗓️", title:"Jadwal Ibadah",    desc:"Minggu & Midweek",         to:"/jadwal"  },
  { icon:"📺", title:"Streaming Online", desc:"Tonton khotbah terbaru",   to:"/jadwal"  },
  { icon:"🤝", title:"Layanan Gereja",   desc:"Baptisan, doa, konseling", to:"/tentang" },
  { icon:"📍", title:"Tentang Gereja",   desc:"Visi, misi & sejarah",     to:"/tentang" },
];

const schedules = [
  { day:"Setiap Minggu", name:"Ibadah Raya Pagi",  time:"08.00 – 10.00 WIB", loc:"Gedung Utama", color:"#0D2240" },
  { day:"Setiap Minggu", name:"Ibadah Raya Siang", time:"10.30 – 12.30 WIB", loc:"Gedung Utama", color:"#1A3A5C" },
  { day:"Setiap Rabu",   name:"Ibadah Pemuda",     time:"18.30 – 20.30 WIB", loc:"Aula Youth",   color:"#E8541A" },
];

const programs = [
  { icon:"🙏", title:"Kelompok Sel",    desc:"Komunitas kecil yang hangat untuk bertumbuh dalam iman dan persahabatan.", bg:"#FEF0E8" },
  { icon:"🎵", title:"Pelayanan Musik", desc:"Melayani Tuhan melalui pujian dan penyembahan bersama tim worship.",       bg:"#E8F4FD" },
  { icon:"👶", title:"Sekolah Minggu",  desc:"Program anak menyenangkan agar si kecil bertumbuh kenal Tuhan.",           bg:"#E8F8F0" },
];

const announcements = [
  { tag:"PENTING",  tagColor:"#E8541A", tagBg:"#FEF0E8", title:"Ibadah Natal Bersama 25 Desember 2025",       desc:"Rayakan kelahiran Yesus bersama seluruh jemaat GBI Sion Karawang.", date:"Des 25, 2025", pinned:true  },
  { tag:"INFO",     tagColor:"#1A3A5C", tagBg:"#E8F0F8", title:"Pendaftaran Kelompok Sel Semester 2 Dibuka",  desc:"Daftarkan diri ke kelompok sel terdekat mulai minggu ini.",          date:"Nov 10, 2025", pinned:false },
  { tag:"KEGIATAN", tagColor:"#0F6E56", tagBg:"#E8F8F0", title:"Youth Camp 2025 — Daftar Sekarang!",          desc:"Acara tahunan youth camp di Puncak, Bogor. Tempat terbatas!",        date:"Nov 5, 2025",  pinned:false },
];

const GALLERY = [
  { label:"Ibadah Raya 2024",  bg:"linear-gradient(135deg,#1E4A7A,#0D2240)",  span:true  },
  { label:"Natal 2024",        bg:"linear-gradient(135deg,#E8541A,#C94010)",   span:false },
  { label:"Baptisan",          bg:"linear-gradient(135deg,#2A6BAD,#1A3A5C)",   span:false },
  { label:"Youth Camp",        bg:"linear-gradient(135deg,#FF8C5A,#E8541A)",   span:false },
  { label:"Outreach",          bg:"linear-gradient(135deg,#0D2240,#1E4A7A)",   span:false },
];

const STATS = [
  { n:2400, suffix:"+", label:"Jemaat Aktif" },
  { n:15,   suffix:"+", label:"Tahun Pelayanan" },
  { n:30,   suffix:"+", label:"Program Gereja" },
  { n:3,    suffix:"x", label:"Jadwal Ibadah" },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────

function AnimatedCounter({ to, suffix }: { to:number; suffix:string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.8, ease: "easeOut",
      onUpdate(v) {
        setDisplay(to >= 1000 ? (v/1000).toFixed(1)+"K" : Math.round(v).toString());
      },
    });
    return ctrl.stop;
  }, [inView, to]);

  return (
    <div ref={ref} style={{ fontSize: "clamp(32px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-2px", lineHeight:1, marginBottom:6 }}>
      {display}<span style={{ color:"#E8541A" }}>{suffix}</span>
    </div>
  );
}

// ─── FLOATING DOT ────────────────────────────────────────────────────────────

function FloatDot({ x,y,size,delay,duration }: { x:string;y:string;size:number;delay:number;duration:number }) {
  return (
    <motion.div
      style={{ position:"absolute", left:x, top:y, width:size, height:size, borderRadius:"50%", background:"rgba(232,84,26,.18)", pointerEvents:"none", zIndex:1 }}
      animate={{ y:[0,-18,0], opacity:[0.18,0.45,0.18] }}
      transition={{ duration, delay, repeat:Infinity, ease:"easeInOut" }}
    />
  );
}

// ─── FADE VARIANTS ───────────────────────────────────────────────────────────

const fade  = { hidden:{opacity:0,y:24},  show:{opacity:1,y:0,  transition:{duration:0.55}} };
const fadeL = { hidden:{opacity:0,x:-24}, show:{opacity:1,x:0,  transition:{duration:0.55}} };
const fadeR = { hidden:{opacity:0,x:24},  show:{opacity:1,x:0,  transition:{duration:0.55}} };
const staggerWrap = (delay=0) => ({
  hidden:{},
  show:{ transition:{ staggerChildren:0.1, delayChildren:delay } },
});

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    document.body.setAttribute("data-hero-transparent","true");
    return () => document.body.removeAttribute("data-hero-transparent");
  }, []);

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        /* ── Marquee ── */
        @keyframes marqueeScroll {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
        .marquee-track {
          display:flex; align-items:center; white-space:nowrap;
          width:max-content; animation:marqueeScroll 32s linear infinite;
        }
        .marquee-track:hover { animation-play-state:paused; }

        /* ── Scroll hint ── */
        @keyframes scrollPulse {
          0%,100% { opacity:.4; transform:scaleY(1); }
          50%      { opacity:.85; transform:scaleY(1.18); }
        }
        .scroll-line {
          width:1px; height:40px;
          background:linear-gradient(to bottom,rgba(255,255,255,.5),transparent);
          animation:scrollPulse 2s infinite;
        }

        /* ── Hero glow pulse ── */
        @keyframes heroGlow {
          0%,100% { opacity:.13; }
          50%      { opacity:.22; }
        }
        .hero-glow-pulse { animation:heroGlow 5s ease-in-out infinite; }

        /* ── Grain ── */
        .hero-grain {
          position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.035;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px;
        }

        /* ── Cards ── */
        .photo-card { transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s; cursor:pointer; }
        .photo-card:hover { transform:scale(1.016); box-shadow:0 16px 48px rgba(0,0,0,.22); }

        .quick-card { transition:background .2s,transform .25s,box-shadow .25s; cursor:pointer; }
        .quick-card:hover { background:#FFFCF8 !important; transform:translateY(-2px); box-shadow:0 6px 24px rgba(13,34,64,.07); }

        .prog-card { transition:all .28s; cursor:pointer; position:relative; overflow:hidden; }
        .prog-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#E8541A,#D4A843);
          transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.16,1,.3,1);
        }
        .prog-card:hover { box-shadow:0 8px 36px rgba(13,34,64,.1); transform:translateY(-3px); border-color:transparent !important; }
        .prog-card:hover::after { transform:scaleX(1); }

        .announce-card { transition:all .25s; cursor:pointer; }
        .announce-card:hover { transform:translateX(4px); box-shadow:0 4px 20px rgba(13,34,64,.06); }

        /* ── Hero CTAs ── */
        .hero-cta-primary {
          padding:13px 28px; border-radius:100px; background:#E8541A; color:#fff;
          font-size:14px; font-weight:700; border:none; cursor:pointer;
          font-family:inherit; display:inline-flex; align-items:center; gap:8px;
          transition:all .25s; white-space:nowrap;
        }
        .hero-cta-primary:hover { background:#cf4714; transform:translateY(-2px); box-shadow:0 10px 28px rgba(232,84,26,.38); }

        .hero-cta-outline {
          padding:13px 28px; border-radius:100px; background:transparent; color:#fff;
          font-size:14px; font-weight:600; cursor:pointer; font-family:inherit;
          display:inline-flex; align-items:center; gap:8px; white-space:nowrap;
          border:1.5px solid rgba(255,255,255,.32); transition:all .25s;
        }
        .hero-cta-outline:hover { background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.65); }

        /* ── Responsive grids ── */
        .home-quick-grid {
          display:grid; grid-template-columns:repeat(4,1fr); gap:2px; background:#e0e0e0;
        }
        .home-photo-grid {
          display:grid; grid-template-columns:1.6fr 1fr 1fr; grid-template-rows:200px 200px; gap:12px;
        }
        .home-stats-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
        }
        .home-schedule-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:20px;
        }
        .home-programs-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:20px;
        }
        .home-gallery-grid {
          display:grid; grid-template-columns:repeat(4,1fr); grid-template-rows:repeat(2,180px); gap:12px;
        }
        .home-announce-header {
          display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:48px;
        }
        .home-section { padding:80px 48px; }
        .home-inner   { max-width:1200px; margin:0 auto; }

        /* ── Stats border on mobile ── */
        .stat-item { padding:0 32px; }
        .stat-item:first-child { padding-left:0; }

        @media (max-width:1024px) {
          .home-section { padding:64px 32px; }
          .home-schedule-grid { grid-template-columns:repeat(2,1fr); }
          .home-gallery-grid  { grid-template-columns:repeat(2,1fr); grid-template-rows:auto; min-height:0; }
          .gallery-span { grid-column:span 1 !important; grid-row:span 1 !important; height:200px; }
        }

        @media (max-width:768px) {
          .home-section { padding:52px 20px; }
          .home-inner   { padding:0; }

          .home-quick-grid  { grid-template-columns:repeat(2,1fr); }
          .home-photo-grid  { grid-template-columns:1fr; grid-template-rows:auto; }
          .photo-tall       { grid-row:span 1 !important; height:220px; }
          .home-stats-grid  { grid-template-columns:repeat(2,1fr); }
          .home-schedule-grid { grid-template-columns:1fr; }
          .home-programs-grid { grid-template-columns:1fr; }
          .home-gallery-grid  { grid-template-columns:repeat(2,1fr); grid-template-rows:auto; }
          .gallery-span { grid-column:span 2 !important; grid-row:span 1 !important; height:200px; }
          .home-announce-header { flex-direction:column; align-items:flex-start; gap:12px; margin-bottom:28px; }
          .stat-item { padding:20px 0; border-right:none !important; border-bottom:1px solid rgba(255,255,255,.08); }
          .stat-item:last-child { border-bottom:none; }
        }

        @media (max-width:480px) {
          .home-quick-grid { grid-template-columns:1fr; }
          .home-gallery-grid { grid-template-columns:1fr; }
          .gallery-span { grid-column:span 1 !important; }
        }
      `}</style>

      {/* ══════════ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position:"relative", height:"100svh", minHeight:580, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <Suspense fallback={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0D2240 0%,#1a3a5c 35%,#0D2240 70%,#0a1b33 100%)' }} />}>
          <HeroBackground />
        </Suspense>

        {/* Content */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ show:{ transition:{ staggerChildren:0.13 } } }}
          style={{ position:"relative", zIndex:2, textAlign:"center", color:"#fff", padding:"0 20px", maxWidth:720, width:"100%" }}
        >
          <motion.div variants={fade} style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:11, fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#D4A843", marginBottom:20 }}>
            <span style={{ display:"block", width:24, height:1, background:"#D4A843", opacity:0.6 }} />
            Gereja GBI Sion Karawang
            <span style={{ display:"block", width:24, height:1, background:"#D4A843", opacity:0.6 }} />
          </motion.div>

          <motion.h1 variants={fade} style={{ fontSize:"clamp(38px,7.5vw,80px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", marginBottom:18 }}>
            Tempat Iman{" "}
            <em style={{ fontStyle:"normal", color:"#E8541A" }}>Bertumbuh</em>
            <br />& Kasih Nyata
          </motion.h1>

          <motion.p variants={fade} style={{ fontSize:"clamp(14px,2.2vw,16px)", fontWeight:400, opacity:0.72, maxWidth:420, margin:"0 auto 36px", lineHeight:1.75 }}>
            Bergabunglah bersama keluarga besar GBI Sion Karawang — komunitas, pertumbuhan rohani, dan pelayanan penuh makna.
          </motion.p>

          <motion.div variants={fade} style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <NavLink to="/program" style={{ textDecoration:"none" }}>
              <button className="hero-cta-primary">Lihat Program <ArrowRight size={16} /></button>
            </NavLink>
            <NavLink to="/tentang" style={{ textDecoration:"none" }}>
              <button className="hero-cta-outline">Tentang Gereja</button>
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
          style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:8, color:"rgba(255,255,255,.4)", fontSize:10, letterSpacing:"1.8px", textTransform:"uppercase", fontWeight:600 }}>
          <div className="scroll-line" />
          scroll
        </motion.div>
      </section>

      {/* ══════════ MARQUEE ══════════════════════════════════════════════ */}
      <div style={{ background:"#0D2240", padding:"13px 0", overflow:"hidden", borderTop:"1px solid rgba(255,255,255,.05)" }}>
        <div className="marquee-track" aria-hidden="true">
          {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i) => (
            <span key={i} style={{ fontSize:item==="✦"?9:12, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:item==="✦"?"#E8541A":"rgba(255,255,255,.65)", padding:item==="✦"?"0 10px":"0 24px" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ QUICK ACCESS ════════════════════════════════════════ */}
      <div style={{ background:"#F5F5F2" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }} variants={staggerWrap()}
          className="home-quick-grid">
          {QUICK_ACCESS.map(item => (
            <motion.div key={item.title} variants={fade}>
              <NavLink to={item.to} style={{ textDecoration:"none", display:"block" }}>
                <div className="quick-card" style={{ background:"#fff", padding:"28px 24px", display:"flex", flexDirection:"column", gap:8 }}>
                  <span style={{ fontSize:22 }}>{item.icon}</span>
                  <div style={{ fontSize:14, fontWeight:700, color:"#0D2240", letterSpacing:"-.2px" }}>{item.title}</div>
                  <div style={{ fontSize:12.5, color:"#888", lineHeight:1.5 }}>{item.desc}</div>
                  <span style={{ marginTop:"auto", fontSize:18, color:"#E8541A", fontWeight:700 }}>→</span>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══════════ PHOTO STRIP ══════════════════════════════════════════ */}
      <section className="home-section" style={{ background:"#fff" }}>
        <div className="home-inner">
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }} variants={staggerWrap()}>
            <motion.p variants={fade} style={{ fontSize:11, fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#E8541A", marginBottom:12 }}>
              Kehidupan Jemaat
            </motion.p>
            <motion.div variants={fade} className="home-announce-header">
              <h2 style={{ fontSize:"clamp(24px,3.2vw,36px)", fontWeight:800, letterSpacing:"-1px", color:"#0D2240", lineHeight:1.1, margin:0 }}>
                Momen <span style={{ color:"#E8541A" }}>Bersama</span> Kita
              </h2>
              <NavLink to="/galeri" style={{ textDecoration:"none", fontSize:13, fontWeight:700, color:"#0D2240", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                Lihat Galeri <ChevronRight size={14} />
              </NavLink>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:"-40px" }} variants={staggerWrap(0.05)} className="home-photo-grid">
            {/* Tall card */}
            <motion.div variants={fadeL} className="photo-card photo-tall" style={{ gridRow:"span 2", borderRadius:16, overflow:"hidden", position:"relative", background:"linear-gradient(160deg,#1E4A7A,#0D2240)" }}>
              <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", minHeight:200 }}>
                <span style={{ fontSize:56, opacity:0.12, color:"#fff" }}>⛪</span>
              </div>
              <div style={{ position:"absolute", top:0, right:0, width:4, height:64, background:"#D4A843", borderRadius:"0 16px 0 0" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"18px 20px", background:"linear-gradient(to top,rgba(0,0,0,.72),transparent)" }}>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:3 }}>Ibadah Minggu</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.6)" }}>Setiap Minggu · 08.00 & 10.30</div>
              </div>
            </motion.div>

            {[
              { label:"Tim Worship",    bg:"linear-gradient(135deg,#E8541A,#C94010)", emoji:"🎵" },
              { label:"GBI Kids",       bg:"linear-gradient(135deg,#D4A843,#b8892e)", emoji:"👶" },
              { label:"Youth & Pemuda", bg:"linear-gradient(135deg,#2A6BAD,#1A3A5C)", emoji:"🔥" },
              { label:"Misi & Outreach",bg:"linear-gradient(135deg,#0D2240,#1E4A7A)", emoji:"🌍" },
            ].map((c, i) => (
              <motion.div key={i} variants={i<2?fadeR:fade} className="photo-card" style={{ borderRadius:16, overflow:"hidden", position:"relative", background:c.bg, minHeight:160 }}>
                <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:36, opacity:0.15, color:"#fff" }}>{c.emoji}</span>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 16px", background:"linear-gradient(to top,rgba(0,0,0,.65),transparent)" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{c.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ STATS ════════════════════════════════════════════════ */}
      <div style={{ background:"#0D2240", padding:"52px 48px" }}>
        <div className="home-inner">
          <div className="home-stats-grid">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.1 }} viewport={{ once:true }}
                className="stat-item"
                style={{ borderRight:i<3?"1px solid rgba(255,255,255,.1)":"none" }}
              >
                <AnimatedCounter to={s.n} suffix={s.suffix} />
                <div style={{ fontSize:12, fontWeight:500, color:"rgba(255,255,255,.45)", letterSpacing:".5px", textTransform:"uppercase" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ HORIZONTAL SCROLL INFO ════════════════════════════════════ */}
      <HorizontalScrollInfo />

      {/* ══════════ PROGRAM ══════════════════════════════════════════════ */}
      <section className="home-section" style={{ background:"#fff" }}>
        <div className="home-inner">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40, flexWrap:"wrap", gap:16 }}>
            <div>
              <span className="section-tag">PROGRAM PELAYANAN</span>
              <div className="section-title">Temukan Pelayanan<br />yang Tepat untuk Anda</div>
            </div>
            <NavLink to="/program" style={{ textDecoration:"none" }}>
              <button style={{ color:"#E8541A", fontSize:14, fontWeight:600, background:"transparent", border:"1px solid #E8541A", padding:"8px 18px", borderRadius:100, cursor:"pointer", fontFamily:"inherit", transition:"all .2s", whiteSpace:"nowrap" }}
                onMouseEnter={e=>{e.currentTarget.style.background="#FEF0E8";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
                Lihat Semua →
              </button>
            </NavLink>
          </motion.div>

          <div className="home-programs-grid">
            <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.55 }} viewport={{ once:true }}
              style={{ background:"#0D2240", borderRadius:20, padding:32, display:"flex", flexDirection:"column", justifyContent:"flex-end", minHeight:320, position:"relative", overflow:"hidden", cursor:"pointer" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,#1A3A5C 0%,#0D2240 60%,rgba(232,84,26,.3) 100%)" }} />
              <motion.div style={{ position:"absolute", top:-60, right:-60, width:240, height:240, borderRadius:"50%", border:"1px solid rgba(232,84,26,.12)", pointerEvents:"none" }}
                animate={{ rotate:360 }} transition={{ duration:30, repeat:Infinity, ease:"linear" }} />
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ display:"inline-block", background:"#E8541A", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:100, marginBottom:16, letterSpacing:0.5 }}>UNGGULAN</div>
                <h3 style={{ fontSize:24, fontWeight:800, color:"#fff", letterSpacing:"-.5px", marginBottom:8 }}>Sekolah Alkitab Minggu</h3>
                <p style={{ fontSize:14, color:"rgba(255,255,255,.65)", lineHeight:1.6, marginBottom:20 }}>Dalami firman Tuhan bersama pengajar berpengalaman setiap minggu pagi.</p>
                <div style={{ width:40, height:40, background:"#E8541A", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:18, cursor:"pointer" }}>→</div>
              </div>
            </motion.div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {programs.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
                  transition={{ delay:i*0.1, duration:0.5 }} viewport={{ once:true }}
                  className="prog-card"
                  style={{ background:"#F8FAFC", borderRadius:16, padding:"20px 22px", border:"1px solid #E8EDF2", display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{p.icon}</div>
                  <div>
                    <h3 style={{ fontSize:15, fontWeight:700, color:"#0D2240", marginBottom:4 }}>{p.title}</h3>
                    <p style={{ fontSize:13, color:"#64748B", lineHeight:1.6, marginBottom:8 }}>{p.desc}</p>
                    <span style={{ fontSize:13, fontWeight:600, color:"#E8541A", cursor:"pointer" }}>Pelajari Lebih →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ GALERI ════════════════════════════════════════════════ */}
      <section className="home-section" style={{ background:"#fff", paddingTop:0 }}>
        <div className="home-inner">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="home-announce-header">
            <div>
              <span className="section-tag">GALERI KEGIATAN</span>
              <div className="section-title">Momen Berharga<br />Bersama Jemaat</div>
            </div>
            <NavLink to="/galeri" style={{ textDecoration:"none" }}>
              <button style={{ color:"#E8541A", fontSize:14, fontWeight:600, background:"transparent", border:"1px solid #E8541A", padding:"8px 18px", borderRadius:100, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
                Lihat Semua →
              </button>
            </NavLink>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:"-40px" }} variants={staggerWrap(0.04)}
            className="home-gallery-grid">
            {GALLERY.map((g, i) => (
              <motion.div key={i} variants={fade} whileHover={{ scale:1.025, transition:{ duration:0.2 } }}
                className={g.span?"gallery-span":""}
                style={{ borderRadius:12, overflow:"hidden", position:"relative", cursor:"pointer", gridColumn:g.span?"span 2":undefined, gridRow:g.span?"span 2":undefined, minHeight:160 }}>
                <div style={{ width:"100%", height:"100%", background:g.bg, display:"flex", alignItems:"center", justifyContent:"center", minHeight:160 }}>
                  <div style={{ fontSize:g.span?44:28, opacity:0.18, color:"#fff" }}>📸</div>
                </div>
                <div style={{ position:"absolute", bottom:10, left:10, background:"rgba(0,0,0,.48)", backdropFilter:"blur(6px)", color:"#fff", fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:100 }}>
                  {g.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ PENGUMUMAN ════════════════════════════════════════════ */}
      <section className="home-section" style={{ background:"#FDF8F3" }}>
        <div className="home-inner">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span className="section-tag">PENGUMUMAN</span>
            <div className="section-title">Info Terkini</div>
            <p style={{ color:"#64748B", fontSize:15, lineHeight:1.75, maxWidth:480, marginBottom:40 }}>
              Jangan lewatkan kabar terbaru dari gereja dan komunitas kami.
            </p>
          </motion.div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {announcements.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.1 }} viewport={{ once:true }}
                className="announce-card"
                style={{ background:"#fff", borderRadius:14, padding:"18px 20px", border:"1px solid #E8EDF2", borderLeft:a.pinned?"4px solid #E8541A":"1px solid #E8EDF2", display:"flex", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
                <span style={{ background:a.tagBg, color:a.tagColor, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:100, whiteSpace:"nowrap", letterSpacing:0.3, flexShrink:0 }}>{a.tag}</span>
                <div style={{ flex:1, minWidth:180 }}>
                  <h4 style={{ fontSize:15, fontWeight:700, color:"#0D2240", marginBottom:3 }}>{a.title}</h4>
                  <p style={{ fontSize:13, color:"#64748B", lineHeight:1.5 }}>{a.desc}</p>
                </div>
                <span style={{ fontSize:12, color:"#94A3B8", whiteSpace:"nowrap", flexShrink:0 }}>{a.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER CTA ════════════════════════════════════════════ */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:0.7 }} viewport={{ once:true }}
        style={{ background:"linear-gradient(135deg,#0D2240 0%,#1a3a5c 100%)", padding:"80px 20px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:320, height:320, background:"radial-gradient(circle,rgba(232,84,26,.15),transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:-60, width:240, height:240, background:"radial-gradient(circle,rgba(212,168,67,.08),transparent 70%)", pointerEvents:"none" }} />

        <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={{ show:{ transition:{ staggerChildren:0.12 } } }} style={{ position:"relative", zIndex:1, maxWidth:600, margin:"0 auto" }}>
          <motion.p variants={fade} style={{ fontSize:11, fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#D4A843", marginBottom:16 }}>
            Bergabunglah Bersama Kami
          </motion.p>
          <motion.h2 variants={fade} style={{ fontSize:"clamp(26px,4vw,46px)", fontWeight:800, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.1, marginBottom:18 }}>
            Jadilah Bagian dari{" "}
            <em style={{ fontStyle:"normal", color:"#E8541A" }}>Keluarga</em> Ini
          </motion.h2>
          <motion.p variants={fade} style={{ fontSize:15, color:"rgba(255,255,255,.6)", marginBottom:36 }}>
            Hadir dan rasakan kehangatan komunitas GBI Sion Karawang.
          </motion.p>
          <motion.div variants={fade} style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <NavLink to="/kontak" style={{ textDecoration:"none" }}>
              <button className="hero-cta-primary">Gabung Ibadah →</button>
            </NavLink>
            <NavLink to="/kontak" style={{ textDecoration:"none" }}>
              <button className="hero-cta-outline">Hubungi Kami</button>
            </NavLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
