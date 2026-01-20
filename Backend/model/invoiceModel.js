import mongoose, { mongo } from "mongoose";

const ItemSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true,
        default:1
    },
    unitPrice:{
        type:Number,
        required:true,
        default:0
    }
    
},{_id:false})

const invoiceScheme=new mongoose.Schema({
    owner:{
        type:String,
        required:true,
        index:true
    },
    invoiceNumber:{
        type:String,
        required:true,
        index:true
    },
    issueDate:{
        type:String,
        required:true
    },
    dueDate:{
        type:String,
        defualt:""
    },

    fromBusinessName:{type:String,defualt:""},
    fromEmail:{type:String,defualt:""},
    fromAddress:{type:String,defualt:""},
    fromPhone:{type:String,defualt:""},
    fromGst:{type:String,defualt:""},

    client:{
        name:{type:String,default:""},
        email:{type:String,default:""},
        address:{type:String,default:""},
        phone:{type:String,default:""},
    },
    items:{type:[ItemSchema],default:[]},
    
    currency:{
        type:String,
        default:"INR"
    },
    status:{
        type:String,
        enum:["paid","unpaid","draft","overdue","Paid","Unpaid","Draft","Overdue"],
        default:"draft"
    },
    logoDataUrl: { type: String, default: null },
    stampDataUrl: { type: String, default: null },
    signatureDataUrl: { type: String, default: null },

    signatureName: { type: String, default: "" },
    signatureTitle: { type: String, default: "" },

    taxPercent: { type: Number, default: 18 },

    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
},{
    timestamps:true
})

const Invoice=mongoose.model('Invoice',invoiceScheme);
export default Invoice;
