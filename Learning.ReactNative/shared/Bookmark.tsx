import React, { useState } from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';
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

  const bookmarkStyle = bookmarked ? [style.bookmark, style.bookmarked] : style.bookmark 
  
  return <TouchableWithoutFeedback style={style.bookmark} onPress={onPress}>
    {bookmarked ? <Image source={require('../images/filledStar.png')} style={bookmarkStyle}/> : 
                  <Image source={require('../images/star.png')} style={bookmarkStyle}/> }
  </TouchableWithoutFeedback>
}