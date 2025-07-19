import Link from 'next/link';
import { createClient } from '@/src/lib/supabase/server';
import { LogoutButton } from './logout-button';
import styles from '../app/page.module.scss';

export async function AuthButton() {
	const supabase = await createClient();

	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getClaims();

	const user = data?.claims;

	return user ? (
		<div className="flex items-center gap-4">
			Hey, {user.email}!
			<LogoutButton />
		</div>
	) : (
		<div className={`flex gap-2 ${styles.authButton}`}>
			<Link href="/auth/login">
				<button className={`text-sm ${styles['btnClass']}`}>Entrar</button>
			</Link>
			<Link href="/auth/sign-up">
				<button className={styles['btnOutlined']}>Cadastrar</button>
			</Link>
		</div>
	);
}
