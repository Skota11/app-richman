"use client"

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { createSocket, getSocket } from '../lib/socket'
import type { Socket } from 'socket.io-client'

type SocketContextValue = {
  socket: Socket | null
  connected: boolean
}

const SocketContext = createContext<SocketContextValue>({ socket: null, connected: false })

export const useSocketContext = () => useContext(SocketContext)

export const SocketProvider = ({ children, token }: { children: ReactNode; token?: string }) => {
  const [connected, setConnected] = useState(false)

  const socket = useMemo(() => createSocket(token), [token])

  useEffect(() => {
    if (!socket) return
    // 接続イベントのハンドリング
    const onConnect = () => setConnected(true)
    const onDisconnect = () => setConnected(false)
    const onConnectError = (err: any) => {
      console.error('socket connect error', err)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onConnectError)
    console.log("socket created:", socket.id)
    // 明示的に接続
    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onConnectError)
      // 切断（ページ遷移などで）
      socket.disconnect()
    }
  }, [socket])

  return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>
}