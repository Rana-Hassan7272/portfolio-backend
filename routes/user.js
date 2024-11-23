import express from 'express'
import { addProjects, addTimeline, contact, deleteProjects, deleteTimeline, getProfile, getUser, login, logout, updateUser } from '../controller/user.js'
import { isAuthenticated } from '../middlewares/isAuth.js'

export const userRouter=express.Router()

userRouter.route("/login").post(login)
userRouter.route("/logout").get(logout)
userRouter.route("/user").get(getUser)
userRouter.route("/me").get(isAuthenticated,getProfile)
userRouter.route("/admin/update").put(isAuthenticated,updateUser)
userRouter.route("/admin/addProjects").post(isAuthenticated,addProjects)
userRouter.route("/admin/addTimeline").post(isAuthenticated,addTimeline)
userRouter.route("/admin/deleteTimeline/:id").delete(isAuthenticated,deleteTimeline)
userRouter.route("/admin/deleteProjects/:id").delete(isAuthenticated,deleteProjects)

userRouter.route("/contact").post(contact)