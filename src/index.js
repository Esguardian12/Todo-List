import Storage from './Storage.js';
import Todo from './Todo.js'; // <-- You must import this to create a new Todo!

// 1. Load the data (will return the saved array, or a fresh "Inbox" array)
let myProjects = Storage.load();

// 2. Do something to the data (e.g., User creates a new Todo)
const newTodo = new Todo("Buy Groceries", "Milk, Eggs, Bread", "2026-07-05", "High");
myProjects[0].addTodo(newTodo);

// 3. Save the updated data back to localStorage
Storage.save(myProjects);

console.log("Data successfully saved and loaded!", myProjects);