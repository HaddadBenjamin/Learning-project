import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import ITodo from './todo.model'
import style from '../style'
import Toggle from '../shared/Toggle'
import Bookmark from '../shared/Bookmark'

interface Props { todo : ITodo }
export default function Todo({ todo } : Props)
{
  const {title, completed, bookmarked} = todo

  const onToggle = (toggled : boolean) => void { }
  const onBookmark = (toggled : boolean) => void { }
  {/* Doit dispatcher un évènement redux qui met à jour l'état completed de l'id de cette todo */}
  
  const onTitleClick = () => { /* navigation.navigate('Éditer une tâche', { todo : todo}) */}
  
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