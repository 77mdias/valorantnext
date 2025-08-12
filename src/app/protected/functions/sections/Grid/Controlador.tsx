import stylesGrid from './Grid.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

export default function Controlador() {
  return (
   <div className={`${stylesGrid.roleCard} ${stylesGrid.controlador}`}>
      <div className={stylesGrid.roleHeader}>
        <div className={stylesGrid.roleIcon}>
          <FontAwesomeIcon icon={faShield} />
        </div>
        <h3>Controlador</h3>
        <span className={stylesGrid.roleBadge}>Controle</span>
      </div>
      <div className={stylesGrid.roleDescription}>
        <p>
          Agentes que controlam o mapa através de smokes e bloqueios
          visuais, dividindo áreas.
        </p>

        <div className={stylesGrid.roleCharacteristics}>
          <h4>Características:</h4>
          <ul>
            <li>Controle de mapa</li>
            <li>Smokes e bloqueios</li>
            <li>Divisão de áreas</li>
            <li>Suporte estratégico</li>
          </ul>
        </div>

        <div className={stylesGrid.roleAgents}>
          <h4>Agentes:</h4>
          <div className={stylesGrid.agentsList}>
            <span className={stylesGrid.agentTag}>Omen</span>
            <span className={stylesGrid.agentTag}>Brimstone</span>
            <span className={stylesGrid.agentTag}>Viper</span>
            <span className={stylesGrid.agentTag}>Astra</span>
            <span className={stylesGrid.agentTag}>Harbor</span>
          </div>
        </div>
      </div>
      <button className={stylesGrid.roleLearnBtn}>
        <i className="fas fa-play"></i> Aprender Função
      </button>
    </div> 
  )
}