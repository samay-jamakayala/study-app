import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TextInput, Button } from 'react-native'; // Import TextInput and Button
import TodoItem from './todoitem'; // Import the TodoItem component
import { addTask, deleteTask, toggleCompleted } from './todoutils';

export default function TodoList() {
    // State Hooks
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    // Render TodoList Component
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                 <TextInput
                    style={styles.input}
                    placeholder="Enter a task"
                    value={text}
                    onChangeText={setText}
                />
                <Button title="Add" onPress={addTask} />
            </View>
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                />
            ))}
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#F3F3F3',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    container: {
        flex: 1,
        width: windowWidth * 0.8,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        marginBottom: 7,
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
});
