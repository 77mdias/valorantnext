import styles from '../page.module.scss';

export default function ProfileUser() {
  return (
    <div className={`${styles.profileHeader}`}>
      <div className={`${styles.profileAvatar}`}>
        <div className={`${styles.avatarCircle}`}>
          <i className="fas fa-user selo-white"></i>
        </div>
        <button className={`${styles.changeAvatarBtn}`}>
          <i className="fas fa-camera selo-white"></i>
        </button>
      </div>
      <div className={`${styles.profileInfo}`}>
        <h2>ValorantPro#2024</h2>
        <p className={`${styles.profileTitle}`}>Estudante Diamante</p>
        <div className={`${styles.profileStats}`}>
          <div className={`${styles.statItem}`}>
            <span className={`${styles.statValue}`}>87</span>
            <span className={`${styles.statLabel}`}>Aulas Concluídas</span>
          </div>
          <div className={`${styles.statItem}`}>
            <span className={`${styles.statValue}`}>24</span>
            <span className={`${styles.statLabel}`}>Certificados</span>
          </div>
          <div className={`${styles.statItem}`}>
            <span className={`${styles.statValue}`}>156</span>
            <span className={`${styles.statLabel}`}>Horas de Estudo</span>
          </div>
        </div>
      </div>
      <div className={`${styles.profileActions}`}>
        <button className={`${styles.btnPrimary}`}>
          <i className="fas fa-edit"></i> Editar Perfil
        </button>
        <button className={`${styles.btnSecondary}`}>
          <i className="fas fa-share"></i> Compartilhar
        </button>
      </div>
    </div>
  )
}