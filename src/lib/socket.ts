"use client"

import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket";
import { io, Socket } from "socket.io-client"


export type SocketInstance = Socket<ClientToServerEvents, ServerToClientEvents> | null;


let socketInstance : SocketInstance = null;

const namespaceSockets = new Map<string, SocketInstance>();
export let currentToken: string | undefined;


export function createOrGetSocket(opts: { token?: string; path?: string; url?: string }) {
    const { token, path = "/socket.io", url = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin : "" } = opts;

    if (!socketInstance) {
        socketInstance = io(url, {
            path,
            transports: ['websocket', 'polling'],
            autoConnect: true,
            auth: {token},
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 10000,
        });
    }
    currentToken = token;

    socketInstance.on("connect", () => {
        console.debug("socket connected", socketInstance?.id);
    })

    socketInstance.on("disconnect", (reason) => {
        console.debug("socket disconnected", reason);
    })

    socketInstance.on("connect_error", (error) => {
        console.log("socket connect error", error);
    });

    return socketInstance;
}


export function closeSocket() {
    if (!socketInstance) return;
    try {
         socketInstance.removeAllListeners();
         socketInstance.disconnect();
    } finally {
        socketInstance = null;
        currentToken = undefined;
    }
}


export function reCreateSocket(options: {token?: string; path?: string; url?: string}) {
    closeSocket();
    return createOrGetSocket(options);
}