import React from 'react'

interface Props
{
    onClick() : void
    icon? : string
    color? : ButtonColor
    style? : React.CSSProperties
    classes? : string
}

export enum ButtonColor
{
    Primary = 'primary',
    Secondary = 'secondary',
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
    Info = 'info',
    Light = 'light',
    Dark = 'dark'
}

const Button = React.memo((
{
    onClick, 
    icon = '', 
    color = ButtonColor.Primary, 
    style = {}, 
    classes = ''
} : Props) =>
{
    return <button type="button" className={`btn btn-${color} ${classes}`.trim()} onClick={onClick} style={style}>
        <i className={`fas fa-${icon}`}></i>
    </button>
})

export default Button