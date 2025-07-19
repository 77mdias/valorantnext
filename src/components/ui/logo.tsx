import Image from 'next/image';
import Link from 'next/link';
import styles from './logo.module.scss';

export function Logo({
	width = 40,
	height = 40,
	classNameText,
}: {
	width?: number;
	height?: number;
	classNameText?: string;
}) {
	return (
		<Link href={'/'} className={`flex items-center text-2xl ${classNameText}`}>
			<Image src={'/Valorant-Academy.png'} alt="logo" width={width} height={height} className={`object-contain`} />
			<span className={`${classNameText}`}>N</span> <span>e</span>
			<span className={`text-pink-700 font-bold text-2xl ${classNameText} ${styles.XT}`}>XT</span>
		</Link>
	);
}
