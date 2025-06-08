import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // substitua pelo domínio que você quer liberar
    credentials: true, // se quiser permitir cookies e headers de autenticação
  }));
app.use(express.json());
app.use(router);

app.listen(4444, () => {
    console.log("Server is running!!");
})