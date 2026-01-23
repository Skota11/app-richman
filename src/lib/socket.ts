// lib/socket.ts
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function createSocket(token?: string) {
  if (typeof window === 'undefined') return null // SSR guard
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
      autoConnect: false, // 明示的に connect する
      transports: ['websocket'],
      auth: token ? { token } : undefined,
      reconnectionAttempts: 5,
    })
  }
  return socket
}

export function getSocket() {
  return socket
}