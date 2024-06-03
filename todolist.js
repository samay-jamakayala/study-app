import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons for the checkbox
import DraggableFlatList from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// please work 
// renamed file
export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    // adds tasks
    function addTask() {
        if (text.trim()) {
            const newTask = { id: Date.now().toString(), text, completed: false };
            setTasks([...tasks, newTask]);
            setText('');
            Keyboard.dismiss();
        }
    }

    // delete task
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    // toggle task completion
    function toggleCompleted(id) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }

    // Custom checkbox component
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
     // Todo item component
    function TodoItem({ task, deleteTask, toggleCompleted, drag, isActive }) {
        return (
            <TouchableOpacity
                style={[
                    styles.todoItem,
                    { backgroundColor: isActive ? '#e0e0e0' : '#F3F3F3' },
                ]}
                onLongPress={drag}
            >
                <MaterialIcons name="drag-indicator" size={24} color="#000" style={styles.dragHandle} />
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
            </TouchableOpacity>
        );
    }

    // renders todo items
    const renderItem = ({ item, drag, isActive }) => {
        return (
            <TodoItem
                task={item}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                drag={drag}
                isActive={isActive}
            />
        );
    };

    return (
        <GestureHandlerRootView>
            <View style={styles.todoContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a task..."
                        value={text}
                        onChangeText={setText}
                        onSubmitEditing={addTask}
                        returnKeyType="done"
                        autoFocus={true}
                    />
                    <Button title="Add" onPress={addTask} />
                </View>
                <View>
                    <DraggableFlatList style={{ height: windowHeight * 0.4 } }
                        data={tasks}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onDragEnd={({ data }) => setTasks(data)}
                        showsVerticalScrollIndicator={false}

                    />
                </View>
            </View>
        </GestureHandlerRootView>
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
        width: windowWidth * 0.8,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        padding: 20,
        marginTop: -70,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: '#F3F3F3',
        width: '100%',
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
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderRadius: 0,
        marginTop: 0,
        backgroundColor: '#F3F3F3',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: '#F3F3F3',
    },
    checkboxCompleted: {
        backgroundColor: '#F3F3F3',
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
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    dragHandle: {
        marginRight: 10,
    },
});


