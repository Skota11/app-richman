import { gameState } from "@/types/gameState";
import { CircularProgress, User, Button, Card, CardHeader, CardBody, Switch } from "@heroui/react";
import { useSocketContext } from "@/context/SocketProvider";

export default function WaitingRoom({ gameState, roomId }: { gameState: gameState, roomId: string }) {
    const { socket } = useSocketContext()
    const isStartDisabled = gameState.players.length <= 2;
    const handleStart = () => {
        if (!socket) return;
        socket.emit('start-game', { roomId });
    }
    console.log(gameState);
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold">{roomId}</h1>
                <div className="flex gap-x-2 items-center my-2">
                    <CircularProgress size="sm" />
                    <p>ゲーム開始を待っています...</p>
                </div>
                <div className="my-4">
                    <Button color="primary" isDisabled={isStartDisabled} onClick={handleStart}>ゲームを開始する</Button>
                </div>
                <div className="flex flex-col gap-y-4">
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
                    <Card className="max-w-xl">
                        <CardHeader>
                            <h1>ローカルルール</h1>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-y-4">
                            <div>
                                <Switch onValueChange={(value) => {
                                    confirm(value ? 'スペード3返しを有効にしますか？' : 'スペード3返しを無効にしますか？') && socket?.emit('update-rule', { roomId, rules: { ...gameState.rules, spade3: value } });
                                }} isSelected={gameState.rules.spade3}>スペード3返し</Switch>
                                <p className="text-sm text-gray-500">単体のジョーカーが場にあるときに、スペードの3を出すことができる。</p>
                            </div>
                            <div>
                                <Switch onValueChange={(value) => {
                                    confirm(value ? '8切りを有効にしますか？' : '8切りを無効にしますか？') && socket?.emit('update-rule', { roomId, rules: { ...gameState.rules, eightCut: value } });
                                }} isSelected={gameState.rules.eightCut}>8切り</Switch>
                                <p className="text-sm text-gray-500">8または8のペア以上を出すと場が流れる。</p>
                            </div>
                            <div>
                                <Switch onValueChange={(value) => {
                                    confirm(value ? '都落ちを有効にしますか？' : '都落ちを無効にしますか？') && socket?.emit('update-rule', { roomId, rules: { ...gameState.rules, downfall: value } });
                                }} isSelected={gameState.rules.downfall}>都落ち</Switch>
                                <p className="text-sm text-gray-500">前回のゲームで大富豪だったプレイヤーが次のゲームでも大富豪になれなかった瞬間に大貧民になる。</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}