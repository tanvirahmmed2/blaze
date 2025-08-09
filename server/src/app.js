const express= require("express")
const morgan=require("morgan")
const createHttpError = require("http-errors")
const xssClean= require("xss-clean")
const rateLimit= require("express-rate-limit")
const userRouter = require("./routers/user.router")
const seedRouter = require("./routers/seed.router")
const authRouter = require("./routers/authRouter")

const app= express()

const rateLimiter= rateLimit({
    windowMs:1*60*100,
    max: 5,
    message: "too many request"

})


app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(xssClean())
app.use(rateLimiter)

//userRouter

app.use("/api/users",userRouter)
app.use('/api/seed', seedRouter)
app.use('/api/auth', authRouter)



app.get("/", (req,res)=>{
    res.status(200).send({
        message: "server is running now"
    })
})

// test

app.get("/test", rateLimiter,(req,res)=>{
    res.status(200).send({
        message: "server is running now. status(200)"
    })
})
//middleware



















app.use(( req,res,next)=>{
    next(createHttpError(405, "route not found"))
    
})
app.use((err, req,res,next)=>{
    return res.status(err.status).json({
        success: false,
        message: err.message
    })
})

module.exports= app

