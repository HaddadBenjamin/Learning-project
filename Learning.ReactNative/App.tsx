import React from 'react';
import {StatusBar, View } from 'react-native';
import style from './style'
import TodoList from './components/TodoList'
import EditTodo from './components/EditTodo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export default function App()
{
  const Stack = createStackNavigator();

  return <View style={style.background}>
      <StatusBar hidden />
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Liste de tâches" component={TodoList} options={{headerShown: false}} />
        <Stack.Screen name="Éditer une tâche" component={EditTodo} />
      </Stack.Navigator>
      </NavigationContainer>
  </View>
}