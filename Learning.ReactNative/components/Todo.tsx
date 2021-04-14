import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import ITodo from './todo.model'
import style from '../style'
import Toggle from '../shared/Toggle'
import Bookmark from '../shared/Bookmark'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { bookmarkTodo, toggleTodo } from './todo.action'

interface Props { todo : ITodo }
export default function Todo({ todo } : Props)
{
  const {title, completed, bookmarked, id} = todo
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const onToggle = (toggled : boolean) => { dispatch(toggleTodo(id)) }
  const onBookmark = (toggled : boolean) =>  { dispatch(bookmarkTodo(id)) }
  
  const onTitleClick = () => { navigation.navigate('Éditer une tâche', todo) }

  return <View style={style.todoBackground}>
    <View style={style.todoContainer}>
      <View style={style.todoLeftContainer}>
        <Toggle isChecked={completed} onToggle={onToggle}/>
        <TouchableWithoutFeedback style={style.todoTitle} onPress={onTitleClick}>
          <Text style={style.todoTitle}>{title}</Text>
        </TouchableWithoutFeedback>
      </View>

      <Bookmark isBookmarked={bookmarked} onBookmark={onBookmark}/>
    </View>
  </View>
}