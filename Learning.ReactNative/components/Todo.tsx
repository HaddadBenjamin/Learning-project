import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style'
import ITodo from './todo.model'
// @ts-ignore
import Checkbox from 'nachos-ui'
import style from '../style'

export default function Todo({title, completed, bookmarked, id, subTasks, note} : ITodo)
{
  const [toggled, setToggled] = useState<boolean>(completed)

  return <View style={styles.todoContainer}>
    <Checkbox
          style={style.todoCheckbox}
          kind='circle'
          checked={toggled}
          onValueChange={() => setToggled(!toggled)}/>

    <Text>{title}</Text>

    <Image source={require('../images/star.png')}/>
  </View>
}