import {FC, memo} from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { EntryInput, EntrySub, InputBlock } from '../../../style/style';
import { Control, InputProps, IStateUser } from '../../../types/type';


const LoginInput:FC<InputProps> = ({title,Name}):JSX.Element => {
  const {control} = useFormContext<IStateUser>();
  
  return (
    <>
      <EntrySub>
        Enter your {title}
      </EntrySub>
      <InputBlock>
        <Controller
          name={Name}
          control={control}
          render={({field}):JSX.Element=>{
          const {onChange,value,name
          }:Control<`${typeof Name}`> = field;
          return (
           <EntryInput
            onChange={onChange}
            name={name}
            value={value}
           />
          )}}
         />
      </InputBlock>
    </>
  )
};
export default memo(LoginInput);