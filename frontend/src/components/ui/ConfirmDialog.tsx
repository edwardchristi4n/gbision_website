import { useEffect } from "react"
import { AlertTriangle, Save, Trash2 } from "lucide-react"

export interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  variant?: "danger" | "primary"
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open, title, message,
  confirmLabel = "Ya, Lanjutkan",
  variant = "primary",
  onConfirm, onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onCancel])

  if (!open) return null

  const isDanger = variant === "danger"

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{ position: "absolute", inset: 0, background: "rgba(13,34,64,0.55)", backdropFilter: "blur(4px)" }}
      />

      {/* Dialog */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "#fff", borderRadius: 20,
        padding: "36px 32px", maxWidth: 420, width: "100%",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {/* Icon */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          background: isDanger ? "#FEF2F2" : "#EEF4FF",
        }}>
          {isDanger
            ? <Trash2 size={26} color="#EF4444" />
            : <Save size={26} color="#0D2240" />
          }
        </div>

        {/* Title */}
        <h3 style={{ textAlign: "center", fontSize: 19, fontWeight: 800, color: "#0D2240", marginBottom: 10 }}>
          {title}
        </h3>

        {/* Message */}
        <p style={{ textAlign: "center", fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 28 }}>
          {message}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "11px 16px",
              border: "1.5px solid #E2E8F0", background: "#fff",
              borderRadius: 10, fontSize: 14, fontWeight: 600,
              color: "#64748B", cursor: "pointer", fontFamily: "inherit",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "11px 16px", border: "none",
              borderRadius: 10, fontSize: 14, fontWeight: 600,
              color: "#fff", cursor: "pointer", fontFamily: "inherit",
              background: isDanger ? "#EF4444" : "#0D2240",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {isDanger && <AlertTriangle size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
