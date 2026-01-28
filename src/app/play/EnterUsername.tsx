"use client"

import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import {useLocalStorage} from "react-use";

export default function EnterUsername() {
    const [savedName, setSavedName] = useLocalStorage<string>('username' , '');
    const handleEnterUsername = () => {
        const username = savedName;
        if(!username || username.trim() === ""){
            alert("ユーザー名を入力してください");
            return;
        }
        window.location.href = `/play/?username=${username.trim()}`;
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">ユーザー名を入力してください</h1>
            <form onSubmit={e => {e.preventDefault(); handleEnterUsername();}} className="flex flex-col items-center justify-center">
                <Input value={savedName} onChange={e => setSavedName(e.target.value)} placeholder="全ての文字が使用可能です" className="w-sm mb-4 text-center"/>
                <Button color="primary" variant="ghost" onClick={handleEnterUsername}>ゲームを開始</Button>
            </form>
        </div>
    )
}