import { Instagram } from 'lucide-react';
import Link from 'next/link';

export function InstagramLink() {
	return (
		<Link href="https://www.instagram.com/77mdias/" target="_blank" className="flex items-center gap-2">
			<Instagram /> Instagram
		</Link>
	);
}

export default InstagramLink;
