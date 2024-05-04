import express from 'express'
import { Request, Response } from 'express';
const { PrismaClient }= require ("@prisma/client");


const bodyparser = require ("body-parser")
const cors = require ("cors")
const app = express();
const prisma = new PrismaClient();

app.use(express());
app.use(cors());
app.use(bodyparser.json());

app.get('/', (req: Request, res:Response) => {
    res.send('SUCCESS')

})

app.post("/todoS", async (req: Request, res: Response) => {
  const { Name, taskName } = req.body;

  try {
      const newUser = await prisma.user.create({
          data: {
              Name,
              lists: {
                  create: {
                    Name,
                      task: {
                          create: {
                            Name,
                              taskName,

                          }
                      }
                  }
              }
          },
          include: {
              lists: {
                  include: {
                      task: true
                  }
              }
          }
      });

      res.status(201).json(newUser);
  } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "An error occurred while inserting data." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
