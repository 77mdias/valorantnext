import { RankInfo } from '../../../../types/valorant';
import styles from './RankPanel.module.scss';

interface RankPanelProps {
  rankInfo?: RankInfo;
  isLoading?: boolean;
}

// Ícone de troféu para rank
const RankIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.5C20.78 4 21 4.22 21 4.5S20.78 5 20.5 5H19V8C19 10.76 16.76 13 14 13H13V16.5C13 16.78 12.78 17 12.5 17H11.5C11.22 17 11 16.78 11 16.5V13H10C7.24 13 5 10.76 5 8V5H3.5C3.22 5 3 4.78 3 4.5S3.22 4 3.5 4H7ZM9 5V8C9 9.66 10.34 11 12 11S15 9.66 15 8V5H9Z"/>
  </svg>
);

// Função para determinar a cor do rank
function getRankColor(tier: string): string {
  const lowerTier = tier.toLowerCase();
  
  if (lowerTier.includes('iron')) return '#4a4a4a';
  if (lowerTier.includes('bronze')) return '#cd7f32';
  if (lowerTier.includes('silver')) return '#c0c0c0';
  if (lowerTier.includes('gold')) return '#ffd700';
  if (lowerTier.includes('platinum')) return '#00ffff';
  if (lowerTier.includes('diamond')) return '#b9f2ff';
  if (lowerTier.includes('ascendant')) return '#00ff87';
  if (lowerTier.includes('immortal')) return '#ff6b6b';
  if (lowerTier.includes('radiant')) return '#ffff00';
  
  return 'var(--text-primary)'; // Default para unranked
}

export default function RankPanel({ rankInfo, isLoading = false }: RankPanelProps) {
  if (isLoading) {
    return (
      <section className={`${styles.rankPanel} ${styles.loading}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>Informações de Rank</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.currentRank}>
            <div className={styles.rankIcon}>
              <RankIcon />
            </div>
            <div className={styles.rankInfo}>
              <div className={styles.rankName}>Carregando...</div>
              <div className={styles.rr}>-- RR</div>
            </div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '0%' }}></div>
          </div>
        </div>
      </section>
    );
  }

  if (!rankInfo) {
    return (
      <section className={styles.rankPanel}>
        <div className={styles.header}>
          <h3 className={styles.title}>Informações de Rank</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.noData}>
            <p>Dados de rank não disponíveis</p>
          </div>
        </div>
      </section>
    );
  }

  const rankColor = getRankColor(rankInfo.tier);
  const currentRR = rankInfo.rr || 0;
  const progressPercent = Math.min((currentRR / 100) * 100, 100);
  const rrToNext = Math.max(100 - currentRR, 0);
  
  const rankDisplay = rankInfo.division 
    ? `${rankInfo.tier} ${rankInfo.division}`
    : rankInfo.tier;

  const peakDisplay = rankInfo.peak?.tier
    ? rankInfo.peak.division 
      ? `${rankInfo.peak.tier} ${rankInfo.peak.division}`
      : rankInfo.peak.tier
    : null;

  return (
    <section className={styles.rankPanel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Informações de Rank</h3>
        {rankInfo.season && (
          <span className={styles.season}>Temporada {rankInfo.season}</span>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.currentRank}>
          <div 
            className={styles.rankIcon}
            style={{ color: rankColor }}
          >
            {rankInfo.iconUrl ? (
              <img 
                src={rankInfo.iconUrl} 
                alt={`${rankDisplay} icon`}
                className={styles.rankImage}
              />
            ) : (
              <RankIcon />
            )}
          </div>
          
          <div className={styles.rankInfo}>
            <div 
              className={styles.rankName}
              style={{ color: rankColor }}
            >
              {rankDisplay}
            </div>
            <div className={styles.rr}>
              {currentRR} RR
              {rankInfo.elo && (
                <span className={styles.elo}> • {rankInfo.elo} Elo</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Progresso para próximo rank</span>
            <span className={styles.progressValue}>{rrToNext} RR restantes</span>
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${progressPercent}%`,
                backgroundColor: rankColor
              }}
            ></div>
          </div>
        </div>

        {peakDisplay && (
          <div className={styles.peakRank}>
            <div className={styles.peakLabel}>Pico da temporada</div>
            <div 
              className={styles.peakValue}
              style={{ color: getRankColor(rankInfo.peak!.tier) }}
            >
              {peakDisplay}
              {rankInfo.peak?.rr && ` • ${rankInfo.peak.rr} RR`}
            </div>
          </div>
        )}

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>RR Médio por partida</span>
            <span className={styles.statValue}>±18 RR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
