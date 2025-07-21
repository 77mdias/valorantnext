import { DeployButton } from '@/src/components/deploy-button';
import { AuthButton } from '@/src/components/auth-button';
import { Hero } from '@/src/components/hero';
import SwitchTheme from '@/src/components/SwitchTheme';
import { Logo } from '@/src/components/ui/logo';
import InstagramLink from '@/src/components/Sociais/instagramLink';
import LinkedinLink from '@/src/components/Sociais/linkedinLink';
import EmailLink from '@/src/components/Sociais/emailLink';
import GithubLink from '@/src/components/Sociais/githubLink';
import styles from './page.module.scss';
import DropdownNav from '@/src/components/Navbar/dropdown-nav';

export default function Home() {
	return (
		<main className={`min-h-screen flex flex-col items-center ${styles.backgroundGradient}`}>
			<div className="flex-1 w-full flex flex-col gap-20 items-center">
				<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 ">
					<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
						<div className="flex gap-5 items-center font-semibold">
							<Logo />
							<div className="flex items-center gap-2">
								<DeployButton />
							</div>
						</div>
						<AuthButton />
						<div className="sm:block md:hidden">
							<DropdownNav />
						</div>
					</div>
				</nav>
				<div className={`flex-1 flex flex-col gap-20 min-w-0  max-w-5xl p-5 ${styles.containerBox}`}>
					<Hero />
					<main className="flex-1 flex flex-col gap-6 px-4">
						<h2 className="font-medium text-xl mb-4">Contatos e redes sociais</h2>
						<div className="flex flex-col gap-4">
							<p>
								Este é um projeto de estudo onde prático Next.js & React + Supabase. Nele é uma simulação de Escola de
								Valorant, onde você pode se inscrever, cadastrar seu usuário e deixar salvo em banco de dados, só tem
								algumas informações sobre Valorant, mas nada de ensinamentos profundo com aulas, aliás é apenas uma{' '}
								<span className="font-bold">Simulação</span> com páginas interativas e também estáticas para portfólio
								do GitHub.
							</p>
							<p>
								Se você quiser entrar em contato comigo para afins de projetos estruturados com Next.js & React +
								Supabase, pode me encontrar nas redes sociais, ver meu portfólio no GitHub e mandar um email:
							</p>
							<div className="flex flex-row gap-4 items-center justify-center flex-wrap">
								<InstagramLink />
								{/* COLOQUE AQUI AQUELA BARRA DIAGONAL QUE TINHA LA EM EM CIMA */}
								<div className="w-px h-6 bg-foreground/50" />
								<LinkedinLink />
								<div className="w-px h-6 bg-foreground/50" />
								<GithubLink />
								<div className="w-px h-6 bg-foreground/50" />
								<EmailLink />
							</div>
						</div>
					</main>
				</div>

				<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 ">
					<p>
						Powered by{' '}
						<a
							href="https://www.instagram.com/77mdias/"
							target="_blank"
							className="font-bold hover:underline"
							rel="noreferrer"
						>
							Jean Dias
						</a>
					</p>
					<SwitchTheme />
				</footer>
			</div>
		</main>
	);
}
