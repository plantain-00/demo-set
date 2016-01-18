//
//  Attribute.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

public class Attribute {
    public var name: String
    public var value: String?

    public init(name: String) {
        self.name = name
    }

    public var description: String {
        if value == nil {
            return name
        }
        return "\(name)=\"\(value)\""
    }
}