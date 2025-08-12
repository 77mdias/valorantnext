import stylesGrid from './Grid.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export default function Sentinela() {
  return (
    <div className={`${stylesGrid.roleCard} ${stylesGrid.sentinela}`}>
      <div className={stylesGrid.roleHeader}>
        <div className={`${stylesGrid.roleIcon}`}>
          <FontAwesomeIcon icon={faEye} />
        </div>
        <h3>Sentinela</h3>
        <span className={stylesGrid.roleBadge}>Defesa</span>
      </div>
      <div className={stylesGrid.roleDescription}>
        <p>
          Agentes defensivos que protegem o time e controlam flancos
          através de utilitários.
        </p>

        <div className={stylesGrid.roleCharacteristics}>
          <h4>Características:</h4>
          <ul>
            <li>Defesa de área</li>
            <li>Controle de flancos</li>
            <li>Utilitários defensivos</li>
            <li>Suporte ao time</li>
          </ul>
        </div>

        <div className={stylesGrid.roleAgents}>
          <h4>Agentes:</h4>
          <div className={stylesGrid.agentsList}>
            <span className={stylesGrid.agentTag}>Sage</span>
            <span className={stylesGrid.agentTag}>Cypher</span>
            <span className={stylesGrid.agentTag}>Killjoy</span>
            <span className={stylesGrid.agentTag}>Chamber</span>
            <span className={stylesGrid.agentTag}>Deadlock</span>
          </div>
        </div>
      </div>
      <button className={stylesGrid.roleLearnBtn}>
        <i className="fas fa-play"></i> Aprender Função
      </button>
    </div>
  )
}