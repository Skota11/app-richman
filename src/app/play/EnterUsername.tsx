"use client"

import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useRef } from "react";

export default function EnterUsername() {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">ユーザー名を入力してください</h1>
            <Input ref={inputRef} placeholder="全ての文字が使用可能です" className="w-full max-w-xs mb-4"/>
            <Button color="primary" variant="ghost" onClick={() => {
                const username = inputRef.current?.value;
                if(!username || username.trim() === ""){
                    alert("ユーザー名を入力してください");
                    return;
                }
                window.location.href = `/play/?username=${username.trim()}`;
            }}>ゲームを開始</Button>
        </div>
    )
}