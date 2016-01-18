//
//  Document.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

public class Document {
    public var nodes: [Node] = []

    public init() {
    }

    public init(html: String) {
        let strings = LexicalAnalysis().analyse(html)

        var i = skipSpaces(strings, i: 0)

        if strings[i] == StringStatic.lessThan
                && strings[i + 1].uppercaseString == StringStatic.docType {
            let docTypeParser = DocTypeParser(strings: strings, index: i, endIndex: strings.count)
            docTypeParser.parse()

            nodes.append(docTypeParser.docType!)

            i = docTypeParser.index
        }

        while i < strings.count {
            i = skipSpaces(strings, i: i)

            if strings[i] == StringStatic.lessThan {
                let tagParser = TagParser(strings: strings, index: i, endIndex: strings.count, depth: 0)
                tagParser.parse()

                nodes.append(tagParser.tag!)
                i = tagParser.index
            } else {
                let plainTextParser = PlainTextParser(strings: strings, index: i, endIndex: strings.count, depth: 0)
                plainTextParser.parse()

                if plainTextParser.plainText != nil {
                    nodes.append(plainTextParser.plainText!)
                }

                i = plainTextParser.index
            }

            i = skipSpaces(strings, i: i)
        }
    }

    public subscript(param: String) -> Node? {
        get {
            if param.hasPrefix("#")
                    && countElements(param) > 1 {
                let id = param.substringFromIndex(advance(param.startIndex, 1))
                return getElementById(id)
            }
            return self[param, 0]
        }
    }

    public subscript(tagName: String, index: Int) -> Node? {
        get {
            var i = index
            let lowercaseTagName = tagName.lowercaseString
            for node in nodes {
                if node is Tag
                        && (node as Tag).name.lowercaseString == lowercaseTagName {
                    if i == 0 {
                        return node
                    }
                    i--
                }
            }
            return nil
        }
    }

    public subscript(index: Int) -> Node? {
        get {
            return nodes[index]
        }
    }

    private func skipSpaces(strings: [String], i: Int) -> Int {
        var index = i
        while index < strings.count
                && (strings[index] == StringStatic.space || strings[index] == StringStatic.returnKey || strings[index] == StringStatic.newLine) {
            index++
        }
        return index
    }

    public func getElementById(id: String) -> Node? {
        for node in nodes {
            let result = node.getElementById(id)
            if result != nil {
                return result
            }
        }
        return nil
    }

    public func toString(formatting: Formatting, spaceNumber: Int = 4) -> String {
        var result = StringStatic.empty
        for node in nodes {
            result += node.toString(formatting, spaceNumber: spaceNumber)
        }
        return result
    }

    public var description: String {
        return toString(.Indented)
    }
}