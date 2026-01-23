import { cards } from "@/cards.ts";

/**
 * Sort cards by Daifugo (Richman) strength order: 3 < 4 < ... < K < A < 2 < Joker.
 * Keeps original order when strengths tie.
 */
export function sortHandDaifugo(hand: Array<number>): Array<number> {
    const withIndex = hand.map((id, index) => ({ id, index, strength: getStrength(id) }));
    return withIndex
        .sort((a, b) => {
            if (a.strength === b.strength) return a.index - b.index;
            return a.strength - b.strength;
        })
        .map((item) => item.id);
}

function getStrength(cardId: number): number {
    const card = cards[cardId];
    if (!card) return Number.MAX_SAFE_INTEGER;
    const num = card.number;
    if (num === 0) return 15; // Joker is strongest
    if (num === 2) return 14;
    if (num === 1) return 13;
    // 3-13 map to ascending strength starting at 0
    return Math.max(0, num - 3);
}
