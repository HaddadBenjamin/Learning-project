import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style'
import ITodo from './todo.model'
// @ts-ignore
import Checkbox from 'nachos-ui'
import style from '../style'

interface Props { todo : ITodo }
export default function Todo({ todo : {title, completed, bookmarked, id, subTasks, note} }: Props)
{
  const [toggled, setToggled] = useState(completed)
  {/* Doit dispatcher un évènement redux qui met à jour l'état completed de l'id de cette todo */}

  
  return <View style={style.todoBackground}>
    <View style={styles.todoContainer}>
      {/* <Checkbox
            style={style.todoCheckbox}
            kind='circle'
            checked={toggled}
            onValueChange={(isToggled : boolean) => setToggled(!isToggled)}/> */}

      <Text>{title}</Text>

      <Image source={require('../images/star.png')} style={style.todoBookmark}/>
    </View>
  </View>
}