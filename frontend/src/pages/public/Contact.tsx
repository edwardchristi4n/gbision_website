import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight, Send, CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CONTACT_CARDS = [
  {
    icon: <MapPin size={22} />,
    title: "Alamat Gereja",
    lines: ["Jl. Contoh No.123", "Karawang, Jawa Barat 41311"],
    color: "#FEF0E8",
    iconColor: "#E8541A",
    link: "#",
    linkLabel: "Lihat di Maps →",
  },
  {
    icon: <Phone size={22} />,
    title: "Telepon",
    lines: ["+62 812 3456 7890", "+62 22 1234 5678"],
    color: "#E8F4FD",
    iconColor: "#1A3A5C",
    link: "tel:+6281234567890",
    linkLabel: "Hubungi Sekarang →",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "WhatsApp",
    lines: ["+62 812 3456 7890", "Senin – Sabtu, 08.00–17.00"],
    color: "#E8F8F0",
    iconColor: "#0F6E56",
    link: "#",
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
  { id:"IG", label:"Instagram",  color:"#E8541A", text:"@gbisionkarawang" },
  { id:"YT", label:"YouTube",    color:"#1A3A5C", text:"GBI Sion Karawang" },
  { id:"WA", label:"WhatsApp",   color:"#0F6E56", text:"+62 812 3456 7890" },
  { id:"FB", label:"Facebook",   color:"#1A4A8F", text:"GBI Sion Karawang" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fade  = { hidden:{opacity:0,y:24},  show:{opacity:1,y:0,  transition:{duration:0.55}} };
const fadeL = { hidden:{opacity:0,x:-24}, show:{opacity:1,x:0,  transition:{duration:0.55}} };
const fadeR = { hidden:{opacity:0,x:24},  show:{opacity:1,x:0,  transition:{duration:0.55}} };
const staggerWrap = (delay=0) => ({ hidden:{}, show:{ transition:{ staggerChildren:0.1, delayChildren:delay } } });

function FloatDot({ x,y,size,delay,duration }:{ x:string;y:string;size:number;delay:number;duration:number }) {
  return (
    <motion.div style={{ position:"absolute", left:x, top:y, width:size, height:size, borderRadius:"50%", background:"rgba(232,84,26,.18)", pointerEvents:"none", zIndex:1 }}
      animate={{ y:[0,-16,0], opacity:[0.18,0.42,0.18] }}
      transition={{ duration, delay, repeat:Infinity, ease:"easeInOut" }} />
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  }

  const inputStyle = {
    width:"100%", padding:"12px 16px", borderRadius:12, border:"1.5px solid #E8EDF2",
    fontSize:14, fontFamily:"inherit", color:"#111", background:"#fff",
    outline:"none", transition:"border-color .2s",
    boxSizing:"border-box" as const,
  };

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        .kontak-section { padding: 80px 48px; }
        .kontak-inner   { max-width: 1200px; margin: 0 auto; }
        .kontak-cards-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .kontak-form-grid  { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: start; }
        .kontak-socials-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .kontak-card { transition: all .28s; }
        .kontak-card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(13,34,64,.1); }
        .form-input:focus { border-color: #E8541A !important; }
        .form-input::placeholder { color: #aaa; }
        @keyframes heroGlow {
          0%,100% { opacity:.13; } 50% { opacity:.22; }
        }
        .kontak-hero-glow { animation: heroGlow 5s ease-in-out infinite; }

        @media (max-width: 1024px) {
          .kontak-section { padding: 64px 32px; }
          .kontak-cards-grid  { grid-template-columns: repeat(2,1fr); }
          .kontak-socials-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .kontak-section { padding: 52px 20px; }
          .kontak-cards-grid  { grid-template-columns: 1fr; }
          .kontak-form-grid   { grid-template-columns: 1fr; gap: 32px; }
          .kontak-socials-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 480px) {
          .kontak-socials-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section style={{ position:"relative", padding:"120px 20px 100px", background:"#0D2240", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#0D2240 0%,#1a3a5c 40%,#0D2240 100%)" }} />
          <div className="kontak-hero-glow" style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 60% 50% at 65% 35%,rgba(232,84,26,.15),transparent 65%),radial-gradient(ellipse 40% 40% at 25% 72%,rgba(212,168,67,.09),transparent 60%)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(13,34,64,.1) 0%,rgba(13,34,64,.5) 100%)" }} />
        </div>

        <FloatDot x="7%"  y="22%" size={5} delay={0}   duration={4.5} />
        <FloatDot x="85%" y="20%" size={6} delay={1.1} duration={5.2} />
        <FloatDot x="70%" y="68%" size={4} delay={0.7} duration={4}   />
        <FloatDot x="20%" y="65%" size={7} delay={1.9} duration={5.8} />
        <FloatDot x="92%" y="50%" size={5} delay={1.4} duration={3.9} />

        <motion.div initial="hidden" animate="show" variants={{ show:{ transition:{ staggerChildren:0.13 } } }}
          style={{ position:"relative", zIndex:2, maxWidth:720, margin:"0 auto", textAlign:"center", color:"#fff" }}>
          <motion.div variants={fade} style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:11, fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#D4A843", marginBottom:20 }}>
            <span style={{ width:24, height:1, background:"#D4A843", opacity:0.6, display:"block" }} />
            GBI Sion Karawang
            <span style={{ width:24, height:1, background:"#D4A843", opacity:0.6, display:"block" }} />
          </motion.div>

          <motion.h1 variants={fade} style={{ fontSize:"clamp(36px,6vw,68px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-2px", marginBottom:20 }}>
            Kami Senang{" "}
            <em style={{ fontStyle:"normal", color:"#E8541A" }}>Mendengar</em>
            <br />dari Anda
          </motion.h1>

          <motion.p variants={fade} style={{ fontSize:"clamp(14px,2vw,16px)", opacity:0.72, lineHeight:1.75, maxWidth:480, margin:"0 auto 36px" }}>
            Ada pertanyaan, butuh konseling, atau ingin bergabung? Tim kami siap membantu Anda dengan sepenuh hati.
          </motion.p>

          <motion.div variants={fade} style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="tel:+6281234567890" style={{ textDecoration:"none" }}>
              <button style={{ padding:"13px 28px", borderRadius:100, background:"#E8541A", color:"#fff", fontSize:14, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8, transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(232,84,26,.4)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                <Phone size={16} /> Telepon Kami
              </button>
            </a>
            <a href="#form" style={{ textDecoration:"none" }}>
              <button style={{ padding:"13px 28px", borderRadius:100, background:"transparent", color:"#fff", fontSize:14, fontWeight:600, border:"1.5px solid rgba(255,255,255,.32)", cursor:"pointer", fontFamily:"inherit", transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.borderColor="rgba(255,255,255,.65)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.32)";}}>
                Kirim Pesan
              </button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Marquee strip ─── */}
      <div style={{ background:"#0a1b33", padding:"11px 0", overflow:"hidden" }}>
        <style>{`
          @keyframes marqueeScroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
          .marquee-kontak { display:flex;align-items:center;white-space:nowrap;width:max-content;animation:marqueeScroll 30s linear infinite; }
        `}</style>
        <div className="marquee-kontak" aria-hidden="true">
          {["Hubungi Kami","✦","Lokasi Gereja","✦","Konseling","✦","Jadwal Ibadah","✦","WhatsApp","✦","Email","✦",
            "Hubungi Kami","✦","Lokasi Gereja","✦","Konseling","✦","Jadwal Ibadah","✦","WhatsApp","✦","Email","✦",
          ].map((item,i)=>(
            <span key={i} style={{ fontSize:item==="✦"?9:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:item==="✦"?"#E8541A":"rgba(255,255,255,.5)", padding:item==="✦"?"0 10px":"0 22px" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ═══ CONTACT CARDS ═══════════════════════════════════════════════ */}
      <section className="kontak-section" style={{ background:"#fff" }}>
        <div className="kontak-inner">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:40 }}>
            <span className="section-tag">CARA MENGHUBUNGI</span>
            <div className="section-title">Pilih Cara yang Mudah<br />untuk Anda</div>
          </motion.div>

          <div className="kontak-cards-grid">
            {CONTACT_CARDS.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.1, duration:0.5 }} viewport={{ once:true }}
                className="kontak-card"
                style={{ background:"#F8FAFC", borderRadius:18, padding:"24px 22px", border:"1px solid #E8EDF2" }}>
                <div style={{ width:46, height:46, borderRadius:13, background:card.color, display:"flex", alignItems:"center", justifyContent:"center", color:card.iconColor, marginBottom:16 }}>
                  {card.icon}
                </div>
                <h4 style={{ fontSize:14, fontWeight:700, color:"#0D2240", marginBottom:10 }}>{card.title}</h4>
                {card.lines.map(line=>(
                  <p key={line} style={{ fontSize:13.5, color:"#444", marginBottom:3, lineHeight:1.6 }}>{line}</p>
                ))}
                <a href={card.link} style={{ textDecoration:"none", display:"block", marginTop:14, fontSize:13, fontWeight:700, color:card.iconColor }}>{card.linkLabel}</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORM + OFFICE INFO ══════════════════════════════════════════ */}
      <section id="form" className="kontak-section" style={{ background:"#FDF8F3" }}>
        <div className="kontak-inner">
          <div className="kontak-form-grid">
            {/* Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }} variants={staggerWrap()}>
              <motion.div variants={fade}>
                <span className="section-tag">KIRIM PESAN</span>
                <div className="section-title" style={{ marginBottom:8 }}>Ceritakan<br />Kebutuhan Anda</div>
                <p style={{ color:"#64748B", fontSize:14, lineHeight:1.75, marginBottom:28 }}>
                  Isi formulir di bawah ini dan tim kami akan merespons dalam 1–2 hari kerja.
                </p>
              </motion.div>

              {submitted ? (
                <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                  style={{ background:"#fff", borderRadius:20, padding:"48px 32px", textAlign:"center", border:"1px solid #E8EDF2" }}>
                  <div style={{ width:64, height:64, borderRadius:"50%", background:"#E8F8F0", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", color:"#0F6E56" }}>
                    <CheckCircle size={32} />
                  </div>
                  <h3 style={{ fontSize:20, fontWeight:800, color:"#0D2240", marginBottom:8 }}>Pesan Terkirim!</h3>
                  <p style={{ fontSize:14, color:"#64748B", lineHeight:1.7, marginBottom:24 }}>
                    Terima kasih! Tim kami akan menghubungi Anda segera.
                  </p>
                  <button onClick={()=>{setSubmitted(false);setForm({name:"",email:"",phone:"",subject:"",message:""});}}
                    className="btn-primary" style={{ fontSize:14 }}>
                    Kirim Pesan Lagi
                  </button>
                </motion.div>
              ) : (
                <motion.form variants={fade} onSubmit={handleSubmit}
                  style={{ background:"#fff", borderRadius:20, padding:"32px", border:"1px solid #E8EDF2", display:"flex", flexDirection:"column", gap:16 }}>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div>
                      <label style={{ fontSize:12, fontWeight:700, color:"#0D2240", letterSpacing:0.3, display:"block", marginBottom:6 }}>Nama Lengkap *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        className="form-input" style={inputStyle} placeholder="Nama Anda" />
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:700, color:"#0D2240", letterSpacing:0.3, display:"block", marginBottom:6 }}>Nomor Telepon</label>
                      <input name="phone" value={form.phone} onChange={handleChange} type="tel"
                        className="form-input" style={inputStyle} placeholder="+62..." />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize:12, fontWeight:700, color:"#0D2240", letterSpacing:0.3, display:"block", marginBottom:6 }}>Alamat Email *</label>
                    <input name="email" value={form.email} onChange={handleChange} required type="email"
                      className="form-input" style={inputStyle} placeholder="email@anda.com" />
                  </div>

                  <div>
                    <label style={{ fontSize:12, fontWeight:700, color:"#0D2240", letterSpacing:0.3, display:"block", marginBottom:6 }}>Subjek</label>
                    <select name="subject" value={form.subject} onChange={handleChange}
                      className="form-input" style={{ ...inputStyle, cursor:"pointer" }}>
                      <option value="">Pilih subjek...</option>
                      {SUBJECT_OPTIONS.map(opt=>(
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize:12, fontWeight:700, color:"#0D2240", letterSpacing:0.3, display:"block", marginBottom:6 }}>Pesan *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      className="form-input" style={{ ...inputStyle, resize:"vertical", lineHeight:1.6 }}
                      placeholder="Tuliskan pesan Anda di sini..." />
                  </div>

                  <button type="submit" disabled={submitting}
                    style={{ padding:"13px 28px", borderRadius:100, background:submitting?"#aaa":"#E8541A", color:"#fff", fontSize:14, fontWeight:700, border:"none", cursor:submitting?"not-allowed":"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all .25s", marginTop:4 }}>
                    {submitting ? "Mengirim..." : <><Send size={16} /> Kirim Pesan</>}
                  </button>
                </motion.form>
              )}
            </motion.div>

            {/* Sidebar info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }} variants={staggerWrap(0.1)}>
              {/* Office hours */}
              <motion.div variants={fadeR} style={{ background:"#fff", borderRadius:18, padding:"28px", border:"1px solid #E8EDF2", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:"#FEF0E8", display:"flex", alignItems:"center", justifyContent:"center", color:"#E8541A" }}>
                    <Clock size={18} />
                  </div>
                  <h4 style={{ fontSize:15, fontWeight:700, color:"#0D2240" }}>Jam Kantor</h4>
                </div>
                {OFFICE_HOURS.map((h, i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<OFFICE_HOURS.length-1?"1px solid #F5F5F5":"none" }}>
                    <span style={{ fontSize:13.5, color:"#444", fontWeight:500 }}>{h.day}</span>
                    <span style={{ fontSize:13, color:"#E8541A", fontWeight:700 }}>{h.time}</span>
                  </div>
                ))}
              </motion.div>

              {/* Location card */}
              <motion.div variants={fadeR}
                style={{ background:"linear-gradient(135deg,#0D2240,#1A3A5C)", borderRadius:18, padding:"28px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(232,84,26,.12)" }} />
                <div style={{ position:"relative", zIndex:1 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:"rgba(232,84,26,.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#E8541A", marginBottom:16 }}>
                    <MapPin size={18} />
                  </div>
                  <h4 style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:10 }}>Lokasi Kami</h4>
                  <p style={{ fontSize:13.5, color:"rgba(255,255,255,.65)", lineHeight:1.7, marginBottom:16 }}>
                    Jl. Contoh No.123, Karawang,<br />Jawa Barat 41311
                  </p>
                  <a href="#" style={{ textDecoration:"none" }}>
                    <button style={{ padding:"9px 18px", borderRadius:100, background:"#E8541A", color:"#fff", fontSize:13, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:7, transition:"all .2s" }}>
                      <MapPin size={13} /> Buka Google Maps
                    </button>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ MAP PLACEHOLDER ════════════════════════════════════════════ */}
      <section style={{ background:"#fff" }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ margin:"0 48px 80px", borderRadius:20, overflow:"hidden", position:"relative", background:"linear-gradient(135deg,#0D2240,#1A3A5C)", minHeight:280, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <style>{`@media(max-width:768px){.map-section{margin:0 20px 52px!important;}}`}</style>
          <div style={{ position:"absolute", inset:0, opacity:0.1 }}>
            <div style={{ width:"100%", height:"100%", backgroundImage:"linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
          </div>
          <div style={{ position:"absolute", top:"30%", left:"48%", width:16, height:16, borderRadius:"50%", background:"#E8541A", boxShadow:"0 0 0 6px rgba(232,84,26,.3),0 0 0 12px rgba(232,84,26,.1)" }} />
          <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
            <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(232,84,26,.9)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 0 0 10px rgba(232,84,26,.15)" }}>
              <MapPin size={26} color="#fff" />
            </div>
            <div style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:4 }}>GBI Sion Karawang</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.6)", marginBottom:20 }}>Jl. Contoh No.123, Karawang, Jawa Barat</div>
            <a href="#" style={{ textDecoration:"none" }}>
              <button style={{ padding:"10px 22px", borderRadius:100, background:"#E8541A", color:"#fff", fontSize:13, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8 }}>
                <ArrowRight size={14} /> Buka di Google Maps
              </button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══ SOSIAL MEDIA ════════════════════════════════════════════════ */}
      <section className="kontak-section" style={{ background:"#FDF8F3", paddingTop:0 }}>
        <div className="kontak-inner">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:36, textAlign:"center" }}>
            <span className="section-tag" style={{ display:"block", textAlign:"center" }}>IKUTI KAMI</span>
            <div className="section-title" style={{ textAlign:"center" }}>Terhubung di<br />Media Sosial</div>
          </motion.div>

          <div className="kontak-socials-grid">
            {SOCIALS.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.1 }} viewport={{ once:true }}
                style={{ background:"#fff", borderRadius:16, padding:"22px 20px", border:"1px solid #E8EDF2", cursor:"pointer", transition:"all .25s", textAlign:"center" }}
                whileHover={{ y:-3, boxShadow:"0 10px 32px rgba(13,34,64,.1)" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:s.color, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:15, fontWeight:800, color:"#fff" }}>{s.id}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#0D2240", marginBottom:3 }}>{s.label}</div>
                <div style={{ fontSize:12.5, color:"#64748B" }}>{s.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══════════════════════════════════════════════════ */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:0.7 }} viewport={{ once:true }}
        style={{ background:"linear-gradient(135deg,#0D2240 0%,#1a3a5c 100%)", padding:"80px 20px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, background:"radial-gradient(circle,rgba(232,84,26,.15),transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:-40, width:220, height:220, background:"radial-gradient(circle,rgba(212,168,67,.08),transparent 70%)", pointerEvents:"none" }} />

        <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={{ show:{ transition:{ staggerChildren:0.12 } } }}
          style={{ position:"relative", zIndex:1, maxWidth:600, margin:"0 auto" }}>
          <motion.p variants={fade} style={{ fontSize:11, fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#D4A843", marginBottom:14 }}>
            Bergabunglah Bersama Kami
          </motion.p>
          <motion.h2 variants={fade} style={{ fontSize:"clamp(26px,4vw,46px)", fontWeight:800, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.1, marginBottom:16 }}>
            Jadilah Bagian dari{" "}
            <em style={{ fontStyle:"normal", color:"#E8541A" }}>Keluarga</em> Ini
          </motion.h2>
          <motion.p variants={fade} style={{ fontSize:15, color:"rgba(255,255,255,.6)", marginBottom:36 }}>
            Hadir dan rasakan kehangatan komunitas GBI Sion Karawang.
          </motion.p>
          <motion.div variants={fade} style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <NavLink to="/jadwal" style={{ textDecoration:"none" }}>
              <button style={{ padding:"13px 28px", borderRadius:100, background:"#E8541A", color:"#fff", fontSize:14, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8, transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(232,84,26,.38)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                Lihat Jadwal Ibadah →
              </button>
            </NavLink>
            <NavLink to="/tentang" style={{ textDecoration:"none" }}>
              <button style={{ padding:"13px 28px", borderRadius:100, background:"transparent", color:"#fff", fontSize:14, fontWeight:600, border:"1.5px solid rgba(255,255,255,.32)", cursor:"pointer", fontFamily:"inherit", transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.borderColor="rgba(255,255,255,.65)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.32)";}}>
                Tentang Gereja
              </button>
            </NavLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
