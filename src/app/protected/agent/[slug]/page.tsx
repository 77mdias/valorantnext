'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/src/lib/supabase/client';
import AgentImage from '../../components/AgentImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlay, faBolt, faShield, faEye } from '@fortawesome/free-solid-svg-icons';
import styles from './agent.module.scss';

interface Agent {
	id: number;
	name: string;
	role: string;
	skills: string;
	dica: string;
	biography: string;
	imagekey: string;
	abilities: Ability[] | string;
	strategies: Strategy[] | string;
	tutorials: Tutorial[] | string;
}

interface Ability {
	name: string;
	icon: string;
	cost?: number;
	charges?: number;
	isUltimate?: boolean;
}

interface Strategy {
	title: string;
	description: string;
	tips: string[];
}

interface Tutorial {
	title: string;
	description: string;
	thumbnail: string;
}

export default function AgentPage() {
	const params = useParams();
	const router = useRouter();
	const [agent, setAgent] = useState<Agent | null>(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<'abilities' | 'strategies' | 'tutorials'>('abilities');

	useEffect(() => {
		async function fetchAgent() {
			if (!params.slug) return;

			// Validar se o slug é um número válido
			const agentId = parseInt(params.slug as string);
			if (isNaN(agentId)) {
				console.error('ID do agente inválido:', params.slug);
				setLoading(false);
				return;
			}

			const supabase = createClient();
			// Buscar pelo ID ao invés do nome
			const { data, error } = await supabase.from('agents').select('*').eq('id', agentId).single();

			console.log('Buscando agente com ID:', agentId);
			console.log('Resultado da busca:', { data, error });

			if (!error && data) {
				// Parse JSON fields
				const parsedAgent = {
					...data,
					abilities: typeof data.abilities === 'string' ? JSON.parse(data.abilities) : data.abilities,
					strategies: typeof data.strategies === 'string' ? JSON.parse(data.strategies) : data.strategies,
					tutorials: typeof data.tutorials === 'string' ? JSON.parse(data.tutorials) : data.tutorials,
				};
				setAgent(parsedAgent);
			} else {
				console.error('Erro ao buscar agente:', error);
			}
			setLoading(false);
		}
		fetchAgent();
	}, [params.slug]);

	if (loading) {
		return (
			<div className={styles.loadingContainer}>
				<div className={styles.spinner}></div>
				<p>Carregando agente...</p>
			</div>
		);
	}

	if (!agent) {
		return (
			<div className={styles.notFound}>
				<h1>Agente não encontrado</h1>
				<button onClick={() => router.back()} className={styles.backButton}>
					<FontAwesomeIcon icon={faArrowLeft} />
					Voltar
				</button>
			</div>
		);
	}

	const abilities: Ability[] = Array.isArray(agent.abilities) ? agent.abilities : [];
	const strategies: Strategy[] = Array.isArray(agent.strategies) ? agent.strategies : [];
	const tutorials: Tutorial[] = Array.isArray(agent.tutorials) ? agent.tutorials : [];

	return (
		<div className={styles.agentPage}>
			{/* Header com imagem do agente */}
			<section className={styles.agentHero}>
				<button onClick={() => router.back()} className={styles.backButton}>
					<FontAwesomeIcon icon={faArrowLeft} />
					Voltar
				</button>

				<div className={styles.heroContent}>
					<div className={styles.agentImageContainer}>
						<AgentImage
							imageKey={agent.imagekey}
							alt={agent.name}
							width={400}
							height={500}
							priority={true}
							className={styles.heroImage}
						/>
					</div>

					<div className={styles.agentDetails}>
						<div className={styles.agentRole}>{agent.role}</div>
						<h1 className={styles.agentName}>{agent.name}</h1>
						<p className={styles.agentSkills}>{agent.skills}</p>
						<p className={styles.agentBio}>{agent.biography}</p>
						<div className={styles.agentTip}>
							<strong>💡 Dica:</strong> {agent.dica}
						</div>
					</div>
				</div>
			</section>

			{/* Navegação por tabs */}
			<section className={styles.tabsSection}>
				<div className={styles.container}>
					<div className={styles.tabNav}>
						<button
							className={`${styles.tabButton} ${activeTab === 'abilities' ? styles.active : ''}`}
							onClick={() => setActiveTab('abilities')}
						>
							<FontAwesomeIcon icon={faBolt} />
							Habilidades
						</button>
						<button
							className={`${styles.tabButton} ${activeTab === 'strategies' ? styles.active : ''}`}
							onClick={() => setActiveTab('strategies')}
						>
							<FontAwesomeIcon icon={faShield} />
							Estratégias
						</button>
						<button
							className={`${styles.tabButton} ${activeTab === 'tutorials' ? styles.active : ''}`}
							onClick={() => setActiveTab('tutorials')}
						>
							<FontAwesomeIcon icon={faPlay} />
							Tutoriais
						</button>
					</div>

					{/* Conteúdo das tabs */}
					<div className={styles.tabContent}>
						{activeTab === 'abilities' && (
							<div className={styles.abilitiesGrid}>
								{abilities.map((ability, index) => (
									<div key={index} className={`${styles.abilityCard} ${ability.isUltimate ? styles.ultimate : ''}`}>
										<div className={styles.abilityHeader}>
											<div className={styles.abilityIcon}>
												<FontAwesomeIcon icon={faEye} />
											</div>
											<div className={styles.abilityInfo}>
												<h3>{ability.name}</h3>
												{ability.cost !== undefined && (
													<span className={styles.abilityCost}>{ability.cost} créditos</span>
												)}
											</div>
											{ability.charges && (
												<div className={styles.abilityCharges}>
													{ability.charges} {ability.charges === 1 ? 'carga' : 'cargas'}
												</div>
											)}
										</div>
										{ability.isUltimate && <div className={styles.ultimateBadge}>Ultimate</div>}
									</div>
								))}
							</div>
						)}

						{activeTab === 'strategies' && (
							<div className={styles.strategiesGrid}>
								{strategies.map((strategy, index) => (
									<div key={index} className={styles.strategyCard}>
										<h3>{strategy.title}</h3>
										<p>{strategy.description}</p>
										{strategy.tips && (
											<ul className={styles.tipsList}>
												{strategy.tips.map((tip, tipIndex) => (
													<li key={tipIndex}>{tip}</li>
												))}
											</ul>
										)}
									</div>
								))}
							</div>
						)}

						{activeTab === 'tutorials' && (
							<div className={styles.tutorialsGrid}>
								{tutorials.map((tutorial, index) => (
									<div key={index} className={styles.tutorialCard}>
										<div className={styles.tutorialThumbnail}>
											<FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
										</div>
										<div className={styles.tutorialInfo}>
											<h3>{tutorial.title}</h3>
											<p>{tutorial.description}</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
