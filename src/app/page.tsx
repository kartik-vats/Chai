import Image from "next/image";
import "./globals.css";
export default function Home() {
  return (
    <main >
      <div >
      <h1 className="text-4xl font-bold">Welcome to Chai</h1>
      <p className="mt-4 text-lg">Your AI-powered assistant</p>
      <Image
        src="/chai.png"
        alt="Chai Logo"
        width={150}
        height={150}
        className="mt-8"
      />
      </div>
      
      <button >Want to donate money</button>
    </main>
  );
}
