import styles from './page.module.scss';
import Hero from './sections/Hero';
import ProfileUser from './sections/ProfileUser';
import Progresso from './sections/Progresso';
import Dados from './cards/Dados';
import Informations from './cards/Informations';
import Estatisticas from './cards/Estatisticas';

export default function Profile() {
  return (
    <>
      {/* <!-- Hero Section --> */}
      <Hero />

      {/* <!-- Perfil do Usuário --> */}
      <section className={`${styles.profileOverview}`}>
        <ProfileUser />
      </section>

      {/* <!-- Informações Pessoais --> */}
      <section className={`${styles.personalInfo}`}>
        <h2>Informações Pessoais</h2>
        <div className={`${styles.infoGrid}`}>
          <Dados />
          <Informations />
          <Estatisticas />
        </div>
      </section>

      {/* <!-- Progresso Recente --> */}
      <Progresso />

      {/* <!-- Conquistas Recentes --> */}
      <section className={`${styles.recentAchievements}`}>
        <h2>Conquistas Recentes</h2>
        <div className={`${styles.achievementsGrid}`}>
          <div className={`${styles.achievementCard}`}>
            <div className={`${styles.achievementIcon}`}>
              <i className="fas fa-trophy selo-white"></i>
            </div>
            <div className={`${styles.achievementInfo}`}>
              <h3>Mestre em Jett</h3>
              <p>Completou todas as aulas sobre Jett</p>
              <span className={`${styles.achievementDate}`}>Há 2 dias</span>
            </div>
          </div>

          <div className={`${styles.achievementCard}`}>
            <div className={`${styles.achievementIcon}`}>
              <i className="fas fa-fire selo-white"></i>
            </div>
            <div className={`${styles.achievementInfo}`}>
              <h3>Sequência de 10 Dias</h3>
              <p>Estudou por 10 dias consecutivos</p>
              <span className={`${styles.achievementDate}`}>Há 3 dias</span>
            </div>
          </div>

          <div className={`${styles.achievementCard}`}>
            <div className={`${styles.achievementIcon}`}>
              <i className="fas fa-star selo-white"></i>
            </div>
            <div className={`${styles.achievementInfo}`}>
              <h3>Primeiro Certificado</h3>
              <p>Conquistou seu primeiro certificado</p>
              <span className={`${styles.achievementDate}`}>Há 1 semana</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}