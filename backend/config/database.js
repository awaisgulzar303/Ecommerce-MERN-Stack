const mongosse=require("mongoose");
const dorenv=require('dotenv');

dorenv.config({path:"backend/config/config.env"})


const connectDatabase=()=>{
mongosse.connect(process.env.DB_URL).then(()=>{
    console.log("connectes to DB")
})
}

module.exports=connectDatabase
