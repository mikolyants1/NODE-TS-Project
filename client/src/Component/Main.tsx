import { useRef,useReducer, useCallback } from 'react'
import { Container, FootBlock, HeaderBlock, Logo, MainBlock,
 MainInput,MessDate,Message,Name,Span,avatar, styleObj} from '../style/style.js'
import { Params, useOutletContext, useParams } from 'react-router-dom'
import { useChanMessMutation, useGetUserQuery, useSetMessMutation } from '../store/Api.js'
import { Loader, Error } from './Loader.js'
import { EvtC, EvtK, Null, Type, data, mess, message,
 newMess, outlet, query } from '../types/type.js'
import Messages from './Message.js'

interface props{
  children:JSX.Element
}
interface state{
  now:number,
  text:string,
  status:boolean
}
type action = Record<string,string|boolean|number>

export default function Main({children}:props):JSX.Element {
 const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)];
 const {id}:Readonly<Params<string>> = useParams();
 const [addMess] = useSetMessMutation();
 const [chanMess] = useChanMessMutation();
 const ref = useRef<HTMLInputElement>(null!);
 const {val,user} = useOutletContext<outlet>();
 const [state,dispatch] = useReducer(
  (prv:state,nxt:action)=>({...prv,...nxt}),
  {now:0,text:"",status:false}
 )

 const result:query<data>[] = [
  useGetUserQuery<query<data>>(id),
  useGetUserQuery<query<data>>(user),
  ];
 const getMessage=(d1:data,d2:data):newMess[]=>{
  const user1:Type<message> = d1.message.find((i:message)=>i.id==d2.id);
  const user2:Type<message> = d2.message.find((i:message)=>i.id==d1.id);
  const newUser1:Type<newMess[]> = user1?.mess.map((i:mess)=>({id:d2.id,...i}));
  const newUser2:Type<newMess[]> = user2?.mess.map((i:mess)=>({id:d2.id,...i}));
  const item1:newMess[] = typeof newUser1!=='undefined' ? newUser1 : [];
  const item2:newMess[] = typeof newUser2!=='undefined' ? newUser2 : [];
  const arr:newMess[] = d2.id==d1.id ? [...item1] : [...item1,...item2];
  return arr.sort((x:newMess,y:newMess)=>x.now-y.now);
  }
 const showTime=(arg:mess[],i:number):boolean=>{
  return arg[i].day!==arg[i-1].day;
 };
 const change=(e:EvtC):void=>{
   dispatch({text:e.target.value});
 };
 const press=(e:EvtK):void=>{
   if (e.key==='Enter'&&typeof id!=='undefined'){
    if (!state.status){
     const date:Date = new Date();
     const our:number = date.getHours();
     const min:number = date.getMinutes();
     const Our:string = our<10 ? `0${our}` : `${our}`;
     const Min:string = min<10 ? `0${min}` : `${min}`;
     addMess({
      id1:id,
      id2:user,
      text:state.text,
      date:`${Our}:${Min}`,
      now:Date.now(),
      day:date.getDate(),
      month:date.toLocaleString('default',{month:'long'})
     });
    } else {
      chanMess({
        id1:id,
        id2:user,
        text:state.text,
        now:state.now,
       });
       dispatch({status:false});
    };
     ref.current.value='';
   };
 };
 const updateDioalog=useCallback((time:number):void=>{
   dispatch({status:true,now:time});
 },[]);

 if (result.some(({isLoading})=>isLoading)) return <Loader back={val} />
 if (result.some(({isError})=>isError)) return <Error back={val} />
 const [{data:d1},{data:d2}]:query<data>[] = result;
 if (!d1||!d2) return <Error back={val} />
 const mess:newMess[] = getMessage(d1,d2);
 const isMine:boolean = d1.id == d2.id;
 const color1:string = isMine ? 'rgb(56, 231, 120)' : one;
 const color2:string = isMine ? 'rgb(177, 248, 177)' : two;
   return (
        <Container back={val}>
          <HeaderBlock back={val}>
            <Logo start={color1} two={color2}>
              {!isMine&&<>{d1.name.slice(0,1).toUpperCase()}</>} 	
              {isMine&&<Span>&#9733;</Span>}
            </Logo>
            <Name>
             {isMine ? 'Main' : d1.name}
            </Name>
            {children}
          </HeaderBlock>
          <MainBlock>
            <Message>
            {mess.map((item:newMess,i:number):JSX.Element=>{
             const {id,day,month}:newMess = item
             const right:Null<boolean> = i==0 ? null : showTime(mess,i)
             return (
                <>
                  {right||i==0&&(
                   <MessDate>
                     {day} {month}
                   </MessDate>
                  )}
                  <Messages
                   key={`${i}`}
                   data={item}
                   col={`${id!==d2.id}`}
                   update={updateDioalog}
                   />
                </>
                 )})}
            </Message>
          </MainBlock>
          <FootBlock>
            <MainInput 
             back={val}
             placeholder='your message'
             onChange={change}
             onKeyUp={press}
             ref={ref}
             />
          </FootBlock>
        </Container>
  );
};
