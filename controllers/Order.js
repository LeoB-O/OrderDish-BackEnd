let model=require("../model");
let order=model.Orders;
let food=model.Foods;
let orderfood=model.Orderfood;
let user=model.Users;
let userad=model.UserAddress;


const SERVER_ERROR=100;//各种类型数据库错误
const TOKEN_ERROR=500;//用户名不存在
const M_ERROR=404; //查无此内容

function getError(err) {
    let rtn = {};
    let data = {};
    data["msg"] = err.message;
    data["errorcode"] = SERVER_ERROR;
    rtn["data"] = data;
    return rtn;
}

var addcart=async(ctx,next)=> {
    let rtn={};
    let data={};
    let price = [];
    let idnum=0;
    let Id=[];
    let content = JSON.parse(ctx.request.body["content"]);
    let token = String(ctx.request.body["token"]);
    var checkuser = await user.findOne({where: {id: token}, attributes: ["id"]});
    if (!checkuser) {
        // data['errorcode'] = TOKEN_ERROR;
        // data['msg'] = 'no such user';
        // rtn['data'] = data;
        // ctx.response.body = rtn;
        // return;
        await user.create({id:token});
    }
  try {
        let checkexists =await  order.findOne({where:{Uid:token,state:0},attributes:["id"]});
     if (checkexists)
     {
         let num2=await orderfood.count();
         await orderfood.destroy({where:{orderid:checkexists["id"]}});
         for(let c of content)
         {
             var Price=await food.findOne({where:{id:c.id},attributes:["price"]});
             price.push(Price["dataValues"]["price"]*c.amount);
         }
         let sum=0;
         for(let temp of price)
         {
             sum+=temp;
         }
         for(let c of content)
         {
             num2++;
             await orderfood.create({id:num2,fid:c.id,orderid:checkexists["id"],options:c.options,amount:c.amount})
         }
         let defaultadid=await userad.findOne({where:{Uid:token},attributes:["id"]});
        await order.destroy({where:{id:checkexists["id"]}});
         await order.create({id:checkexists["id"],price:sum,addressid:defaultadid["dataValues"]["id"],state:0,Uid:token})
     }
      else{
         for(let c of content)
      {
          var Price=await food.findOne({where:{id:c.id},attributes:["price"]});
          price.push(Price["dataValues"]["price"]*c.amount);
      }
      let sum=0;
      for(let temp of price)
      {
          sum+=temp;
      }
      let num=await order.count();
      num++;
      let num1=await orderfood.count()
      let c = content[0]
      await order.create({id:num,state:0,price:sum,addressid:c.info||1,time:c.time||0,extra:c.extra||'',disid:0,Uid:token});
      for(let c of content)
      {
          num1++;
          await orderfood.create({id:num1,fid:c.id,orderid:num,options:JSON.stringify(c.options),amount:c.amount})
      }
      let defaultadid=await userad.findOne({where:{Uid:token},attributes:["id"]});
      await order.create({id:num,state:0,price:sum,addressid:defaultadid["dataValues"]["id"],Uid:token});
     }
  }
  catch (e) {
      rtn=getError(e);
      ctx.response.body=rtn;
      return;
  }

  rtn["success"]=true;
    rtn["data"]=data;
}  ;

var getcart=async(ctx,next)=>
    {
            let rtn={};
            let data={};
            let token = ctx.request.query["token"];
        // var token=ctx.params.id;
        let content=[];
try {
    var checkuser = await user.findOne({where: {id: token}, attributes: ["id"]});
    if (!checkuser) {
        data['errorcode'] = TOKEN_ERROR;
        data['msg'] = 'no such user';
        rtn['data'] = data;
        ctx.response.body = rtn;
        return;
    }

    var oD = await order.findOne({where: {$and: [{Uid: token}, {state: 0}]}, attributes: ["id"]});

    if (!oD) {
        data['errorcode'] = M_ERROR;
        data["msg"] = 'no such order';
        rtn['data'] = data;
        ctx.response.body = rtn;
        return
    }
    else
    {
        let oid=oD["id"];

        var oDF=await orderfood.findAll({where:{orderid:oid}});

        for(let temp of oDF)
        {
            let temp_c={};
            temp_c["id"]=temp["fid"];
            let finfo=await  food.findOne({where:{id:temp_c["id"]},attributes:["Fname","price","trueprice"]});
            temp_c["name"]=finfo["Fname"];
            temp_c["originPrice"]=finfo["price"];
            temp_c["salePrice"]=finfo["trueprice"];
            temp_c["amount"]=temp["amount"];
            temp_c["options"]=temp["options"];
            content.push(temp_c);
        }
        data["content"]=content;
    }

}catch (e) {
    rtn=getError(e);
    ctx.response.body=rtn;
    return;
}

rtn["success"]=true;
rtn["data"]=data;
ctx.response.body=rtn;

    };
module.exports={

    'GET /api/order/cart':getcart,
    // 'GET /api/order/cart/:id':getcart,
    'POST /api/order/add2cart':addcart,

}