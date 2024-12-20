import LoginSection from "@/Components/HomePage/LoginSection";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const userSession = await getServerSession();

  if(userSession?.user) {
    return redirect('/dashboard')
  }

  return (
    <LoginSection/>
  );
}
