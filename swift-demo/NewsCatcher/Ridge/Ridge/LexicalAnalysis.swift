//
//  LexicalAnalysis.swift
//  Ridge
//
//  Created by 姚耀 on 15/1/29.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Foundation

class LexicalAnalysis {
    func analyse(string: String) -> [String] {
        var result = [String]()
        var tmp = StringStatic.empty
        for c in string {
            if c == CharStatic.empty
                    || c == CharStatic.tab
                    || c == CharStatic.singleQuote
                    || c == CharStatic.doubleQuote
                    || c == CharStatic.largeThan
                    || c == CharStatic.lessThan
                    || c == CharStatic.equal
                    || c == CharStatic.slash
                    || c == CharStatic.returnKey
                    || c == CharStatic.newLine {
                if tmp != StringStatic.empty {
                    result.append(tmp)
                    tmp = StringStatic.empty
                }
                if c != CharStatic.newLine
                        && c != CharStatic.returnKey {
                    result.append(String(c))
                }
            } else {
                tmp.append(c)
            }
        }

        return result
    }
}