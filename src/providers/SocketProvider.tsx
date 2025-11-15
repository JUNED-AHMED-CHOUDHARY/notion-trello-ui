"use client"

import { closeSocket, reCreateSocket, SocketInstance } from "@/lib/socket"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// import { Socket as IoSocket } from "socket.io-client"

type ContextValue = {socket : SocketInstance};

interface SocketProviderProps {
    token: string | null;
    children: React.ReactNode
}

const SocketContext = createContext<ContextValue>({ socket : null });

export const useSocketContext = () => useContext(SocketContext);


export default function SocketProvider({token, children}: SocketProviderProps) {
    const memoToken = useMemo(() => typeof token === 'string' ? token : undefined, [token]);
    const [socket, setSocket] = useState<SocketInstance>(null);
    useEffect(() => {
        const s = reCreateSocket({ token: memoToken });
        if (!s.connected) s.connect();
        setSocket(s);


        return () => {
            closeSocket();
            setSocket(null);
        }

    }, [memoToken]);

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}