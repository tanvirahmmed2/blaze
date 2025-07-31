const express= require("express")
const morgan=require("morgan")
const createHttpError = require("http-errors")
const xssClean= require("xss-clean")
const rateLimit= require("express-rate-limit")

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


app.get("/", (req,res)=>{
    res.status(200).send({
        message: "server is running now"
    })
})

// test

app.get("/test", rateLimiter,(req,res)=>{
    res.status(200).send({
        message: "server is running now 200"
    })
})
//middleware
const isLogin=(req,res,next)=>{
    const login= true
    if (login) {
        req.body.id= 101
        next()
        
    } else {
        return res.status(404).json({
            message: "please login first"
        })
    }
}

app.get("/api/user", isLogin, (req,res)=>{
    console.log(`/api/user`)
    console.log(req.body.id)
    res.status(200).send({
        message: "user profile is returned"
    })
})


















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

