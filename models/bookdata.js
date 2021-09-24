const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictak-files.rfxcn.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority')
const schema=mongoose.Schema;
const bookschema=new schema({
    Title:String,
    Author:String,
    Genre:String,
    Image:String
});
mongoose.model('bookdata',bookschema);
var bookdata=mongoose.model('bookdata',bookschema);
module.exports=bookdata;