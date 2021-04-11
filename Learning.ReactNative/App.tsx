import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import styles from './style'
import TodoList from './components/TodoList'

export default function App()
{
  return <View style={styles.background}>
    <StatusBar hidden />
    <TodoList/>
  </View>
}