import { Request, Response } from "express";
import bc from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Type, IData, IHas } from "../../../types.js";
import { User } from "../../../mongo.js";
import emitPass from "../emit.js";


export async function getPass({body}: Request, res: Response): Promise<void> {
   const users: IData[] = await User.find();
   if (!body) {
    emitPass.test("getPass");
     res.status(400).json({
       message:"bad request"
     })
     return;
   };
   const user: Type<IData> = users.find((i: IData) => (
    i.name == body.name && bc.compare(body.pass,i.pass)
   ));
   let token:string = "";
   if (user&&!body.regist){
    token = jwt.sign({id:user.id},"secret_key_1",{expiresIn:"3d"});
   }; 
   const has: IHas = {
     id: user ? user.id : -1,
     has: Boolean(user),
     auth: token
   };
   res.status(200).json(has);
 }