const fs= require('fs/promises')
const deleteImage= async (imagePath)=>{
    try {
        await fs.access(imagePath)
        await fs.unlink(imagePath)
        console.log('image deleted')
    } catch (error) {
        throw error
        
    }
}

module.exports= deleteImage