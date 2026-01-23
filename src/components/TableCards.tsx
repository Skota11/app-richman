"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cards, cards2svg } from "@/cards";

export type TableCardsProps = {
    cardsOnTable: Array<number>;
};

export default function TableCards({ cardsOnTable }: TableCardsProps) {
    if (cardsOnTable.length === 0) {
        return (
            <div className="flex h-40 px-4 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-slate-400">
                場にカードはありません
            </div>
        );
    }

    return (
        <div className="relative flex min-h-[160px] items-center justify-center">
            <div className="relative h-40 w-full max-w-sm">
                <AnimatePresence>
                    {cardsOnTable.slice(-8).map((cardId, index) => {
                        const card = cards[cardId];
                        const svg = cards2svg[cardId];
                        const total = Math.min(cardsOnTable.length, 8);
                        const offset = index - (total - 1) / 2;
                        const rotate = offset * 3;
                        const translateX = offset * 40;

                        return (
                            <motion.div
                                key={`${cardId}-${index}`}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                initial={{ y: -60, opacity: 0, rotate: 0, scale: 0.8 }}
                                animate={{
                                    y: 0,
                                    x: translateX,
                                    rotate,
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{ y: 60, opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <div className="relative h-40 w-28 overflow-hidden rounded-lg border-2 border-slate-200 bg-white shadow-lg">
                                    <div className="absolute inset-0 p-1">
                                        <Image
                                            src={`/svg-cards/${svg}`}
                                            alt={`${card?.suit ?? "unknown"} ${card?.number ?? ""}`}
                                            fill
                                            sizes="120px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
