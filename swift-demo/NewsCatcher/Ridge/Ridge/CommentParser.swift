//
//  CommentParser.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class CommentParser: ParserBase {
    init(strings: [String], index: Int, endIndex: Int, depth: Int) {
        self.depth = depth
        super.init(strings: strings, index: index, endIndex: endIndex)
    }

    private let depth: Int
    var comment: Comment?

    override func parse() {
        if strings[index] != StringStatic.lessThan
                || !strings[index + 1].hasPrefix(StringStatic.commentStart) {
            fatalError("This situation is surprising.")
        }
        comment = Comment(text: StringStatic.empty, depth: depth)

        index++

        findEndOfCommentThenGetComment()
    }

    private func findEndOfCommentThenGetComment() {
        while index < endIndex
                && (!strings[index].hasSuffix(StringStatic.commentEnd)
                || strings[index + 1] != StringStatic.largeThan) {
            comment!.text += strings[index]
            index++
        }

        comment!.text += strings[index]
        index += 2
    }
}