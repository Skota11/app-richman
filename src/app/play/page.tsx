import EnterUsername from "./EnterUsername";
import PlayClient from "./PlayClient";
import {SocketProvider} from "@/context/SocketProvider";

export default async function RoomPage({
    searchParams
} : {
    searchParams: Promise<{[key: string]: string | string[] | undefined}>
}) {
    const username = (await searchParams).username;
    if(username === undefined || username === "") {
        return <EnterUsername />
    }
    return (
        <div>
            <SocketProvider>
            <PlayClient username={username as string || "名無しさん"} />
            </SocketProvider>
        </div>
    )
}