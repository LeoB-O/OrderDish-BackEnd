let model=require("../model");
let order=model.Orders;
let user=model.Users;
var addcart=async(ctx,next)=>{
    let content=JSON.parse(ctx.request.body["content"]);
    let token=ctx.request.body["token"];
    var checkuser=await user.findOne({where:{id:token},attributes:["id"]});
    if(!checkuser)
    {
        return;
    }

    await order.create({state:0,})



}