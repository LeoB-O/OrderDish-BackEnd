let model=require("../model");
let userdiscount=model.UserDiscount;
let user=model.Users;
let discount=model.Discounts;
let order=model.Orders;

function getError(err) {
    let rtn = {};
    let data = {};
    data["msg"] = err.message;
    data["errorcode"] = SERVER_ERROR;
    rtn["data"] = data;
    return rtn;
}

var getAllredpack=async(ctx,next)=>
{
    let rtn={};
    let data={};
    // let token = ctx.request.body["token"];
    var token=ctx.params.id;

    let redpacks=[];
    try {
        let rPs=await userdiscount.findAll({where:{Uid:token},attributes:["discountid"]});
        for(let temp of rPs)
        {
            let temp_r={};
            temp_r["id"]=temp["discountid"];
            let dInfo=await discount.findOne({where:{id:temp_r["id"]},attributes:["conditionC","effect","class"]});
            temp_r["requireAmount"]=dInfo["conditionC"];
            temp_r["minusAmount"]=dInfo["effect"];
            temp_r["type"]=dInfo["class"];
            redpacks.push(temp_r);
        }
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
    data["redpacks"]=redpacks;
    rtn["success"]=true;
    rtn["data"]=data;
    ctx.response.body=rtn;

    return;
};//获取用户所有

var getUesD=async(ctx,next)=>

{
    let rtn={};
    let data={};
    let token = ctx.request.body["token"];
    let discount={};
    try {
        let uDid=await order.findOne({where:{$and:[{Uid:token},{state:0}]}});
        let uDinfo=await discount.findOne({where:{id:uDid["disid"]}});
        discount["type"]=uDinfo["class"];
        discount["requireAmount"]=discount["conditionC"];
        discount["minusAmount"]=discount["effect"];
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
    data=discount;
    rtn["success"]=true;
    rtn["data"]=data;
    return;



};//获取用户当前订单优惠


var getAvaD=async(ctx,next)=>
{
    let rtn={};
    let data={};
    // let token = ctx.request.body["token"];

    var token=ctx.params.id;
    let redpack=[];
    try {
        let Price=await order.findOne({where: {$and: [{Uid: token}, {state: 0}]},attributes:["price"]});
        let price=Price["price"];
        let uR=await userdiscount.findAll();
        let rid=[];
        for(let r of uR)
        {
            rid.push(r["discountid"]);
        }
        let avaR=await discount.findAll({where:{conditionC:{$lte:price},id:{$in:rid}}});

        for(let temp of avaR)
        {
            let temp_r={};
            temp_r["id"]=temp["id"];
            temp_r["requireAmount"]=temp["conditionC"];
            temp_r["minusAmount"]=temp["effect"];

            redpack.push(temp_r);
        }
        data["redpack"]=redpack;
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }

    rtn["success"]=true;
    rtn["data"]=data;
    ctx.response.body=rtn;
    return;



};//获取当前订单可用

module.exports={
    'GET /api/redpacks?token=userid':getAllredpack,
    'GET /api/order/redpack?token=userid':getAvaD,
    // 'GET /api/order/redpack/:id':getAvaD,
    'GET /api/order/discount?token=userid':getUesD
};
