import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWrapper = scrollWrapperRef.current;

    if (!container || !scrollWrapper) return;

    // Use context for cleanup
    let ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return -(scrollWrapper.scrollWidth - window.innerWidth);
      };

      gsap.to(scrollWrapper, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ overflow: 'hidden', background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div ref={scrollWrapperRef} style={{ display: 'flex', width: 'fit-content', height: '100vh', alignItems: 'center' }}>
        
        {/* Slide 1: Intro */}
        <div style={{ width: '100vw', padding: '0 10vw', flexShrink: 0 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: 'var(--orange)', marginBottom: 20, letterSpacing: '-1px' }}>
            Informasi Kehadiran
          </h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--gray)', maxWidth: 500, lineHeight: 1.6 }}>
            Persiapkan hati Anda untuk beribadah. Berikut adalah panduan lokasi parkir dan jadwal ibadah kami. Terus gulir untuk melihat.
          </p>
        </div>

        {/* Slide 2: Jadwal Ibadah */}
        <div style={{ width: '100vw', padding: '0 10vw', flexShrink: 0, display: 'flex', gap: 40, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop" alt="Worship" style={{ width: '100%', borderRadius: 24, height: 400, objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, background: 'var(--cream)', padding: 60, borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(13,34,64,0.05)' }}>
            <span style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Jadwal Ibadah</span>
            <h3 style={{ fontSize: 36, fontWeight: 800, color: 'var(--navy)', marginTop: 10, marginBottom: 30, letterSpacing: '-1px' }}>Ibadah Raya Minggu</h3>
            <div style={{ display: 'flex', gap: 40 }}>
              <div>
                <div style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 5, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sesi 1</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)' }}>08.00 WIB</div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 5, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sesi 2</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)' }}>10.30 WIB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Informasi Parkir */}
        <div style={{ width: '100vw', padding: '0 10vw', flexShrink: 0, display: 'flex', gap: 40, alignItems: 'center', flexDirection: 'row-reverse' }}>
          <div style={{ flex: 1 }}>
            <img src="https://images.unsplash.com/photo-1543185361-9f9350645607?q=80&w=800&auto=format&fit=crop" alt="Parking" style={{ width: '100%', borderRadius: 24, height: 400, objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, background: 'var(--cream)', padding: 60, borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(13,34,64,0.05)' }}>
            <span style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Area Parkir</span>
            <h3 style={{ fontSize: 36, fontWeight: 800, color: 'var(--navy)', marginTop: 10, marginBottom: 20, letterSpacing: '-1px' }}>Fasilitas Parkir Luas</h3>
            <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Tersedia area parkir mobil dan motor yang memadai di sekitar gedung gereja. Tim parkir dan keamanan kami akan membantu mengarahkan kendaraan Anda demi kenyamanan bersama.
            </p>
          </div>
        </div>

        {/* Slide 4: Outro */}
        <div style={{ width: '100vw', padding: '0 10vw', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'var(--orange)', textAlign: 'center', letterSpacing: '-1px' }}>
            Kami Menantikan<br />Kehadiran Anda.
          </h2>
        </div>

      </div>
    </section>
  );
}
