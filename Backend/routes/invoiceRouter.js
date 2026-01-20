import express from 'express';
import { createInvoice, deleteInvoice, getInvoice,getInvoiceById, updateInvoice } from '../Controller/invoiceController.js';
import { clerkMiddleware } from '@clerk/express';
import path from 'path';
const router = express.Router();
router.use(clerkMiddleware());
router.get("/",getInvoice)
router.get("/:id",getInvoiceById)
router.post("/",createInvoice);
router.put("/:id",updateInvoice);
router.delete("/:id",deleteInvoice);
export default router;
