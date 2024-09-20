import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { todoContext } from "../contexts/TodoContexts";
import { useState, useContext, useEffect } from "react";

export default function ToDoList() {
  const {todos, setTodos} = useContext(todoContext);
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [hasError, setHasError] = useState(false);
  const [filter, setFilter] = useState("all");
  const compeletedTodos = todos.filter((todo) => todo.isDone);
  const notCompeletedTodos = todos.filter((todo) => !todo.isDone);
  let allTodos = todos;


  if (filter === "done") {
    allTodos = compeletedTodos;
  } else if (filter === "not") {
    allTodos = notCompeletedTodos;
  } else {
    allTodos = todos;
  }

  const todo = allTodos.map((todo) => {
    return (
      <ToDo
        key={todo.id}
        todo={todo}
      />
    );
  });
  function handleAdd() {
    if (newTodoTitle.trim() === "") {
      setHasError(true);  
      return;
    }
    const newTodo = {
        id: uuidv4(),
        title: newTodoTitle,
        details: "",
        isDone: false,
      }
    const newTodos = [...todos, newTodo];  
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setNewTodoTitle(""); 
    setHasError(false);  
  }
  useEffect(() => {
    const todos = localStorage.getItem("todos");
    setTodos(JSON.parse(todos) || []);
  }, [])
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}
            style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />
          <ToggleButtonGroup
            aria-label="text alignment"
            style={{
              marginTop: "30px",
              direction: "ltr",
            }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            color="primary"
          >
            <ToggleButton value="not">غير منجز</ToggleButton>
            <ToggleButton value="done">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {todos.length === 0 ? (
            <Typography variant="h5" style={{ marginTop: "30px", marginBottom: "30px" }}>
              لا يوجد مهام
            </Typography>
          ) : (
            todo
          )}

          <Grid container spacing={2}>
            <Grid
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              size={8}
              style={{ direction: "ltr" }}
            >
              <TextField
                style={{ width: "100%" }}
                fullWidth
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}

                error={hasError}
        helperText={hasError ? "برجاء ادخال عنوان للمهمه" : ""}
              />

            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={handleAdd}
              >
                اضافه
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
