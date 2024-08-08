import { userModel } from "./user.schema.js";
import {compareHashedPassword, hashPassword} from '../../utils/hashPassword.js'; 
import jwt from 'jsonwebtoken';
import { tokenModel } from "./user.tokens.schema.js";

export const registerUser = async(userData)=>{
    try{
        const newUser = new userModel(userData);
        await newUser.save();
        return {success:true, res:newUser};
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err } };
    }
}

export const loginUser = async(userData)=>{
    try {
        const { email, password } = userData;
        const user = await userModel.findOne({email});
        if (!user) {
          return {
            success: false,
            error: { statusCode: 404, msg: "user not found" },
          };
        } else {
          let passwordValidation = await compareHashedPassword(
            password,
            user.password
          );
          if (passwordValidation) {
            const token = new tokenModel({token: jwt.sign({ _id: user._id }, 'UserAuthentication'), timestamp: new Date(), user: user._id});
            token.save()
            user.tokens.push(token);
            await user.save();
            return { success: true, res: user, tokens: token};
          } else {
            return {
              success: false,
              error: { statusCode: 400, msg: "invalid credentials" },
            };
          }
        }
      } catch (error) {
        return {
          success: false,
          error: { statusCode: 400, msg: error },
        };
      }    
}

export const logoutUser = async(token, userId)=>{
  try{
    let userToken = await tokenModel.findOneAndDelete({token});
    await userModel.findByIdAndUpdate(userId, {$pull: {tokens: userToken._id}});
    return {success: true};
  }
  catch(err){
    return {
      success: false,
      error: { statusCode: 400, msg: err },
    }
  }
}

export const logoutFromAllDevices = async(userId)=>{
  try{
    await tokenModel.deleteMany({user: userId})
    let user = await userModel.findById(userId);
    user.tokens = [];
    user.save()
    return {success: true};
  }
  catch(err){
    return {
      success: false,
      error: { statusCode: 400, msg: err },
    }
  }
}

export const getUserDetails = async(userId) =>{
  try{
    const user = await userModel.findById(userId);
    if(user) return { success: true, res: user};
    else return { success: false, error: { statusCode: 404, msg: "user not found" }};
  }
  catch(err){
    return { success: false, error: { statusCode: 400, msg: err }};
  }
}

export const getDetails = async()=>{
  try{
    const users = await userModel.find();
    if(users) return { success: true, res: users};
    else return { success: false, error: { statusCode: 404, msg: "user not found" }};
  }
  catch(err){
    return { success: false, error: { statusCode: 400, msg: err }};
  }

}

export const alterDetails = async(userData, userId)=>{
  try{
    let updateUser = await userModel.findByIdAndUpdate(userId, userData, {new:true})
    if(updateUser){
      return { success: true, res: updateUser};
    }
    else return { success: false, error: { statusCode: 404, msg: "user not found" }};
  }
  catch(err){
    return { success: false, error: { statusCode: 400, msg: err }};
  }

}