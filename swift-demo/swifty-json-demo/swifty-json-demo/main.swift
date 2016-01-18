//
//  main.swift
//  swifty-json-demo
//
//  Created by 姚耀 on 15/2/2.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

var url = NSURL(string: "http://www.weather.com.cn/data/sk/101010100.html")!
var data = NSData(contentsOfURL: url, options: NSDataReadingOptions.DataReadingUncached, error: nil)!

var str = NSString(data: data, encoding: NSUTF8StringEncoding)!
NSLog(str)
//{"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"东北风","WS":"1级","SD":"26","WSE":"1","time":"13:05","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1029"}}

let json = JSON(data: data)
if let wd = json["weatherinfo"]["WD"].string{
    NSLog(wd)
    //东北风
}

