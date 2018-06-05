 let model=require("../model");
let  Shop=model.Shops;
let  Shopdiscount=model.Shopdiscount;
let  Discount=model.Discounts;
let  Food=model.Foods;
let  Option=model.Option;

 const SERVER_ERROR = 500; //服务器错误


 function getError(err) {
     let rtn = {};
     let data = {};
     data["msg"] = err.message;
     data["errorcode"] = SERVER_ERROR;
     rtn["data"] = data;
     return rtn;
 }

 var getRinfobyname=async(ctx,next)=>
 {
     let rtn={};
     let data={};
     let array=[];
     let id_array=[];
     var tname=ctx.params.name;

     try {
         var shop=await Shop.findOne({where:{$or:[{name:tname},{id:tname}] },attributes:["name","point","sale","worktime"]})
     }
     catch (err) {
         rtn=getError(err);
         ctx.response.body=rtn;
     }
     if(!shop)
     {
         rtn["success"]=false;
         data["msg"]="empty or db error";
         rtn["data"]=data;
         ctx.response.body=rtn;
         return;
     }

     data["name"]=shop["name"];
     data["point"]=shop["point"];
     data["sale"]=shop["sale"];
     data["worktime"]=shop["worktime"];
     try {
         var discountid=await Shopdiscount.findAll({where:{$or:[{name:tname},{id:tname}] },attributes:["did"]});
         for(let temp of discountid)
         {
             id_array.push(temp["did"]);
         }
     }
     catch (e) {
         rtn=getError(e);
         ctx.response.body=rtn;
     }
     if(!discount)
     {

     }
     try {
         var discount=await Discount.findAll({where:{id:id_array},attritubes:["class","effect","conditionC"]});
     }
     catch (e) {
         rtn=getError(e);
         ctx.response.body=rtn;
     }
     for(let temp of discount)
     {
         let temp_arrry={};
         temp_arrry["class"]=temp["class"];
         temp_arrry["minusAmount"]=temp["effect"];
         temp_arrry["requireAmount"]=temp["conditionC"];
         array.push(temp_arrry);
     }

     data["discount"]=array;
     rtn["success"]=true;
     rtn["data"]=data;
     ctx.response.body=rtn;

 };

var getRlist=async(ctx,next)=>
{
    console.log("123");
    let rtn={};
    let data={};
    let arrayT=[];


    try {
        var shop=await  Shop.findAll({attributes:["id","name","address","image"]});
    }
    catch (err) {
        rtn=getError(err);
        ctx.response.body=rtn;
    }
    if(!shop)
    {
        rtn["success"]=false;
        data["msg"]="empty or db error";
        rtn["data"]=data;
        ctx.response.body=rtn;
        return;
    }
    for(let temp of shop)
    {
        let temp_arrry={};
        temp_arrry["id"]=temp["id"];
        temp_arrry["name"]=temp["name"];
        temp_arrry["address"]=temp["address"];
        temp_arrry["image"]=temp["image"];
        arrayT.push(temp_arrry);
    }
    rtn["success"]=true;
    rtn["data"]=arrayT;
    ctx.response.body=rtn;
};

var getFoodlist=async(ctx,next)=>
{
    console.log("123");
    let rtn={};
    let data={};
    let catagory=[];
    let content=[];
    try {
        var catagorylist=await Food.aggregate('catagory','DISTINCT',{plain:false});
        for(let c of catagorylist)
        {
            catagory.push(c["DISTINCT"]);
        }

        for(let temp of catagory)
        {
            let tempA={};
            let item=[];
            tempA["cataName"]=temp;
            foodlist=await Food.findAll({where:{catagory:temp},attributes:["id","Fname","image","price","trueprice"]});
            for(let t of foodlist)
            {
                let tempb={};
                tempb["id"]=t["id"];
                tempb["name"]=t["Fname"];
                tempb["image"]=t["image"];
                tempb["originPrice"]=t["price"];
                tempb["salePrice"]=t["trueprice"];
                var type=await Option.aggregate('type','DISTINCT',{where:{fid:tempb["id"]},plain:false});//
                let option1=[];

                for(let d of type)
                {
                    let tempc={};
                    let option2=[];
                    tempc["name"]=d["DISTINCT"];
                    var option=await Option.findAll({where:{type:tempc["name"]},attributes:["options","active"]});

                    for(let e of option)
                    {
                        let tempd={};
                        tempd["name"]=e["options"];
                        tempd["active"]=e["active"];
                        option2.push(tempd);
                    }
                    tempc["options"]=option2;
                    option1.push(tempc);
                }
                tempb["options"]=option1;
                item.push(tempb)
            }
             tempA["items"]=item;
            content.push(tempA)
        }


    }
    catch (e) {
        rtn=getError(e);
        ctx.response.body=rtn;
    }
data["content"]=content;
    rtn["data"]=data;
    rtn["success"]=true;
    ctx.response.body=rtn;

};

module.exports={
     'GET /api/restaurant/':getRlist,
    'GET /api/restaurant/:name':getRinfobyname,
    'GET /api/dishes':getFoodlist,

};