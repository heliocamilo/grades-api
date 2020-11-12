import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js';

import { db } from './models/index.js';

(async () => {
  try {
    console.log('Conectando ao banco de dados...');
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado com sucesso');
  } catch (error) {
    console.log('Falha de conexao ao banco - '+error);
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    //origin: 'http://localhost:8080',
    origin: 'https://hcs-grades-app.herokuapp.com',
  })
);

app.use(express.json());
app.use(gradeRouter);
// app.get('/', (req, res) => {
//   res.send('API em execucao');
// });

app.listen(process.env.PORT || 8081, () => {});
