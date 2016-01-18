//
//  ViewController.swift
//  SimpleGUI
//
//  Created by 姚耀 on 14/12/17.
//  Copyright (c) 2014年 姚耀. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()



        testLabel.text = "test label"
        testLabel.backgroundColor = UIColor.yellowColor()

        testText.text = "test text"


        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBOutlet weak var testLabel: UILabel!
    @IBAction func testButton(sender: UIButton) {
        testLabel.text = "test button"


        let controller = UIAlertController(title: "Are You Sure?",
                message: nil, preferredStyle: .ActionSheet)
        let yesAction = UIAlertAction(title: "Yes, I'm sure!",
                style: .Destructive, handler: {
            action in
            let msg = self.testText.text.isEmpty
                    ? "You can breathe easy, everything went OK."
                    : "You can breathe easy, \(self.testText.text),"
                    + " everything went OK."
            let controller2 = UIAlertController(
            title: "Something Was Done",
                    message: msg, preferredStyle: .Alert)
            let cancelAction = UIAlertAction(title: "Phew!",
                    style: .Cancel, handler: nil)
            controller2.addAction(cancelAction)
            self.presentViewController(controller2, animated: true,
                    completion: nil)
        })
        let noAction = UIAlertAction(title: "No way!",
                style: .Cancel, handler: nil)
        controller.addAction(yesAction)
        controller.addAction(noAction)
        if let ppc = controller.popoverPresentationController {
            ppc.sourceView = sender
            ppc.sourceRect = sender.bounds
        }
        presentViewController(controller, animated: true, completion: nil)
    }

    @IBAction func testSegmentedControl(sender: UISegmentedControl) {
        if (sender.selectedSegmentIndex == 0) {
            testLabel.text = "first segment"
        } else if (sender.selectedSegmentIndex == 1) {
            testLabel.text = "second segment"
        }
    }
    @IBOutlet weak var testText: UITextField!
    @IBAction func testSlider(sender: UISlider) {
        testLabel.text = NSString(format: "%.2f", sender.value)
    }

    @IBAction func testSwitch(sender: UISwitch) {
        if (sender.on) {
            testLabel.text = "ON"
            testActivityIndicator.startAnimating()
            testProgress.setProgress(1, animated: true)
        } else {
            testLabel.text = "OFF"
            testActivityIndicator.stopAnimating()
            testProgress.setProgress(0, animated: true)
        }
    }

    @IBAction func backgroundTap(sender: UIControl) {
        testText.resignFirstResponder()
    }
    @IBOutlet weak var testProgress: UIProgressView!
    @IBOutlet weak var testActivityIndicator: UIActivityIndicatorView!
}