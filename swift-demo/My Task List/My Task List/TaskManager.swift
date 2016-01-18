import UIKit

var taskManager: TaskManager = TaskManager()

struct Task {
    var name = "Un-Named"
    var desc = "Un-Described"
}

class TaskManager: NSObject {
    var tasks = [Task]()

    func addTask(name: String, desc: String) {
        tasks.append(Task(name: name, desc: desc))
    }
}
