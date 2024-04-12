import { UserManagement } from "@/domains/user-management/components/UserManagement";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <UserManagement />
    </main>
  );
}
