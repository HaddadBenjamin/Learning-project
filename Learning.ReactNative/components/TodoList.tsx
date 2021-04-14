import React from 'react'
import { Text, View } from 'react-native'
import style from '../style'
import Todo from './Todo'
import AddTodo from './AddTodo'
import ITodo from './todo.model'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { IGlobalState } from '../store'
import FadeInView from '../shared/FadeInView'

export default function TodoList()
{
  const todos = useSelector<IGlobalState, ITodo[]>(_ => _.todos.todos)

  const doneTodos : ITodo[] = todos.filter(todo => todo.completed).sort((a, b) => (a === b) ? 0 : a.bookmarked ? -1 : 1)
  const undoneTodos : ITodo[] = todos.filter(todo => !todo.completed).sort((a, b) => (a === b) ? 0 : a.bookmarked ? -1 : 1)

  let animationDelay : number = 0

  const displayTodo = (todo : ITodo) =>
  {
    animationDelay += 400

    return <FadeInView delay={animationDelay}>
      <Todo todo={todo} key={todo.id}/>
    </FadeInView>
  }

  const incrementAnimationDelay = (increment : number) => { animationDelay += increment}

  return <LinearGradient
            colors={['#420285', '#346fef']}
            start={[0.0, 1.0]}
            end={[1.0, 1.0]}
            style={style.background}>
    <View style={style.container}>
      <FadeInView delay={animationDelay + 800}>
        <Text style={style.mainTitle}>Tâches</Text>
      </FadeInView>
      {undoneTodos.map(displayTodo)}
      {incrementAnimationDelay(400)}
      <FadeInView delay={animationDelay}>
        <Text style={style.completedTitle}>Terminées</Text>
      </FadeInView>
      {doneTodos.map(displayTodo)}
      
      <LinearGradient
          colors={['#240b36', '#420285','#346fef', '#420285', '#240b36']}
          start={[1.0, 1.0]}
          end={[1.0, 0.0]}
          style={style.addTodoMainContainer}></LinearGradient>
          
      <AddTodo animationDelay={animationDelay + 800}/>
    </View>
  </LinearGradient>
}