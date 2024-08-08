import express from "express";
import { allUsersDetails, updateDetails, userDetails, userLogin, userLogout, userLogoutAllDevices, userRegistration } from "./user.controller.js";
import { auth } from "../../middlewares/jwt.js";

const router = express.Router();

router.route('/signup').post(userRegistration);
router.route('/signin').post(userLogin);
router.route('/logout').get(userLogout);
router.route('/logout-all-devices').get(userLogoutAllDevices);

router.route('/get-details/:userId').get(userDetails);
router.route('/get-all-details').get(allUsersDetails);
router.route('/update-details/:userId').put(updateDetails);


export default router;
