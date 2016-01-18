//
//  AttributeParser.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class AttributeParser: ParserBase {
    override init(strings: [String], index: Int, endIndex: Int) {
        super.init(strings: strings, index: index, endIndex: endIndex)
    }

    var attribute: Attribute?

    override func parse() {
        if isNotAName() {
            fatalError("This situation is surprising.")
        }
        attribute = Attribute(name: strings[index])

        index++

        getTagName()
    }

    private func getTagName() {
        var meetEndOfAttribute = false
        do {
            if isSpaces() {
                index++
            } else if strings[index] == StringStatic.equal {
                index++

                skipSpaces()

                let stringParser = StringParser(strings: strings, index: index, endIndex: endIndex)
                stringParser.parse()

                index = stringParser.index
                attribute!.value = stringParser.string
            } else {
                meetEndOfAttribute = true
            }
        } while index < endIndex
                && !meetEndOfAttribute
    }

    func isNotAName() -> Bool {
        let s = strings[index]
        return s == StringStatic.space
                || s == StringStatic.returnKey
                || s == StringStatic.newLine
                || s == StringStatic.lessThan
                || s == StringStatic.largeThan
                || s == StringStatic.slash
    }
}