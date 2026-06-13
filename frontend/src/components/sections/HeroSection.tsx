// Hero section halaman Home — judul besar, tagline, CTA button
// Menggunakan Framer Motion untuk animasi fade-in stagger
export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-navy to-navy-light text-white">
      <div className="text-center px-4 max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
          Selamat Datang di<br />GBI Sion Karawang
        </h1>
        <p className="mt-4 text-lg text-slate-200">Gereja yang mengasihi Tuhan dan melayani sesama</p>
        <a href="/program" className="mt-8 inline-block bg-gold text-navy font-semibold px-8 py-3 rounded-full hover:bg-gold-light transition">
          Lihat Program Gereja
        </a>
      </div>
    </section>
  )
}
