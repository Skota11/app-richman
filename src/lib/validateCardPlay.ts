// deno-lint-ignore-file
import { cards } from "@/cards";
import { gameState } from "@/types/gameState";

const JOKER_STRENGTH = 100;

export function getStrength(cardId: number, isKakumei: boolean): number {
    const card = cards[cardId];
    if (!card) return -1;
    if (card.number == 0) {
        return JOKER_STRENGTH; // ジョーカーは最強
    }
    let strength: number;
    if (card.number === 2) {
        strength = 12; // 2は最強（ジョーカー除く）
    } else if (card.number === 1) {
        strength = 11; // Aは2番目
    } else {
        strength = card.number - 3; // 3-K: 0-10
    }
    if (isKakumei) {
        return 12 - strength;
    } else {
        return strength;
    }
}

function isValidRun(cards: Array<number>, isKakumei: boolean): boolean {
    //number to getStrength mapping
    const strengthNumbers = cards.map((card) => { return getStrength(card, isKakumei) })
    strengthNumbers.sort((a, b) => a - b);
    if (strengthNumbers.includes(JOKER_STRENGTH)) {
        return strengthNumbers[1] - strengthNumbers[0] <= 2
    } else {
        return strengthNumbers[2] - strengthNumbers[0] === 2 && strengthNumbers[1] - strengthNumbers[0] === 1;
    }
}

export function isValidMove(selectedCards: Array<number>, cardsOnTable: Array<number>, gameState: gameState): boolean {
    const isKakumei = gameState.tableState.kakumei;
    const handCount = gameState.playingPlayers.find(p => p.data.position === gameState.currentTurnPosition)?.data.count ?? 0;
    switch (selectedCards.length) {
        case 0:
            return true;
        case 1:
            if (handCount === 1 && (cards[selectedCards[0]].number == 8 || cards[selectedCards[0]].number == 0)) {
                return false;
            }
            //選んだカードが1枚であることは確定
            if (cardsOnTable.length === 0) {
                return true;
            }
            if (cardsOnTable.length === 1) {
                const selectedCard = cards[selectedCards[0]];
                if (selectedCard.number == 0) {
                    return true;
                }
                if (gameState.rules.spade3 && selectedCard.suit === "spade" && selectedCard.number === 3 && cards[cardsOnTable[0]].suit == "joker") {
                    return true;
                }
                return getStrength(selectedCards[0], isKakumei) > getStrength(cardsOnTable[0], isKakumei);
            }
            break;
        case 2:
            // selectedCardsをid順にソート
            const sortedSelected = [...selectedCards].sort((a, b) => a - b);
            const firstCard = cards[sortedSelected[0]];
            const secondCard = cards[sortedSelected[1]];
            if ((firstCard.number !== secondCard.number) && secondCard.number !== 0) {
                return false;
            }
            // 選んだカードが2枚ペアであることは確定
            if (cardsOnTable.length === 0) {
                return true;
            }
            if (cardsOnTable.length === 2) {
                //テーブル上のカードが2枚なら2枚ペア確定
                const tableSorted = [...cardsOnTable].sort((a, b) => a - b);
                return getStrength(sortedSelected[0], isKakumei) > getStrength(tableSorted[0], isKakumei);
            }
            break;
        case 3:
            // selectedCardsをid順にソート
            const sortedSelected3 = [...selectedCards].sort((a, b) => a - b);
            //階段または3枚セットの判定
            const numbers = sortedSelected3.map((id) => cards[id].number);
            const isSet = numbers.every((num) => num === numbers[0] || num === 0);
            const isRun = isValidRun(sortedSelected3, isKakumei);

            if (!isSet && !isRun) {
                return false;
            }
            //選んだカードが3枚セットまたは階段であることは確定
            if (cardsOnTable.length === 0) {
                return true;
            }
            if (cardsOnTable.length === 3) {
                const tableNumbers = cardsOnTable.map((id) => cards[id].number);
                const isTableSet = tableNumbers.every((num) => num === tableNumbers[0] || num === 0);
                const isTableRun = isValidRun(cardsOnTable, isKakumei);
                console.log(isTableRun, isTableSet, tableNumbers);
                const tableSorted3 = [...cardsOnTable].sort((a, b) => a - b);
                if (isSet && isTableSet) {
                    //両方セットの場合
                    return getStrength(sortedSelected3[0], isKakumei) > getStrength(tableSorted3[0], isKakumei);
                } else if (isRun && isTableRun) {
                    const selectedMinStrength = Math.min(...sortedSelected3.map((id) => getStrength(id, isKakumei)));
                    const tableMinStrength = Math.min(...cardsOnTable.map((id) => getStrength(id, isKakumei)));
                    return selectedMinStrength > tableMinStrength;
                }
            }
            break;
        case 4:
            // selectedCardsをid順にソート
            const sortedSelected4 = [...selectedCards].sort((a, b) => a - b);
            const selectedNumbers4 = sortedSelected4.map((id) => cards[id].number);
            const isSet4 = selectedNumbers4.every((num) => num === selectedNumbers4[0] || num === 0);
            if (!isSet4) {
                return false;
            }
            //選んだカードが4枚セットであることは確定
            if (cardsOnTable.length === 0) {
                return true;
            }
            if (cardsOnTable.length === 4) {
                const tableNumbers4 = cardsOnTable.map((id) => cards[id].number);
                const isTableSet4 = tableNumbers4.every((num) => num === tableNumbers4[0] || num === 0);
                const tableSorted4 = [...cardsOnTable].sort((a, b) => a - b);
                if (isSet4 && isTableSet4) {
                    //両方セットの場合
                    return getStrength(sortedSelected4[0], isKakumei) > getStrength(tableSorted4[0], isKakumei);
                }
            }
            break;
        default:
            break;
    }
    return false;
}