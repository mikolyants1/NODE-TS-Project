import { useOutletContext } from "react-router-dom";
import { MessBlock, MessContent, MessSpan,
 MessText, MessTime } from "../../../style/style";
import { newMess, outlet } from "../../../types/type";

interface props {
    key:string,
    col:string,
    data:newMess,
    update:(i:number,up:string)=>void,
}

export default function Messages(props:props):JSX.Element {
  const {val} = useOutletContext<outlet>();
  const {update,data,col}:props = props;
    return (
        <MessBlock col={`${col}`}>
          <MessContent back={val} col={`${col}`}
           onClick={()=>update(data.now,col)}>
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
