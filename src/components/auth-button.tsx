import Link from 'next/link';
import { createClient } from '@/src/lib/supabase/server';
import styles from '../app/page.module.scss';
import DropdownProfile from './dropdownProfile';

export async function AuthButton() {
	const supabase = await createClient();

	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getClaims();

	const user = data?.claims;

	// Se tiver usuario logado, mostra o nome do usuario e o botao de logout
	return user ? (
		<div className="flex items-center gap-4">
			<DropdownProfile />
		</div>
	) : (
		// Se não tiver usuario logado, mostra o botao de login e de cadastro
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
