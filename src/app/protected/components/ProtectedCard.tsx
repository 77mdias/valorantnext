import styles from './scss/Card.module.scss';
import AgentImage from './AgentImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface Agent {
	imagekey: string;
	name: string;
	role?: string;
	dica?: string;
	skills?: string;
}

interface ProtectedCardProps {
	agent: Agent;
	isActive: boolean;
	onClick: () => void;
}

function ProtectedCard({ agent, isActive, onClick }: ProtectedCardProps) {
	return (
		<div className={`${styles.card} ${isActive ? styles.active : ''}`}>
			<div className={`${styles.cardImage}`}>
				<AgentImage
					imageKey={agent.imagekey}
					alt={`${agent.name} - ${agent.role || 'Agente'} do Valorant`}
					width={300}
					height={400}
					priority={false}
					className={styles.agentImage}
				/>
				<div className={`${styles.difficulty}`}>Difícil</div>
				<button className={`${styles.playBTN}`} onClick={onClick}>
					<FontAwesomeIcon icon={faPlay} />
				</button>
			</div>
			<div className={`${styles.cardContent}`}>
				<div className={`${styles.cardName}`}>{agent.name}</div>
				<div className={`${styles.cardSkills}`}>
					<h3>{agent.skills}</h3>
					<p>{agent.dica}</p>
				</div>
			</div>
		</div>
	);
}

export default ProtectedCard;
