//
//  ViewController.swift
//  Test
//
//  Created by 姚耀 on 15/1/6.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


    @IBOutlet weak var lable: UILabel!
    @IBAction func Click(sender: UIButton) {
        let title = sender.titleForState(.Normal)!
        let plainText = "\(title) button pressed"
        lable.text = plainText
    }
}

