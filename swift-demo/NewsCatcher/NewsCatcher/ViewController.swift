//
//  ViewController.swift
//  NewsCatcher
//
//  Created by 姚耀 on 15/1/29.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import Cocoa
import Alamofire
import Ridge

class ViewController: NSViewController, NSTableViewDataSource, NSTableViewDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

        //Alamofire.request(.GET, "https://kickass.so/")
        //.responseString {
        //    (_, _, string, _) in
            //println(string!)
            //let document = Document(html: string!)
            //println(document.description)

            //NSWorkspace.sharedWorkspace().openURL(NSURL(string:"http://www.google.com")!)
        //}

        // Do any additional setup after loading the view.
    }

    override var representedObject: AnyObject? {
        didSet {
            // Update the view, if already loaded.
        }
    }

    func numberOfRowsInTableView(tableView: NSTableView) -> Int{
        return 3
    }
    
    func tableView(tableView: NSTableView, objectValueForTableColumn tableColumn: NSTableColumn?, row: Int) -> AnyObject?{
        return "iii"
    }
}

