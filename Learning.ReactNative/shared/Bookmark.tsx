import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import style from '../style'

interface Props { isBookmarked : boolean, onBookmark : (isBookmarked : boolean) => void }
export default function Toggle({ isBookmarked, onBookmark } : Props)
{
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked)

  const onPress = () =>
  {
    onBookmark(!bookmarked)
    setBookmarked(!bookmarked)
  }
  
  return <TouchableOpacity style={style.bookmark} onPress={onPress}>
    {bookmarked ? <Image source={require('../images/filledStar.png')} style={style.bookmark}/> : 
                  <Image source={require('../images/star.png')} style={style.bookmark}/> }
  </TouchableOpacity>
}