import { createClient } from '@/src/lib/supabase/server';
import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get('token_hash');
	const type = searchParams.get('type') as EmailOtpType | null;
	const next = searchParams.get('next') ?? '/';

	if (token_hash && type) {
		const supabase = await createClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			// Redireciona para a URL especificada ou para a raiz da aplicação
			redirect(next);
		} else {
			// Redireciona para a página de erro com uma mensagem de erro
			redirect(`/auth/error?error=${error?.message}`);
		}
	}

	// Redireciona para a página de erro com uma mensagem de erro
	redirect(`/auth/error?error=No token hash or type`);
}
