//
//  PlainTextParser.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class PlainTextParser: ParserBase {
    init(strings: [String], index: Int, endIndex: Int, depth: Int) {
        self.depth = depth
        super.init(strings: strings, index: index, endIndex: endIndex)
    }

    private let depth: Int
    var plainText: PlainText?

    override func parse() {
        var result = StringStatic.empty

        do {
            result += strings[index]

            index++
        } while index < endIndex
                && strings[index] != StringStatic.lessThan

        let t = result.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())

        if t != StringStatic.empty {
            plainText = PlainText(text: result, depth: depth)
        }
    }
}