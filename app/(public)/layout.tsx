import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNavbar />

      <main className="flex-1">
        {children}
      </main>

      <HomeFooter />
    </div>
  );
}