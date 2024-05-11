import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import itemRoute from './routes/itemRoute'

const app = express();

app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(itemRoute)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
