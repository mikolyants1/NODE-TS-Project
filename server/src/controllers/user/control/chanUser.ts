import { Request, Response } from "express";
import bc from 'bcrypt'
import { Null,IData } from "../../../types.js";
import { User } from "../../../mongo.js";
import emitUser from "../emit.js";

export async function chanUser(req:Request,res:Response):Promise<void>{
    if (!req.body){
      emitUser.test("chanUser");
      res.status(400).json({
       message:"bad request"
      });
     return;
    };
    const id:number = Number(req.params.id);
    const user:Null<IData> = await User.findOne({id:id});
    const name:string = req.body.name;
    const pass:string = req.body.pass;
    const salt:string = await bc.genSalt(10);
    const crypt:string = await bc.hash(pass,salt);
   if (!user){
      emitUser.test("chanUser");
       res.status(400).json({
         message:"user not found"
       });
     return;
    };
   await User.findOneAndUpdate({id:id},
   {name:name,pass:crypt},{new:true});
    user.name = name;
    user.pass = crypt;
    res.status(200).json(user);
    };