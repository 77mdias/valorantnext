'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { MenuIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './dropdown-nav.module.scss';

function DropdownNav() {
	const [mounted, setMounted] = useState(false);
	const { theme } = useTheme();

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
					<MenuIcon aria-hidden="true" className="size-5 text-white " strokeWidth={2} />
				</MenuButton>
			</div>

			<MenuItems
				transition
				className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in ${styles.dropdownMenuItems}`}
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
							href="http://localhost:3000/auth/login"
							className={`block px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							Entrar
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="http://localhost:3000/auth/sign-up"
							className={`block px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							Registrar
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="#"
							className={`block px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
							style={{
								color: theme === 'light' ? '#1e293b' : '#efeff1',
							}}
						>
							Suporte
						</a>
					</MenuItem>
					<form action="#" method="POST">
						<MenuItem>
							<button
								type="submit"
								className={`block w-full px-4 py-2 text-base transition-colors duration-200 text-right ${styles.menuItem}`}
								style={{
									color: theme === 'light' ? '#1e293b' : '#efeff1',
								}}
							>
								Licença
							</button>
						</MenuItem>
					</form>
				</div>
			</MenuItems>
		</Menu>
	);
}

export default DropdownNav;
