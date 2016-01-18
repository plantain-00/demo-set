//
//  DocType.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

public class DocType: Node {
    public var name: String
    public var declaration: String

    public init(name: String, declaration: String, depth: Int) {
        self.name = name
        self.declaration = declaration
        super.init(depth: depth)
    }

    public override func toString(formatting: Formatting, spaceNumber: Int = 4) -> String {
        if formatting == .None {
            return "<\(name)\(declaration)>"
        }
        return "<\(name)\(declaration)>\n"
    }
}