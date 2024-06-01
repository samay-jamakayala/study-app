import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { addTask, deleteTask, toggleCompleted } from './todoutils';

const TodoItem = ({ task, deleteTask, toggleCompleted }) => {
    return (
        <View style={styles.todoItem}>
            <TouchableOpacity style={styles.checkbox} onPress={() => toggleCompleted(task.id)}>
                {task.completed && <MaterialIcons name="check" size={18} color="#fff" />}
            </TouchableOpacity>
            <Text style={[styles.todoItemText, task.completed && styles.completed]}>
                {task.text}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
                <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
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

export default TodoItem;
