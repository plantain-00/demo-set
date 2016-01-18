//
//  Comment.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

public class Comment: Node {
    public var text: String
    public init(text: String, depth: Int) {
        self.text = text
        super.init(depth: depth)
    }

    public override func toString(formatting: Formatting, spaceNumber: Int = 4) -> String {
        if formatting == .None {
            return "<\(text)>"
        }
        return "\(String(count:depth*spaceNumber,repeatedValue:CharStatic.space))<\(text)>\n"
    }
    public var description: String {
        return toString(.Indented)
    }
}