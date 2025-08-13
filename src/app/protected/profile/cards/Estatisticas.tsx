import styles from '../page.module.scss';

export default function Estatisticas() {
  return (
    <div className={`${styles.infoCard}`}>
      <div className={`${styles.infoHeader}`}>
        <h3><i className="fas fa-chart-line"></i> Estatísticas Gerais</h3>
      </div>
      <div className={`${styles.infoContent}`}>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Tempo na Plataforma:</span>
          <span className={`${styles.infoValue}`}>3 meses</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Sequência Atual:</span>
          <span className={`${styles.infoValue}`}>12 dias</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Taxa de Conclusão:</span>
          <span className={`${styles.infoValue}`}>94%</span>
        </div>
        <div className={`${styles.infoRow}`}>
          <span className={`${styles.infoLabel}`}>Última Atividade:</span>
          <span className={`${styles.infoValue}`}>Hoje, 14:30</span>
        </div>
      </div>
    </div>
  )
}