// 1. Import exactly the functions you need from the library
import { format, isPass } from 'date-fns';

export default class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        // dueDate will likely come from an HTML <input type="date">, 
        // which outputs a string like "2026-07-02"
        this.dueDate = dueDate;
        this.priority = priority;
       
    }

    // A method to get a nice, readable date for your UI
    getFormattedDate() {
        if(!this.dueDate) return "No Date Set";

        // We wrap this.dueDate in new Date() because date-fns expects 
        // a real JavaScript Date object, not a plain text string.
        const dateObject= new Date(this.dueDate);

        // 'MMM do, yyyy' formats it to "Jul 2nd, 2026"
        return format(dateObject, 'MMM do, yyyy');
    }

    // A method to check if the user missed their deadline
    isOverDue(){
        if(!this.dueDate) return false;

        const dateObject = new Date(this.dueDate);
        return isPast(dateObject);
    }
}