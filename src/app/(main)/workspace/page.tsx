"use client";
import useSocket from "@/hooks/useSocket";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession() as any;
  const {isConnected, emit} = useSocket();
  console.log(isConnected, 'issiaugsfgioted')

  useEffect(() => {
    emit('join_room', "Hello babua");
  }, [emit]);

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
        <p>Socket : {isConnected ? 'true' : 'false'} </p>
      </div>
    );
  }

  return <button onClick={() => signIn("github")}>Sign In with GitHub</button>;
}
