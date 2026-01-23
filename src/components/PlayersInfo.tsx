"use client";

import { motion } from "framer-motion";
import { gameState } from "@/types/gameState";

export type PlayersInfoProps = {
    players: Array<{ id: string; data: { username: string; points: number } }>;
    currentTurnPosition?: number;
};

export default function PlayersInfo({ gameState }: { gameState: gameState }) {
    if (!gameState.players.length) {
        return null;
    }

    return (
        <div className="flex gap-4 w-full">
            {gameState.playingPlayers.map((player, index) => {
                const isCurrentTurn = index === gameState.currentTurnPosition;
                const playerInfo = gameState.players.find(p => p.id === player.id);
                if (!playerInfo) return null;
                return (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex-1 rounded-lg px-3 py-2 shadow-md transition-all text-center ${isCurrentTurn
                            ? "border-2 border-amber-400 bg-gradient-to-r from-amber-100 to-yellow-100 ring-2 ring-amber-300"
                            : "border border-slate-200 bg-slate-50"
                            }`}
                    >
                        <p className="text-xs font-semibold text-slate-800 truncate">{playerInfo.data.username}</p>
                        {player.data.count !== 0 && (<>
                            <p className={`text-sm font-medium ${isCurrentTurn ? "text-amber-700" : "text-slate-600"}`}>
                                {player.data.count} 枚
                            </p>
                        </>)}
                        {player.data.order !== undefined && (
                            <p className="text-sm text-slate-500">{player.data.order} 抜け</p>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
