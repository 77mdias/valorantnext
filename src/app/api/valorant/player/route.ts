import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // força Node na Vercel

// Tipos simples para a resposta da Riot
type AccountDTO = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

type MatchHistoryItem = {
  matchId: string;
  gameStartTimeMillis: number;
  queueId: string;
};

type MatchlistDTO = {
  history?: MatchHistoryItem[];
};

function parseRiotId(riotId: string) {
  const idx = riotId.indexOf('#');
  if (idx === -1) return null;
  const gameName = riotId.slice(0, idx).trim();
  const tagLine = riotId.slice(idx + 1).trim();
  if (!gameName || !tagLine) return null;
  return { gameName, tagLine };
}

export async function GET(req: Request) {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'RIOT_API_KEY ausente' }, { status: 500 });

  const accountRegionGroup = process.env.RIOT_ACCOUNT_REGION_GROUP || 'americas';
  const defaultValRegion = process.env.VAL_REGION || 'br';

  const { searchParams } = new URL(req.url);
  const riotId = (searchParams.get('riotId') || '').trim();
  const preferred = (searchParams.get('region') || defaultValRegion).trim();
  const candidates = Array.from(new Set([preferred, 'br', 'latam', 'na', 'eu', 'ap', 'kr']));

  const parsed = parseRiotId(riotId);
  if (!parsed) return NextResponse.json({ error: 'Formato inválido. Use Nome#TAG' }, { status: 400 });
  const { gameName, tagLine } = parsed;

  // 0) Ping conteúdo VAL para checar permissão do produto
  const contentUrl = `https://${preferred}.api.riotgames.com/val/content/v1/contents?locale=pt-BR`;
  const contentRes = await fetch(contentUrl, { headers: { 'X-Riot-Token': apiKey }, next: { revalidate: 300 } });
  if (contentRes.status === 401) {
    const detail = await contentRes.text();
    return NextResponse.json({ error: 'API key inválida ou expirada (401)', detail }, { status: 401 });
  }
  if (contentRes.status === 403) {
    const detail = await contentRes.text();
    return NextResponse.json({
      error: 'Acesso negado (403) ao produto VALORANT. Habilite VALORANT no Developer Portal e gere nova chave.',
      detail,
    }, { status: 403 });
  }

  // 1) Conta -> puuid
  const accountUrl = `https://${accountRegionGroup}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
  const accountRes = await fetch(accountUrl, { headers: { 'X-Riot-Token': apiKey }, next: { revalidate: 3600 } });
  if (accountRes.status === 404) return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 });
  if (!accountRes.ok) {
    const detail = await accountRes.text();
    return NextResponse.json({ error: 'Falha ao buscar conta', detail }, { status: accountRes.status });
  }
  const account = (await accountRes.json()) as AccountDTO;

  // 2) Matchlist com fallback de shard
  let matchlist: MatchlistDTO | null = null;
  let regionUsed = preferred;
  let matchlistError: { status: number; detail?: string; regionTried: string } | null = null;

  for (const r of candidates) {
    const matchlistUrl = `https://${r}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${encodeURIComponent(account.puuid)}`;
    const res = await fetch(matchlistUrl, {
      headers: { 'X-Riot-Token': apiKey },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      matchlist = (await res.json()) as MatchlistDTO;
      regionUsed = r;
      matchlistError = null;
      break;
    }

    if (res.status === 404) {
      // shard incorreta → tenta a próxima
      continue;
    }

    // guarda o erro mas NÃO quebra a resposta
    const detail = await res.text();
    matchlistError = { status: res.status, detail, regionTried: r };
  }

  // nunca retorne erro aqui por causa do matchlist
  return NextResponse.json({ account, matchlist, region: regionUsed, matchlistError });
}
