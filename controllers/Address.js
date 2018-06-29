let model=require("../model");
let user=model.Users;
let userAD=model.UserAddress;
let order=model.Orders;
let userad=model.UserAddress;
const SERVER_ERROR=100;
function getError(err) {
    let rtn = {};
    let data = {};
    data["msg"] = err.message;
    data["errorcode"] = SERVER_ERROR;
    rtn["data"] = data;
    return rtn;
}

var getCAD=async(ctx,next)=>
{
    let rtn={};
    let data={};
    let token = ctx.request.query["token"];
    // var token=ctx.params.id;
    try {
        let cAD=await order.findOne({where:{Uid:token,state:0},attributes:["addressid"]});
        let addressid=cAD["dataValues"]["addressid"];

        var uAD=await userAD.findOne({where:{Uid:token},attributes:["id","phonenum","address","name"]});
        if (!uAD)
        {
            rtn["success"]=false;
            data["errorcode"]="123";
            data["msg"]="do not hava address"
            rtn["data"]=data;

            ctx.response.body=rtn;
            return;
        }
       if(addressid=="" )
       {
           /*uAD["dataValues"]["id"]*/
            await order.update({addressid:uAD["dataValues"]["id"]},{where:{Uid:token,state:0}});
           rtn["success"]=true;
           let ad={};
           ad["id"]=uAD["id"];
           ad["name"]=uAD["name"];
           ad["phone"]=uAD["phonenum"];
           ad["address"]=uAD["address"];

           data["address"]=ad;
           rtn["data"]=data;

           ctx.response.body=rtn;
           return;
       }
        let hAD=await userAD.findOne({where:{Uid:token,id:cAD["dataValues"]["addressid"]},attributes:["phonenum","address","name"]});
        rtn["success"]=true;
        let ad={};
        ad["id"]=cAD["dataValues"]["addressid"];
        ad["name"]=hAD["name"];
        ad["phone"]=hAD["phonenum"];
        ad["address"]=hAD["address"];

        data["address"]=ad;
        rtn["data"]=data;

        ctx.response.body=rtn;
        return;

    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
};

var getUad=async(ctx,next)=>
{
    let rtn={};
    let data={};
    let token = ctx.request.query["token"];
    let address=[];
    try {
        var uAD=await userAD.findAll({where:{Uid:token},attributes:["id","address","phonenum","name"]});

        for(let temp of uAD)
        {
            let temp_a={};
            temp_a["id"]=temp["id"];
            temp_a["name"]=temp["name"];
            temp_a["phone"]=temp["phonenum"];
            temp_a["address"]=temp["address"];
            temp_a["avalible"] = true;
            address.push(temp_a);
        }
        rtn["success"]=true;
        data["address"]=address;
        rtn["data"]=data;

        ctx.response.body=rtn;
        return;
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
};

var getAdbyid=async(ctx,next)=>
{
        let rtn={};
        let data={};
    var aid=ctx.params.id;

    try {
        var uad=await userAD.findAll({where:{id:aid},attributes:["name","phonenum","address"]});
        let address={};
        address["id"]=aid;
        address["name"]=uad["dataValues"]["name"];
        address["phone"]=uad["dataValues"]["phonenum"];
        address["address"]=uad["dataValues"]["address"];
        data["address"]=address;
        rtn["success"]=true;
        rtn["data"]=data;
        ctx.response.body=rtn;
        return;
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
};

var insertad=async(ctx,next)=>
{
    let rtn={};
    let data={};
   try {
       let uid=ctx.request.body["token"];
       let name=ctx.request.body["name"];
       let phone=ctx.request.body["phone"];
       let address=ctx.request.body["address"];

       let mid=await userAD.max('id');
       let id=++mid;
       await userAD.create({id:id,address:address,phonenum:phone,name:name,Uid:uid});//hava some problem
        rtn["success"]=true;
        data["id"]=id;
        rtn["data"]=data;
        ctx.response.body=rtn;
        return;

   }
   catch (e) {
       rtn=getError(e);
       ctx.response.body=rtn;
       return;
   }
}
var editaD=async(ctx,next)=>
{
    let rtn={};
    let data={};
    try {
        let id=ctx.request.body["id"];
        let name=ctx.request.body["name"];
        let phone=ctx.request.body["phone"];
        let address=ctx.request.body["address"];

        await userAD.update({name:name,phonenum:phone,address:address},{where:{id:id}});

        rtn["success"]=true;
        rtn["data"]=data;
        ctx.response.body=rtn;
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }};

var deletead=async(ctx,next)=>
{
    let rtn={};
    let data={};
    let id=ctx.request.body["id"];

    try {
        await userAD.destroy({where:{id:id}});
        rtn["success"]=true;
        rtn["data"]=data;
        ctx.response.body=rtn;
        return
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
}

var test=async(ctx,next)=>
{
    var token=ctx.params.id;
    try {
        let defaultadid=await userad.findOne({where:{Uid:token},attributes:["id"]});
        console.log(defaultadid["dataValues"]["id"]);
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
};

var setAd=async(ctx,next)=>
{
    let token=ctx.request.body["token"];
    let id=ctx.request.body["id"];
    let rtn={};
    let data={};


    try {

        await order.update({disid:id},{where:{Uid:token,state:0}});
        rtn["success"]=true;
        rtn["data"]=data;
    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
        return;
    }
}
module.exports={
    'GET /api/order/address':getCAD,
    'GET /api/addresses':getUad,
    'GET /api/address/:id':getAdbyid,
    'PUT /api/address':insertad,
    'POST /api/address':editaD,
    'DELETE /api/address':deletead,
    // 'GET /api/order/address/:id':getCAD,
    'GET /api/test/:id':test,
};