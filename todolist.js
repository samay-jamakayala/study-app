import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons for the checkbox
// import DraggableFlatList from 'react-native-draggable-flatlist';

export default function TodoList() {
    // State Hooks
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [inputVisible, setInputVisible] = useState(false);

    // Function to Add Task
    function addTask() {
        if (text.trim()) {
            const newTask = { id: Date.now(), text, completed: false };
            setTasks([...tasks, newTask]);
            setText('');
            Keyboard.dismiss(); // Dismiss the keyboard
        }
    }

    // Function to Delete Task
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    // Function to Toggle Task Completion
    function toggleCompleted(id) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }
    // const renderItem = ({ item, drag, isActive }) => {
    //     return (
    //         <TouchableOpacity
    //             style={[
    //                 styles.todoItem,
    //                 { backgroundColor: isActive ? '#e0e0e0' : '#fff' },
    //             ]}
    //             onLongPress={drag}
    //         >
    //             <MaterialIcons name="drag-handle" size={24} color="#000" style={styles.dragHandle} />
    //             <CustomCheckbox
    //                 completed={item.completed}
    //                 onPress={() => toggleCompleted(item.id)}
    //             />
    //             <Text style={[styles.todoItemText, item.completed && styles.completed]}>
    //                 {item.text}
    //             </Text>
    //             <TouchableOpacity
    //                 style={styles.deleteButton}
    //                 onPress={() => deleteTask(item.id)}
    //             >
    //                 <Text style={{ color: '#fff' }}>X</Text>
    //             </TouchableOpacity>
    //         </TouchableOpacity>
    //     );
    // };
    // Custom Checkbox Component
    function CustomCheckbox({ completed, onPress }) {
        return (
            <TouchableOpacity
                style={[styles.checkbox, completed && styles.checkboxCompleted]}
                onPress={onPress}
            >
                {completed && <MaterialIcons name="check" size={18} color="#000" />}
            </TouchableOpacity>
        );
    }

    // TodoItem Component
    function TodoItem({ task, deleteTask, toggleCompleted }) {
        return (
            <View style={styles.todoItem}>
                <CustomCheckbox
                    completed={task.completed}
                    onPress={() => toggleCompleted(task.id)}
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

    // Render TodoList Component
    return (
        <View style={styles.container}>
        <View style={styles.todoContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a task..."
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={addTask} // Add task when return key is pressed
                    returnKeyType="done" // Set return key type to 'done'
                    autoFocus={true} // Automatically focus the input when it appears
                />
                <Button title="Add" onPress={addTask} />
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {tasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                    />
                ))}
            </ScrollView>
            {/* <DraggableFlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onDragEnd={({ data }) => setTasks(data)}
            /> */}
        </View>
    </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        flex: 1,
        width: windowWidth * 0.8, // 80% of screen width
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        padding: 20,
        marginTop: -70,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#F3F3F3',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#F3F3F3',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#F3F3F3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        color: '#000',
    },
    scrollContainer: {
        flex: 1,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    checkbox: {
        width: 24,
        height: 24,
        // borderRadius: 12, // Make it a circle
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxCompleted: {
        backgroundColor: '#F3F3F3', // Changed color to black
    },
    todoItemText: {
        flex: 1,
        fontSize: 18,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
});


