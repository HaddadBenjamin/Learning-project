import React from 'react';
import {StatusBar } from 'react-native';
import styles from './style'
import TodoList from './components/TodoList'
import { LinearGradient } from 'expo-linear-gradient'

export default function App()
{
  return <LinearGradient
        colors={['#420285', '#346fef']}
        start={[0.0, 1.0]}
        end={[0.0, 1.0]}
        style={styles.background}>
    <StatusBar hidden />
    <TodoList/>
    </LinearGradient>
}