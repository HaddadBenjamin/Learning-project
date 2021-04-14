import React from 'react';
import { View, Text } from 'react-native';
import ITodo from './todo.model'
import style from '../style'
import { LinearGradient } from 'expo-linear-gradient'

interface Props { todo : ITodo }
export default function EditTodo(todo : Props)
{
  return <LinearGradient
            colors={['#420285', '#346fef']}
            start={[0.0, 1.0]}
            end={[1.0, 1.0]}
            style={style.background}>
    <Text>{JSON.stringify(todo)}</Text>
  </LinearGradient>
}