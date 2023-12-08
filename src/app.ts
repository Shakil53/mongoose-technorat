/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// const express = require('express')
import express, { Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notfound';
import router from './app/routes';


const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1/', router);


const test = (req: Request, res: Response) => {
  const a = 20;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorhandler);
app.use(notFound)

export default app;
// C:\Project\mongoose-technorat/.env
