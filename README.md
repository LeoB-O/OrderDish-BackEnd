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

#### 获取餐厅信息

```javacript
[GET api/restaurant/<name>]
```

##### 返回

###### success:

|key|type|description|
|-|-|-|
|name|String|餐厅名称|
|rate|float|餐厅评分|
|sale|int|餐厅总销量|
|work-time|String|营业时间,格式：hh:mm-hh:mm|
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
|require-amount (option)|float|优惠所需达到的消费金额|
|minus-amount (option)|float|优惠金额|
|special-amount (option)|float|特价，定价|
|rate (option)|float|折扣百分比|
|coupon-amount|float|返还优惠券金额|

#### 获取分类信息

#### 获取菜品列表