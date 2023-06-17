import Home from "@/components/Home";
import {redirect} from "next/navigation";
import {validCookie} from "@/utils/validCookie";
import {Header} from "@/components/Header";
import {Cookie} from "@/types/cookieType";

export default async function App() {

  const {cookie } : Cookie = await validCookie()

  if (!cookie) {
    redirect('/signIn')
  }

  return (
      <>
        <Header cookie={cookie}/>
        <Home/>
      </>
  )
}
