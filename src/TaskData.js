export default class TaskNode {
    constructor(name, desc, priority, date, category, id) {
        this.taskName = name;
        this.taskDesc = desc;
        this.taskPriority = priority;
        this.taskStartDate = date;
        this.taskCategory = category;
        this.taskID = id;
    }
}