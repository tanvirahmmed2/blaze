const express= require("express")
const morgan=require("morgan")
const app= express()
const PORT= 3000
app.use(morgan('dev'))



app.get("/", (req,res)=>{
    res.status(200).send({
        message: "server is running now"
    })
})




















app.listen(PORT,()=>{
    console.log(`server is runing at http://localhost:${PORT}`)
})