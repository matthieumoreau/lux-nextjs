import express from 'express';
import app from './app';

const port = parseInt(process.env.PORT || '3000', 10);
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('*', (req, res) => handle(req, res))


    server.listen(port, (err: any) => {
        if (err) throw err;
        console.log(`Server started ➜ ${process.env.NODE_ENV === 'development' && port ? `http://localhost:${port}` : process.env.APP_HOSTNAME}`);
    });
});
