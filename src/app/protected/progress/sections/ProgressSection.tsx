'use client';

import { useState, FormEvent } from 'react';
import { PlayerProgress } from '../../../../types/valorant';
import { getPlayerProgress } from '../../../../lib/valorant-progress';
import ProgressOverview from './ProgressOverview';
import RankPanel from './RankPanel';
import Streaks from './Streaks';
import MatchHistory from './MatchHistory';
import styles from './ProgressSection.module.scss';

export default function ProgressSection() {
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState('br');
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPlayerData(null);

    const value = riotId.trim();
    if (!value.includes('#')) {
      setError('Use o formato Nome#TAG');
      return;
    }

    const [riotName, tag] = value.split('#');
    if (!riotName || !tag) {
      setError('Use o formato Nome#TAG');
      return;
    }

    setLoading(true);
    try {
      const progress = await getPlayerProgress(riotName, tag);
      
      if (progress) {
        setPlayerData(progress);
      } else {
        setError('Não foi possível carregar os dados do jogador');
      }
    } catch (err) {
      console.error('Erro ao buscar progresso:', err);
      setError('Erro ao buscar dados do jogador');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.progressSection}>
      {/* Formulário de busca */}
      <section className={styles.searchSection}>
        <div className={styles.searchHeader}>
          <h2 className={styles.title}>Análise de Desempenho</h2>
          <p className={styles.subtitle}>
            Digite seu Riot ID para ver estatísticas detalhadas do seu progresso no Valorant
          </p>
        </div>

        <form onSubmit={onSubmit} className={styles.searchForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Riot ID (ex.: Nome#TAG)"
              value={riotId}
              onChange={(e) => setRiotId(e.target.value)}
              required
              className={styles.input}
            />
            <select 
              value={region} 
              onChange={(e) => setRegion(e.target.value)} 
              className={styles.select}
            >
              <option value="br">BR</option>
              <option value="latam">LATAM</option>
              <option value="na">NA</option>
              <option value="eu">EU</option>
              <option value="ap">AP</option>
              <option value="kr">KR</option>
            </select>
            <button 
              type="submit" 
              disabled={loading} 
              className={styles.button}
            >
              {loading ? 'Analisando...' : 'Analisar'}
            </button>
          </div>
        </form>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
      </section>

      {/* Dados do jogador */}
      {(loading || playerData) && (
        <div className={styles.playerData}>
          {/* Cards de visão geral */}
          <ProgressOverview 
            playerData={playerData || undefined} 
            isLoading={loading} 
          />
          
          {/* Painel de rank */}
          <RankPanel 
            rankInfo={playerData?.rank} 
            isLoading={loading} 
          />
          
          {/* Sequências */}
          <Streaks 
            streaks={playerData?.streaks} 
            isLoading={loading} 
          />
          
          {/* Histórico de partidas */}
          <MatchHistory 
            matches={playerData?.recentMatches} 
            isLoading={loading}
            limit={8}
          />
        </div>
      )}
      
      {/* Estado inicial - sem dados */}
      {!loading && !playerData && !error && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3>Pronto para analisar seu desempenho?</h3>
          <p>Digite seu Riot ID acima para ver estatísticas detalhadas, histórico de partidas, ranking atual e muito mais.</p>
        </div>
      )}
    </div>
  );
}