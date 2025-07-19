import { Logo } from './ui/logo';
import styles from './hero.module.scss';

export function Hero() {
	return (
		<div className={`flex flex-col gap-6 items-center ${styles.hero}`}>
			<div className="flex gap-8 justify-center items-center ">
				<Logo width={100} height={100} classNameText={`text-8xl font-bold ${styles.logo}`} />
			</div>
			<h1 className="sr-only">Valorant Next Academy</h1>
			<h1 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mt-4">
				Aprenda skills e técnicas de Valorant
			</h1>
			<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
			<h2 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
				<a
					href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
					target="_blank"
					className="font-bold hover:underline"
					rel="noreferrer"
				>
					Next.js & React
				</a>{' '}
				and{' '}
				<a href="https://nextjs.org/" target="_blank" className="font-bold hover:underline" rel="noreferrer">
					Supabase
				</a>
			</h2>
		</div>
	);
}
