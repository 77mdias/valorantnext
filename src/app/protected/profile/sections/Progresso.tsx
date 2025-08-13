import styles from '../page.module.scss';

export default function Progresso() {
  return (
    <section className={`${styles.recentProgress}`}>
      <h2>Seu Progresso</h2>
      <div className={`${styles.progressGrid}`}>
        <div className={`${styles.progressCard}`}>
          <div className={`${styles.progressHeader}`}>
            <h3>Aulas Concluídas</h3>
            <span className={`${styles.progressNumber}`}>87</span>
          </div>
          <div className={`${styles.progressContent}`}>
            <div className={`${styles.progressBar}`}>
              <div className={`${styles.progressFill}`} style={{ width: '87%' }}></div>
            </div>
            <p>87 de 100 aulas concluídas</p>
          </div>
        </div>

        <div className={`${styles.progressCard}`}>
          <div className={`${styles.progressHeader}`}>
            <h3>Certificados</h3>
            <span className={`${styles.progressNumber}`}>24</span>
          </div>
          <div className={`${styles.progressContent}`}>
            <div className={`${styles.progressBar}`}>
              <div className={`${styles.progressFill}`} style={{ width: '80%' }}></div>
            </div>
            <p>24 certificados obtidos</p>
          </div>
        </div>

        <div className={`${styles.progressCard}`}>
          <div className={`${styles.progressHeader}`}>
            <h3>Horas de Estudo</h3>
            <span className={`${styles.progressNumber}`}>156</span>
          </div>
          <div className={`${styles.progressContent}`}>
            <div className={`${styles.progressBar}`}>
              <div className={`${styles.progressFill}`} style={{ width: '95%' }}></div>
            </div>
            <p>156 horas de estudo registradas</p>
          </div>
        </div>
      </div>
    </section>
  )
}