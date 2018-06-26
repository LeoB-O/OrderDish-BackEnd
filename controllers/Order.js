let model=require("../model");
let order=model.Orders;
let food=model.Foods;
let orderfood=model.Orderfood;
let user=model.Users;


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
    let token = ctx.request.body["token"];
    var checkuser = await user.findOne({where: {id: token}, attributes: ["id"]});
    if (!checkuser) {
        data['errorcode'] = TOKEN_ERROR;
        data['msg'] = 'no such user';
        rtn['data'] = data;
        ctx.response.body = rtn;
        return;
    }
  try {
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