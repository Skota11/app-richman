"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cards, cards2svg } from "@/cards";
import { useSocketContext } from "@/context/SocketProvider";
import { Button } from "@heroui/react";
import { isValidMove } from "@/lib/validateCardPlay";
import { gameState } from "@/types/gameState";

export type HandFanProps = {
    hand: Array<number>;
    roomId: string;
    gameState: gameState;
    showActions?: boolean;
    onSelectionChange?: (selected: Array<number>) => void;
};

type HandCard = {
    id: number;
    svg: string;
    color: string;
    suit: string;
    number: number;
};

export default function HandFan({ hand, roomId, gameState, showActions = false, onSelectionChange }: HandFanProps) {
    const { socket } = useSocketContext();
    const [selected, setSelected] = useState<Array<number>>([]);
    const handCards: Array<HandCard> = hand.map((id) => ({
        id,
        svg: cards2svg[id],
        color: cards[id]?.color ?? "black",
        suit: cards[id]?.suit ?? "",
        number: cards[id]?.number ?? 0,
    }));

    useEffect(() => {
        // Reset selection if hand changes (e.g., after play)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelected([]);
        onSelectionChange?.([]);
    }, [hand, onSelectionChange]);

    const toggleCard = (cardId: number) => {
        setSelected((prev) => {
            // カードを選択/非選択した場合の新しい状態を計算
            const next = prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId];
            onSelectionChange?.(next);
            return next;
        });
    };

    const handlePlay = () => {
        if (!selected.length) return;
        socket?.emit("play-cards", { cards: selected, roomId });
        setSelected([]);
        onSelectionChange?.([]);
    };

    const handlePass = () => {
        socket?.emit("play-cards", { cards: [], roomId });
        setSelected([]);
        onSelectionChange?.([]);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative h-64 w-full overflow-x-auto pb-2 px-4 pt-3" style={{ scrollbarWidth: "thin" }}>
                <div
                    className="relative h-full"
                    style={{ width: Math.max(600, (handCards.length - 1) * 42 + 160) }}
                >
                    <AnimatePresence>
                        {handCards.map((card, index) => {
                            const total = handCards.length;
                            const center = (total - 1) / 2;
                            const offset = index - center;
                            const rotate = offset * 4;
                            const translateX = offset * 42;
                            const isSelected = selected.includes(card.id);

                            return (
                                <motion.button
                                    key={card.id}
                                    onClick={() => toggleCard(card.id)}
                                    type="button"
                                    className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                                    initial={{ y: 30, opacity: 0, rotate: rotate * 0.5 }}
                                    animate={{
                                        y: isSelected ? -16 : 0,
                                        x: translateX,
                                        rotate,
                                        opacity: 1,
                                        scale: isSelected ? 1.05 : 1,
                                    }}
                                    whileHover={{ y: isSelected ? -20 : -12, scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    aria-pressed={isSelected}
                                >
                                    <div
                                        className={`relative h-40 w-28 overflow-hidden rounded-lg border-2 bg-white shadow-lg transition-shadow duration-200 ${isSelected ? "border-emerald-400 shadow-emerald-500/40" : "border-slate-200/80"
                                            }`}
                                    >
                                        <div className="absolute inset-0 p-1">
                                            <Image
                                                src={`/svg-cards/${card.svg}`}
                                                alt={`${card.suit} ${card.number}`}
                                                fill
                                                sizes="120px"
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                    {handCards.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                            次のゲームまでお待ち下さい
                        </div>
                    )}
                </div>
            </div>
            {showActions && (
                <div className="flex justify-center gap-2">
                    <Button
                        type="button"
                        onClick={handlePlay}
                        disabled={selected.length === 0 || !isValidMove(selected, gameState.cardsOnTable ?? [], gameState)}
                        className="rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white shadow transition hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        手札を出す
                    </Button>
                    <Button
                        type="button"
                        onClick={handlePass}
                        className="rounded-full bg-slate-500 px-4 py-1 text-xs font-semibold text-white shadow transition hover:bg-slate-600"
                    >
                        パス
                    </Button>
                </div>
            )}
        </div>
    );
}
