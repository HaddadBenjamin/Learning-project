import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import ITodo from './todo.model'
import style from '../style'
import Toggle from '../shared/Toggle'
import Bookmark from '../shared/Bookmark'

interface Props { todo : ITodo }
export default function Todo({ todo : {title, completed, bookmarked, id, subTasks, note} }: Props)
{
  const onToggle = (toggled : boolean) => void { }
  const onBookmark = (toggled : boolean) => void { }
  {/* Doit dispatcher un évènement redux qui met à jour l'état completed de l'id de cette todo */}
  
  return <View style={style.todoBackground}>
    <View style={style.todoContainer}>
      <View style={{flex : 1, flexDirection : 'row'}}>
        <Toggle isChecked={completed} onToggle={onToggle}/>
        <Text style={{marginLeft : 10}}>{title}</Text>
      </View>

      <Bookmark isBookmarked={bookmarked} onBookmark={onBookmark}/>
    </View>
  </View>
}