import './App.css'
import ToDoList from './components/ToDoList'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';
import { todoContext } from './contexts/TodoContexts';
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },

  palette: {
    primary: {
      main: "#283593",
    },
  },
});

function App() {
  const initialTodos = [
  ]
  const [todos, setTodos] = useState(initialTodos);
  return (

    <ThemeProvider theme={theme}>
      
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor:"#191b1f",
      textAlign:"center",
      direction:"rtl"
    }}>
      <todoContext.Provider value={{todos, setTodos}}>
    <ToDoList/>
    </todoContext.Provider>
    </div>
    
    </ThemeProvider>
  )
}

export default App
