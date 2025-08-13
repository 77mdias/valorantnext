import styles from '../page.module.scss';

export default function Dados() {
  return (
    <div className={`${styles.infoCard}`}>
      <div className={`${styles.infoHeader}`}>
        <h3><i className="fas fa-user"></i> Dados Básicos</h3>
      </div>
      <div className={`${styles.infoContent}`}>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Nome Completo:</span>
          <span className={`${styles.infoValue}`}>João Silva</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Email:</span>
          <span className={`${styles.infoValue}`}>joao.silva@email.com</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Data de Nascimento:</span>
          <span className={`${styles.infoValue}`}>15/03/1995</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Localização:</span>
          <span className={`${styles.infoValue}`}>São Paulo, Brasil</span>
        </div>
      </div>
    </div>
  )
}