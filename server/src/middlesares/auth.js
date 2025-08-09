const isLoggedin =async (req,res,next)=>{
    try {
        const token= req.cookies.acces_token
    } catch (error) {
        next(error)
        
    }
}


module.exports= isLoggedin