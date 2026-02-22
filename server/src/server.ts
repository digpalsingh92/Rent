import express, { Request, Response } from 'express';
import cors from 'cors';
import { ApiRoutes } from './route';
import { env } from './config/env.config';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));

app.use('/api/v1', ApiRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express & TypeScript server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
