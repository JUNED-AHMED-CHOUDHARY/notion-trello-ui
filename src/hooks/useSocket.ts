"use client";

import { useSocketContext } from "@/providers/SocketProvider";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket";
import { useCallback, useEffect, useRef } from "react";

function useSocket() {
  const { socket } = useSocketContext();
  const listenersRef = useRef(new Map<string, Set<(...args: any[]) => void>>());

  useEffect(() => {
    return () => {
      if (!socket) return;

      for (const [event, handlers] of listenersRef.current.entries()) {
        for (const handler of handlers) {
          try {
            socket.off(event as any, handler);
          } catch (error) {
            console.log("error while listenerref cleaning", error);
          }
        }
      }

      listenersRef.current.clear();
    };
  }, [socket]);

  const on = useCallback(
    <E extends keyof ServerToClientEvents>(event: E, handler: ServerToClientEvents[E]) => {
      if (!socket) return () => {};
      let handlers = listenersRef.current.get(event);

      if (!handlers) {
        handlers = new Set();
        listenersRef.current.set(event, handlers);
      }

      if (!handlers.has(handler)) {
        handlers.add(handler);
        socket.on(event as any, handler);
      }

      return () => {
        const set = listenersRef.current.get(event);
        if (!set) return;
        if (set.has(handler)) {
          try {
            socket.off(event as any, handler);
          } catch (error) {
            console.log("error while offing the handler", error);
          }

          set.delete(handler);
        }

        if (set.size === 0) listenersRef.current.delete(event);
      };
    },
    [socket]
  );

  const once = useCallback(
    <E extends keyof ServerToClientEvents>(event: E, handler: ServerToClientEvents[E]) => {
      if (!socket) return;
      socket.once(event as any, handler);
    },
    [socket]
  );

  const emit = useCallback(
    <E extends keyof ClientToServerEvents>(event: E, ...args: Parameters<ClientToServerEvents[E]>) => {
      if (!socket) return;
      (socket as any).emit(event as string, ...args);
    },
    [socket]
  );

  return {on, once, emit, isConnected: !!socket?.connected};
};

export default useSocket;