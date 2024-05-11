import express from 'express'
import { Request, Response } from 'express';
const { PrismaClient }= require ("@prisma/client");

import bodyParser from 'body-parser';
import cors from 'cors'


const app = express();
const prisma = new PrismaClient();

app.use(express());
app.use(cors());
app.use(bodyParser.json());

// @desc Get items
// @route GET /api/items
// @access Public

async function getItem(req: Request, res: Response) {
const item = await prisma.item.findMany({});
if (item.length === 0) {
return res.status(200).json({ message: "Sorry, no items found teehee." });
}
return res.status(200).json(item);
}

// @desc Set items
// @route POST /api/items/create
// @access Public
async function setItem(req: Request, res: Response) {
const { Name, taskName } = req.body.data;

const result = await prisma.item.create({
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


if (!result) {
return res.status(500).json({ message: "Error creating item." });
}
return res.status(200).json({message: "Successfully created"});
}

// @desc Delete items
// @route POST /api/items/delete
// @access Public
async function deleteItem(req: Request, res: Response) {
const { id } = req.body;

console.log("received: ", id)
const result = await prisma.item.delete({ where: { id: id } });

if (!result) {
return res.status(500).json({ message: "Error deleting item." });
}
return res.status(200).json(result);
}



const itemController = { getItem, setItem, deleteItem };

export default itemController;