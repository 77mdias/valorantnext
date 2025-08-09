'use client';

// IMPORTS
import stylesHero from './components/scss/Hero.module.scss';
import styles from './page.module.scss';

// IMPORTS EXTERNOS
import { createClient } from '@/src/lib/supabase/client';
import yoru from '@/public/yoru.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// IMPORTS INTERNOS
import { useEffect, useState, useRef, useCallback } from 'react';
import ProtectedCard from './components/ProtectedCard';
import { useRouter } from 'next/navigation';

// COMPONENTE PRINCIPAL
export default function ProtectedPage() {
	console.log('Componente renderizou');
	const carouselRef = useRef<HTMLDivElement>(null);

	// DADOS DOS AGENTES QUE SERÃO RENDERIZADOS
	const [agents, setAgents] = useState<
		{
			id: number;
			name: string;
			role: string;
			skills: string;
			dica: string;
			biography: string;
			imagekey: string; // Mudado para minúsculo!
			abilities: string;
			strategies: string;
			tutorials: string;
		}[]
	>([]);

	// ESTADO PARA CARREGAR OS AGENTES
	const [loading, setLoading] = useState(true);

	// ESTADO PARA O INDICE ATUAL DO CAROUSEL
	const [currentIndex, setCurrentIndex] = useState(0);

	// ESTADO PARA O NUMERO DE CARDS POR VIEW
	const [cardsPerView, setCardsPerView] = useState(5);
	const router = useRouter();

	// Nova lógica: garantir que o último card seja sempre visível
	const maxIndex = agents.length > cardsPerView ? agents.length - cardsPerView : 0;

	// Garantir que nunca passamos do último card
	const safeCurrentIndex = Math.min(currentIndex, maxIndex);

	// Transform corrigido baseado na sua descoberta: 7200px funciona para mostrar Raze
	const calculateTransform = (index: number) => {
		// Para desktop (5 cards): lógica baseada no DOM real
		if (cardsPerView === 5) {
			const totalCards = agents.length;
			const lastIndex = totalCards - cardsPerView;

			// Se estamos no último grupo de cards, calcular o deslocamento exato
			if (index >= lastIndex) {
				if (carouselRef.current) {
					const cardsWrapper = carouselRef.current.querySelector(`.${styles.cardsWrapper}`) as HTMLElement | null;
					const carouselCards = carouselRef.current.querySelector(`.${styles.carouselCards}`) as HTMLElement | null;

					if (cardsWrapper && carouselCards) {
						const totalWidth = cardsWrapper.scrollWidth;
						const visibleWidth = carouselCards.clientWidth;
						const maxTranslate = Math.max(0, totalWidth - visibleWidth);
						return maxTranslate;
					}
				}
				// Fallback se não conseguir calcular pelo DOM
				return index * 340;
			}

			// Para posições intermediárias
			return index * 340;
		}

		// Para mobile (1 card)
		if (cardsPerView === 1) {
			const cardWidth = 165;
			const gap = 12;
			const totalCards = agents.length;
			const maxTranslate = (totalCards - 1) * (cardWidth + gap);
			const translate = index * (cardWidth + gap);
			return Math.min(translate, maxTranslate);
		}

		// Para tablet (2 cards)
		if (cardsPerView === 2) {
			const cardWidth = 280;
			const gap = 20;
			const totalCards = agents.length;
			const visibleWidth = cardsPerView * cardWidth + (cardsPerView - 1) * gap;
			const totalWidth = totalCards * cardWidth + (totalCards - 1) * gap;
			const maxTranslate = totalWidth - visibleWidth;
			const translate = index * (cardWidth + gap);
			return Math.min(translate, maxTranslate);
		}

		// Fallback
		return index * 300;
	};

	// Hook para detectar tamanho da tela
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setCardsPerView(1); // Mobile: 1 card
			} else if (window.innerWidth <= 1024) {
				setCardsPerView(2); // Tablet: 2 cards
			} else {
				setCardsPerView(5); // Desktop: 5 cards
			}
		};

		handleResize(); // Executar na inicialização
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Reset currentIndex quando cardsPerView mudar
	useEffect(() => {
		setCurrentIndex(0);
	}, [cardsPerView]);

	// Função para voltar para o card anterior
	const goToPrev = useCallback(() => {
		setCurrentIndex(prev => Math.max(0, prev - 1));
	}, []);

	// Função para ir diretamente para um slide específico
	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex);
	};

	// Função para avançar para o próximo card
	const goToNext = useCallback(() => {
		setCurrentIndex(prev => {
			const lastVisibleCard = prev + cardsPerView - 1;
			const lastCardIndex = agents.length - 1;
			return lastVisibleCard < lastCardIndex ? prev + 1 : prev;
		});
	}, [agents.length, cardsPerView]);

	// Adicionar scroll do mouse no carousel
	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			const target = e.target as HTMLElement;

			// Método 1: Verificar data-carousel
			const isInsideCarousel = target.closest('[data-carousel="true"]');

			// Método 2: Verificar se está dentro da ref (backup)
			const isInsideRef = carouselRef.current && carouselRef.current.contains(target);

			console.log('🖱️ Scroll event:', {
				target: target.tagName,
				dataCarousel: !!isInsideCarousel,
				insideRef: !!isInsideRef,
				deltaY: e.deltaY,
			});

			if (isInsideCarousel || isInsideRef) {
				e.preventDefault();
				console.log('✅ Scroll no carousel detectado:', e.deltaY > 0 ? 'Próximo' : 'Anterior');

				const deltaY = e.deltaY;
				const threshold = 30;

				if (Math.abs(deltaY) > threshold) {
					if (deltaY > 0) {
						console.log('➡️ Chamando goToNext');
						goToNext();
					} else {
						console.log('⬅️ Chamando goToPrev');
						goToPrev();
					}
				}
			}
		};


		console.log('🔧 Configurando scroll listener');
		document.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			console.log('🧹 Removendo scroll listener');
			document.removeEventListener('wheel', handleWheel);
		};
	}, [goToNext, goToPrev]);

	useEffect(() => {
		async function fetchAgents() {
			const supabase = createClient();
			const { data, error } = await supabase.from('agents').select('*').order('id', { ascending: true });

			if (!error) setAgents(data);
			setLoading(false);
		}
		fetchAgents();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<>
			<section className={`${stylesHero.hero}`} style={{ backgroundImage: `url(${yoru.src})` }}>
				<div className={`${stylesHero.heroContent}`}>
					<h1>Domine a Função Dueslita</h1>
					<p>Aprenda técnicas avançadas com a melhor comunidade de Valorant</p>
					<button className={`${stylesHero.heroButton}`}>
						Assistir Agora <FontAwesomeIcon icon={faPlay} />
					</button>
				</div>
			</section>
			<section className={`${styles.lessonsGrid}`} data-carousel="true">
				<h2>Aulas Recomendadas</h2>

				{/* CARDS CAROUSEL  */}
				<div className={`${styles.carouselContainer}`} data-carousel="true" ref={carouselRef}>
					{/* BUTTON PARA VER OS CARDS ANTERIORES  */}
					<button
						className={`${styles.carouselButton} ${styles.prevButton}`}
						onClick={goToPrev}
						disabled={safeCurrentIndex === 0}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>

					{/* CARDS CAROUSEL */}
					<div className={`${styles.carouselCards}`}>
						<div
							className={`${styles.cardsWrapper}`}
							style={{
								transform: `translateX(-${calculateTransform(safeCurrentIndex)}px)`,
								transition: 'transform 0.5s ease',
							}}
						>
							{/* PARA CADA AGENTE É RENDERIZADO UM CARD */}
							{agents.map((agent, index) => (
								<ProtectedCard
									key={agent.id}
									agent={agent}
									isActive={index >= safeCurrentIndex && index < safeCurrentIndex + cardsPerView}
									onClick={() => router.push(`/protected/agent/${agent.id}`)}
								/>
							))}
						</div>
					</div>

					{/* BUTTON PARA VER OS CARDS POSTERIORES  */}
					<button
						className={`${styles.carouselButton} ${styles.nextButton}`}
						onClick={goToNext}
						disabled={safeCurrentIndex + cardsPerView - 1 >= agents.length - 1}
						title={`Index: ${safeCurrentIndex} | Cards visíveis: ${safeCurrentIndex} a ${Math.min(
							safeCurrentIndex + cardsPerView - 1,
							agents.length - 1
						)} | Último card: ${agents.length - 1}`}
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				</div>

				{/* CAROUSEL INDICATORS - Versão Melhorada */}
				<div className={`${styles.carouselIndicators}`}>
					{(() => {
						const totalSlides = maxIndex + 1;
						const maxIndicators = 7;

						if (totalSlides <= maxIndicators) {
							// Se poucos slides, mostrar todos
							return Array.from({ length: totalSlides }, (_, index) => (
								<button
									key={index}
									className={`${styles.indicator} ${index === safeCurrentIndex ? styles.active : ''}`}
									onClick={() => goToSlide(index)}
									aria-label={`Slide ${index + 1} de ${totalSlides}`}
									title={`Cards ${index * cardsPerView + 1}-${Math.min(
										(index + 1) * cardsPerView,
										agents.length
									)}: ${agents
										.slice(index * cardsPerView, (index + 1) * cardsPerView)
										.map(a => a.name)
										.join(', ')}`}
								/>
							));
						}

						// Algoritmo melhorado: distribuição mais uniforme
						const positions = [];

						// Sempre incluir primeira e última posição
						positions.push(0);
						positions.push(totalSlides - 1);

						// Calcular posições intermediárias de forma mais uniforme
						const remainingSlots = maxIndicators - 2; // -2 pois já temos primeira e última

						for (let i = 1; i <= remainingSlots; i++) {
							const position = Math.round((totalSlides - 1) * (i / (remainingSlots + 1)));
							if (!positions.includes(position)) {
								positions.push(position);
							}
						}

						// Ordenar posições e remover duplicatas
						const uniquePositions = [...new Set(positions)].sort((a, b) => a - b);

						// Criar indicadores
						return uniquePositions.map(slideIndex => {
							const startCard = slideIndex * cardsPerView + 1;
							const endCard = Math.min((slideIndex + 1) * cardsPerView, agents.length);
							const cardNames = agents
								.slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
								.map(a => a.name);

							return (
								<button
									key={slideIndex}
									className={`${styles.indicator} ${slideIndex === safeCurrentIndex ? styles.active : ''}`}
									onClick={() => goToSlide(slideIndex)}
									aria-label={`Slide ${slideIndex + 1}`}
									title={`Posição ${slideIndex + 1}/${totalSlides} - Cards ${startCard}-${endCard}: ${cardNames.join(
										', '
									)}`}
								/>
							);
						});
					})()}
				</div>

				{/* CONTADOR VISUAL */}
				<div className={`${styles.carouselCounter}`}>
					<span className={`${styles.counterPosition}`}>
						{safeCurrentIndex + 1} / {maxIndex + 1}
					</span>
					<span className={`${styles.counterAgents}`}>
						{agents
							.slice(safeCurrentIndex, safeCurrentIndex + cardsPerView)
							.map(agent => agent.name)
							.join(', ')}
					</span>
				</div>
			</section>
		</>
	);
}
