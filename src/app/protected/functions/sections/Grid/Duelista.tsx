import stylesGrid from './Grid.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNinja } from '@fortawesome/free-solid-svg-icons'

export default function Duelista() {
  return (
    <div className={`${stylesGrid.roleCard} ${stylesGrid.duelista}`}>
      <div className={stylesGrid.roleHeader}>
        <div className={stylesGrid.roleIcon}>
          <FontAwesomeIcon icon={faUserNinja} />
        </div>
        <h3>Duelista</h3>
        <span className={stylesGrid.roleBadge}>Ataque</span>
      </div>
      <div className={stylesGrid.roleDescription}>
        <p>
          Agentes focados em eliminar inimigos e abrir caminho para o
          time. São os entry fraggers da equipe.
        </p>

        <div className={stylesGrid.roleCharacteristics}>
          <h4>Características:</h4>
          <ul>
            <li>Alta mobilidade</li>
            <li>Habilidades de entrada</li>
            <li>Foco em eliminations</li>
            <li>Criar espaço para o time</li>
          </ul>
        </div>

        <div className={stylesGrid.roleAgents}>
          <h4>Agentes:</h4>
          <div className={stylesGrid.agentsList}>
            <span className={stylesGrid.agentTag}>Jett</span>
            <span className={stylesGrid.agentTag}>Reyna</span>
            <span className={stylesGrid.agentTag}>Phoenix</span>
            <span className={stylesGrid.agentTag}>Raze</span>
            <span className={stylesGrid.agentTag}>Yoru</span>
            <span className={stylesGrid.agentTag}>Neon</span>
          </div>
        </div>
      </div>
      <button className={stylesGrid.roleLearnBtn}>
        <i className="fas fa-play"></i> Aprender Função
      </button>
    </div>
  )
}