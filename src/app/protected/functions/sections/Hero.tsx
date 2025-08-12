import stylesHero from '../../components/scss/Hero.module.scss'
import bgImage from '@/public/hero/valorant-banner.avif'

export default function Hero() {
  return (
    <section className={stylesHero.hero} style={{ backgroundImage: `url(${bgImage.src})` }}>
      <div className={stylesHero.heroContent}>
        <h1>Domine as Funções</h1>
        <p>Entenda o papel estratégico de cada função no Valorant</p>
        <button className={stylesHero.heroButton}>Explorar Funções</button>
      </div>
    </section>
  )
}