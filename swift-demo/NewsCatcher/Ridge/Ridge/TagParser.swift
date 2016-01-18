//
//  TagParser.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class TagParser: ParserBase {
    init(strings: [String], index: Int, endIndex: Int, depth: Int) {
        self.depth = depth
        super.init(strings: strings, index: index, endIndex: endIndex)
    }

    private let depth: Int
    var tag: Tag?

    override func parse() {
        if strings[index] != StringStatic.lessThan
                || strings[index + 1] == StringStatic.slash {
            fatalError("This situation is surprising.")
        }
        index++
        tag = Tag(name: strings[index], depth: depth)

        index++
        parseAttributes()

        if !isSingleLineTag() {
            var theEndIndex = findEndMarkOfCurrentTag()

            skipSpaces()

            if tag!.name.lowercaseString == "script" {
                var result = StringStatic.empty
                for var i = index; i < theEndIndex; i++ {
                    result += strings[i]
                }

                let text = result.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())
                if text != StringStatic.empty {
                    tag!.children!.append(ScriptText(text: result, depth: depth + 1))
                }

                index = theEndIndex + 4
            } else {
                while index < theEndIndex {
                    skipSpaces()

                    if strings[index] == StringStatic.lessThan
                            && strings[index + 1].hasPrefix(StringStatic.commentStart) {
                        parseComment(theEndIndex)
                    } else if strings[index] == StringStatic.lessThan
                            && strings[index + 1] != StringStatic.slash {
                        parseTag(theEndIndex)
                    } else {
                        parsePlainText(theEndIndex)
                    }

                    skipSpaces()
                }

                index = theEndIndex + 4
            }
        }
    }

    private func parsePlainText(endIndex: Int) {
        let plainTextParser = PlainTextParser(strings: strings, index: index, endIndex: endIndex, depth: depth + 1)
        plainTextParser.parse()
        if plainTextParser.plainText != nil {
            tag!.children!.append(plainTextParser.plainText!)
        }

        index = plainTextParser.index
    }

    private func parseTag(endIndex: Int) {
        let tagParser = TagParser(strings: strings, index: index, endIndex: endIndex, depth: depth + 1)
        tagParser.parse()

        tag!.children!.append(tagParser.tag!)
        index = tagParser.index
    }

    private func parseComment(endIndex: Int) {
        let commentParser = CommentParser(strings: strings, index: index, endIndex: endIndex, depth: depth + 1)
        commentParser.parse()

        tag!.children!.append(commentParser.comment!)
        index = commentParser.index
    }

    private func findEndMarkOfCurrentTag() -> Int {
        var theEndIndex = endIndex
        var stackDepth = 0
        for var i = index; i < endIndex - 3; i++ {
            if strings[i] == StringStatic.lessThan
                    && strings[i + 1] == StringStatic.slash
                    && strings[i + 2] == tag!.name
                    && strings[i + 3] == StringStatic.largeThan {
                if stackDepth == 0 {
                    theEndIndex = i
                    break
                }
                stackDepth--
            } else if strings[i] == StringStatic.lessThan
                    && strings[i + 1] == tag!.name {
                stackDepth++
            }
        }

        tag!.children = []
        return theEndIndex
    }

    private func isSingleLineTag() -> Bool {
        let name = tag!.name.lowercaseString
        return name == "input"
                || name == "meta"
                || name == "link"
                || name == "br"
                || name == "hr"
                || name == "img"
    }

    private func parseAttributes() {
        let attributesParser = AttributesParser(strings: strings, index: index, endIndex: endIndex)
        attributesParser.parse()

        tag!.attributes = attributesParser.attributes
        tag!.hasSlash = attributesParser.hasSlash
        index = attributesParser.index
    }
}