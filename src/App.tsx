import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Header } from './components/Header/Header';
import { ToDoContainer } from './components/TodoContainer';

export const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: ()=>console.log('Set theme not implemented'),
})

function App() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>( localStorage.getItem('theme') as 'dark' || 'dark');

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'dark' | 'light');
    }
  }, []);


  

  function toggleTheme() {

    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className={`App ${theme === 'dark' ? 'App_dark' : 'App_light'}`}>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <Header />
        <ToDoContainer />
      </ThemeContext.Provider>
    </div>
    
  );
}

export default App;
