export interface CombinedData {
  playerName: string;
  playerId: number;
  teamId: number;
  teamNickname: string;
  teamAbbr: string;
  statType: string;
  statTypeId: number;
  position: string;
  marketSuspended: number;
  line: number;
  alternateOverOdds: number | null;
  alternateUnderOdds: number | null;
  alternatePushOdds: number | null;
  highLine: number;
  lowLine: number;
}
