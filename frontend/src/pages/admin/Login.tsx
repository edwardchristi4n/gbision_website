import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")
  const { login }   = useAuth()
  const navigate    = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
      navigate("/admin")
    } catch {
      setError("Email atau password salah. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#F8FAFC", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif", padding:24 }}>
      <div style={{ width:"100%", maxWidth:420 }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:56, height:56, background:"#0D2240", borderRadius:16, marginBottom:16 }}>
            <span style={{ fontSize:24 }}>⛪</span>
          </div>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#0D2240", marginBottom:4 }}>
            GBI Sion <span style={{ color:"#E8541A" }}>Karawang</span>
          </h1>
          <p style={{ fontSize:14, color:"#64748B" }}>Masuk ke Panel Admin</p>
        </div>

        {/* Card */}
        <div style={{ background:"#fff", borderRadius:20, padding:32, border:"1px solid #E8EDF2", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:"#0D2240", marginBottom:24 }}>Selamat Datang Kembali 👋</h2>

          {error && (
            <div style={{ background:"#FEF0E8", border:"1px solid rgba(232,84,26,0.3)", color:"#C94010", borderRadius:10, padding:"12px 16px", fontSize:14, marginBottom:20 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#0D2240", marginBottom:6 }}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@gbision.org"
                style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #E8EDF2", borderRadius:10, fontSize:14, fontFamily:"inherit", outline:"none", transition:"border 0.2s", color:"#111", background:"#fff" }}
                onFocus={e => e.target.style.borderColor="#E8541A"}
                onBlur={e => e.target.style.borderColor="#E8EDF2"}
              />
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#0D2240", marginBottom:6 }}>Password</label>
              <div style={{ position:"relative" }}>
                <input
                  type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  style={{ width:"100%", padding:"12px 44px 12px 14px", border:"1.5px solid #E8EDF2", borderRadius:10, fontSize:14, fontFamily:"inherit", outline:"none", transition:"border 0.2s", color:"#111", background:"#fff" }}
                  onFocus={e => e.target.style.borderColor="#E8541A"}
                  onBlur={e => e.target.style.borderColor="#E8EDF2"}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#64748B", display:"flex" }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width:"100%", background: loading ? "#94A3B8" : "#E8541A", color:"#fff", padding:"13px 24px", borderRadius:10, fontSize:15, fontWeight:700, border:"none", cursor: loading ? "not-allowed" : "pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"background 0.2s" }}>
              {loading ? "Memverifikasi..." : <><LogIn size={18} /> Masuk ke Dashboard</>}
            </button>
          </form>

          <p style={{ textAlign:"center", fontSize:13, color:"#64748B", marginTop:20 }}>
            Lupa password? Hubungi <span style={{ color:"#E8541A", fontWeight:600, cursor:"pointer" }}>superadmin</span>
          </p>
        </div>

        <p style={{ textAlign:"center", fontSize:12, color:"#94A3B8", marginTop:24 }}>
          © 2025 GBI Sion Karawang · Panel Admin
        </p>
      </div>
    </div>
  )
}
