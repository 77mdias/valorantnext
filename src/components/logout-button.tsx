'use client';

import { createClient } from '@/src/lib/supabase/client';
import { Button } from '@/src/components/ui/button-radix';
import { useRouter } from 'next/navigation';
import styles from './logout-button.module.scss';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';

export function LogoutButton() {
	const router = useRouter();
	const { theme } = useTheme();
	const logout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push('/auth/login');
	};

	return (
		<Button
			onClick={logout}
			className={styles.logoutButton}
			style={{ color: theme === 'light' ? '#1e293b' : '#efeff1' }}
		>
			<FontAwesomeIcon icon={faSignOutAlt} className="size-5" />
			Sair
		</Button>
	);
}
