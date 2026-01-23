'use client';
import { useState, useEffect } from 'react'
import { useSocketContext } from '@/context/SocketProvider'
import EnterRoom from './EnterRoom';
import { gameState, playerData } from '@/types/gameState';
import WaitingRoom from "./WaitingRoom";
import Game from "./Game";

export default function PlayClient({ username }: { username: string }) {
    const { socket, connected } = useSocketContext()
    const [roomId, setRoomId] = useState<string | null>(null);
    const [gameState, setGameState] = useState<gameState | null>(null);
    const [playerData, setPlayerData] = useState<playerData | null>(null);
    const [playMessage, setPlayMessage] = useState<string | null>(null);
    useEffect(() => {
        if (!socket || !connected || !roomId) return
        // ルームに参加
        socket.emit('join-room', { username, roomId })
        // イベントリスナーの設定
        const handleRoomJoined = (data: Record<string, unknown>) => {
            console.log('Room joined:', data)
        }
        const handlePlayerJoined = (data: Record<string, unknown>) => {
            console.log('Player joined:', data)
        }
        const handleGameState = (data: gameState) => {
            console.log('Game state updated:', data)
            setGameState(data);
        }
        const handleMyPlayerData = (data: playerData) => {
            console.log('My player data:', data)
            setPlayerData(data);
        }
        const handlePlayMessage = (data: { message: string }) => {
            console.log('Play message:', data.message)
            setPlayMessage(data.message);
            setTimeout(() => setPlayMessage(null), 800);
        }

        socket.on('room-joined', handleRoomJoined)
        socket.on('player-joined', handlePlayerJoined)
        socket.on('game-state', handleGameState)
        socket.on('your-player-data', handleMyPlayerData)
        socket.on('play-message', handlePlayMessage)

        return () => {
            socket.off('room-joined', handleRoomJoined)
            socket.off('player-joined', handlePlayerJoined)
            socket.off('game-state', handleGameState)
            socket.off('your-player-data', handleMyPlayerData)
            socket.off('play-message', handlePlayMessage)
        }
    }, [socket, connected, roomId, username])

    if (!roomId) {
        return (<EnterRoom setRoomId={setRoomId} />)
    }
    if (!gameState) {
        return (<div>ゲームデータを読み込み中...</div>)
    }
    if (gameState.currentState === "playing" && !playerData) {
        return (<div>試合終了を待っています...</div>)
    }
    return (
        <div>
            {gameState.currentState === "waiting" && (
                <WaitingRoom gameState={gameState} roomId={roomId} />
            )}
            {gameState.currentState === "playing" && (
                <Game playerData={playerData!} gameState={gameState} roomId={roomId} playMessage={playMessage} />
            )}
        </div>
    )
}