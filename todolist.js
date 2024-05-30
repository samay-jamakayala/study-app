import React, { useState } from 'react';
import { View, TextInput, Button, CheckBox, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default function TodoList() {
    // State Hooks
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    // Function to Add Task
    function addTask() {
        const newTask = { id: Date.now(), text, completed: false };
        setTasks([...tasks, newTask]);
        setText('');
    }

    // Function to Delete Task
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    // Function to Toggle Task Completion
    function toggleCompleted(id) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }

    // TodoItem Component
    function TodoItem({ task }) {
        return (
            <View style={styles.todoItem}>
                <CheckBox
                    value={task.completed}
                    onValueChange={() => toggleCompleted(task.id)}
                />
                <Text style={[styles.todoitemText, task.completed && styles.completed]}>
                    {task.text}
                </Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTask(task.id)}
                >
                    <Text style={{ color: '#fff' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Render TodoList Component
    return (
        <View style={styles.container}>
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                />
            ))}
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="New Task"
                style={styles.input}
            />
            <Button title="Add" onPress={addTask} />
        </View>
    );
}
