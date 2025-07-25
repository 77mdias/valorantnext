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

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		// Tenta fazer o login do usuário
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			// Se der erro, envia uma mensagem de erro
			if (error) {
				console.log('ERRO DO SUPABASE: ', error);
				if (error.message.includes('invalid credentials')) {
					setError('Email ou senha inválidos');
				} else {
					setError('Erro ao fazer login, tente novamente');
				}
				return;
			}
			// Redireciona para a página protegida
			router.push('/protected');
		} catch (error: unknown) {
			// Se der erro, envia uma mensagem de erro
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
						<CardTitle className="text-2xl">Entrar</CardTitle>
						<CardDescription>Digite seu email abaixo para entrar na sua conta</CardDescription>
					</div>
					<div>
						<Link href="/" className="text-sm text-gray-500 flex items-center gap-2">
							<SquareArrowLeft className="w-8 h-8" />
						</Link>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
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
									<Link
										href="/auth/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Esqueceu sua senha?
									</Link>
								</div>
								<Input
									id="password"
									type="password"
									placeholder="********"
									required
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? 'Entrando...' : 'Entrar'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Não tem uma conta?{' '}
							<Link href="/auth/sign-up" className="underline underline-offset-4">
								Registrar
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
