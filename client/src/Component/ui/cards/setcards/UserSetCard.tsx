import {memo} from 'react'
import UserSetBlock from '../../inputs/User'
import { getPass, useAppSelector } from '../../../../store/store/store'
import { ISets } from '../../../../types/type';
import MakeSets from '../../../helpers/functions/set/MakeSets';

interface props {
  name:string
}

function UserSetCard({name}:props):JSX.Element {
  const pass:string = useAppSelector(getPass);
  const sets:ISets[] = MakeSets(name,pass);
  return (
    <>
      {sets.map(({name,val}:ISets):JSX.Element=>(
        <UserSetBlock
         key={name}
         val={val}
         name={name}
         />
      ))}
    </>
  )
}

export default memo(UserSetCard)