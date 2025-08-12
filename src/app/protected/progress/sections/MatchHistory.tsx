import { MatchSummary } from '../../../../types/valorant';
import styles from './MatchHistory.module.scss';

interface MatchHistoryProps {
  matches?: MatchSummary[];
  isLoading?: boolean;
  limit?: number;
}

// Ícones para resultados
const WinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const LossIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const DrawIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13H5v-2h14v2z"/>
  </svg>
);

// Função para formatar duração
function formatDuration(minutes?: number): string {
  if (!minutes) return '--';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// Função para formatar data
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit' 
  });
}

// Função para determinar cor do resultado
function getResultColor(result: 'win' | 'loss' | 'draw'): string {
  switch (result) {
    case 'win': return 'var(--progress-success)';
    case 'loss': return 'var(--progress-danger)';
    case 'draw': return 'var(--text-secondary)';
  }
}

// Função para obter ícone do resultado
function getResultIcon(result: 'win' | 'loss' | 'draw') {
  switch (result) {
    case 'win': return <WinIcon />;
    case 'loss': return <LossIcon />;
    case 'draw': return <DrawIcon />;
  }
}

// Função para formatar modo de jogo
function formatGameMode(mode: string): string {
  const modes: Record<string, string> = {
    'competitive': 'Competitivo',
    'unrated': 'Sem Rank',
    'swiftplay': 'Partida Rápida',
    'deathmatch': 'Mata-Mata',
    'spikerush': 'Spike Rush',
    'escalation': 'Escalation',
    'replication': 'Replicação'
  };
  return modes[mode.toLowerCase()] || mode;
}

export default function MatchHistory({ matches, isLoading = false, limit = 10 }: MatchHistoryProps) {
  if (isLoading) {
    return (
      <section className={`${styles.matchHistory} ${styles.loading}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>Histórico de Partidas</h3>
        </div>
        <div className={styles.matchList}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.matchCard}>
              <div className={styles.matchResult}>
                <div className={styles.resultIcon}>
                  <WinIcon />
                </div>
              </div>
              <div className={styles.matchInfo}>
                <div className={styles.matchHeader}>
                  <span className={styles.map}>Carregando...</span>
                  <span className={styles.date}>--</span>
                </div>
                <div className={styles.matchDetails}>
                  <span className={styles.agent}>--</span>
                  <span className={styles.mode}>--</span>
                </div>
              </div>
              <div className={styles.matchStats}>
                <div className={styles.kda}>--/--/--</div>
                <div className={styles.duration}>--</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const displayMatches = matches?.slice(0, limit) || [];

  if (displayMatches.length === 0) {
    return (
      <section className={styles.matchHistory}>
        <div className={styles.header}>
          <h3 className={styles.title}>Histórico de Partidas</h3>
        </div>
        <div className={styles.noData}>
          <p>Nenhuma partida encontrada</p>
          <small>Suas partidas recentes aparecerão aqui</small>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.matchHistory}>
      <div className={styles.header}>
        <h3 className={styles.title}>Histórico de Partidas</h3>
        <p className={styles.subtitle}>
          {displayMatches.length} partidas recentes
        </p>
      </div>
      
      <div className={styles.matchList}>
        {displayMatches.map((match, index) => {
          const resultColor = getResultColor(match.result);
          const resultIcon = getResultIcon(match.result);
          
          return (
            <div 
              key={`${match.id}-${index}`}
              className={styles.matchCard}
              data-result={match.result}
            >
              <div 
                className={styles.matchResult}
                style={{ color: resultColor }}
              >
                <div className={styles.resultIcon}>
                  {resultIcon}
                </div>
                <div className={styles.resultText}>
                  {match.result === 'win' ? 'V' : match.result === 'loss' ? 'D' : 'E'}
                </div>
                {match.rrChange && (
                  <div 
                    className={`${styles.rrChange} ${match.rrChange > 0 ? styles.positive : styles.negative}`}
                  >
                    {match.rrChange > 0 ? '+' : ''}{match.rrChange}
                  </div>
                )}
              </div>
              
              <div className={styles.matchInfo}>
                <div className={styles.matchHeader}>
                  <span className={styles.map}>{match.map}</span>
                  <span className={styles.date}>{formatDate(match.date)}</span>
                </div>
                <div className={styles.matchDetails}>
                  <span className={styles.agent}>{match.agent}</span>
                  <span className={styles.mode}>{formatGameMode(match.mode)}</span>
                </div>
              </div>
              
              <div className={styles.matchStats}>
                <div className={styles.kda}>
                  <span className={styles.kills}>{match.kills}</span>
                  <span className={styles.separator}>/</span>
                  <span className={styles.deaths}>{match.deaths}</span>
                  <span className={styles.separator}>/</span>
                  <span className={styles.assists}>{match.assists}</span>
                </div>
                
                <div className={styles.additionalStats}>
                  {match.hsPercent && (
                    <span className={styles.hs}>{Math.round(match.hsPercent)}% HS</span>
                  )}
                  <span className={styles.duration}>{formatDuration(match.durationMinutes)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {matches && matches.length > limit && (
        <div className={styles.footer}>
          <p className={styles.moreMatches}>
            +{matches.length - limit} partidas não exibidas
          </p>
        </div>
      )}
    </section>
  );
}
