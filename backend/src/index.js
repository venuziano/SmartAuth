import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import routes from './routes'
import fileUpload from 'express-fileupload'

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(routes);
app.disable('x-powered-by');
app.listen(3333);
