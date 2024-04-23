import Board from "@/components/Board";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 mx-auto overflow-hidden">
      <Board />
    </main>
  );
}
