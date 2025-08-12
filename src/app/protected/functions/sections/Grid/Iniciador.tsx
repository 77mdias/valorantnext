import stylesGrid from './Grid.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

export default function Iniciador() {
  return (
    <div className={`${stylesGrid.roleCard} ${stylesGrid.iniciador}`}>
      <div className={stylesGrid.roleHeader}>
        <div className={stylesGrid.roleIcon}>
          <FontAwesomeIcon icon={faBullseye} />
        </div>
        <h3>Iniciador</h3>
        <span className={stylesGrid.roleBadge}>Suporte</span>
      </div>
      <div className={stylesGrid.roleDescription}>
        <p>
          Agentes que coletam informações e criam oportunidades para o
          time através de reconhecimento.
        </p>

        <div className={stylesGrid.roleCharacteristics}>
          <h4>Características:</h4>
          <ul>
            <li>Coleta de informações</li>
            <li>Reconhecimento de área</li>
            <li>Flush de inimigos</li>
            <li>Suporte ao entry fragger</li>
          </ul>
        </div>

        <div className={stylesGrid.roleAgents}>
          <h4>Agentes:</h4>
          <div className={stylesGrid.agentsList}>
            <span className={stylesGrid.agentTag}>Sova</span>
            <span className={stylesGrid.agentTag}>Breach</span>
            <span className={stylesGrid.agentTag}>Skye</span>
            <span className={stylesGrid.agentTag}>KAY/O</span>
            <span className={stylesGrid.agentTag}>Fade</span>
            <span className={stylesGrid.agentTag}>Gekko</span>
          </div>
        </div>
      </div>
      <button className={stylesGrid.roleLearnBtn}>
        <i className="fas fa-play"></i> Aprender Função
      </button>
    </div>
  )
}