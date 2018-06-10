let model=require("../model");
let order=model.Orders;
let food=model.Foods;
let orderfood=model.Orderfood;
let user=model.Users;
var addcart=async(ctx,next)=> {
    let price = [];
    let idnum=0;
    let Id=[];
    let content = JSON.parse(ctx.request.body["content"]);
    let token = ctx.request.body["token"];
    var checkuser = await user.findOne({where: {id: token}, attributes: ["id"]});
    if (!checkuser) {
        return;
    }
    for(let c of content)
    {
        var Price=await food.findOne({where:{id:c.id},attributes:["price"]});
        price.push(Price["price"]*c.amount);
    }
    let sum=0;
    for(let temp of price)
    {
        sum+=temp;
    }
    let num=await order.count();
    num++;
    let num1=await orderfood.count()
    for(let c of content)
    {
        num1++;
        await orderfood.create({id:num1,fid:c.id,orderid:num,options:c.options,amount:c.amount})
    }
    await order.create({id:num,state:0,price:sum,addressid:c.info,time:c.time,extra:c.extra,Uid:token});
}  ;


