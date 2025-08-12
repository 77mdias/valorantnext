import stylesStrategy from '../page.module.scss'

export default function Strategy() {
  return (
    <section className={stylesStrategy.strategiesSection}>
      <h2>Estratégias por Função</h2>

      <div className={stylesStrategy.strategiesGrid}>
        <div className={stylesStrategy.strategyCard}>
          <h3>Composição de Time</h3>
          <p>
            Entenda como montar uma composição equilibrada com diferentes
            funções
          </p>
          <div className={stylesStrategy.strategyTags}>
            <span className={stylesStrategy.tag}>Meta</span>
            <span className={stylesStrategy.tag}>Composição</span>
            <span className={stylesStrategy.tag}>Estratégia</span>
          </div>
        </div>

        <div className={stylesStrategy.strategyCard}>
          <h3>Economia de Habilidades</h3>
          <p>
            Aprenda a gerenciar as habilidades do seu time de forma
            eficiente
          </p>
          <div className={stylesStrategy.strategyTags}>
            <span className={stylesStrategy.tag}>Economia</span>
            <span className={stylesStrategy.tag}>Timing</span>
            <span className={stylesStrategy.tag}>Coordenação</span>
          </div>
        </div>

        <div className={stylesStrategy.strategyCard}>
          <h3>Rotações e Timing</h3>
          <p>
            Domine o timing perfeito para cada função em diferentes
            situações
          </p>
          <div className={stylesStrategy.strategyTags}>
            <span className={stylesStrategy.tag}>Rotação</span>
            <span className={stylesStrategy.tag}>Tempo</span>
            <span className={stylesStrategy.tag}>Posicionamento</span>
          </div>
        </div>
      </div>
    </section>
  )
}