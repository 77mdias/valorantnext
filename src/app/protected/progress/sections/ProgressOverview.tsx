import { PlayerProgress } from '../../../../types/valorant';
import OverviewCard from './OverviewCard';
import styles from './ProgressOverview.module.scss';

// Ícones SVG simples
const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.5C20.78 4 21 4.22 21 4.5S20.78 5 20.5 5H19V8C19 10.76 16.76 13 14 13H13V16.5C13 16.78 12.78 17 12.5 17H11.5C11.22 17 11 16.78 11 16.5V13H10C7.24 13 5 10.76 5 8V5H3.5C3.22 5 3 4.78 3 4.5S3.22 4 3.5 4H7ZM9 5V8C9 9.66 10.34 11 12 11S15 9.66 15 8V5H9ZM17 8V5H16V8C16 9.1 15.1 10 14 10H13.82C16.6 9.69 17 8 17 8ZM7 8C7 8 7.4 9.69 10.18 10H10C8.9 10 8 9.1 8 8V5H7V8Z"/>
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16ZM12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10Z"/>
  </svg>
);

const SwordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.92 5L12 10.07L17.08 5H19.84L12 12.84L4.16 5H6.92ZM12 13.16L19.84 19H17.08L12 13.93L6.92 19H4.16L12 13.16Z"/>
  </svg>
);

const BullseyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16Z"/>
  </svg>
);

interface ProgressOverviewProps {
  playerData?: PlayerProgress;
  isLoading?: boolean;
}

export default function ProgressOverview({ playerData, isLoading = false }: ProgressOverviewProps) {
  // Dados de fallback para quando não há dados
  const defaultData: PlayerProgress = {
    riotName: 'Unknown',
    tag: '0000',
    rank: { tier: 'Unranked', division: undefined, rr: 0, elo: 0, season: 'E8A3' },
    overview: { winRate: 0, kd: 0, hsPercent: 0, totalMatches: 0 },
    agents: [],
    maps: [],
    recentMatches: []
  };

  const data = playerData || defaultData;
  
  // Formatação dos valores
  const rankDisplay = data.rank.division 
    ? `${data.rank.tier} ${data.rank.division}`
    : data.rank.tier;
  
  const rankSubtitle = data.rank.rr > 0 ? `${data.rank.rr} RR` : '';
  const winRateDisplay = `${Math.round(data.overview.winRate)}%`;
  const kdDisplay = data.overview.kd.toFixed(2);
  const hsDisplay = `${Math.round(data.overview.hsPercent)}%`;

  const cards = [
    {
      icon: <TrophyIcon />,
      label: 'Rank Atual',
      value: rankDisplay,
      subtitle: rankSubtitle,
      type: 'rank'
    },
    {
      icon: <TargetIcon />,
      label: 'Taxa de Vitória',
      value: winRateDisplay,
      subtitle: `${data.overview.totalMatches} partidas`,
      type: 'winrate'
    },
    {
      icon: <SwordIcon />,
      label: 'K/D Ratio',
      value: kdDisplay,
      subtitle: 'Média geral',
      type: 'kd'
    },
    {
      icon: <BullseyeIcon />,
      label: 'Headshot %',
      value: hsDisplay,
      subtitle: 'Precisão média',
      type: 'hs'
    }
  ];

  return (
    <section className={styles.progressOverview}>
      <div className={styles.header}>
        <h2 className={styles.title}>Visão Geral do Desempenho</h2>
        {playerData && (
          <p className={styles.subtitle}>
            {playerData.riotName}#{playerData.tag}
          </p>
        )}
      </div>
      
      <div className={styles.cardsGrid}>
        {cards.map((card, index) => (
          <OverviewCard
            key={`${card.type}-${index}`}
            icon={card.icon}
            label={card.label}
            value={card.value}
            subtitle={card.subtitle}
            className={isLoading ? styles.loading : ''}
            data-type={card.type}
          />
        ))}
      </div>
    </section>
  );
}
