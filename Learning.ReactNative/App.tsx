import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import styles from './style.js'

export default function App()
{
  return <View style={styles.background}>
    <StatusBar hidden />
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Tâches</Text>
    </View>
  </View>
}