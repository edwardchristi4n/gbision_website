import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import gerejaImg from "@/assets/images/gereja.jpg";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const WA_NUMBER  = "6281234567890"; // ganti dengan nomor aktif
const WA_LINK    = `https://wa.me/${WA_NUMBER}`;
const GMAPS_LINK = "https://www.google.com/maps/place/Gereja+Bethel+Indonesia+Sion/@-6.3086222,107.3010535,17z";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CONTACT_CARDS = [
  {
    icon: <MapPin size={22} />,
    title: "Alamat Gereja",
    lines: ["Jl. Contoh No.123", "Karawang, Jawa Barat 41311"],
    color: "#FEF0E8",
    iconColor: "#E8541A",
    link: GMAPS_LINK,
    linkLabel: "Lihat di Maps →",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "WhatsApp",
    lines: ["+62 812 3456 7890", "Senin – Sabtu, 08.00–17.00"],
    color: "#E8F8F0",
    iconColor: "#0F6E56",
    link: WA_LINK,
    linkLabel: "Chat di WhatsApp →",
  },
  {
    icon: <Mail size={22} />,
    title: "Email",
    lines: ["info@gbision.org", "admin@gbision.org"],
    color: "#F5F0FE",
    iconColor: "#6B21A8",
    link: "mailto:info@gbision.org",
    linkLabel: "Kirim Email →",
  },
  {
    icon: <Clock size={22} />,
    title: "Jam Kantor",
    lines: ["Senin – Jumat: 08.00–17.00", "Sabtu: 08.00–13.00", "Minggu: 07.00–15.00"],
    color: "#E8F4FD",
    iconColor: "#1A3A5C",
    link: "#form",
    linkLabel: "Kirim Pesan →",
  },
];

const OFFICE_HOURS = [
  { day: "Senin – Jumat", time: "08.00 – 17.00 WIB" },
  { day: "Sabtu",         time: "08.00 – 13.00 WIB" },
  { day: "Minggu",        time: "07.00 – 15.00 WIB" },
];

const SUBJECT_OPTIONS = [
  "Informasi Ibadah",
  "Baptisan Air",
  "Konseling Rohani",
  "Kelompok Sel",
  "Youth & Remaja",
  "Pelayanan Musik",
  "Lainnya",
];

const SOCIALS = [
  {
    id: "IG",
    label: "Instagram",
    text: "@gbisionkarawang",
    brandColor: "#E1306C",
    hoverBg: "rgba(225,48,108,0.06)",
    iconBg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    link: "https://instagram.com/gbisionkarawang",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: "YT",
    label: "YouTube",
    text: "GBI Sion Karawang",
    brandColor: "#FF0000",
    hoverBg: "rgba(255,0,0,0.05)",
    iconBg: "#FF0000",
    link: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    id: "WA",
    label: "WhatsApp",
    text: "+62 812 3456 7890",
    brandColor: "#25D366",
    hoverBg: "rgba(37,211,102,0.06)",
    iconBg: "#25D366",
    link: WA_LINK,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    id: "FB",
    label: "Facebook",
    text: "GBI Sion Karawang",
    brandColor: "#1877F2",
    hoverBg: "rgba(24,119,242,0.06)",
    iconBg: "#1877F2",
    link: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fade       = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const fadeR      = { hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.55 } } };
const staggerWrap = (delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: delay } } });

function FloatDot({ x, y, size, delay, duration }: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: "rgba(232,84,26,.18)", pointerEvents: "none", zIndex: 1 }}
      animate={{ y: [0, -16, 0], opacity: [0.18, 0.42, 0.18] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }} />
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  }

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #E8EDF2",
    fontSize: 14, fontFamily: "inherit", color: "#111", background: "#fff",
    outline: "none", transition: "border-color .2s",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        .kontak-section { padding: 80px 48px; }
        .kontak-inner   { max-width: 1200px; margin: 0 auto; }
        .kontak-cards-grid   { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .kontak-form-grid    { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: start; }
        .kontak-socials-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .kontak-card { transition: all .28s; }
        .kontak-card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(13,34,64,.1); }
        .social-card { transition: background .25s, border-color .25s, box-shadow .25s, transform .25s; }
        .social-card:hover { transform: translateY(-4px); }
        .form-input:focus { border-color: #E8541A !important; }
        .form-input::placeholder { color: #aaa; }
        @keyframes heroGlow { 0%,100% { opacity:.13; } 50% { opacity:.22; } }
        .kontak-hero-glow { animation: heroGlow 5s ease-in-out infinite; }

        @media (max-width: 1024px) {
          .kontak-section { padding: 64px 32px; }
          .kontak-cards-grid   { grid-template-columns: repeat(2,1fr); }
          .kontak-socials-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .kontak-section { padding: 52px 20px; }
          .kontak-cards-grid   { grid-template-columns: 1fr; }
          .kontak-form-grid    { grid-template-columns: 1fr; gap: 32px; }
          .kontak-socials-grid { grid-template-columns: repeat(2,1fr); }
          .map-wrapper { margin: 0 20px 52px !important; height: 320px !important; }
        }
        @media (max-width: 480px) {
          .kontak-socials-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "120px 20px 100px", background: "#0D2240", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={gerejaImg} alt="" aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(13,34,64,0.82) 0%,rgba(26,58,92,0.76) 45%,rgba(13,34,64,0.84) 100%)" }} />
          <div className="kontak-hero-glow" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 60% 50% at 65% 35%,rgba(232,84,26,.15),transparent 65%),radial-gradient(ellipse 40% 40% at 25% 72%,rgba(212,168,67,.09),transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,34,64,.05) 0%,rgba(13,34,64,.45) 100%)" }} />
        </div>

        <FloatDot x="7%" y="22%" size={5} delay={0} duration={4.5} />
        <FloatDot x="85%" y="20%" size={6} delay={1.1} duration={5.2} />
        <FloatDot x="70%" y="68%" size={4} delay={0.7} duration={4} />
        <FloatDot x="20%" y="65%" size={7} delay={1.9} duration={5.8} />
        <FloatDot x="92%" y="50%" size={5} delay={1.4} duration={3.9} />

        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", textAlign: "center", color: "#fff" }}>
          <motion.div variants={fade} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#D4A843", marginBottom: 20 }}>
            <span style={{ width: 24, height: 1, background: "#D4A843", opacity: 0.6, display: "block" }} />
            GBI Sion Karawang
            <span style={{ width: 24, height: 1, background: "#D4A843", opacity: 0.6, display: "block" }} />
          </motion.div>

          <motion.h1 variants={fade} style={{ fontSize: "clamp(36px,6vw,68px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 20 }}>
            Kami Senang{" "}
            <em style={{ fontStyle: "normal", color: "#E8541A" }}>Mendengar</em>
            <br />dari Anda
          </motion.h1>

          <motion.p variants={fade} style={{ fontSize: "clamp(14px,2vw,16px)", opacity: 0.72, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 36px" }}>
            Ada pertanyaan, butuh konseling, atau ingin bergabung? Tim kami siap membantu Anda dengan sepenuh hati.
          </motion.p>

          <motion.div variants={fade} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {/* Kontak Kami → WhatsApp */}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ padding: "13px 28px", borderRadius: 100, background: "#E8541A", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(232,84,26,.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <MessageCircle size={16} /> Kontak Kami
              </button>
            </a>
            <a href="#form" style={{ textDecoration: "none" }}>
              <button style={{ padding: "13px 28px", borderRadius: 100, background: "transparent", color: "#fff", fontSize: 14, fontWeight: 600, border: "1.5px solid rgba(255,255,255,.32)", cursor: "pointer", fontFamily: "inherit", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.32)"; }}>
                Kirim Pesan
              </button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Marquee strip ─── */}
      <div style={{ background: "#0a1b33", padding: "11px 0", overflow: "hidden" }}>
        <style>{`
          @keyframes marqueeScroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
          .marquee-kontak { display:flex;align-items:center;white-space:nowrap;width:max-content;animation:marqueeScroll 30s linear infinite; }
        `}</style>
        <div className="marquee-kontak" aria-hidden="true">
          {["Hubungi Kami","✦","Lokasi Gereja","✦","Konseling","✦","Jadwal Ibadah","✦","WhatsApp","✦","Email","✦",
            "Hubungi Kami","✦","Lokasi Gereja","✦","Konseling","✦","Jadwal Ibadah","✦","WhatsApp","✦","Email","✦",
          ].map((item, i) => (
            <span key={i} style={{ fontSize: item==="✦"?9:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color: item==="✦"?"#E8541A":"rgba(255,255,255,.5)", padding: item==="✦"?"0 10px":"0 22px" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ═══ CONTACT CARDS ═══════════════════════════════════════════════ */}
      <section className="kontak-section" style={{ background: "#fff" }}>
        <div className="kontak-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 40 }}>
            <span className="section-tag">CARA MENGHUBUNGI</span>
            <div className="section-title">Pilih Cara yang Mudah<br />untuk Anda</div>
          </motion.div>

          <div className="kontak-cards-grid">
            {CONTACT_CARDS.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                className="kontak-card"
                style={{ background: "#F8FAFC", borderRadius: 18, padding: "24px 22px", border: "1px solid #E8EDF2" }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: card.color, display: "flex", alignItems: "center", justifyContent: "center", color: card.iconColor, marginBottom: 16 }}>
                  {card.icon}
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0D2240", marginBottom: 10 }}>{card.title}</h4>
                {card.lines.map(line => (
                  <p key={line} style={{ fontSize: 13.5, color: "#444", marginBottom: 3, lineHeight: 1.6 }}>{line}</p>
                ))}
                <a href={card.link} target={card.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block", marginTop: 14, fontSize: 13, fontWeight: 700, color: card.iconColor }}>
                  {card.linkLabel}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORM + OFFICE INFO ══════════════════════════════════════════ */}
      <section id="form" className="kontak-section" style={{ background: "#FDF8F3" }}>
        <div className="kontak-inner">
          <div className="kontak-form-grid">
            {/* Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={staggerWrap()}>
              <motion.div variants={fade}>
                <span className="section-tag">KIRIM PESAN</span>
                <div className="section-title" style={{ marginBottom: 8 }}>Ceritakan<br />Kebutuhan Anda</div>
                <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                  Isi formulir di bawah ini dan tim kami akan merespons dalam 1–2 hari kerja.
                </p>
              </motion.div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: "#fff", borderRadius: 20, padding: "48px 32px", textAlign: "center", border: "1px solid #E8EDF2" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E8F8F0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#0F6E56" }}>
                    <CheckCircle size={32} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0D2240", marginBottom: 8 }}>Pesan Terkirim!</h3>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginBottom: 24 }}>
                    Terima kasih! Tim kami akan menghubungi Anda segera.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="btn-primary" style={{ fontSize: 14 }}>
                    Kirim Pesan Lagi
                  </button>
                </motion.div>
              ) : (
                <motion.form variants={fade} onSubmit={handleSubmit}
                  style={{ background: "#fff", borderRadius: 20, padding: "32px", border: "1px solid #E8EDF2", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#0D2240", letterSpacing: 0.3, display: "block", marginBottom: 6 }}>Nama Lengkap *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        className="form-input" style={inputStyle} placeholder="Nama Anda" />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#0D2240", letterSpacing: 0.3, display: "block", marginBottom: 6 }}>Nomor Telepon</label>
                      <input name="phone" value={form.phone} onChange={handleChange} type="tel"
                        className="form-input" style={inputStyle} placeholder="+62..." />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#0D2240", letterSpacing: 0.3, display: "block", marginBottom: 6 }}>Alamat Email *</label>
                    <input name="email" value={form.email} onChange={handleChange} required type="email"
                      className="form-input" style={inputStyle} placeholder="email@anda.com" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#0D2240", letterSpacing: 0.3, display: "block", marginBottom: 6 }}>Subjek</label>
                    <select name="subject" value={form.subject} onChange={handleChange}
                      className="form-input" style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="">Pilih subjek...</option>
                      {SUBJECT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#0D2240", letterSpacing: 0.3, display: "block", marginBottom: 6 }}>Pesan *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      className="form-input" style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                      placeholder="Tuliskan pesan Anda di sini..." />
                  </div>
                  <button type="submit" disabled={submitting}
                    style={{ padding: "13px 28px", borderRadius: 100, background: submitting ? "#aaa" : "#E8541A", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .25s", marginTop: 4 }}>
                    {submitting ? "Mengirim..." : <><Send size={16} /> Kirim Pesan</>}
                  </button>
                </motion.form>
              )}
            </motion.div>

            {/* Sidebar info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={staggerWrap(0.1)}>
              {/* Office hours */}
              <motion.div variants={fadeR} style={{ background: "#fff", borderRadius: 18, padding: "28px", border: "1px solid #E8EDF2", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FEF0E8", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8541A" }}>
                    <Clock size={18} />
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0D2240" }}>Jam Kantor</h4>
                </div>
                {OFFICE_HOURS.map((h, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < OFFICE_HOURS.length - 1 ? "1px solid #F5F5F5" : "none" }}>
                    <span style={{ fontSize: 13.5, color: "#444", fontWeight: 500 }}>{h.day}</span>
                    <span style={{ fontSize: 13, color: "#E8541A", fontWeight: 700 }}>{h.time}</span>
                  </div>
                ))}
              </motion.div>

              {/* Location card */}
              <motion.div variants={fadeR}
                style={{ background: "linear-gradient(135deg,#0D2240,#1A3A5C)", borderRadius: 18, padding: "28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(232,84,26,.12)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(232,84,26,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8541A", marginBottom: 16 }}>
                    <MapPin size={18} />
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Lokasi Kami</h4>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 16 }}>
                    Gereja Bethel Indonesia Sion<br />Karawang, Jawa Barat
                  </p>
                  <a href={GMAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <button style={{ padding: "9px 18px", borderRadius: 100, background: "#E8541A", color: "#fff", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 7, transition: "all .2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                      <MapPin size={13} /> Buka Google Maps
                    </button>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ GOOGLE MAPS ════════════════════════════════════════════════ */}
      <section style={{ background: "#fff" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="map-wrapper"
          style={{ margin: "0 48px 80px", borderRadius: 20, overflow: "hidden", height: 450, boxShadow: "0 8px 40px rgba(13,34,64,.12)", border: "1px solid #E8EDF2" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6576984820936!2d107.30105347353981!3d-6.308622293680643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6977c4a3d9a5c5%3A0xe9499e4009260c77!2sGereja%20Bethel%20Indonesia%20Sion!5e0!3m2!1sid!2sid!4v1782496310238!5m2!1sid!2sid"
            width="100%" height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Lokasi GBI Sion Karawang"
          />
        </motion.div>
      </section>

      {/* ═══ SOSIAL MEDIA ════════════════════════════════════════════════ */}
      <section className="kontak-section" style={{ background: "#FDF8F3" }}>
        <div className="kontak-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: 48, textAlign: "center" }}>
            <span className="section-tag" style={{ display: "block", textAlign: "center" }}>IKUTI KAMI</span>
            <div className="section-title" style={{ textAlign: "center" }}>Terhubung di<br />Media Sosial</div>
            <p style={{ color: "#64748B", fontSize: 14, marginTop: 12, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Dapatkan update terbaru, jadwal ibadah, dan momen kebersamaan jemaat.
            </p>
          </motion.div>

          <div className="kontak-socials-grid">
            {SOCIALS.map((s, i) => {
              const isHovered = hoveredSocial === s.id;
              return (
                <motion.a
                  key={s.id}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="social-card"
                  onMouseEnter={() => setHoveredSocial(s.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    background: isHovered ? s.hoverBg : "#fff",
                    borderRadius: 20,
                    padding: "28px 24px",
                    border: isHovered ? `1.5px solid ${s.brandColor}` : "1.5px solid #E8EDF2",
                    boxShadow: isHovered ? `0 12px 36px ${s.brandColor}22` : "0 2px 8px rgba(13,34,64,.04)",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: s.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: isHovered ? `0 6px 20px ${s.brandColor}40` : "none",
                    transition: "box-shadow .25s",
                  }}>
                    {s.icon}
                  </div>

                  {/* Label */}
                  <div style={{
                    fontSize: 15, fontWeight: 800,
                    color: isHovered ? s.brandColor : "#0D2240",
                    marginBottom: 5,
                    transition: "color .25s",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}>
                    {s.label}
                  </div>

                  {/* Handle */}
                  <div style={{
                    fontSize: 13, color: "#64748B",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    lineHeight: 1.4,
                  }}>
                    {s.text}
                  </div>

                  {/* "Ikuti" link-style cta */}
                  <div style={{
                    marginTop: 14,
                    fontSize: 12, fontWeight: 700,
                    color: isHovered ? s.brandColor : "#94A3B8",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    transition: "color .25s",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}>
                    {s.id === "WA" ? "Chat Sekarang →" : "Ikuti Kami →"}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══════════════════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
        style={{ background: "linear-gradient(135deg,#0D2240 0%,#1a3a5c 100%)", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "radial-gradient(circle,rgba(232,84,26,.15),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 220, height: 220, background: "radial-gradient(circle,rgba(212,168,67,.08),transparent 70%)", pointerEvents: "none" }} />

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <motion.p variants={fade} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#D4A843", marginBottom: 14 }}>
            Bergabunglah Bersama Kami
          </motion.p>
          <motion.h2 variants={fade} style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
            Jadilah Bagian dari{" "}
            <em style={{ fontStyle: "normal", color: "#E8541A" }}>Keluarga</em> Ini
          </motion.h2>
          <motion.p variants={fade} style={{ fontSize: 15, color: "rgba(255,255,255,.6)", marginBottom: 36 }}>
            Hadir dan rasakan kehangatan komunitas GBI Sion Karawang.
          </motion.p>
          <motion.div variants={fade} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <NavLink to="/jadwal" style={{ textDecoration: "none" }}>
              <button style={{ padding: "13px 28px", borderRadius: 100, background: "#E8541A", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(232,84,26,.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                Lihat Jadwal Ibadah →
              </button>
            </NavLink>
            <NavLink to="/tentang" style={{ textDecoration: "none" }}>
              <button style={{ padding: "13px 28px", borderRadius: 100, background: "transparent", color: "#fff", fontSize: 14, fontWeight: 600, border: "1.5px solid rgba(255,255,255,.32)", cursor: "pointer", fontFamily: "inherit", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.32)"; }}>
                Tentang Gereja
              </button>
            </NavLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
