import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Pressable, Dimensions, TextInput, Button} from 'react-native';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity } from 'react-native';


export default function TodoList() {
    // State Hooks
    const [tasks, setTasks] = useState([{}]);
    const [text, setText] = useState('');

    // Function to Add Task
    function addTask() {
        const newTask = { id: Date.now(), text, completed: false };
        setTasks([...tasks, newTask]);
        setText(' ');
    }

    // Function to Delete Task
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    // Function to Toggle Task Completion
    function toggleCompleted(id) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }
    // Render TodoList Component
    return (
        <View style={styles.container}>
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                />
            ))}
            <TextInput
                style = {styles.input} placeholder = "Enter a task" value = {text} onChangeText = {setText}
            />
            <Button title="Add" onPress={addTask} />
        </View>
    );
    // TodoItem Component
    function TodoItem({ task, deleteTask, toggleCompleted, addTask }) {
        const [toggleCheckBox, setToggleCheckBox] = useState(false);
        return (
            <View style={styles.todoItem}>
              <Checkbox
                value={task.completed}
                onValueChange={() => toggleCompleted(task.id)}
              />
              <Text style={[styles.todoItemText, task.completed && styles.completed]}>
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

    
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.8, // 80% of screen width
        height: windowHeight * .40,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        marginTop: 20,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    todoitemText: {
        fontSize: 20,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginLeft: 'auto',
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
});

