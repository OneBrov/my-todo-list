import React from 'react'
import './index.scss'
import sun from '../../../assets/sun.svg';
import moon from '../../../assets/moon.svg';
import { ThemeContext } from '../../../App';


export const ChangeThemeButton = () => {
  const themeContext = React.useContext(ThemeContext); 

  const moonRef = React.useRef<HTMLImageElement>(null);
  const sunRef = React.useRef<HTMLImageElement>(null);

  const imagesRef = React.useRef<HTMLDivElement>(null);

  function handleChangeTheme() {
    const currentTheme = themeContext.theme;
    if (!imagesRef.current) return;

    if (currentTheme === 'dark') {
      
      imagesRef.current.scrollTo({
        top: 24,
        behavior: 'smooth'
      })
    } else {
      imagesRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    themeContext.toggleTheme();
  }


  return (
    <button className='button' onClick={handleChangeTheme}>
        <div ref={imagesRef} className={`theme-images ${themeContext.theme === 'dark' ? 'theme-images_dark' : 'theme-images_light'}`}>
          <img src={moon} width={24} height={24} alt={'themeChanger'}/>
          <img src={sun} width={24} height={24} alt={'themeChanger'}/>
        </div>
    </button>
  )
}
