import styles from '../page.module.scss';

export default function Informations() {
  return (
    <div className={`${styles.infoCard}`}>
      <div className={`${styles.infoHeader}`}>
        <h3><i className="fas fa-gamepad"></i> Informações de Jogo</h3>
      </div>
      <div className={`${styles.infoContent}`}>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Rank Atual:</span>
          <span className={`${styles.infoValue}`}>
            <span className="rank-badge diamond">Diamante 2</span>
          </span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Agente Principal:</span>
          <span className={`${styles.infoValue}`}>Jett</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Função Favorita:</span>
          <span className={`${styles.infoValue}`}>Duelista</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Servidor:</span>
          <span className={`${styles.infoValue}`}>Brasil</span>
        </div>
      </div>
    </div>
  )
}