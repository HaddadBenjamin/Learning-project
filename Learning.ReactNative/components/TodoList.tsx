import React, { useState } from 'react';
import { Text, View } from 'react-native';
import style from '../style';
import Todo from './Todo'
import AddTodo from './AddTodo'
import ITodo from './todo.model'
import { LinearGradient } from 'expo-linear-gradient'

const initialTodos : ITodo[] = [
  { title : 'Faire les courses', completed : false, bookmarked : false, id : '1', subTasks : [], note : '' },
  { title : 'Faire à manger', completed : false, bookmarked : true, id : '2', subTasks : [], note : '' },
  { title : 'Faire la cuisine', completed : false, bookmarked : false, id : '3', subTasks : [], note : '' },
  { title : 'Laver ma chambre', completed : true, bookmarked : false, id : '4', subTasks : [], note : '' },
]

export default function TodoList()
{
  const [todos, setTodos] = useState<ITodo[]>(initialTodos)

  const doneTodos : ITodo[] = todos.filter(todo => todo.completed).sort((a, b) => (a === b) ? 0 : a.bookmarked ? -1 : 1)
  const undoneTodos : ITodo[] = todos.filter(todo => !todo.completed).sort((a, b) => (a === b) ? 0 : a.bookmarked ? -1 : 1)

  return <View style={style.container}>
    <Text style={style.mainTitle}>Tâches</Text>
    {undoneTodos.map(todo => <Todo todo={todo} key={todo.id}/>)} 

    <Text style={style.completedTitle}>Terminées</Text>
    {doneTodos.map(todo => <Todo todo={todo} key={todo.id}/>)}
    
    <LinearGradient
        colors={['#240b36', '#420285','#346fef', '#420285', '#240b36']}
        start={[1.0, 1.0]}
        end={[1.0, 0.0]}
        style={style.addTodoMainContainer}></LinearGradient>
    <AddTodo/>
  </View>
}