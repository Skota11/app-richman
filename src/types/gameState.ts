export interface gameState {
    players: [{ id: string; data: { username: string; points: number; rank?: number } }];
    playingPlayers: [{ id: string; data: { count: number, position: number, order?: number } }];
    currentState: "waiting" | "playing" | "exchange";
    currentTurnPosition: number;
    cardsOnTable: Array<number>;
    rules: {
        spade3: boolean;
        eightCut: boolean;
        downfall: boolean;
    }
    tableState: {
        kakumei: boolean;
    }
}

export interface roomsState {
    roomId: string;
    players: number;
    state: string;
}

export interface playerData {
    hand: Array<number>;
    position: number;
    rank?: number;
}