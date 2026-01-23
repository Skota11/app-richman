"use client";

import { useMemo } from "react";
import { sortHandDaifugo } from "@/lib/sortHandDaifugo";
import { gameState, playerData } from "@/types/gameState";
import HandFan from "@/components/HandFan";
import TableCards from "@/components/TableCards";
import PlayersInfo from "@/components/PlayersInfo";

export default function Game({ playerData, gameState, roomId, playMessage }: { playerData: playerData; gameState: gameState, roomId: string, playMessage: string | null }) {
    const hand: Array<number> = useMemo(() => sortHandDaifugo(playerData.hand), [playerData.hand]);
    const isMyTurn = gameState.currentTurnPosition === playerData.position;

    return (
        <div className="min-h-screen flex flex-col gap-2 p-2 relative">            {playMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div className="bg-blue-600 text-white text-2xl font-bold px-8 py-4 rounded-xl shadow-2xl animate-[fade-in-out_0.8s_ease-in-out]">
                    {playMessage}
                </div>
            </div>
        )}            {gameState.tableState.kakumei && (
            <div className="bg-yellow-200 text-yellow-800 text-center p-2 rounded-md font-bold">
                革命発生中！(カードの強さが逆転しています)
            </div>
        )}
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex place-content-center items-center">
                    <PlayersInfo gameState={gameState} />
                </div>
                <div className="py-6 flex items-center justify-center">
                    <div className="w-full">
                        <TableCards cardsOnTable={gameState.cardsOnTable ?? []} />
                    </div>
                </div>
                <div className="flex place-content-center">
                    <HandFan roomId={roomId} hand={hand} gameState={gameState} showActions={isMyTurn} />
                </div>
            </div>
        </div>
    );
}