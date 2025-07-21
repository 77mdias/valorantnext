import { ThemeSwitcher } from '@/src/components/theme-switcher';

export default function ProtectedFooter() {
	return (
		<footer className="w-full col-span-12 items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
			<p>
				Powered by{' '}
				<a href="https://instagram.com/77mdias" target="_blank" className="font-bold hover:underline" rel="noreferrer">
					77Mdias
				</a>
			</p>
			<ThemeSwitcher />
		</footer>
	);
}
