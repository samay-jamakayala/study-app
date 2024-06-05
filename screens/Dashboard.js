import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable, Dimensions, Animated, Keyboard, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons for the checkbox
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import app from '../firebaseConfig';


export default function Dashboard({ route }) {
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);

  return (
    <SafeAreaView style={styles.appContainer}>
      <Navbar currentTimerIndex={currentTimerIndex} />
      <Timer currentTimerIndex={currentTimerIndex} setCurrentTimerIndex={setCurrentTimerIndex} />
    </SafeAreaView >
  );
}

function Navbar({ currentTimerIndex }) {
  const navigation = useNavigation();
  const timerDisplay = ["Work", "Short\nBreak", "Long\nBreak"];

  return (
    <View style={styles.navbarContainer}>
      <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Settings', {})}>
        <Icon name="cog" size={30} color="black" />
      </Pressable>
      <Text style={styles.timerTitle}>
        {timerDisplay[currentTimerIndex]}
      </Text>
      <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Profile', {})}>
        <Icon name="user" size={30} color="black" />
      </Pressable>
    </View>
  );
}

function Timer({ currentTimerIndex, setCurrentTimerIndex }) {

  // Timer data 
  // 0: 25 min, 1: 5 min, 2: 15 min
  const timerDurations = [25 * 60, 5 * 60, 15 * 60];

  // Timer state
  const [timeLeft, setTimeLeft] = useState(timerDurations[0]);
  const [isRunning, setIsRunning] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentPageIndex = Math.round(scrollPosition / windowWidth);

    setIsRunning(false);
    const newIndex = currentPageIndex % timerDurations.length;
    setCurrentTimerIndex(newIndex); // Use modulus operator to cycle through the array
    setTimer(newIndex);
  };

  // Set timer to a specific duration using timerDurations array
  const setTimer = (timerIndex) => {
    setIsRunning(false);
    setTimeLeft(timerDurations[timerIndex]);
    setCurrentTimerIndex(timerIndex);
  }

  // Reset timer to same state
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerDurations[currentTimerIndex]);
  };

  // Switches between Pomodoro to break, and vice versa
  const switchTimer = () => {
    let newIndex = currentTimerIndex === 0 ? 1 : 0;
    scrollViewRef.current?.scrollTo({
      x: newIndex * windowWidth, // Scroll to the correct page based on the index
      animated: true,
    });
  };

  // Timer functionality
  useEffect(() => {
    let interval = null;

    // Functionality for when timer reaches 0
    const handleTimerEnd = () => {
      clearInterval(interval);
      switchTimer();
      return 0;
    };

    // Countdown functionality
    const handleTimerRun = () => {
      return timeLeft - 1;
    };

    // Runs timer
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft <= 0 ? handleTimerEnd() : handleTimerRun());
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      // Paused timer
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentTimerIndex]);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timerScrollContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true, listener: handleScroll }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ justifyContent: 'space-between' }}
        >
          <View style={styles.scrollListItem}>
            <View style={styles.timerCircle}>
              <Text style={styles.timer}>{Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
            </View>
          </View>
          <View style={styles.scrollListItem}>
            <View style={styles.timerCircle}>
              <Text style={styles.timer}>{Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
            </View>
          </View>
          <View style={styles.scrollListItem}>
            <View style={styles.timerCircle}>
              <Text style={styles.timer}>{Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
            </View>
          </View>
        </Animated.ScrollView>
      </View>
      <View style={styles.timerControlCircle}>
        <View style={styles.timerControlContainer}>
          <Pressable style={styles.button} onPress={() => setIsRunning(!isRunning)}>
            <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={switchTimer}>
            <Text style={styles.buttonText}>Switch</Text>
          </Pressable>
        </View>
        <TodoList />
      </View>
    </View>
  );
}

function TodoList() {
  const auth = getAuth(app);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // adds tasks
  const addTask = () => {
    if (text.trim()) {
      const newTask = { id: Date.now().toString(), text, completed: false };
      setTasks([...tasks, newTask]);
      setText('');
      Keyboard.dismiss();
    }
  };

  // delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // toggle task completion
  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Custom checkbox component
  const CustomCheckbox = ({ completed, onPress }) => (
    <TouchableOpacity
      style={[styles.checkbox, completed && styles.checkboxCompleted]}
      onPress={onPress}
    >
      {completed && <MaterialIcons name="check" size={18} color="#000" />}
    </TouchableOpacity>
  );

  // Todo item component
  const TodoItem = ({ task, deleteTask, toggleCompleted, drag, isActive }) => (
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

  // renders todo items
  const renderItem = ({ item, drag, isActive }) => (
    <TodoItem
      task={item}
      deleteTask={deleteTask}
      toggleCompleted={toggleCompleted}
      drag={drag}
      isActive={isActive}
    />
  );

  // Load tasks from local storage
  useEffect(() => {
    const loadTasksFromStorage = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    loadTasksFromStorage();
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    const saveTasksToStorage = async () => {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    };

    saveTasksToStorage();
  }, [tasks]);

  // Sync tasks with Firebase
  useEffect(() => {
    const saveTasksToFirebase = async () => {
      const userId = auth.currentUser.uid;
      await firebase.firestore().collection('tasks').doc(userId).set({ tasks });
    };

    saveTasksToFirebase();
  }, [tasks]);

  return (
    <GestureHandlerRootView >
      <View style={styles.todoContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a task..."
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTask}
            returnKeyType="done"
          // autoFocus={true}
          />
          <Button title="Add" onPress={addTask} />
        </View>
        <DraggableFlatList style={{ height: '85%', width: '100%' }}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setTasks(data)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3E9E1',
    overflow: 'hidden',
  },
  navbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth * .8,
    height: 54,
  },
  timerTitle: {
    fontSize: 24,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconButton: ({ pressed }) => [
    {
      transform: [{ scale: pressed ? 0.95 : 1 }], // scale down when pressed
    },
  ],
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
    overflow: 'hidden'
  },
  timerScrollContainer: {
    height: 180,
  },
  scrollListItem: {
    alignItems: 'center',
    width: windowWidth,
  },
  timerCircle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 12, // Circle thickness
    borderColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontSize: 55,
    marginBottom: 20,
    marginTop: 20,
  },
  timerLengthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * .70, // 70% of screen width
    marginTop: 20,
    marginBottom: 10,
  },
  timerControlCircle: {
    width: windowWidth * 1.75, // 175% of screen width
    height: windowWidth * 1.75, // 175% of screen width
    borderRadius: (windowWidth * 1.75) / 2, // Creates Circle
    backgroundColor: '#D3CCC2',
    marginTop: 20,
    alignItems: 'center',
  },
  timerControlContainer: {
    flexDirection: 'row',
    marginTop: 60,
    width: windowWidth * .8, // 80% of screen width
    justifyContent: 'space-between',

  },
  button: ({ pressed }) => [
    {
      transform: [{ scale: pressed ? 0.95 : 1 }], // scale down when pressed
    },
    {
      width: 95,
      height: 45,
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10, // This adds a shadow on Android
      shadowColor: 'black', // This adds a shadow on iOS
      shadowOffset: { width: 0, height: 5 }, // This adds a shadow on iOS
      shadowOpacity: 0.5, // This adds a shadow on iOS
      shadowRadius: 10, // This adds a shadow on iOS
    },
  ],
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  todoPlaceHolder: {
    width: windowWidth * 0.8, // 80% of screen width
    height: windowHeight * .40,
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    marginTop: 20,
  },
  todoContainer: {
    flex: 1,
    width: windowWidth * 0.8,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    maxHeight: windowHeight * 0.43,
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