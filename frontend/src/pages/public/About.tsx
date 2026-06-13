import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.reveal-up', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
      
      gsap.to('.parallax-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: '#fff', minHeight: '100vh', paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Kisah Kami
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--navy)', marginTop: 16, marginBottom: 24, letterSpacing: '-1px', fontWeight: 800 }}>
            Bertumbuh Dalam Iman, <br/>
            <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Berbuah Dalam Kasih.</em>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--gray)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            GBI Sion Karawang hadir sebagai mercusuar pengharapan, menggembalakan jemaat untuk hidup sesuai kebenaran firman Tuhan dan berdampak bagi lingkungan sekitar.
          </p>
        </div>

        <div className="reveal-up parallax-container" style={{ position: 'relative', height: '60vh', overflow: 'hidden', borderRadius: 24, marginBottom: 80, border: '1px solid var(--border)' }}>
          <img className="parallax-img" src="https://images.unsplash.com/photo-1544427920-c49ccdaf8c48?q=80&w=1200&auto=format&fit=crop" alt="Church" style={{ width: '100%', height: '130%', objectFit: 'cover', position: 'absolute', top: '-15%', left: 0 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60 }}>
          <div className="reveal-up">
            <h2 style={{ fontSize: 32, color: 'var(--navy)', marginBottom: 20, letterSpacing: '-0.5px', fontWeight: 800 }}>Visi Kami</h2>
            <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.7, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Menjadi gereja yang sehat, bertumbuh secara rohani, dan relevan dengan perkembangan zaman. Kami rindu melihat setiap individu dipulihkan, diperlengkapi, dan diutus untuk menjadi berkat.
            </p>
          </div>
          <div className="reveal-up">
            <h2 style={{ fontSize: 32, color: 'var(--navy)', marginBottom: 20, letterSpacing: '-0.5px', fontWeight: 800 }}>Misi Kami</h2>
            <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.7, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Membangun komunitas yang penuh kasih melalui pemuridan, ibadah yang berpusat pada Kristus, serta pelayanan holistik yang menjangkau seluruh lapisan masyarakat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}