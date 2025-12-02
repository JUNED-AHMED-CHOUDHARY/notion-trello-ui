"use client"

import { closeSocket, createOrGetSocket, SocketInstance } from "@/lib/socket"
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
        if (!memoToken) return;
        
        // Use createOrGetSocket instead of reCreateSocket to avoid destroying existing connections
        const s = createOrGetSocket({ token: memoToken });
        if (!s.connected) s.connect();
        setSocket(s);

        // Handle page visibility changes to maintain connection
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // Page became visible, ensure socket is connected
                if (s && !s.connected) {
                    console.log('Page visible, reconnecting socket...');
                    s.connect();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        localStorage.setItem("access_token", memoToken);
        // Don't close socket on unmount - let it persist for tab switching
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // Only set socket to null, don't close the actual connection
            setSocket(null);
            if (localStorage.getItem("access_token")) localStorage.removeItem("access_token");
        }

    }, [memoToken]);
    
    // Close socket only when component is completely destroyed (e.g., logout)
    useEffect(() => {
        return () => {
            // This will only run when the component is completely unmounted
            if (!memoToken) {
                closeSocket();
            }
        };
    }, [memoToken]);

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}