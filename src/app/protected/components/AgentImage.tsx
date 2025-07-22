import Image from 'next/image';
import { useState } from 'react';

// Mapeamento específico com nome correto e extensão
const imageMapping: { [key: string]: string } = {
	// Imagens que precisam de correção de nome
	'deadlock-card': 'deadlock.jpg',
	'iso-card': 'iso.webp',
	'kayo-card': 'kayo.jpg',
	'yoru-card': 'yoru.webp',
	'wayley-card': 'wayley.jpg',
	'harbor-card': 'harbor.webp',
	'clove-card': 'clove.avif',
	'gekko-card': 'gekko.webp',
	'astra-card': 'astra.jpg',
	'viper-card': 'viper.jpg',
	'breach-card': 'breach.png',
	'cypher-card': 'cypher.jpg',
	'fade-card': 'fade.jpg',
	'neon-card': 'neon.jpg',
	'skye-card': 'skye.webp',
	'chamber-card': 'chamber.webp',
	'killjoy-card': 'killjoy.webp',
	'brimstone-card': 'brimstone.webp',

	// Imagens que já têm o nome correto, mas vamos especificar a extensão
	'jett-card': 'jett-card.jpg',
	'sova-card': 'sova-card.webp',
	'omen-card': 'omen-card.webp',
	'reyna-card': 'reyna-card.webp',
	'phoenix-card': 'phoenix-card.jpg',
	'sage-card': 'sage-card.jpeg',
	'raze-card': 'raze-card.jpeg',
};

const fallbackExtensions = ['.jpg', '.jpeg', '.webp', '.png', '.avif'];

// Gera um blur placeholder simples
const generateBlurDataURL = () => {
	return `data:image/svg+xml;base64,${Buffer.from(
		`<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="#333"/>
			<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#fff" text-anchor="middle" dominant-baseline="middle">
				Carregando...
			</text>
		</svg>`
	).toString('base64')}`;
};

interface AgentImageProps {
	imageKey: string;
	alt: string;
	width?: number;
	height?: number;
	priority?: boolean;
	className?: string;
}

export default function AgentImage({
	imageKey,
	alt,
	priority = false,
	className,
	width,
	height,
	...props
}: AgentImageProps) {
	const [useFallback, setUseFallback] = useState(false);
	const [fallbackIndex, setFallbackIndex] = useState(0);

	const handleError = () => {
		if (!useFallback) {
			// Se o mapeamento falhou, tenta o sistema de fallback
			setUseFallback(true);
		} else if (fallbackIndex < fallbackExtensions.length - 1) {
			// Tenta próxima extensão no fallback
			setFallbackIndex(fallbackIndex + 1);
		} else {
			// Todas as opções falharam, será tratado no próximo render
		}
	};

	// Se todas as opções falharam, mostra imagem padrão
	if (useFallback && fallbackIndex >= fallbackExtensions.length - 1) {
		return (
			<Image
				src="/cards/default.svg"
				alt={alt}
				priority={priority}
				className={className}
				width={width}
				height={height}
				placeholder="blur"
				blurDataURL={generateBlurDataURL()}
				{...props}
			/>
		);
	}

	let imagePath: string;

	if (!useFallback && imageMapping[imageKey]) {
		// Usa o mapeamento específico (primeira tentativa)
		imagePath = `/cards/${imageMapping[imageKey]}`;
	} else {
		// Usa o sistema de fallback com extensões
		const actualImageName = imageMapping[imageKey]?.split('.')[0] || imageKey;
		imagePath = `/cards/${actualImageName}${fallbackExtensions[fallbackIndex]}`;
	}

	return (
		<Image
			src={imagePath}
			alt={alt}
			width={width}
			height={height}
			priority={priority}
			className={className}
			sizes="(max-width: 768px) 100vw, 300px"
			placeholder="blur"
			blurDataURL={generateBlurDataURL()}
			onError={handleError}
			{...props}
		/>
	);
}
