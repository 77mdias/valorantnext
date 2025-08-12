'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/src/lib/supabase/client';
import Link from 'next/link';
import AgentImage from '../components/AgentImage';
import styles from './agents.module.scss';

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

export default function AgentsPage() {
	const [agents, setAgents] = useState<Agent[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedRole, setSelectedRole] = useState<string>('all');

	useEffect(() => {
		async function fetchAgents() {
			const supabase = createClient();
			const { data, error } = await supabase.from('agents').select('*');

			if (!error && data) {
				setAgents(data);
			}
			setLoading(false);
		}
		fetchAgents();
	}, []);

	const roles = ['all', 'Duelist', 'Controller', 'Initiator', 'Sentinel'];
	const filteredAgents = selectedRole === 'all' ? agents : agents.filter(agent => agent.role === selectedRole);

	if (loading) {
		return (
			<div className={styles.loadingContainer}>
				<div className={styles.spinner}></div>
				<p>Carregando agentes...</p>
			</div>
		);
	}

	return (
		<div className={styles.agentsPage}>
			<div className={styles.container}>
				<header className={styles.pageHeader}>
					<h1>Todos os Agentes</h1>
					<p>Escolha um agente para aprender suas estratégias e habilidades</p>
				</header>

				{/* Filtros por função */}
				<div className={styles.roleFilters}>
					{roles.map(role => (
						<button
							key={role}
							className={`${styles.roleButton} ${selectedRole === role ? styles.active : ''}`}
							onClick={() => setSelectedRole(role)}
						>
							{role === 'all' ? 'Todos' : role}
						</button>
					))}
				</div>

				{/* Grid de agentes */}
				<div className={styles.agentsGrid}>
					{filteredAgents.map(agent => (
						// AQUI O LINK DEVIA SEGUIR A PÁGINA DO AGENTE PELO NUMERO DO ID
						<Link key={agent.id} href={`/protected/agent/${agent.id}`} className={styles.agentCard}>
							<div className={styles.agentImageWrapper}>
								<AgentImage imageKey={agent.imagekey} alt={agent.name} width={280} height={350} priority={false} className={styles.agentImage} />
								<div className={styles.agentRole}>{agent.role}</div>
							</div>
							<div className={styles.agentInfo}>
								<h3>{agent.name}</h3>
								<p>{agent.dica}</p>
							</div>
						</Link>
					))}
				</div>

				{filteredAgents.length === 0 && (
					<div className={styles.noResults}>
						<p>Nenhum agente encontrado para a função &ldquo;{selectedRole}&rdquo;</p>
					</div>
				)}
			</div>
		</div>
	);
}
