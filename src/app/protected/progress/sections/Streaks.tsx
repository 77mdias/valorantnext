import { PlayerStreaks } from '../../../../types/valorant';
import styles from './Streaks.module.scss';

interface StreaksProps {
  streaks?: PlayerStreaks;
  isLoading?: boolean;
}

// Ícones SVG para diferentes tipos de streak
const FireIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const FlashIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const SwordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.92 5L12 10.07L17.08 5H19.84L12 12.84L4.16 5H6.92ZM12 13.16L19.84 19H17.08L12 13.93L6.92 19H4.16L12 13.16Z"/>
  </svg>
);

export default function Streaks({ streaks, isLoading = false }: StreaksProps) {
  if (isLoading) {
    return (
      <section className={`${styles.streaks} ${styles.loading}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>Sequências e Conquistas</h3>
        </div>
        <div className={styles.streaksGrid}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.streakCard}>
              <div className={styles.streakIcon}>
                <FireIcon />
              </div>
              <div className={styles.streakContent}>
                <div className={styles.streakValue}>--</div>
                <div className={styles.streakLabel}>Carregando...</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const defaultStreaks: PlayerStreaks = {
    wins: 0,
    daysActive: 0,
    clutchStreak: 0,
    firstBloods: 0,
    hsStreak: 0
  };

  const data = streaks || defaultStreaks;

  const streakItems = [
    {
      icon: <FireIcon />,
      value: data.wins,
      label: 'Vitórias seguidas',
      color: 'var(--progress-success)',
      type: 'wins'
    },
    {
      icon: <TargetIcon />,
      value: data.hsStreak || 0,
      label: 'Headshots seguidos',
      color: 'var(--progress-info)',
      type: 'headshots'
    },
    {
      icon: <FlashIcon />,
      value: data.clutchStreak || 0,
      label: 'Clutches seguidos',
      color: 'var(--progress-warning)',
      type: 'clutch'
    },
    {
      icon: <SwordIcon />,
      value: data.firstBloods || 0,
      label: 'First Bloods seguidos',
      color: 'var(--progress-danger)',
      type: 'firstblood'
    },
    {
      icon: <CalendarIcon />,
      value: data.daysActive || 0,
      label: 'Dias consecutivos',
      color: 'var(--progress-accent)',
      type: 'days'
    }
  ];

  return (
    <section className={styles.streaks}>
      <div className={styles.header}>
        <h3 className={styles.title}>Sequências e Conquistas</h3>
        <p className={styles.subtitle}>Suas melhores sequências recentes</p>
      </div>
      
      <div className={styles.streaksGrid}>
        {streakItems.map((item, index) => (
          <div 
            key={`${item.type}-${index}`}
            className={styles.streakCard}
            data-type={item.type}
          >
            <div 
              className={styles.streakIcon}
              style={{ color: item.color }}
            >
              {item.icon}
            </div>
            
            <div className={styles.streakContent}>
              <div 
                className={styles.streakValue}
                style={{ color: item.color }}
              >
                {item.value}
              </div>
              <div className={styles.streakLabel}>
                {item.label}
              </div>
            </div>
            
            {item.value > 0 && (
              <div 
                className={styles.streakIndicator}
                style={{ backgroundColor: item.color }}
              />
            )}
          </div>
        ))}
      </div>
      
      {!streaks && (
        <div className={styles.noData}>
          <p>Dados de sequências não disponíveis</p>
          <small>Jogue algumas partidas para ver suas sequências aqui</small>
        </div>
      )}
    </section>
  );
}
