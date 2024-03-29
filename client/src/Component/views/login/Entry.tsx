import { EntryBlock, EntryBut,EntryTitle, LoginError, RegistLink } from "../../../style/style.js";
import { useState } from "react";
import { useNavigate,NavigateFunction } from "react-router-dom";
import { bind, getCurrent, useAction, useAppSelector } from "../../../store/store/store.js";
import { Sub, ISubProps, IHas, IStateUser} from "../../../types/type.js";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LoginCard from "../../ui/cards/logincards/LoginCard.js";
import GetSuccess from "../../helpers/functions/login/GetSuccess.js";

export default function Entry():JSX.Element{
  const current:number = useAppSelector(getCurrent);
  const navigate:NavigateFunction = useNavigate();
  const methods = useForm<IStateUser>({
    defaultValues:{name:"",pass:""}
  });
  const [error,setError] = useState<boolean>(false);
  const { setId,setPass,setAuthToken }:bind = useAction();
  const {handleSubmit,reset} = methods;
  const check:Sub<IStateUser> = async (date):Promise<void>=>{
    const body:ISubProps = {...date,regist:false};
    const user:IHas = await GetSuccess(body);
    if (user.has){
      setId(user.id);
      setPass(date.pass);
      setAuthToken(user.auth);
      navigate(`/page/main/${current}`);
     }else{
      setError(true);
      reset();
      };
  };
    return (
      <FormProvider {...methods}>
        <EntryBlock>
         <>
          <EntryTitle>
             Entrance
          </EntryTitle>
          <LoginCard />
          {error&&
          <LoginError>
            user not found
          </LoginError>}
          <EntryBut
           onClick={handleSubmit(check)}>
            login
          </EntryBut>
          <RegistLink>
            <Link to="/reg">
              registration
            </Link>
          </RegistLink>
        </>
      </EntryBlock>
    </FormProvider>
       );
};
