import express from "express";
import sendRouter from "./module/sendRouter.js";


const apiRouter = express.Router();

apiRouter.use("/send", sendRouter)

export default apiRouter;

