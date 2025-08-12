const mongoose= require('mongoose')


const hanldeCreateCategory= async(req,res,next)=>{
    try {


        const {name}= req.body


        






        res.status(200).send({
            message: "category created successfully",
            payload:{name}
        })
    } catch (error) {
        next(error)
        
    }
}

module.exports= {hanldeCreateCategory}