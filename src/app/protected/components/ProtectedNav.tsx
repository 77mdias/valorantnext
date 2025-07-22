import { Logo } from '@/src/components/ui/logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './scss/Navbar.module.scss';
import { AuthButton } from '@/src/components/auth-button';

export default function ProtectedNav() {
	return (
		<nav className="w-full col-span-12 justify-center border-b border-b-foreground/10">
			<div className={`w-full flex justify-between items-center ${styles.navContainer}`}>
				<div className="flex gap-5 items-center font-semibold">
					<Logo />
				</div>
				<div className={`${styles.searchBar}`}>
					<FontAwesomeIcon icon={faSearch} className=" text-white" />
					<input type="text" placeholder="Buscar aulas..." className={`${styles.searchInput}`} />
				</div>
				{/* {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />} */}
				<AuthButton />
			</div>
		</nav>
	);
}
