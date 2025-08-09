'use client';

import { useState, FormEvent } from 'react';

export default function ProgressSection() {
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState('br'); // opcional: selecionar região de VAL
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setData(null);

    const value = riotId.trim();
    if (!value.includes('#')) {
      setError('Use o formato Nome#TAG');
      return;
    }

    setLoading(true);
    try {
      const url = `/api/valorant/player?riotId=${encodeURIComponent(value)}&region=${encodeURIComponent(region)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok || json?.error) {
        setError(json?.error || 'Erro ao buscar jogador');
      } else {
        setData(json);
      }
    } catch (err: any) {
      setError('Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Visão Geral do Progresso</h2>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
        <input
          type="text"
          placeholder="Riot ID (ex.: Nome#TAG)"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          required
          style={{ padding: 8, minWidth: 260 }}
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ padding: 8 }}>
          <option value="br">BR</option>
          <option value="latam">LATAM</option>
          <option value="na">NA</option>
          <option value="eu">EU</option>
          <option value="ap">AP</option>
          <option value="kr">KR</option>
        </select>
        <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p style={{ color: 'tomato', marginTop: 8 }}>{error}</p>}

      {data && (
        <div style={{ marginTop: 16 }}>
          <h3>Conta</h3>
          <p>
            {data.account?.gameName}#{data.account?.tagLine}
          </p>
          <p>puuid: {data.account?.puuid}</p>
          <p>Região VAL: {data.region}</p>

          {data.matchlist ? (
            <>
              <h3 style={{ marginTop: 12 }}>Partidas Recentes</h3>
              <ul>
                {data.matchlist.history?.slice(0, 10).map((m: any) => (
                  <li key={m.matchId}>
                    {m.queueId} — {new Date(m.gameStartTimeMillis).toLocaleString()} — {m.matchId}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ marginTop: 8 }}>Sem partidas recentes ou não foi possível obter o histórico.</p>
          )}
          {data?.matchlistError && (
            <details style={{ marginTop: 8 }}>
              <summary>Detalhes do erro de matchlist</summary>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(data.matchlistError, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}
    </section>
  );
}