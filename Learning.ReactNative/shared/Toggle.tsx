import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, Image } from 'react-native';
import style from '../style'

interface Props { isChecked : boolean, onToggle : (isToggled : boolean) => void }
export default function Toggle({ isChecked, onToggle } : Props)
{
  const [checked, setChecked] = useState<boolean>(isChecked)

  const onPress = () =>
  {
    onToggle(!checked)
    setChecked(!checked)
  }
  
  const toggledStyle = checked ? [style.toggle, style.toggled] : style.toggle 

  return <View style={toggledStyle}>
    <TouchableWithoutFeedback style={style.toggle} onPress={onPress}>
      <View style={style.toggleContent}>
        {checked ? <Image source={require('../images/toggled.png')} style={style.toggledImage}/>: <View></View>}
      </View>
    </TouchableWithoutFeedback>
  </View>
}