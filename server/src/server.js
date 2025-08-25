const app=require("./app")
const connectDB = require("./config/database")
const { serverPort } = require("./secret")


app.listen(serverPort, async ()=>{
    console.log(`server is runing at http://localhost:${serverPort}`)
    await connectDB()
})


