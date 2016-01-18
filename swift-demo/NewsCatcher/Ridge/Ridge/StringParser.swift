//
//  StringParser.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class StringParser: ParserBase {
    override init(strings: [String], index: Int, endIndex: Int) {
        super.init(strings: strings, index: index, endIndex: endIndex)
    }

    var string: String?

    override func parse() {
        let startIndex = index

        if strings[index] == StringStatic.singleQuote
                || strings[index] == StringStatic.doubleQuote {
            findNextQuote(strings[index])
        } else {
            fatalError("This situation is surprising.")
        }

        getString(startIndex)

        index++
    }

    private func getString(startIndex: Int) {
        var result = StringStatic.empty
        for var i = startIndex + 1; i < index; i++ {
            result += strings[i]
        }
        string = result
    }

    private func findNextQuote(quote: String) {
        do {
            index++
        } while strings[index] != quote
                && index < endIndex
    }
}