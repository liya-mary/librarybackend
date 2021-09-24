const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictak-files.rfxcn.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority')
const schema=mongoose.Schema;
const signupschema=new schema({
    username:String,
    email:String,
    password:String,
    repeatpassword:String
});
var signupdata=mongoose.model('signupdata',signupschema);
module.exports=signupdata;