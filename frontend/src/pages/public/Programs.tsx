import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROGRAMS = [
  {
    title: 'Sekolah Minggu',
    desc: 'Pelayanan khusus anak-anak untuk mengenal kasih Tuhan sejak dini dengan metode yang interaktif.',
    img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Youth & Remaja',
    desc: 'Wadah bagi generasi muda untuk bertumbuh dan berkarya bagi Kristus dalam komunitas yang dinamis.',
    img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Kelompok Sel',
    desc: 'Komunitas kecil untuk saling mendukung, berdoa, dan bertumbuh bersama dalam firman Tuhan.',
    img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Pelayanan Musik',
    desc: 'Melayani Tuhan melalui pujian dan penyembahan yang berkuasa untuk membawa jemaat dalam hadirat-Nya.',
    img: 'https://images.unsplash.com/photo-1516280440502-a2cebc04be34?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={containerRef} style={{ background: '#fff', minHeight: '100vh', paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="prog-title" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Pelayanan Kami
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--navy)', marginTop: 16, letterSpacing: '-1px', fontWeight: 800 }}>
            Temukan Tempat Anda<br/>Untuk <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Melayani</em>
          </h1>
        </div>

        <div className="prog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
          {PROGRAMS.map((p, i) => (
            <div key={i} className="prog-item" style={{ cursor: 'pointer', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', background: '#fff', transition: 'box-shadow 0.3s' }}
                 onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 40px rgba(13,34,64,0.08)'}
                 onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ width: '100%', height: 240, overflow: 'hidden' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                     onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: 32 }}>
                <h3 style={{ fontSize: 24, color: 'var(--navy)', marginBottom: 12, letterSpacing: '-0.5px', fontWeight: 800 }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.6, marginBottom: 24, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--orange)', fontWeight: 600, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Pelajari Lebih Lanjut <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}