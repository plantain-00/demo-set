//
//  Tag.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/30.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

public class Tag: Node {
    public var name: String
    public var attributes: [Attribute]?
    public var hasSlash: Bool

    public init(name: String, depth: Int) {
        self.name = name
        hasSlash = false
        super.init(depth: depth)
    }

    public subscript(name: String) -> String? {
        get {
            if attributes == nil {
                return nil
            }
            let uppercaseName = name.uppercaseString
            for attribute in attributes! {
                if attribute.name.uppercaseString == uppercaseName {
                    return attribute.value
                }
            }
            return nil
        }
    }

    override func getElementById(id: String) -> Node? {
        if attributes != nil {
            for attribute in attributes! {
                if attribute.name.lowercaseString == "id"
                        && attribute.value == id {
                    return self
                }
            }
        }
        return super.getElementById(id)
    }

    public override func toString(formatting: Formatting, spaceNumber: Int = 4) -> String {
        var attributesString = StringStatic.empty
        if attributes != nil {
            for attribute in attributes! {
                attributesString += (StringStatic.space + attribute.description)
            }
        }

        let slash = getSlash()
        if formatting == .None {
            if super.children == nil {
                return "<\(name)\(attributesString)\(slash)>"
            }
            if super.children!.count == 0 {
                return "<\(name)\(attributesString)\(slash)></\(name)>"
            }
            var childrenString = StringStatic.empty
            for child in super.children! {
                childrenString += child.toString(Formatting.None)
            }
            return "<\(name)\(attributesString)>\(childrenString)</\(name)>"
        } else {
            let blank = String(count: depth * spaceNumber, repeatedValue: CharStatic.space)
            if super.children == nil {
                return "\(blank)<\(name)\(attributesString)\(slash)>\n"
            }
            if super.children!.count == 0 {
                return "\(blank)<\(name)\(attributesString)\(slash)></\(name)>\n"
            }
            if children!.count == 1
            && children![0] is PlainText{
                let plainText = children![0] as PlainText
                return "\(blank)<\(name)\(attributesString)\(slash)>\(plainText.toString(.None))</\(name)>\n"
            }
            var childrenString = StringStatic.empty
            for child in super.children! {
                childrenString += (child.toString(formatting, spaceNumber: spaceNumber))
            }
            return "\(blank)<\(name)\(attributesString)\(slash)>\n\(childrenString)\(blank)</\(name)>\n"
        }
    }

    private func getSlash() -> String {
        return hasSlash ? " /" : StringStatic.empty
    }

    public var description: String {
        return toString(.Indented)
    }
}