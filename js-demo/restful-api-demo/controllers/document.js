exports.select = function (req, res) {
    var json = {};

    json.错误响应 = {
        error: "error message",
        document_url: "/api/v1"
    };

    json.字段描述 = {
        月卡: {
            start_date: "开始日期",
            end_date: "结束日期"
        },
        次卡: {
            total: "总次数",
            remains: "剩余次数"
        },
        订单: {
            date_description: "预定日期描述文字",
            order_number: "订单号",
            price: "价格",
            discount: "优惠金额",
            actual_price: "实际价格",
            status: "状态",
            vendor_status: "供应商状态",
            route_type: "路线类型",
            dates: "日期"
        },
        路线: {
            name: "名称",
            go_to_work_start_time: "上班开始时间",
            go_to_work_end_time: "上班结束时间",
            from_work_start_time: "下班开始时间",
            from_work_end_time: "下班结束时间",
            description: "介绍信息",
            go_to_work_price: "上班路线价格",
            from_work_price: "下班路线价格",
            status: "状态"
        },
        客户: {
            weixin_id: "微信ID",
            phone: "手机号",
            name: "称呼",
            remain_return_times: "剩余可退款次数"
        },
        站点: {
            name: "名称",
            time: "时间",
            description: "描述",
            image_url: "图片url"
        }
    };

    json.客户的月卡 = [{
        url: "/api/v1/customers/:customer_id/month_cards",
        method: "GET",
        description: "查询某个客户的月卡",
        response_body_example: [{
            id: 1,
            customer_id: 1,
            start_date: "2015-01-01",
            end_date: "2015-01-31"
        }]
    }/*, {
        url: "/api/v1/customers/:customer_id/month_cards",
        method: "POST",
        description: "某个客户购买月卡",
        request_body_example: {
            start_date: "2015-03-01",
            end_date: "2015-03-31"
        },
        response_body_example: {
            id: 3,
            customer_id: 1,
            start_date: "2015-03-01",
            end_date: "2015-03-31"
        }
    }*/];

    json.客户的次卡 = [{
        url: "/api/v1/customers/:customer_id/times_cards",
        method: "GET",
        description: "查询某个客户的次卡",
        response_body_example: [{
            id: 1,
            customer_id: 1,
            total: 50,
            remains: 49
        }]
    }, {
        url: "/api/v1/customers/:customer_id/times_cards/:times_card_id",
        method: "GET",
        description: "查询某个客户的某个次卡",
        response_body_example: {
            id: 3,
            customer_id: 1,
            total: 50,
            remains: 50
        }
    }/*, {
        url: "/api/v1/customers/:customer_id/times_cards",
        method: "POST",
        description: "某个客户购买次卡",
        request_body_example: {
            total: 50
        },
        response_body_example: {
            id: 3,
            customer_id: 1,
            total: 50,
            remains: 50
        }
    }, {
        url: "/api/v1/customers/:customer_id/times_cards/:times_card_id",
        method: "PUT",
        description: "更改某个客户的某个次卡",
        request_body_example: {
            total: 50,
            remains: 49
        },
        response_body_example: {
            id: 3,
            customer_id: 1,
            total: 50,
            remains: 49
        }
    }*/];

    json.客户的订单 = [{
        url: "/api/v1/customers/:customer_id/orders",
        method: "GET",
        description: "查询某个客户的订单",
        response_body_example: [{
            id: 1,
            customer_id: 1,
            date_description: "4月2日－4月3日",
            price: 120,
            discount: 15,
            actual_price: 105,
            status: "normal",
            vendor_status: "normal",
            route_type: "上班",
            dates: [
                "2014-04-02",
                "2014-04-03"
            ],
            route_id: 2
        }]
    }, {
        url: "/api/v1/customers/:customer_id/orders/:order_id",
        method: "GET",
        description: "查询某个客户的某个订单",
        response_body_example: {
            id: 1,
            customer_id: 1,
            date_description: "4月2日－4月3日",
            price: 120,
            discount: 15,
            actual_price: 105,
            status: "normal",
            vendor_status: "normal",
            route_type: "上班",
            dates: [
                "2014-04-02",
                "2014-04-03"
            ],
            route_id: 2
        }
    }, {
        url: "/api/v1/customers/:customer_id/orders",
        method: "POST",
        description: "某个客户创建订单",
        request_body_example: {
            date_description: "4月5日－4月8日",
            price: 160,
            discount: 15,
            route_type: "上下班",
            dates: [
                "2014-04-05",
                "2014-04-06",
                "2014-04-07",
                "2014-04-08"
            ],
            route_id: 2
        },
        response_body_example: {
            id: 1,
            customer_id: 1,
            date_description: "4月5日－4月8日",
            price: 160,
            discount: 15,
            actual_price: 145,
            status: "normal",
            vendor_status: "normal",
            route_type: "上下班",
            dates: [
                "2014-04-05",
                "2014-04-06",
                "2014-04-07",
                "2014-04-08"
            ],
            route_id: 2
        }
    }/*, {
        url: "/api/v1/customers/:customer_id/orders/:order_id",
        method: "PUT",
        description: "更改某个客户的某个订单",
        request_body_example: {
            date_description: "4月5日－4月8日",
            price: 160,
            discount: 15,
            status: "cancelled",
            vendor_status: "normal",
            route_type: "上下班",
            dates: [
                "2014-04-05",
                "2014-04-06",
                "2014-04-07",
                "2014-04-08"
            ],
            route_id: 2
        },
        response_body_example: {
            id: 1,
            customer_id: 1,
            date_description: "4月5日－4月8日",
            price: 160,
            discount: 15,
            actual_price: 145,
            status: "cancelled",
            vendor_status: "normal",
            route_type: "上下班",
            dates: [
                "2014-04-05",
                "2014-04-06",
                "2014-04-07",
                "2014-04-08"
            ],
            route_id: 2
        }
    }*/];

    json.路线 = [{
        url: "/api/v1/routes",
        method: "GET",
        description: "查询路线",
        response_body_example: [{
            id: 1,
            name: "路线A",
            go_to_work_start_time: "8:30",
            go_to_work_end_time: "9:30",
            from_work_start_time: "17:00",
            from_work_end_time: "18:00",
            description: "莘庄－莲花路－张江",
            go_to_work_price: 15,
            from_work_price: 15,
            status: "normal",
            go_to_work_sites: [
                {
                    name: "莘庄",
                    time: "06:40",
                    description: "具体乘车地点",
                    image_url: "/images/1.png"
                }, {
                    name: "莲花路",
                    time: "06:50",
                    description: "具体乘车地点",
                    image_url: "/images/2.png"
                }, {
                    name: "张江",
                    time: "07:00",
                    description: "具体乘车地点",
                    image_url: "/images/3.png"
                }
            ],
            from_work_sites: [
                {
                    name: "张江",
                    time: "17:00",
                    description: "具体乘车地点",
                    image_url: "/images/3.png"
                }, {
                    name: "莲花路",
                    time: "17:10",
                    description: "具体乘车地点",
                    image_url: "/images/2.png"
                },
                {
                    name: "莘庄",
                    time: "17:20",
                    description: "具体乘车地点",
                    image_url: "/images/1.png"
                }
            ]
        }]
    }, {
        url: "/api/v1/routes/:route_id",
        method: "GET",
        description: "查询某个路线",
        response_body_example: {
            id: 1,
            name: "路线A",
            go_to_work_start_time: "8:30",
            go_to_work_end_time: "9:30",
            from_work_start_time: "17:00",
            from_work_end_time: "18:00",
            description: "莘庄－莲花路－张江",
            go_to_work_price: 15,
            from_work_price: 15,
            status: "normal",
            go_to_work_sites: [
                {
                    name: "莘庄",
                    time: "06:40",
                    description: "具体乘车地点",
                    image_url: "/images/1.png"
                }, {
                    name: "莲花路",
                    time: "06:50",
                    description: "具体乘车地点",
                    image_url: "/images/2.png"
                }, {
                    name: "张江",
                    time: "07:00",
                    description: "具体乘车地点",
                    image_url: "/images/3.png"
                }
            ],
            from_work_sites: [
                {
                    name: "张江",
                    time: "17:00",
                    description: "具体乘车地点",
                    image_url: "/images/3.png"
                }, {
                    name: "莲花路",
                    time: "17:10",
                    description: "具体乘车地点",
                    image_url: "/images/2.png"
                },
                {
                    name: "莘庄",
                    time: "17:20",
                    description: "具体乘车地点",
                    image_url: "/images/1.png"
                }
            ]
        }
    }];

    json.客户 = [{
        url: "/api/v1/customers/:weixin_id",
        method: "GET",
        description: "查询某个客户",
        response_body_example: {
            id: 1,
            weixin_id: "ABCDEF",
            phone: "12345678909",
            name: "刘先生",
            remain_return_times: 2
        }
    }, {
        url: "/api/v1/customers",
        method: "POST",
        description: "创建新客户",
        request_body_example: {
            weixin_id: "ABCDEF",
            phone: "12345678909",
            name: "刘先生"
        },
        response_body_example: {
            id: 1,
            weixin_id: "ABCDEF",
            phone: "12345678909",
            name: "刘先生",
            remain_return_times: 2
        }
    }/*, {
        url: "/api/v1/customers/:customer_id",
        method: "PUT",
        description: "更改某个客户",
        request_body_example: {
            weixin_id: "ABCDEF",
            phone: "12345678909",
            name: "刘先生",
            remain_return_times: 1
        },
        response_body_example: {
            id: 1,
            weixin_id: "ABCDEF",
            phone: "12345678909",
            name: "刘先生",
            remain_return_times: 1
        }
    }*/];

    res.status(200).json(json);
};