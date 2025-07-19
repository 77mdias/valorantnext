import { Github } from 'lucide-react';
import Link from 'next/link';

export function GithubLink() {
	return (
		<Link href="https://github.com/77mdias" target="_blank" className="flex items-center gap-2">
			<Github /> GitHub
		</Link>
	);
}

export default GithubLink;
