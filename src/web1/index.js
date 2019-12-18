import express from 'express';
import sleep from 'sleep';
const app = express();

let port = 3000;
const revision = `Revision is ${process.env.REVISION} and namespace is ${process.env.NAMESPACE}`;
app.get('/', (req, res) => {
    sleep.sleep(2); //mimic an intensive operation to showcase autoscaling
    return res.send(`Hello World ! ${revision}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}! ${revision}`))