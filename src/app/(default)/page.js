import Heroform from "@/components/forms/Heroform";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">
            Your one link <br />
            for everything
          </h1>
          <h2 className="text-gray-500 text-xl mt-8">
            Share your links, social profiles, contact info and more on one page
          </h2>
        </div>

        <Heroform user={session?.user}/>
      </section>
    </main>
  );
}
