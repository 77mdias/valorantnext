'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProtectedCard from './ProtectedCard';
import styles from './scss/AgentCarousel.module.scss';

interface Agent {
	id: number;
	name: string;
	role: string;
	skills: string;
	dica: string;
	biography: string;
	imagekey: string;
	abilities: string;
	strategies: string;
	tutorials: string;
}

interface AgentCarouselProps {
	agents: Agent[];
}

export default function AgentCarousel({ agents }: AgentCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const carouselRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Configurações do carousel
	const itemsToShow = {
		mobile: 1,
		tablet: 2,
		desktop: 5,
		large: 5,
	};

	const [itemsPerView, setItemsPerView] = useState(itemsToShow.desktop);

	// Atualiza items por view baseado no tamanho da tela
	useEffect(() => {
		const updateItemsPerView = () => {
			const width = window.innerWidth;
			if (width < 640) setItemsPerView(itemsToShow.mobile);
			else if (width < 768) setItemsPerView(itemsToShow.tablet);
			else if (width < 1200) setItemsPerView(itemsToShow.desktop);
			else setItemsPerView(itemsToShow.large);
		};

		updateItemsPerView();
		window.addEventListener('resize', updateItemsPerView);
		return () => window.removeEventListener('resize', updateItemsPerView);
	}, []);

	const maxIndex = Math.max(0, agents.length - itemsPerView);

	// Navegação por botões
	const goToPrevious = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
		setTimeout(() => setIsTransitioning(false), 300);
	};

	const goToNext = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
		setTimeout(() => setIsTransitioning(false), 300);
	};

	const goToSlide = (index: number) => {
		if (isTransitioning || index === currentIndex) return;
		setIsTransitioning(true);
		setCurrentIndex(index);
		setTimeout(() => setIsTransitioning(false), 300);
	};

	// Drag/Touch handlers
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - containerRef.current.offsetLeft);
		setScrollLeft(containerRef.current.scrollLeft);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		if (!containerRef.current) return;
		setIsDragging(true);
		setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
		setScrollLeft(containerRef.current.scrollLeft);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !containerRef.current) return;
		e.preventDefault();
		const x = e.pageX - containerRef.current.offsetLeft;
		const walk = (x - startX) * 2;
		containerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging || !containerRef.current) return;
		const x = e.touches[0].pageX - containerRef.current.offsetLeft;
		const walk = (x - startX) * 2;
		containerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleDragEnd = () => {
		if (!isDragging) return;
		setIsDragging(false);

		// Determinar para qual slide ir baseado na posição do scroll
		if (containerRef.current) {
			const cardWidth = 300; // largura do card + gap
			const newIndex = Math.round(containerRef.current.scrollLeft / cardWidth);
			const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
			setCurrentIndex(clampedIndex);
		}
	};

	/* 	// Auto-play (opcional)
	useEffect(() => {
		const interval = setInterval(() => {
			if (!isDragging) {
				goToNext();
			}
		}, 5000); // muda a cada 5 segundos

		return () => clearInterval(interval);
	}, [isDragging, maxIndex]); */

	// Navegação por teclado
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') goToPrevious();
			if (e.key === 'ArrowRight') goToNext();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className={styles.carousel}>
			{/* Botão anterior */}
			<button
				className={`${styles.navButton} ${styles.prevButton}`}
				onClick={goToPrevious}
				disabled={isTransitioning}
				aria-label="Slide anterior"
			>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>

			{/* Container do carousel */}
			<div
				ref={containerRef}
				className={styles.carouselContainer}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleDragEnd}
			>
				<div
					ref={carouselRef}
					className={styles.carouselTrack}
					style={{
						transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
						transition: isTransitioning ? 'transform 0.3s ease' : 'none',
					}}
				>
					{agents.map(agent => (
						<div key={agent.id} className={styles.carouselItem}>
							<ProtectedCard agent={agent} isActive={false} onClick={() => {}} />
						</div>
					))}
				</div>
			</div>

			{/* Botão próximo */}
			<button
				className={`${styles.navButton} ${styles.nextButton}`}
				onClick={goToNext}
				disabled={isTransitioning}
				aria-label="Próximo slide"
			>
				<FontAwesomeIcon icon={faChevronRight} />
			</button>

			{/* Indicadores */}
			<div className={styles.indicators}>
				{Array.from({ length: maxIndex + 1 }, (_, index) => (
					<button
						key={index}
						className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
						onClick={() => goToSlide(index)}
						aria-label={`Ir para slide ${index + 1}`}
					/>
				))}
			</div>

			{/* Contador */}
			<div className={styles.counter}>
				{currentIndex + 1} / {maxIndex + 1}
			</div>
		</div>
	);
}
