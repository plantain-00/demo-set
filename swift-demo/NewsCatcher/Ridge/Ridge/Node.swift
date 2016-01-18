//
//  Node.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

public class Node {
    public var children: [Node]?
    var depth: Int

    public init(depth: Int) {
        self.depth = depth
    }

    public subscript(index: Int) -> Node {
        get {
            return children![index]
        }
    }

    public subscript(tagName: String, index: Int) -> Node? {
        get {
            var i: Int = index
            var uppercaseTagName = tagName.uppercaseString
            for c in children! {
                if c is Tag
                        && (c as Tag).name.uppercaseString == uppercaseTagName {
                    if i == 0 {
                        return c
                    }
                    i--
                }
            }
            return nil
        }
    }

    public subscript(tagName: String) -> Node? {
        get {
            return self[tagName, 0]
        }
    }

    func getElementById(id: String) -> Node? {
        if children == nil {
            return nil
        }
        for child in children! {
            var node = child.getElementById(id)
            if node != nil {
                return node
            }
        }
        return nil
    }

    public func toString(formatting: Formatting, spaceNumber: Int = 4) -> String {
        fatalError("This method must be overridden")
    }
}
