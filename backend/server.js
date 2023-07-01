const app=require('./app');
const dorenv=require("dotenv");
const connectDatabase=require("./config/database")

//uncaught promise exception
process.on("uncaughtException",err=>{
    console.log("Error: "+err.message);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
    
})
// console.log(youtube)

//config port
dorenv.config({path:"backend/config/config.env"});

//config databse

connectDatabase();



const server =app.listen(process.env.PORT,()=>{
 console.log("server is running on http://localhost:"+ process.env.PORT)
});








//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log("Error "+ err.message);
    console.log("Shutting down the server due to unhadled promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})