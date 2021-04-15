import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export default function FadeInView({children, delay } : any)
{
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() =>
    {
        Animated.sequence([
            Animated.delay(delay || 0) ,
            // @ts-ignore
            Animated.timing(fadeAnim, { toValue: 1, duration: 500 })
        ]).start()
    }, [])
    
    return <Animated.View style={{opacity: fadeAnim}}>
        { children }
    </Animated.View>
}