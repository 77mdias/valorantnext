import stylesGrid from './Grid.module.scss'
import Duelista from './Duelista'
import Iniciador from './Iniciador'
import Controlador from './Controlador'
import Sentinela from './Sentinela'

export default function Grid() {
  return (
    <section className={stylesGrid.rolesGrid}>
      <h2>Funções no Valorant</h2>
      <div className={stylesGrid.roleGridItems}>
        {/* FUNÇÃO DE DUELISTA */}
        <Duelista />
        {/* FUNÇÃO DE INICIADOR */}
        <Iniciador />
        {/* FUNÇÃO DE CONTROLADOR */}
        <Controlador />
        {/* FUNÇÃO DE SENTINELA */}
        <Sentinela />
      </div>
    </section>
  )
}