//
//  DocTypeParser.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class DocTypeParser: ParserBase {
    override init(strings: [String], index: Int, endIndex: Int) {
        super.init(strings: strings, index: index, endIndex: endIndex)
    }

    var docType: DocType?

    override func parse() {
        if strings[index] != StringStatic.lessThan
                || !(strings[index + 1].uppercaseString == StringStatic.docType) {
            fatalError("This situation is surprising.")
        }
        docType = DocType(name: StringStatic.docType, declaration: StringStatic.empty, depth: 0)
        index += 2

        findEndOfDocTypeThenGetDeclaration()
    }

    private func findEndOfDocTypeThenGetDeclaration() {
        while index < endIndex
                && strings[index] != StringStatic.largeThan {
            docType!.declaration += strings[index]
            index++
        }

        if index < endIndex {
            index++
        }
    }
}