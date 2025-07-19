import { Mails } from 'lucide-react';
import Link from 'next/link';

export function EmailLink() {
	return (
		<Link href="mailto:jean.77mdiasdev@gmail.com" target="_blank" className="flex items-center gap-2">
			<Mails /> Email
		</Link>
	);
}

export default EmailLink;
