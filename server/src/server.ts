import express, { Request, Response } from 'express';
import cors from 'cors';
import { ApiRoutes } from './route';
import { env } from './config/env.config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN }));

app.use('/api/v1', ApiRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express & TypeScript server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
