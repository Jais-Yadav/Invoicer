import mongoose from "mongoose";

const bussinessProfileSchema=new mongoose.Schema({
    owner:{type:String,required:true,index:true},
    businessName:{type:String,required:true},
    email:{type:String,required:false,trim:true,lowercase:true,default:""},
    address:{type:String,required:false,default:""},
    phone:{type:String,required:false,default:""},
    gst:{type:String,required:false,default:""},

    //for images
    logoUrl:{type:String,required:false,default:null},
    stampUrl:{type:String,required:false,default:null},
    signatureUrl:{type:String,required:false,default:null},

    signatureOwnerName:{type:String,required:false,default:""},
    signatureOwnerTitle:{type:String,required:false,default:""},
    defaultTaxPercent:{
        type:Number,
        required:false,
        default:18
    },
},{
    timestamps:true
})

const BusinessProfile=mongoose.model("BusinessProfile",bussinessProfileSchema);

export default BusinessProfile;