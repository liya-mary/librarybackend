const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictak-files.rfxcn.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority')
const schema=mongoose.Schema;
const authorschema=new schema({
    authorname:String,
    period:String,
    works:String,
    awards:String,
    about:String,
    authorimg:String
});
var authordata=mongoose.model('authordata',authorschema);
module.exports=authordata;