//
//  PlainText.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

public class PlainText: Node {
    public var text: String

    public init(text: String, depth: Int) {
        self.text = text
        super.init(depth: depth)
    }

    public override func toString(formatting: Formatting, spaceNumber: Int = 4) -> String {
        let t = text.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())
        if formatting == .None {
            return t
        }
        let blank = String(count: depth * spaceNumber, repeatedValue: CharStatic.space)
        return "\(blank)\(t)\n"
    }

    public var description: String {
        return toString(.Indented)
    }
}