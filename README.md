# Order Dish

## API

### BASE RETURN

```javascript
// 成功
{
    "success": true,
    "data": {
        //...
    }
}

// 失败
{
    "success": false,
    "data": {
        //...
    }
}
```

### 堂食

#### 获取餐厅列表

##### 请求

```javacript
[GET] api/restaurant/
```

##### 返回

###### 示例

```javacript
// 成功
{
    "success": true,
    "data": {
        restaurants: [{
            id: 0,
            name: "name1",
            address: "address",
            latitude: "29.303453",
            longitude: "120.235432",
            img: ""
        }, {
            id: 1,
            name: "name2",
            address: "address",
            latitude: "29.303453",
            longitude: "120.235432",
            img: ""
        }]
    }
}

// 失败
{
    "success": false,
    "data": {
        errorcode: 1000,
        msg: "XXX Error"
    }
}
```

#### 获取餐厅信息

##### 请求

```javacript
[GET] api/restaurant/<name>|<id>
```

##### 返回

###### success:

|key|type|description|
|---|---|---|
|name|String|餐厅名称|
|rate|float|餐厅评分|
|sale|int|餐厅总销量|
|worktime|String|营业时间,格式：hh:mm-hh:mm|
|discount|Array\<Discount\>|折扣列表,折扣表示方法见Discount|

###### false:

|key|type|description|
|---|---|---|
|errorcode|int|错误码|
|msg|String|错误信息|

##### Discount

Discount 用 Object 类型来表示，属性如下表。

|key|type|description|
|---|---|---|
|type|int|折扣类型|
|class|int|所属类别（同类别优惠不可同享）|
|requireAmount (option)|float|优惠所需达到的消费金额|
|minusAmount (option)|float|优惠金额|
|specialAmount (option)|float|特价，定价|
|rate (option)|float|折扣百分比|
|couponAmount|float|返还优惠券金额|

##### 示例

```javacript
// 成功
{
    "success": true,
    "data": {
        name: "name",
        rate: 100,
        sale: 2399,
        worktime: "08:00-23:00",
        discount:[{
            type: 0,
            class: 0,
            requireAmount: 20,
            minusAmount:5
        }, {
            type: 0,
            class: 0,
            requireAmount: 30,
            minusAmount: 10
        }]
    }
}

// 失败
{
    "success": false,
    "data": {
        errorcode: 1000,
        msg: "XXX Error"
    }
}
```

#### 获取菜品列表

##### 请求

```javacript
[GET] api/restaurant/<name>|<id>/dishes
```

##### 返回

###### content\<Array\>

|key|type|description|
|---|---|---|
|cataName|String|类名|
|items|Array|该类下的菜品|

###### items\<Array\>

|key|type|description|
|---|---|---|
|id|int|菜品id|
|name|String|菜品名|
|img|String|菜品图像链接|
|orginPrice|float|菜品原价|
|salePrice|float|菜品折后价|
|rate|int|好评率|
|options|Array|选项|

###### options\<Array\>

|key|type|description|
|---|---|---|
|name|String|选项类别名|
|options|Array|可选项|

###### options.options\<Array>

|key|type|description|
|---|---|---|
|name|String|选项名|
|active|bool|如果该选项为默认选项，则这里为true|

###### 示例

```javacript
// 成功
{
    "success": true,
    "data": {
        "content": [{
            "cataName": "catagory1",
            "items": [{
                "id": 0,
                "name": "name1",
                "img": "url",
                "originPrice": 8.88,
                "salePrice": 6.66,
                "rate": 100,
                "options": [{
                    "name": "option-name-1",
                    "options": [{
                        "name": "option1",
                        "active": true
                    }, {
                        "name": "option2",
                        "active": false
                    }]
                }, {
                    "name": "option-name-2",
                    "options": [{
                        "name": "option1",
                        "active": true
                    }, {
                        "name": "option2",
                        "active": false
                    }]
                }]
            }]
        }]
    }
}

// 失败
{
    "success": false,
    "data": {
        errorcode: 1000,
        msg: "XXX Error"
    }
}
```

#### 提交购物车

##### 请求

```$xslt
[POST] api/order/add2cart
```

###### params

|key|type|description|
|---|---|---|
|token|String|用户id|
|content|String|购物车内容|

###### content<Array>

|key|type|description|
|---|---|---|
|id|int|菜品id|
|amount|int|菜品数量|
|options|Object|选项|

###### 请求示例

```javascript
[POST]

//Notice: content是字符串，使用json格式
//options中是选项名以及对应的选中的选项
{
    token: "userid",
    content: `[{
        id: 0,
        amount: 1,
        options: {
            "option-name-1": "option1",
            "option-name-2": "option2"
        }
    }, {
        id: 1,
        amount: 10,
        options: {
            "option-name-1": "option1",
            "option-name-2": "option2"
        }
    }]`
}
```

##### 返回

###### 返回示例

```javascript
//成功
{
    success: true,
    data: {}
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "error message"
    }
}
```

#### 获取购物车

##### 请求

```javascript
[GET] api/order/cart?token=userid
```

##### 返回

```javascript
// 成功
{
    success: true,
    data: {
        content: [{
            id: 0,
            amount: 1,
            name: "test",
            originPrice: 22.2,
            salePrice: 18.88,
            options: {
                "option-name-1": "option1",
                "option-name-2": "option2"
            }
        }, {
            id: 1,
            amount: 1,
            name: "test",
            originPrice: 22.2,
            salePrice: 18.88,
            options: {
                "option-name-1": "option1",
                "option-name-2": "option2"
            }
        }]
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 获取订单优惠

##### 请求

```javascript
[GET] api/order/discount?token=userid
```

##### 返回

###### 返回示例

```javascript
//成功
{
    success: true,
    data: {
        discount: {
            type: 0,
            requireAmount: 20,
            minusAmount: 10
        }
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 获取当前订单可用红包

##### 请求

```javascript
[GET] api/order/redpack?token=userid
```

##### 返回

```javascript
//成功
{
    success: true,
    data: {
        redpack: {
            id: 1, //红包id
            requireAmount: 10,
            minusAmount: 5,
            type: 0 //红包类型
        }
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 获取所有红包列表

##### 请求

```javascript
[GET] api/redpacks?token=userid
```

##### 返回

```javascript
//成功
{
    success: true,
    data: {
        redpacks: [{
            id: 1, //红包id
            requireAmount: 10,
            minusAmount: 5,
            type: 0 //红包类型
        }, {
            id: 2, //红包id
            requireAmount: 10,
            minusAmount: 5,
            type: 0 //红包类型
        }]
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 获取当前订单收货地址

##### 请求

```javascript
[GET] api/order/address?token=userid
```

##### 返回

> 如果没有设置过收货地址，随便返回一个收货地址。

>如果当前用户没有收货地址，作为错误返回。

```javascript
//成功
{
    success: true,
    data: {
        address: {
            id: 1,       //地址id
            name: "leo", //用户姓名
            phone: "13566669999",
            address: "xxx省xx市xx区xx路xx号"
        }
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 设置当前订单收货地址

##### 请求

```javascript
[POST] api/order/address
```

###### 请求示例

```javascript
[POST]

{
    token: "userid"
    id: 1 //地址id
}
```

##### 返回

```javascript
//成功
{
    success: true,
    data: {}
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 获取用户地址列表

##### 请求

```javascript
[GET] api/addresses?token=userid
```

##### 返回

```javascript
//成功
{
    success: true,
    data: {
        addresses: [{
            id: 1,       //地址id
            name: "leo", //用户姓名
            phone: "13566669999",
            address: "xxx省xx市xx区xx路xx号",
            avalible: true    //是否超出范围
        }, {
            id: 2,       //地址id
            name: "leo", //用户姓名
            phone: "13566669999",
            address: "xxx省xx市xx区xx路xx号",
            avalible: false    //是否超出范围
        }]
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 根据id获取收货地址

##### 请求

```javascript
// 这里的id是地址的id
[GET] api/address/<id>
```

##### 返回

```javascript
//成功
{
    success: true,
    data: {
        address: {
            id: 1,       //地址id
            name: "leo", //用户姓名
            phone: "13566669999",
            address: "xxx省xx市xx区xx路xx号"
        }
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 添加收货地址

##### 请求

```javascript
[PUT] api/address
```

###### params

|key|type|description|
|---|---|---|
|name|String|用户姓名|
|phone|String|用户电话|
|address|String|用户地址|

###### 请求示例

```javascript
[PUT]

{
    token: "userid"
    name: "leo",
    phone: "13566669999",
    address: "xxx省xx市xx区xx路xx号"
}
```

##### 返回

###### 返回示例

```javascript
//成功
{
    success: true,
    data: {
        id: 1   //地址id
    }
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 编辑收货地址

##### 请求

```javascript
[POST] api/address
```

###### 请求示例

```javascript
[POST]

{
    id: 1,       //修改的地址id
    name: "leo",
    phone: "13566669999",
    address: "xxx省xx市xx区xx路xx号"
}
```

##### 返回

###### 返回示例

```javascript
//成功
{
    success: true,
    data: {}
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```

#### 删除收货地址

##### 请求

```javascript
[DELETE] api/address
```

###### 请求示例

```javascript
[DELETE]

{
    id: 1
}
```

##### 返回

###### 返回示例

```javascript
//成功
{
    success: true,
    data: {}
}

//失败
{
    success: false,
    data: {
        errorcode: 1000,
        msg: "xxx error"
    }
}
```