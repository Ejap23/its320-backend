import express from 'express'
import { Request, Response } from 'express';
const { PrismaClient }= require ("@prisma/client");
import itemRoute from './routes/itemRoute';


const bodyparser = require ("body-parser")
const cors = require ("cors")
const app = express();
const prisma = new PrismaClient();

app.use(express());
app.use(cors());
app.use(bodyparser.json());
app.use(itemRoute)





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
