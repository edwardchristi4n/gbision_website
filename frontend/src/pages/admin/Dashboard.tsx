import { motion } from "framer-motion"
import { BookOpen, Image, Bell, Users, Church, TrendingUp, Plus, Upload, PenLine, Calendar } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const stats = [
  { label:"Total Program",     value:"12",  icon:Church,  color:"#0D2240", bg:"#E8F0F8",  change:"+2 bulan ini" },
  { label:"Artikel Blog",      value:"48",  icon:BookOpen,color:"#E8541A", bg:"#FEF0E8",  change:"+5 bulan ini" },
  { label:"Foto Galeri",       value:"234", icon:Image,   color:"#0F6E56", bg:"#E8F8F0",  change:"+18 bulan ini" },
  { label:"Pengumuman Aktif",  value:"6",   icon:Bell,    color:"#1A3A5C", bg:"#E8F0F8",  change:"3 pinned" },
]

const recentActivity = [
  { type:"Blog",        title:"Renungan Minggu: Kasih yang Nyata",   date:"2 jam lalu",  action:"Dipublish", color:"#E8541A" },
  { type:"Program",     title:"Kelompok Sel Wilayah Barat Dibuka",   date:"1 hari lalu", action:"Ditambah",  color:"#0D2240" },
  { type:"Galeri",      title:"Foto Ibadah Raya November 2025",      date:"2 hari lalu", action:"Diupload",  color:"#0F6E56" },
  { type:"Pengumuman",  title:"Jadwal Ibadah Natal 25 Desember",     date:"3 hari lalu", action:"Dipinned",  color:"#1A3A5C" },
  { type:"Blog",        title:"Refleksi Akhir Tahun Bersama Jemaat", date:"4 hari lalu", action:"Dipublish", color:"#E8541A" },
]

const quickActions = [
  { label:"Tulis Artikel",    icon:PenLine, to:"/admin/blog",       color:"#E8541A" },
  { label:"Tambah Program",   icon:Plus,    to:"/admin/program",    color:"#0D2240" },
  { label:"Upload Foto",      icon:Upload,  to:"/admin/galeri",     color:"#0F6E56" },
  { label:"Atur Jadwal",      icon:Calendar,to:"/admin/jadwal",     color:"#1A3A5C" },
]

const fade = (i: number) => ({ initial:{opacity:0,y:16}, animate:{opacity:1,y:0}, transition:{delay:i*0.07} })

export default function Dashboard() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Selamat Pagi" : hour < 17 ? "Selamat Siang" : "Selamat Malam"

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>

      {/* Header */}
      <motion.div {...fade(0)} style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:24, fontWeight:800, color:"#0D2240", marginBottom:4 }}>{greeting}, {user?.name?.split(" ")[0] ?? "Admin"} 👋</h1>
        <p style={{ fontSize:14, color:"#64748B" }}>Berikut ringkasan konten GBI Sion Karawang hari ini.</p>
      </motion.div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
        {stats.map((s,i) => (
          <motion.div key={i} {...fade(i+1)}
            style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #E8EDF2", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <s.icon size={20} color={s.color} />
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#0F6E56", fontWeight:600 }}>
                <TrendingUp size={12} /> {s.change}
              </div>
            </div>
            <div style={{ fontSize:32, fontWeight:800, color:"#0D2240", lineHeight:1, marginBottom:4 }}>{s.value}</div>
            <div style={{ fontSize:13, color:"#64748B" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>

        {/* Aktivitas Terbaru */}
        <motion.div {...fade(5)} style={{ background:"#fff", borderRadius:16, padding:24, border:"1px solid #E8EDF2" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:"#0D2240" }}>Aktivitas Terbaru</h2>
            <span style={{ fontSize:13, color:"#E8541A", fontWeight:600, cursor:"pointer" }}>Lihat Semua</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {recentActivity.map((a,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom: i < recentActivity.length-1 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:a.color, flexShrink:0 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:"#0D2240", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.title}</div>
                  <div style={{ fontSize:12, color:"#64748B", marginTop:2 }}>{a.type} · {a.date}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:a.color, background: a.color + "18", padding:"3px 10px", borderRadius:100, whiteSpace:"nowrap" }}>{a.action}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <motion.div {...fade(6)} style={{ background:"#fff", borderRadius:16, padding:24, border:"1px solid #E8EDF2" }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:"#0D2240", marginBottom:16 }}>Aksi Cepat</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {quickActions.map((a,i) => (
                <NavLink key={i} to={a.to} style={{ textDecoration:"none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:10, background:"#F8FAFC", border:"1px solid #E8EDF2", cursor:"pointer", transition:"all 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = a.color; (e.currentTarget as HTMLDivElement).style.background = "#fff" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E8EDF2"; (e.currentTarget as HTMLDivElement).style.background = "#F8FAFC" }}>
                    <div style={{ width:34, height:34, borderRadius:8, background: a.color + "18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <a.icon size={17} color={a.color} />
                    </div>
                    <span style={{ fontSize:14, fontWeight:600, color:"#0D2240" }}>{a.label}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div {...fade(7)} style={{ background:"#0D2240", borderRadius:16, padding:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"rgba(232,84,26,0.9)", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>INFO SISTEM</div>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6 }}>Session aktif 15 menit</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>Session Anda akan otomatis diperpanjang selama aktif. Logout jika selesai.</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
