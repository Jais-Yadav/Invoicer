import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import {clerkMiddleware} from '@clerk/express';
import { connectDb } from './config/db.js';
import router from './routes/invoiceRouter.js';
import path from 'path';
import businessProfileRouter from './routes/businessProfileRouter.js';
import aiinvoiceRouter from './routes/aiinvoiceRouter.js';
const app= express();

const port=4000;
app.use(cors({
 origin:"http://localhost:5173",
 credentials:true
}
   
));
app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({extended:true, limit:'20mb'}));
app.use(clerkMiddleware());

connectDb();

app.use("/uploads",express.static(path.join(process.cwd(),"uploads")));

app.use("/api/invoice",router)
app.use("/api/businessProfile",businessProfileRouter);
app.use("/api/ai",aiinvoiceRouter);

app.get('/',(req,res)=>{
    res.send('API Working');
})

app.listen(port,()=>{
    console.log(`Server running on  http://localhost:${port}`);
})