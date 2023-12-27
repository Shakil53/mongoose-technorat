/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// const express = require('express')
import express, { Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorhandler from './app/middlewares/globalErrorhandler';

import router from './app/routes';
import cookieParser from 'cookie-parser';


const app: Application = express();

// parser
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use(cookieParser());


// application route
app.use('/api/v1/', router);


const test = async(req: Request, res: Response) => {
  const a = 20;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorhandler);

//not Found
// app.use(notFound)

export default app;
// C:\Project\mongoose-technorat/.env
