//
//  ParserBase.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/29.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class ParserBase {
    init(strings: [String], index: Int, endIndex: Int) {
        self.index = index
        self.endIndex = endIndex
        self.strings = strings
    }

    var index: Int
    var endIndex: Int
    var strings: [String]

    func parse() {
        fatalError("This method must be overridden")
    }

    func isSpaces() -> Bool {
        let s = strings[index];
        return s == StringStatic.space
                || s == StringStatic.returnKey
                || s == StringStatic.newLine
    }

    func skipSpaces() {
        while index < strings.count
                && isSpaces() {
            index++
        }
    }
}