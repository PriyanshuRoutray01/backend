/*const asynchandler=(fun)=>{
(req,res,next)=>{
    Promise.resolve(fun(req,res,next)).catch((err)=>{next(err)})
}
}
module.exports=asynchandler
*/

const asynchandler=(fun)=>{
    async (req,res,next)=>{
        try{
           await fun(req,res,next)
        }catch(err){
            res.status(err.code || 500).json({
                message:err.message
            })
        }
    }
}