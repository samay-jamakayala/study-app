// TodoUtils.js
export const addTask = (tasks, setTasks, text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
};

export const deleteTask = (tasks, setTasks, id) => {
    setTasks(tasks.filter(task => task.id !== id));
};

export const toggleCompleted = (tasks, setTasks, id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
};
