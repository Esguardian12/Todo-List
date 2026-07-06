import Project from './Project.js';
import Todo from './Todo.js';

export default class Storage {
    
    // Call this every time you add, edit, or delete a Todo or Project
    static save(projectsArray) {
        localStorage.setItem('todoProjects', JSON.stringify(projectsArray));
    }

    // Call this exactly once when your index.js first loads
    static load() {
        const storedData = localStorage.getItem('todoProjects');

        // 1. CRASH PREVENTION: If it's the user's first time here, there is no data.
        if (!storedData) {
            console.log("No local data found. Initializing default project.");
            const defaultProject = new Project("Inbox");
            return [defaultProject]; // Return an array with just the default project
        }

        // 2. Parse the JSON back into plain, "dumb" JavaScript objects
        const parsedData = JSON.parse(storedData);

        // 3. RE-HYDRATION: Turn the dumb objects back into smart Class instances
        const restoredProjects = parsedData.map(rawProject => {
            
            // Create a fresh Project instance using the saved name
            const projectInstance = new Project(rawProject.name);
            projectInstance.id = rawProject.id; // Keep the original ID

            // Now loop through this project's raw todos and turn them into real Todos
            projectInstance.todos = rawProject.todos.map(rawTodo => {
                const todoInstance = new Todo(
                    rawTodo.title, 
                    rawTodo.description, 
                    rawTodo.dueDate, 
                    rawTodo.priority
                );
                
                // Manually restore properties that aren't set in the constructor
                todoInstance.id = rawTodo.id;
                todoInstance.isComplete = rawTodo.isComplete;
                todoInstance.notes = rawTodo.notes;
                
                return todoInstance;
            });

            return projectInstance;
        });

        return restoredProjects;
    }
}