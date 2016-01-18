//
//  ViewController.swift
//  UIColorWDUtils Demo
//
//  Created by 姚耀 on 14/12/19.
//  Copyright (c) 2014年 姚耀. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        testLabel.textColor=UIColor(rgb:0x2ECC71)
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBOutlet weak var testLabel: UILabel!

}

