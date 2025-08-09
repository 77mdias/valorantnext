import ProtectedNav from './components/ProtectedNav';
import ProtectedFooter from './components/ProtectedFooter';
import ProtectedAside from './components/ProtectedAside';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="">
			<div className="grid grid-cols-12">
				<ProtectedNav />
				<ProtectedAside />
				<div className="col-span-12 lg:col-span-9  xl:col-span-10 2xl:col-span-10 gap-20">{children}</div>

				<ProtectedFooter />
			</div>
		</main>
	);
}
