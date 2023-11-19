// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// application route
app.use('/api/v1/students', StudentRoutes)

const getAController = (req: Request, res: Response) => {
  const a = 20;
  res.send(a);
}

app.get('/', getAController);

export default app;
// C:\Project\mongoose-technorat/.env
