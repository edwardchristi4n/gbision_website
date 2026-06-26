import { motion } from "framer-motion";
import { Clock, MapPin, Wifi, Users, Heart, Music, ChevronRight, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MAIN_SCHEDULES = [
  {
    color: "#0D2240",
    colorLight: "rgba(13,34,64,.08)",
    day: "Setiap Minggu",
    name: "Ibadah Raya Pagi",
    time: "08.00 – 10.00 WIB",
    location: "Gedung Utama, Lt. 2",
    leader: "Gembala Sidang",
    tags: ["Anak tersedia", "Parkir luas", "Live streaming"],
    desc: "Ibadah pembuka hari Tuhan bersama seluruh jemaat. Pujian, penyembahan, dan firman yang membangun iman.",
  },
  {
    color: "#1A3A5C",
    colorLight: "rgba(26,58,92,.08)",
    day: "Setiap Minggu",
    name: "Ibadah Raya Siang",
    time: "10.30 – 12.30 WIB",
    location: "Gedung Utama, Lt. 2",
    leader: "Tim Pendeta",
    tags: ["Anak tersedia", "Parkir luas", "Live streaming"],
    desc: "Ibadah siang untuk yang tidak bisa hadir di sesi pagi. Suasana hangat dan penuh kasih bersama keluarga.",
  },
  {
    color: "#E8541A",
    colorLight: "rgba(232,84,26,.08)",
    day: "Setiap Rabu",
    name: "Ibadah Pemuda",
    time: "18.30 – 20.30 WIB",
    location: "Aula Youth, Lt. 3",
    leader: "Tim Youth",
    tags: ["Usia 15–30", "Musik kontemporer", "Kelas doa"],
    desc: "Wadah generasi muda bertumbuh dalam iman, membangun persahabatan, dan menemukan panggilan hidup.",
  },
];

const SPECIAL_SCHEDULES = [
  {
    icon: "🌙",
    title: "Ibadah Doa Malam",
    day: "Jumat Pertama",
    time: "19.00 – 21.00 WIB",
    color: "#1A3A5C",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Ibadah Keluarga",
    day: "Minggu ke-3",
    time: "10.30 – 12.00 WIB",
    color: "#0D2240",
  },
  {
    icon: "🌍",
    title: "Ibadah Misi & Doa",
    day: "Sabtu ke-2",
    time: "08.00 – 10.00 WIB",
    color: "#E8541A",
  },
];

const PRACTICAL_INFO = [
  { icon: <MapPin size={22} />, title: "Lokasi & Parkir", desc: "Gedung GBI Sion, Jl. Contoh No.123, Karawang. Parkir gratis tersedia untuk 200+ kendaraan.", color: "#FEF0E8", iconColor: "#E8541A" },
  { icon: <Users size={22} />, title: "Pakaian", desc: "Pakaian bebas rapi. Tidak ada dress code khusus — yang penting hadir dengan hati terbuka.", color: "#E8F4FD", iconColor: "#1A3A5C" },
  { icon: <Heart size={22} />, title: "Persembahan", desc: "Kotak persembahan tersedia di setiap pintu keluar. Transfer bank juga tersedia.", color: "#E8F8F0", iconColor: "#0F6E56" },
  { icon: <Music size={22} />, title: "Musik & Pujian", desc: "Tim worship siap memimpin pujian yang menyentuh hati dan membawa hadirat Tuhan.", color: "#F5F0FE", iconColor: "#6B21A8" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const staggerWrap = (delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: delay } } });

function FloatDot({ x, y, size, delay, duration }: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: "rgba(232,84,26,.18)", pointerEvents: "none", zIndex: 1 }}
      animate={{ y: [0, -16, 0], opacity: [0.18, 0.42, 0.18] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }} />
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Schedule() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        .sched-section { padding: 80px 48px; }
        .sched-inner   { max-width: 1200px; margin: 0 auto; }
        .sched-main-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .sched-special-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .sched-info-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .sched-card { transition: all .28s; cursor: pointer; }
        .sched-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(13,34,64,.1); }
        .streaming-tag-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(232,84,26,.12); color: #E8541A;
          font-size: 11px; font-weight: 700; letter-spacing: 1px;
          padding: 5px 12px; border-radius: 100px; text-transform: uppercase;
        }
        @keyframes heroGlow {
          0%,100% { opacity:.13; } 50% { opacity:.22; }
        }
        .sched-hero-glow { animation: heroGlow 5s ease-in-out infinite; }

        @keyframes scrollPulse {
          0%,100% { opacity:.4; transform:scaleY(1); }
          50%      { opacity:.85; transform:scaleY(1.18); }
        }

        @media (max-width: 1024px) {
          .sched-section { padding: 64px 32px; }
          .sched-info-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .sched-section { padding: 52px 20px; }
          .sched-main-grid    { grid-template-columns: 1fr; }
          .sched-special-grid { grid-template-columns: 1fr; }
          .sched-info-grid    { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 480px) {
          .sched-info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "120px 20px 100px", background: "#0D2240", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0D2240 0%,#1a3a5c 40%,#0D2240 100%)" }} />
          <div className="sched-hero-glow" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 60% 50% at 70% 40%,rgba(232,84,26,.16),transparent 65%),radial-gradient(ellipse 40% 40% at 20% 70%,rgba(212,168,67,.1),transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,34,64,.1) 0%,rgba(13,34,64,.55) 100%)" }} />
        </div>

        <FloatDot x="8%" y="20%" size={5} delay={0} duration={4.5} />
        <FloatDot x="88%" y="25%" size={6} delay={1.2} duration={5.2} />
        <FloatDot x="75%" y="70%" size={4} delay={0.6} duration={3.8} />
        <FloatDot x="18%" y="68%" size={7} delay={1.8} duration={5.8} />

        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", textAlign: "center", color: "#fff" }}>
          <motion.div variants={fade} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#D4A843", marginBottom: 20 }}>
            <span style={{ width: 24, height: 1, background: "#D4A843", opacity: 0.6, display: "block" }} />
            GBI Sion Karawang
            <span style={{ width: 24, height: 1, background: "#D4A843", opacity: 0.6, display: "block" }} />
          </motion.div>

          <motion.h1 variants={fade} style={{ fontSize: "clamp(36px,6vw,68px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 20 }}>
            Jadwal <em style={{ fontStyle: "normal", color: "#E8541A" }}>Ibadah</em>
            <br />Bersama Kami
          </motion.h1>

          <motion.p variants={fade} style={{ fontSize: "clamp(14px,2vw,16px)", opacity: 0.72, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 36px" }}>
            Hadir, bertemu, dan merayakan kasih Tuhan bersama keluarga besar GBI Sion Karawang setiap minggunya.
          </motion.p>

          <motion.div variants={fade} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <NavLink to="/kontak" style={{ textDecoration: "none" }}>
              <button style={{ padding: "13px 28px", borderRadius: 100, background: "#E8541A", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(232,84,26,.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                Gabung Ibadah <ArrowRight size={16} />
              </button>
            </NavLink>
            <NavLink to="/kontak" style={{ textDecoration: "none" }}>
              <button style={{ padding: "13px 28px", borderRadius: 100, background: "transparent", color: "#fff", fontSize: 14, fontWeight: 600, border: "1.5px solid rgba(255,255,255,.32)", cursor: "pointer", fontFamily: "inherit", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.32)"; }}>
                Hubungi Kami
              </button>
            </NavLink>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Marquee strip ─── */}
      <div style={{ background: "#0a1b33", padding: "11px 0", overflow: "hidden" }}>
        <style>{`
          @keyframes marqueeScroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
          .marquee-track2 { display:flex;align-items:center;white-space:nowrap;width:max-content;animation:marqueeScroll 28s linear infinite; }
        `}</style>
        <div className="marquee-track2" aria-hidden="true">
          {["Ibadah Minggu", "✦", "Ibadah Pemuda", "✦", "Ibadah Doa", "✦", "Ibadah Keluarga", "✦", "Live Streaming", "✦", "Setiap Minggu", "✦",
            "Ibadah Minggu", "✦", "Ibadah Pemuda", "✦", "Ibadah Doa", "✦", "Ibadah Keluarga", "✦", "Live Streaming", "✦", "Setiap Minggu", "✦",
          ].map((item, i) => (
            <span key={i} style={{ fontSize: item === "✦" ? 9 : 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: item === "✦" ? "#E8541A" : "rgba(255,255,255,.5)", padding: item === "✦" ? "0 10px" : "0 22px" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ═══ JADWAL RUTIN ════════════════════════════════════════════════ */}
      <section className="sched-section" style={{ background: "#FDF8F3" }}>
        <div className="sched-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: 44 }}>
            <span className="section-tag">JADWAL RUTIN</span>
            <div className="section-title">Waktu Ibadah Minggu</div>
            <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.75, maxWidth: 520 }}>
              Pilih sesi yang paling sesuai dengan Anda dan keluarga. Kami selalu menyambut kehadiran Anda.
            </p>
          </motion.div>

          <div className="sched-main-grid">
            {MAIN_SCHEDULES.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.55 }} viewport={{ once: true }}
                className="sched-card"
                style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E8EDF2" }}>
                {/* Header */}
                <div style={{ background: s.color, padding: "24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
                  <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />
                  <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{s.day}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-.5px", marginBottom: 4 }}>{s.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.8)", fontSize: 14, fontWeight: 600 }}>
                    <Clock size={14} /> {s.time}
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: "24px" }}>
                  <div style={{ width: 28, height: 3, background: "#E8541A", borderRadius: 100, marginBottom: 16 }} />
                  <p style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#0D2240", fontWeight: 600, marginBottom: 12 }}>
                    <MapPin size={14} color="#E8541A" /> {s.location}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 11, fontWeight: 600, background: s.colorLight, color: s.color, padding: "3px 10px", borderRadius: 100 }}>{tag}</span>
                    ))}
                  </div>
                  <NavLink to="/kontak" style={{ textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", borderRadius: 100, background: s.color, color: "#fff", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = ".88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>
                      Bergabung <ChevronRight size={15} />
                    </button>
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IBADAH ONLINE ════════════════════════════════════════════════ */}
      <section className="sched-section" style={{ background: "#fff" }}>
        <div className="sched-inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={staggerWrap()}>
              <motion.div variants={fade}>
                <div className="streaming-tag-badge" style={{ marginBottom: 20 }}>
                  <Wifi size={13} /> Live Streaming
                </div>
              </motion.div>
              <motion.h2 variants={fade} style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, color: "#0D2240", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: 16 }}>
                Tonton Ibadah di{" "}
                <span style={{ color: "#E8541A" }}>Mana Saja</span>
              </motion.h2>
              <motion.p variants={fade} style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginBottom: 28 }}>
                Tidak bisa hadir secara langsung? Bergabunglah melalui live streaming YouTube kami. Semua sesi ibadah ditayangkan secara langsung setiap minggunya.
              </motion.p>
              <motion.div variants={fade} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  { icon: <Clock size={16} />, text: "Minggu: 08.00 WIB & 10.30 WIB" },
                  { icon: <Clock size={16} />, text: "Rabu: 18.30 WIB (Ibadah Pemuda)" },
                  { icon: <Wifi size={16} />, text: "Platform: YouTube GBI Sion Karawang" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#444" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FEF0E8", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8541A", flexShrink: 0 }}>{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fade}>
                <a
                  href="https://www.youtube.com/watch?v=wcG52gI_Xm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      padding: "13px 28px",
                      borderRadius: 100,
                      background: "#E8541A",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Tonton Live Streaming →
                  </button>
                </a>
              </motion.div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(0,0,0,.15)",
              }}
            >
              <iframe
                width="100%"
                height="420"
                src="https://www.youtube.com/embed/wcG52gI_Xm8"
                title="Ibadah Online GBI Sion Karawang"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: "100%",
                  border: "none",
                  display: "block",
                }}
              />
            </motion.div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .streaming-two-col { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ═══ JADWAL KHUSUS ═══════════════════════════════════════════════ */}
      <section className="sched-section" style={{ background: "#FDF8F3" }}>
        <div className="sched-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 40 }}>
            <span className="section-tag">IBADAH KHUSUS</span>
            <div className="section-title">Jadwal Bulanan</div>
            <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.75, maxWidth: 480 }}>
              Selain ibadah rutin, kami juga menyelenggarakan ibadah khusus setiap bulannya.
            </p>
          </motion.div>

          <div className="sched-special-grid">
            {SPECIAL_SCHEDULES.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #E8EDF2", display: "flex", alignItems: "flex-start", gap: 16, cursor: "pointer", transition: "all .25s" }}
                whileHover={{ y: -3, boxShadow: "0 10px 32px rgba(13,34,64,.08)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0D2240", marginBottom: 4 }}>{s.title}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#E8541A", fontWeight: 600, marginBottom: 3 }}>
                    <Clock size={13} /> {s.time}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#64748B" }}>{s.day}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INFO PRAKTIS ════════════════════════════════════════════════ */}
      <section className="sched-section" style={{ background: "#fff" }}>
        <div className="sched-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 40 }}>
            <span className="section-tag">PERSIAPAN</span>
            <div className="section-title">Info Praktis</div>
            <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.75, maxWidth: 480 }}>
              Semua yang perlu Anda ketahui sebelum hadir ke ibadah.
            </p>
          </motion.div>

          <div className="sched-info-grid">
            {PRACTICAL_INFO.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{ background: "#F8FAFC", borderRadius: 16, padding: "24px 22px", border: "1px solid #E8EDF2", cursor: "default" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: item.iconColor, marginBottom: 14 }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0D2240", marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
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
            Kami Menunggu Anda
          </motion.p>
          <motion.h2 variants={fade} style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
            Hadir & Rasakan{" "}
            <em style={{ fontStyle: "normal", color: "#E8541A" }}>Kasih</em>-Nya
          </motion.h2>
          <motion.p variants={fade} style={{ fontSize: 15, color: "rgba(255,255,255,.6)", marginBottom: 36 }}>
            Setiap ibadah adalah undangan baru untuk bertemu Tuhan bersama.
          </motion.p>
          <motion.div variants={fade} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <NavLink to="/kontak" style={{ textDecoration: "none" }}>
              <button style={{ padding: "13px 28px", borderRadius: 100, background: "#E8541A", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(232,84,26,.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                Gabung Ibadah →
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
