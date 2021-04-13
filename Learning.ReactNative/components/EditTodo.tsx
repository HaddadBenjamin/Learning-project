import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import ITodo from './todo.model'
import style from '../style'
import Toggle from '../shared/Toggle'
import Bookmark from '../shared/Bookmark'

interface Props { todo : ITodo }
export default function EditTodo({ todo : {title}, }: Props)
{
  return <View>
      <Text>test</Text>
  </View>
}