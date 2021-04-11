import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../style'
import Todo from './Todo'
import ITodo from './todo.model'

const initialTodos : ITodo[] = [
  { title : 'Faire les courses', completed : false, bookmarked : false, id : '1', subTasks : [], note : '' },
  { title : 'Faire à manger', completed : false, bookmarked : true, id : '2', subTasks : [], note : '' },
  { title : 'Faire la cuisine', completed : false, bookmarked : false, id : '3', subTasks : [], note : '' },
  { title : 'Laver ma chambre', completed : true, bookmarked : false, id : '4', subTasks : [], note : '' },
]

export default function TodoList()
{
  const [todos, setTodos] = useState<ITodo[]>(initialTodos)

  const doneTodos : ITodo[] = todos.filter(todo => todo.completed);
  const undoneTodos : ITodo[] = todos.filter(todo => !todo.completed)

  return <View style={styles.container}>
    <Text style={styles.mainTitle}>Tâches</Text>
    {doneTodos.map(todo => <Todo {...todo} key={todo.id}/>)}
    <Text>Terminés</Text>
    {undoneTodos.map(todo => <Todo {...todo} key={todo.id}/>)} 
  </View>
}