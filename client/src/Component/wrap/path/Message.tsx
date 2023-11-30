import { useOutletContext } from "react-router-dom";
import { ChanButton, DelButton, MessAction, MessBlock, MessContent,
 MessSpan,MessText, MessTime } from "../../../style/style";
import { newMess, outlet } from "../../../types/type";
import {memo, useState} from 'react';

interface props {
    key:string,
    col:string,
    data:newMess,
    update:(i:number)=>void,
    del:(now:number)=>void
}

function Messages(props:props):JSX.Element {
  const {val,translate} = useOutletContext<outlet>();
  const {update,del,data,col}:props = props;
  const [show,setShow] = useState<boolean>(false);
  console.log(3)
  const showUpdate=()=>{
    setShow((prev:boolean)=>!prev);
  };
  const remove=()=>{
    del(data.now);
    setShow(false);
  };
    return (
        <MessBlock col={col}>
          <>
          {show&&col=="false"&&
          <MessAction back={val}>
            <ChanButton onClick={()=>update(data.now)}>
               {translate("change")}
            </ChanButton>
            <DelButton onClick={remove}>
               {translate("delete")}
            </DelButton>
          </MessAction>}
          </>
          <MessContent back={val} col={col}
           onClick={showUpdate}>
            <MessText>
              <MessSpan>
                {data.text}
              </MessSpan>
            </MessText>
            <MessTime>
              {data.date}
            </MessTime>
          </MessContent>
        </MessBlock>
    )
}

export default memo(Messages)