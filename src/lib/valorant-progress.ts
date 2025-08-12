import { PlayerProgress, PlayerResponse, MatchSummary, AgentStat, MapStat, PlayerStreaks } from '../types/valorant';

/**
 * Converte dados da API atual para o formato PlayerProgress
 * Esta função serve como adaptador entre os dados existentes e o novo formato
 */
export async function getPlayerProgress(riotName: string, tag: string): Promise<PlayerProgress | null> {
  try {
    // Buscar dados usando a API existente
    const response = await fetch(`/api/valorant/player?riotId=${encodeURIComponent(`${riotName}#${tag}`)}&region=br`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const playerData: PlayerResponse = await response.json();
    
    // Simular dados de progresso baseados nos dados disponíveis
    // Em uma implementação real, estes dados viriam de APIs específicas do Valorant
    const mockProgress: PlayerProgress = {
      riotName: playerData.account.gameName,
      tag: playerData.account.tagLine,
      
      // Dados de rank simulados - em produção viriam da API de MMR/Rank
      rank: {
        tier: 'Ascendant',
        division: '2',
        rr: 78,
        elo: 2178,
        season: 'E8A3',
        peak: {
          tier: 'Immortal',
          division: '1',
          rr: 34
        }
      },
      
      // Overview calculado com base nas partidas (simulado)
      overview: {
        winRate: 64,
        kd: 1.23,
        hsPercent: 21,
        totalMatches: playerData.matchlist?.history?.length || 87,
        playtimeHours: 156
      },
      
      // Sequências simuladas
      streaks: {
        wins: 3,
        daysActive: 12,
        clutchStreak: 2,
        firstBloods: 5,
        hsStreak: 8
      },
      
      // Agentes mais jogados (simulado)
      agents: [
        { agent: 'Jett', matches: 23, winRate: 67, kd: 1.45, kpr: 0.89, adr: 167 },
        { agent: 'Reyna', matches: 18, winRate: 61, kd: 1.32, kpr: 0.83, adr: 159 },
        { agent: 'Phoenix', matches: 15, winRate: 60, kd: 1.18, kpr: 0.76, adr: 148 },
        { agent: 'Sage', matches: 12, winRate: 58, kd: 0.95, kpr: 0.65, adr: 132 },
        { agent: 'Omen', matches: 8, winRate: 62, kd: 1.08, kpr: 0.71, adr: 141 }
      ],
      
      // Mapas mais jogados (simulado)
      maps: [
        { map: 'Ascent', matches: 18, winRate: 67, kd: 1.28, atkWinRate: 58, defWinRate: 75 },
        { map: 'Bind', matches: 16, winRate: 62, kd: 1.19, atkWinRate: 54, defWinRate: 71 },
        { map: 'Haven', matches: 14, winRate: 64, kd: 1.31, atkWinRate: 61, defWinRate: 67 },
        { map: 'Split', matches: 12, winRate: 58, kd: 1.15, atkWinRate: 50, defWinRate: 67 },
        { map: 'Icebox', matches: 11, winRate: 55, kd: 1.09, atkWinRate: 45, defWinRate: 64 }
      ],
      
      // Armas mais usadas (simulado)
      weapons: [
        { weapon: 'Vandal', usagePercent: 45, hsPercent: 23, kd: 1.34 },
        { weapon: 'Phantom', usagePercent: 35, hsPercent: 19, kd: 1.28 },
        { weapon: 'Sheriff', usagePercent: 15, hsPercent: 31, kd: 0.89 },
        { weapon: 'Operator', usagePercent: 12, hsPercent: 67, kd: 1.78 },
        { weapon: 'Spectre', usagePercent: 8, hsPercent: 16, kd: 1.12 }
      ],
      
      // Histórico de partidas convertido
      recentMatches: convertMatchHistory(playerData.matchlist?.history || [])
    };
    
    return mockProgress;
    
  } catch (error) {
    console.error('Erro ao buscar progresso do jogador:', error);
    return null;
  }
}

/**
 * Converte o histórico de partidas da API para MatchSummary[]
 */
function convertMatchHistory(history: any[]): MatchSummary[] {
  // Agentes simulados para as partidas
  const agents = ['Jett', 'Reyna', 'Phoenix', 'Sage', 'Omen', 'Sova', 'Breach', 'Cypher'];
  const maps = ['Ascent', 'Bind', 'Haven', 'Split', 'Icebox', 'Breeze', 'Fracture', 'Pearl'];
  const modes = ['competitive', 'unrated', 'swiftplay', 'deathmatch'];
  
  return history.slice(0, 15).map((match, index): MatchSummary => {
    // Simular dados da partida baseados no matchId
    const seed = match.matchId.split('-')[0].length; // Usar parte do ID como seed
    const isWin = (seed + index) % 3 !== 0; // ~67% win rate
    const isDraw = !isWin && (seed + index) % 7 === 0; // ~5% draw rate
    
    const kills = 12 + (seed % 15);
    const deaths = 8 + ((seed + index) % 12);
    const assists = 3 + ((seed * 2) % 8);
    
    return {
      id: match.matchId,
      date: new Date(match.gameStartTimeMillis).toISOString(),
      map: maps[seed % maps.length],
      agent: agents[(seed + index) % agents.length],
      mode: modes[seed % modes.length],
      result: isDraw ? 'draw' : isWin ? 'win' : 'loss',
      rrChange: match.queueId === 'competitive' ? 
        (isWin ? 15 + (seed % 10) : -(12 + (seed % 8))) : undefined,
      kills,
      deaths,
      assists,
      hsPercent: 15 + (seed % 20),
      durationMinutes: 25 + (seed % 20)
    };
  });
}

/**
 * Função helper para buscar dados de progresso no lado do servidor
 * Pode ser usada em Server Components
 */
export async function getPlayerProgressServer(riotName: string, tag: string): Promise<PlayerProgress | null> {
  // Em produção, esta função faria chamadas diretas às APIs
  // Por enquanto, retorna dados simulados
  try {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      riotName,
      tag,
      rank: {
        tier: 'Diamond',
        division: '3',
        rr: 45,
        elo: 1945,
        season: 'E8A3'
      },
      overview: {
        winRate: 58,
        kd: 1.15,
        hsPercent: 19,
        totalMatches: 134
      },
      agents: [],
      maps: [],
      recentMatches: []
    };
  } catch (error) {
    console.error('Erro ao buscar progresso do jogador (server):', error);
    return null;
  }
}

/**
 * Calcula estatísticas derivadas dos dados de progresso
 */
export function calculateDerivedStats(progress: PlayerProgress) {
  const { overview, agents, maps } = progress;
  
  return {
    // Agente mais jogado
    favoriteAgent: agents.length > 0 ? agents[0].agent : null,
    
    // Mapa com melhor performance
    bestMap: maps.length > 0 ? 
      maps.reduce((best: MapStat, current: MapStat) => 
        current.winRate > best.winRate ? current : best
      ).map : null,
    
    // KD médio
    averageKD: overview.kd,
    
    // Estimativa de RR por partida
    avgRRPerMatch: Math.round((overview.winRate - 50) * 0.4 + 18),
    
    // Performance geral (score de 0-100)
    performanceScore: Math.round(
      (overview.winRate * 0.4) + 
      (Math.min(overview.kd * 50, 100) * 0.3) + 
      (overview.hsPercent * 1.5 * 0.3)
    )
  };
}
