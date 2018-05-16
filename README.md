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
[GET api/restaurant/]
```

##### 返回

###### 示例

```json
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
[GET api/restaurant/<name>|<id>]
```

##### 返回

###### success:

|key|type|description|
|-|-|-|
|name|String|餐厅名称|
|rate|float|餐厅评分|
|sale|int|餐厅总销量|
|worktime|String|营业时间,格式：hh:mm-hh:mm|
|discount|Array\<Discount\>|折扣列表,折扣表示方法见Discount|

###### false:

|key|type|description|
|-|-|-|
|errorcode|int|错误码|
|msg|String|错误信息|

##### Discount

Discount 用 Object 类型来表示，属性如下表。

|key|type|description|
|-|-|-|
|type|int|折扣类型|
|class|int|所属类别（同类别优惠不可同享）|
|requireAmount (option)|float|优惠所需达到的消费金额|
|minusAmount (option)|float|优惠金额|
|specialAmount (option)|float|特价，定价|
|rate (option)|float|折扣百分比|
|couponAmount|float|返还优惠券金额|

##### 示例

```json
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
[GET api/restaurant/<name>|<id>/dishes]
```

##### 返回

###### content\<Array\>

|key|type|description|
|-|-|-|
|cataName|String|类名|
|items|Array|该类下的菜品|

###### items\<Array\>

|key|type|description|
|-|-|-|
|id|int|菜品id|
|name|String|菜品名|
|img|String|菜品图像链接|
|orginPrice|float|菜品原价|
|salePrice|float|菜品折后价|
|rate|int|好评率|
|options|Array|选项|

###### options\<Array\>

|key|type|description|
|-|-|-|
|name|String|选项类别名|
|options|Array|可选项|

###### options.options\<Array>

|key|type|description|
|-|-|-|
|name|String|选项名|
|active|bool|如果该选项为默认选项，则这里为true

###### 示例

```json
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