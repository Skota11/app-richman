import ExchangeHand from '@/components/ExchangeHand';
import { sortHandDaifugo } from '@/lib/sortHandDaifugo';
import { gameState, playerData } from '@/types/gameState';
import { useMemo } from 'react';

export default function Exchange({ gameState, playerData, roomId }: { gameState: gameState, playerData: playerData, roomId: string }) {
    const hand: Array<number> = useMemo(() => sortHandDaifugo(playerData.hand), [playerData.hand]);
    const getExchangeNum = (rank: number, totalPlayers: number): number => {
        if (rank === 1) return 2; // 大富豪
        if (rank === 2) return 1; // 富豪
        return 0; // その他のランクは交換なし
    }
    return (
        <div>
            {playerData.rank !== undefined ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">交換フェーズ</h2>
                    {playerData.rank === 1 && (
                        <p>あなたは大富豪です。大貧民のプレイヤーとカードを2枚交換してください。</p>
                    )}
                    {playerData.rank === 2 && (
                        <p>あなたは富豪です。最下位のプレイヤーとカードを1枚交換してください。</p>
                    )}
                    {playerData.rank === gameState.playingPlayers.length && (
                        <p>あなたは大貧民です。最も強いカード2枚と自動的に交換します。</p>
                    )}
                    {playerData.rank === gameState.playingPlayers.length - 1 && (
                        <p>あなたは貧民です。最も強いカード1枚と自動的に交換します。</p>
                    )}

                    {/* ここにカード交換のUIを実装 */}
                    <ExchangeHand hand={hand} gameState={gameState} roomId={roomId} exchangeNum={getExchangeNum(playerData.rank ?? 0, gameState.playingPlayers.length)} />
                </div>
            ) : (
                <p>ランク情報がありません。</p>
            )}
        </div>
    )
}