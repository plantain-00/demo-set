//
//  SecondViewController.swift
//  DictionaryDemo
//
//  Created by 姚耀 on 15/1/3.
//  Copyright (c) 2015年 姚耀. All rights reserved.
//

import UIKit

class TranslateViewController: UIViewController,UIPickerViewDataSource,UIPickerViewDelegate {
    
    let languageDirection = ["自动监测语言","中文->英文","英文->中文","中文->日文","日文->中文"]

    @IBOutlet weak var textFrom: UITextView!
    @IBOutlet weak var textTo: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        textFrom.layer.borderWidth=2
        textTo.layer.borderWidth=2
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    @IBAction func translate(sender: UIButton) {
        textTo.text=textFrom.text
    }

    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int{
        return 1
    }
    
    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int{
        return languageDirection.count
    }
    
    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String!{
        return self.languageDirection[row]
    }
}

