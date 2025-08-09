import { NextResponse } from 'next/server';

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
  if (!apiKey) {
    return NextResponse.json({ error: 'RIOT_API_KEY ausente' }, { status: 500 });
  }

  const accountRegionGroup = process.env.RIOT_ACCOUNT_REGION_GROUP || 'americas'; // americas | europe | asia
  const defaultValRegion = process.env.VAL_REGION || 'br'; // na, eu, ap, kr, latam, br

  const { searchParams } = new URL(req.url);
  const riotId = (searchParams.get('riotId') || '').trim();
  const valRegion = (searchParams.get('region') || defaultValRegion).trim();

  const parsed = parseRiotId(riotId);
  if (!parsed) {
    return NextResponse.json({ error: 'Formato inválido. Use Nome#TAG' }, { status: 400 });
  }

  const { gameName, tagLine } = parsed;

  const accountUrl = `https://${accountRegionGroup}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
  const accountRes = await fetch(accountUrl, {
    headers: { 'X-Riot-Token': apiKey },
    next: { revalidate: 3600 },
  });

  if (accountRes.status === 404) {
    return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 });
  }
  if (!accountRes.ok) {
    const detail = await accountRes.text();
    return NextResponse.json({ error: 'Falha ao buscar conta', detail }, { status: accountRes.status });
  }

  const account = await accountRes.json();

  const matchlistUrl = `https://${valRegion}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${encodeURIComponent(account.puuid)}`;
  const matchlistRes = await fetch(matchlistUrl, {
    headers: { 'X-Riot-Token': apiKey },
    next: { revalidate: 60 },
  });

  let matchlist: any = null;
  if (matchlistRes.ok) {
    matchlist = await matchlistRes.json();
  } else if (matchlistRes.status !== 404) {
    const detail = await matchlistRes.text();
    return NextResponse.json({ error: 'Falha ao buscar matchlist', detail }, { status: matchlistRes.status });
  }

  return NextResponse.json({ account, matchlist, region: valRegion });
}
