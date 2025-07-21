import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.scss';
import { ThemeProvider } from 'next-themes';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'NextValorant - Escola de Valorant',
	description: 'Aprenda técnicas avançadas de Valorant com os melhores jogadores',
};

const montserrat = Montserrat({
	variable: '--font-montserrat',
	display: 'swap',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${montserrat.className}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={true}
					disableTransitionOnChange={false}
					storageKey="nextjs-theme"
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
