const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userschema=new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
},
email:{
    type:String,
    required:true,
     required:true,
    unique:true
},
fullname:{
    type:String,
     required:true,
     trim:true
},
avatar:{
    type:String,
    required:true
},
coverimage:{
    type:String
},
password:{
    type:String,
    requird:true
},
watchHistory: [

 {  type:mongoose.Schema.Types.ObjectId,
    ref:"Video"}
],
password:{
 type:String,
 required:[true,'Password is required']
},
refreshToken :{
    type:String
}



},{timestamps:true});

userschema.pre("save",async function (next) {
    if(this.isModified("password")){
this.password=bcrypt.hash(this.password,10);
    next()
    }
    next()
})

userschema.methods.ispasswordcorrect=async function (password) {
   return await bcrypt.compare(password,this.password);
}
    
userschema.methods.generateaccesstoken= function(){
   return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}
userschema.methods.generaterefreshtoken= function(){
     return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },process.env.REFERSH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}
export const usermodel=mongoose.model('user',userschema); 