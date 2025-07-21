'use client';

import { cn } from '@/src/lib/utils';
import { createClient } from '@/src/lib/supabase/client';
import { Button } from '@/src/components/ui/button-radix';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SquareArrowLeft } from 'lucide-react';

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// Função para lidar com o registro do usuário
	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		// Verifica se as senhas coincidem
		if (password !== repeatPassword) {
			setError('Passwords do not match');
			setIsLoading(false);
			return;
		}

		// Tenta registrar o usuário supabase retorna um erro se o email já estiver registrado se der certo ele retorna um objeto com o usuário criado
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/protected`,
				},
			});
			// Faz a verificação se o email já está registrado e envia uma mensagem de erro caso esteja
			if (error) {
				if (error.message.includes('already registered')) {
					setError('Email já registrado');
				} else {
					setError('Erro ao registrar usuário, tente novamente');
				}
				return;
			}

			// Se der certo, cria um perfil no banco de dados para o usuário
			if (!error && data.user) {
				await supabase.from('profiles').insert({
					id: data.user.id,
					email: data.user.email,
					created_at: new Date().toISOString(),
				});
			}

			// Redireciona para a página de sucesso
			router.push('/auth/sign-up-success');
			// Se der erro, envia uma mensagem de erro
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="flex flex-row justify-between">
					<div>
						<CardTitle className="text-2xl">Registrar</CardTitle>
						<CardDescription>Crie uma nova conta</CardDescription>
					</div>
					<Link href="/" className="text-sm text-gray-500 flex items-center gap-2">
						<SquareArrowLeft className="w-8 h-8" />
					</Link>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Senha</Label>
								</div>
								<Input
									id="password"
									type="password"
									required
									placeholder="********"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="repeat-password">Repetir Senha</Label>
								</div>
								<Input
									id="repeat-password"
									type="password"
									required
									placeholder="********"
									value={repeatPassword}
									onChange={e => setRepeatPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
							<Button type="submit" className="w-full" disabled={isLoading}>
								Registrar
								{isLoading && <span className="ml-2 animate-spin">⏳</span>}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Já tem uma conta?{' '}
							<Link href="/auth/login" className="underline underline-offset-4">
								Entrar
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
