import express from 'express';
const app = express();


const msleep = (n) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
const sleep = (n) => msleep(n*1000);
  

const port = process.env.PORT? process.env.PORT: 3000;
const message = `Revision is ${process.env.REVISION?process.env.REVISION:"unknown"} and namespace is ${process.env.NAMESPACE?process.env.NAMESPACE:"unknown"}`;
app.get('/', (req, res) => {
    sleep(2); //mimic an intensive operation to showcase autoscaling
    return res.send(`Hello World ! ${message}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}! ${message}`))