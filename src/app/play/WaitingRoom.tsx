import { gameState } from "@/types/gameState";
import { CircularProgress, User , Button, Card, CardHeader, CardBody } from "@heroui/react";
import { useSocketContext } from "@/context/SocketProvider.tsx";

export default function WaitingRoom({gameState , roomId} : {gameState : gameState, roomId: string}) {
    const { socket } = useSocketContext()
    const isStartDisabled = gameState.players.length <= 2;
    const handleStart = () => {
        if(!socket) return;
        socket.emit('start-game', { roomId });
    }
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold">{roomId}</h1>
                <div className="flex gap-x-2 items-center my-2">
                    <CircularProgress size="sm"/>
                    <p>ゲーム開始を待っています...</p>
                </div>
                <div className="my-4">
                    <Button color="primary" isDisabled={isStartDisabled} onClick={handleStart}>ゲームを開始する</Button>
                </div>
                <Card className="max-w-xl">
                    <CardHeader>
                        <h1>参加者一覧</h1>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-y-2">
                        {gameState.players.map((player) => (
                            <div key={player.id}>
                                <User name={player.data.username} description={`${player.data.points} 点`} />
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}