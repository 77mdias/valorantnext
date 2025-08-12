'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import styles from './scss/ProtectedAside.module.scss';

export default function ProtectedAside() {
	const handleLinkClick = () => {
		const sidebar = document.getElementById('sidebar');
		const overlay = document.getElementById('sidebarOverlay');
		const body = document.body;

		if (sidebar) {
			sidebar.classList.remove('active');
		}
		if (overlay) {
			overlay.classList.remove('active');
		}
		body.classList.remove('sidebar-open');
	};

	return (
		<>
			{/* <!-- Overlay para mobile --> */}
			<div className={`${styles.sidebarOverlay}`} id="sidebarOverlay"></div>

			{/* <!-- Sidebar com botão de fechar --> */}
			<aside className={`${styles.sidebar} lg:col-span-3 xl:col-span-2 2xl:col-span-2`} id="sidebar">
				{/* <!-- Botão fechar só aparece em mobile --> */}
				<button className="close-btn d-lg-none" id="sidebarClose">
					<i className="fas fa-times"></i>
				</button>

				{/* <!-- MENU --> */}
				<ul className={`${styles.navLinks}`}>
					<div className={`${styles.searchBar} d-lg-none mb-2`}>
						<i className="fas fa-search"></i>
						<input type="text" placeholder="Buscar..." />
					</div>
					<li>
						<Link href="/protected" onClick={handleLinkClick}>
							<FontAwesomeIcon icon={faHome} />
							Início
						</Link>
					</li>
					<li>
						<Link href="/protected/agent" onClick={handleLinkClick}>
							<FontAwesomeIcon icon={faUserSecret} />
							Agentes
						</Link>
					</li>
					<li>
						<Link href="/protected/functions" onClick={handleLinkClick}>
							<FontAwesomeIcon icon={faShieldAlt} />
							Funções
						</Link>
					</li>
					<li>
						<Link href="/maps" onClick={handleLinkClick}>
							<FontAwesomeIcon icon={faMap} />
							Mapas
						</Link>
					</li>
					<li>
						<Link href="/settings" onClick={handleLinkClick}>
							<FontAwesomeIcon icon={faCog} />
							Configurações
						</Link>
					</li>
				</ul>
			</aside>
		</>
	);
}
