import bcrypt from 'bcrypt';
import { alterDetails, getDetails, getUserDetails, loginUser, logoutFromAllDevices, logoutUser, registerUser } from './user.repository.js';
import {customErrorHandler} from '../../middlewares/errorHandler.js';


export const userRegistration = async(req, res, next)=>{
    let { password } = req.body;
    password = await bcrypt.hash(password, 12);
    const resp = await registerUser({...req.body, password})
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "user registeration successful",
          res: resp.res,
        });
      }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
}

export const userLogin = async(req, res, next)=>{
  const resp = await loginUser(req.body);
  if (resp.success) {
    res.cookie('userId', resp.res._id, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .cookie("jwtToken", resp.tokens.token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .json({ success: true, msg: "user login successful", tokens: resp.tokens.token });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
}

export const allUsersDetails = async(req, res, next)=>{
  const resp = await getDetails();
  if (resp.success) {
    res.json({ success: true, user: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
}

export const userDetails = async(req, res, next)=>{
  let {userId} = req.params
  const resp = await getUserDetails(userId);
  if (resp.success) {
    res.json({ success: true, msg: "user found successfully", user: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
}

export const updateDetails = async(req, res, next)=>{
  let {userId} = req.params;
  let userData = req.body;
  const resp = await alterDetails(userData, userId);
  if (resp.success) {
    res.json({ success: true, msg: "user details updated", user: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
}

export const userLogout = async(req, res, next)=>{
  let {jwtToken, userId} = req.cookies
  const resp = await logoutUser(jwtToken, userId);
  if(resp.success){
    res.clearCookie('jwtToken');
    res.json({ success: true, msg: "user logout successful"})
  }
  else next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
}

export const userLogoutAllDevices = async(req, res, next)=>{
  let {userId} = req.cookies;
  const resp = await logoutFromAllDevices(userId);
  if(resp.success){
    res.clearCookie('jwtToken');
    res.json({ success: true, msg: "user logged out from all devices successful"})
  }
  else next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
}
