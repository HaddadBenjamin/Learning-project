import React from 'react';
import { View } from 'react-native';
import styles from '../style'
import ITodo from './todo.model'

export default function Todo({title, completed, bookmarked, id, subTasks, note} : ITodo)
{
  return <View style={styles.todoContainer}>
  </View>
}