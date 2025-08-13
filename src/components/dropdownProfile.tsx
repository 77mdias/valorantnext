'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartBar,
	faChartLine,
	faCircleUser,
	faUser,
	faCertificate,
	faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faMedal, faStar, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './dropdownProfile.module.scss';
import { LogoutButton } from './logout-button';

function DropdownProfile() {
	const [mounted, setMounted] = useState(false);
	const { theme } = useTheme();
	const { setTheme } = useTheme();
	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<MenuButton className={`${styles.dropdownButton}`}>
					<FontAwesomeIcon
						icon={faCircleUser}
						className={`${styles.dropdownButtonIcon}`}
						style={{ color: theme === 'light' ? '#1e293b' : '#efeff1' }}
					/>
					<FontAwesomeIcon icon={faGear} className={`size-3`} />
				</MenuButton>
			</div>

			<MenuItems
				transition
				className={`absolute right-0 z-10 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in ${styles.dropdownMenuItems}`}
				style={{
					background:
						theme === 'light'
							? 'linear-gradient(120deg, #f5f6fa 0%, #e9e9f3 40%, #e0e7ff 70%, #f8fafc 100%)'
							: 'linear-gradient(135deg, #181824 0%, #23243a 50%, #2e1a47 100%)',
					color: theme === 'light' ? '#1e293b' : '#efeff1',
					border: `1px solid ${theme === 'light' ? 'rgba(145, 70, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'}`,
					boxShadow:
						theme === 'light'
							? 'rgba(100, 116, 139, 0.2) 0px 10px 15px -3px, rgba(100, 116, 139, 0.1) 0px 4px 6px -2px'
							: 'rgba(0, 0, 0, 0.3) 0px 10px 15px -3px, rgba(0, 0, 0, 0.2) 0px 4px 6px -2px',
				}}
			>
				<div className="py-1">
					<MenuItem>
						<a
							href="https://valorantnext.vercel.app/protected/profile"
							className={`block px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							<FontAwesomeIcon
								icon={faUser}
								className="size-5"
								style={{ color: theme === 'light' ? '#1e293b' : '#efeff1' }}
							/>
							Meu Perfil
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="https://valorantnext.vercel.app/protected/progress"
							className={`block px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							<FontAwesomeIcon icon={faChartLine} className="size-5 text-green-400" />
							Meu Progresso
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="/favorites"
							className={`block px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							<FontAwesomeIcon icon={faStar} className="size-5 text-yellow-400" />
							Aulas Favoritas
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="/certificados"
							className={`block w-full px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							<FontAwesomeIcon icon={faCertificate} className="size-5 text-blue-400" />
							Certificados
						</a>
					</MenuItem>
					<hr className="m-4 " />
					<MenuItem>
						<a
							href="/rank"
							className={`block w-full px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							<FontAwesomeIcon icon={faMedal} className="size-5 text-orange-400" />
							Meu Rank:
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="/estatisticas"
							className={`block w-full px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							<FontAwesomeIcon icon={faChartBar} className="size-5 text-purple-400" />
							Estatísticas
						</a>
					</MenuItem>
					<hr className="m-4 " />
					<MenuItem>
						<a
							href="/settings"
							className={`block w-full px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							<FontAwesomeIcon icon={faGear} className="size-5 text-gray-400" />
							Configurações
						</a>
					</MenuItem>
					<MenuItem>
						<button
							className={`block w-full px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
							onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
						>
							<FontAwesomeIcon icon={faSun} className="size-5 text-yellow-400" />
							{theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
						</button>
					</MenuItem>
					<hr className="m-4" />
					<MenuItem>
						<LogoutButton />
					</MenuItem>
				</div>
			</MenuItems>
		</Menu>
	);
}

export default DropdownProfile;
