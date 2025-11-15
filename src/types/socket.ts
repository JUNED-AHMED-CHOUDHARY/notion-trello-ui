// /types/socket.ts
export type ClientToServerEvents = {
  join_room: (roomId: string) => void;
  leave_room: (roomId: string) => void;
  send_message: (payload: { roomId: string; text: string }, cb?: (ack: { ok: boolean; id?: string }) => void) => void;
  // add other client->server events here
};

export type ServerToClientEvents = {
  new_message: (msg: { id: string; text: string; userId?: string; createdAt?: string }) => void;
  server_error: (err: string) => void;
  joined: (roomId: string, meta?: any) => void;
  // add other server->client events here
};
