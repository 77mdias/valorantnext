
import bgImage from '@/public/hero/valorant-banner.avif'
import stylesHero from '../../components/scss/Hero.module.scss'

export default function Hero() {
  return (
    <section className={stylesHero.hero} style={{ backgroundImage: `url(${bgImage.src})` }}>
      <div className={stylesHero.heroContent}>
        <h1>Meu Progresso</h1>
        <p>Acompanhe seu desenvolvimento e conquistas na jornada de aprendizado do Valorant</p>
        <button className={stylesHero.heroButton}>Ver Detalhes</button>
      </div>
    </section>
  )
}