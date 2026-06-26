import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import api from '@/lib/axios';

gsap.registerPlugin(ScrollTrigger);

interface ProgramItem {
  id: number
  title: string
  description: string | null
  schedule: string | null
  location: string | null
  image_url: string | null
  is_active: boolean
}

export default function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/programs?active_only=true&community=general')
      .then(res => setPrograms(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || programs.length === 0) return;
    let ctx = gsap.context(() => {
      gsap.from('.prog-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.prog-item', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.prog-grid',
          start: 'top 80%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, programs]);

  return (
    <div ref={containerRef} style={{ background: '#fff', minHeight: '100vh', paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="prog-title" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Pelayanan Kami
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--navy)', marginTop: 16, letterSpacing: '-1px', fontWeight: 800 }}>
            Temukan Tempat Anda<br />Untuk <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Melayani</em>
          </h1>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748B' }}>
            Memuat program...
          </div>
        ) : programs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748B' }}>
            Belum ada program pelayanan.
          </div>
        ) : (
          <div className="prog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {programs.map(p => (
              <div key={p.id} className="prog-item" style={{ cursor: 'pointer', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', background: '#fff', transition: 'box-shadow 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 40px rgba(13,34,64,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ width: '100%', height: 240, overflow: 'hidden', background: '#f1f5f9' }}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 14 }}>
                      Tidak ada gambar
                    </div>
                  )}
                </div>
                <div style={{ padding: 32 }}>
                  <h3 style={{ fontSize: 24, color: 'var(--navy)', marginBottom: 12, letterSpacing: '-0.5px', fontWeight: 800 }}>{p.title}</h3>
                  {p.schedule && (
                    <p style={{ fontSize: 13, color: 'var(--orange)', fontWeight: 600, marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {p.schedule}{p.location ? ` · ${p.location}` : ''}
                    </p>
                  )}
                  <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.6, marginBottom: 24, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {p.description || ''}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--orange)', fontWeight: 600, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Pelajari Lebih Lanjut <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
