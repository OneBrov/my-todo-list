import React from 'react'
import { ChangeThemeButton } from './ChangeThemeButton';
import './Header.css';

export const Header = () => {
  return (
    <header className='header'>
        <h1>MyToDoList</h1>
        <ChangeThemeButton />
    </header>
  )
}
