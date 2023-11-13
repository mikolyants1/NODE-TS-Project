import { ContactBlock, ContactLogo, ContactName,
ContactText,ContactTime,SetBlock, SetLogo, SetText,
 ThemeLogo, styleObj,avatar } from "../style/style.js"
import { useContext, useState,Dispatch,SetStateAction } from "react"
import { Link} from "react-router-dom"
import { Context, Theme } from "./Page.js"
import { useGetUserQuery } from "../store/Api.js"
import { action } from "./NavBlock.js"
import { Null } from "./Main.js"
import { query } from "./Setting.js"
import { Loader, Error } from "./Loader.js"

interface props{
  set:Dispatch<action>,
  call:Dispatch<SetStateAction<Null<number>>>
}

export function NavSett({set,call}:props):JSX.Element{
  const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)]
  const {user,val,hide} = useContext<Context>(Theme)
  const [idx,setIdx] = useState<number>(-1)
  const {data,isError,isLoading} = useGetUserQuery<query>(user)
    const toggle=():void=>{
      call(-1)
      set({type:1})
    }
    if (isLoading) return <Loader back={val} />
    if (isError) return <Error back={val} />
    return (
         <>
          <Link to={`/page/set/Profile`} onClick={hide}>
            <ContactBlock fill={`${idx==0}`}
             back={val} onClick={()=>setIdx(0)}>
              <ContactLogo left={one} right={two}>
                {data?.name.slice(0,1).toUpperCase()}
              </ContactLogo>
              <ContactText>
                <ContactName>
                    {data?.name}
                </ContactName>
                <ContactTime>
                   update
                </ContactTime>
              </ContactText>
            </ContactBlock>
          </Link>
          <Link to={`/page/main/${user}`} onClick={hide}>
            <SetBlock back={val} 
             onClick={toggle}>
              <SetLogo>
                &#9733;
              </SetLogo>
              <SetText>
                Main   
              </SetText>
            </SetBlock>
          </Link>
          <Link to={`/page/set/Theme`} onClick={hide}>
            <SetBlock fill={`${idx==1}`}
             back={val} onClick={()=>setIdx(1)}>
              <ThemeLogo>
                &diams;
              </ThemeLogo>
              <SetText>
                Theme 
              </SetText>
            </SetBlock>
          </Link>
        </>
    )
}
