import { Linkedin } from 'lucide-react';
import Link from 'next/link';

export function LinkedinLink() {
	return (
		<Link href="https://www.linkedin.com/in/jeancmdias/" target="_blank" className="flex items-center gap-2">
			<Linkedin /> LinkedIn
		</Link>
	);
}

export default LinkedinLink;
