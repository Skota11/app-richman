"use client";
import { useEffect, useState } from "react";
import { roomsState } from "@/types/gameState";
import { Button, Card, CardBody, CardHeader, Divider, Skeleton } from "@heroui/react";
import { nanoid } from "nanoid";
import { IoMdRefresh } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const STATE_MAP: { [key: string]: string } = {
    waiting: "待機中",
    playing: "プレイ中",
}

export default function EnterRoom({ setRoomId }: { setRoomId: (roomId: string) => void }) {
    const [rooms, setRooms] = useState<Array<roomsState>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const getRooms = async () => {
        setLoading(true);
        setRooms([]);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/rooms`);
        const data = await res.json();
        setRooms(data);
        setLoading(false);
    }
    const NewRoom = async () => {
        const newRoomId = nanoid(6);
        setRoomId(newRoomId);
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void getRooms();
    }, []);
    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">ゲームに参加</h1>
            <div className="flex gap-x-4 mb-4">
                <Button startContent={<IoMdRefresh />} color="primary" variant="ghost" onClick={getRooms}>再読み込み</Button>
                <Button startContent={<FaPlus />} color="primary" variant="ghost" onClick={NewRoom}>新しいゲームを作成</Button>
            </div>
            <Divider />
            <p className="text-xl font-bold my-4">ゲーム一覧</p>
            <div className="grid grid-cols-1 gap-4 max-w-2xl">
                {rooms.map((room) => (
                    <Card key={room.roomId}>
                        <CardHeader className="justify-between">
                            <h2 className="text-xl font-bold">{room.roomId}</h2>
                            <Button size="sm" color="primary" variant="solid" onClick={() => setRoomId(room.roomId)}>参加する</Button>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600 text-sm">プレイ人数 {room.players}人・{STATE_MAP[room.state]}</p>
                        </CardBody>
                    </Card>
                ))}
                {loading && (
                    //ゴーストで読み込みを表示
                    <>
                        {[...Array(3)].map((_, index) => (
                            <Card key={index}>
                                <CardHeader className="justify-between">
                                    <Skeleton className="w-24 h-6" />
                                    <Skeleton className="w-16 h-8" />
                                </CardHeader>
                                <CardBody>
                                    <Skeleton className="w-32 h-4" />
                                </CardBody>
                            </Card>
                        ))}
                    </>
                )}
                {!loading && rooms.length === 0 && (
                    <p>現在参加可能なゲームはありません。新しいゲームを作成してください。</p>
                )}
            </div>
        </div>
    )
}