//
//  AttributesParser.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class AttributesParser: ParserBase {
    override init(strings: [String], index: Int, endIndex: Int) {
        hasSlash = false
        super.init(strings: strings, index: index, endIndex: endIndex)
    }

    var attributes: [Attribute]?
    var hasSlash: Bool

    override func parse() {
        var meetEndOfAllAttributes = false
        do {
            skipSpaces()
            if strings[index] == StringStatic.slash
                    && strings[index + 1] == StringStatic.largeThan {
                meetEndOfAllAttributes = true
                index += 2
                hasSlash = true
            } else if strings[index] == StringStatic.largeThan {
                meetEndOfAllAttributes = true
                index++
            } else {
                parseNextAttribute()
            }
        } while !meetEndOfAllAttributes
                && index < endIndex
    }

    private func parseNextAttribute() {
        let attributeParser = AttributeParser(strings: strings, index: index, endIndex: endIndex)
        attributeParser.parse()
        if attributes == nil {
            attributes = []
        }
        attributes!.append(attributeParser.attribute!)
        index = attributeParser.index
    }
}