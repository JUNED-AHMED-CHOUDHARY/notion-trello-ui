import { authOptions } from "@/providers/auth_options";
import SocketProvider from "@/providers/SocketProvider";
import { getServerSession } from "next-auth";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session : any = await getServerSession(authOptions);
  return (
    <SocketProvider token={session?.user?.token}>
      {children}
    </SocketProvider>
  );
}