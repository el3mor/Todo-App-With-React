import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { todoContext } from "../contexts/TodoContexts";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function ToDo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const {todos, setTodos} = useContext(todoContext);
  

  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,  
    details: todo.details
  });

  function handleDeleteDialogOpen() {
    setShowDeleteDialog(true);
  }
  function handleEidtDialogOpen() {
    setShowUpdateDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleEidtDialogClose() {
    setShowUpdateDialog(false);
  }
  function confirmDelete() {
    const newTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function handleCheck() {
    const newTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  function handleUpdate() {
   const newTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {...t, title: updateTodo.title, details: updateTodo.details};
      }else {
        return t;
      }}); 
    setTodos(newTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  return (
    <>
    {/* Delete Dialog */}
    <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        هل انت متأكد من رغبتك في حذف المهمه ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          سيتم حذف المهمه نهائياً ولا يمكن استعادتها بعد الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={confirmDelete}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

    {/* Update Dialog  */}
    <Dialog
        open={showUpdateDialog}
        style={{ direction: "rtl" }}
        onClose={handleEidtDialogClose}
        
      >
        <DialogTitle>تعديل المهمه</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            label="العنوان"
            value={updateTodo.title}
            fullWidth
            onChange={(e) => setUpdateTodo({
              ...updateTodo,
              title: e.target.value
            })}
            variant="standard"
          />
          <TextField
            margin="normal"
            id="name"
            label="التفاصيل"
            value={updateTodo.details}
            onChange={(e) => setUpdateTodo({
              ...updateTodo,
              details: e.target.value
            })
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEidtDialogClose}>الغاء</Button>
          <Button  onClick={handleUpdate} type="submit" >تعديل</Button>
        </DialogActions>
      </Dialog>

    <Card
      className="todoCard"
      sx={{
        minWidth: 275,
        background: "#283593",
        color: "white",
        marginTop: "5px",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={8} style={{ textAlign: "right" }}>
            <Typography sx={
              {textDecoration: todo.isDone? "line-through" : "none",}
            } variant="h5">{todo.title}</Typography>
            <Typography variant="h6">{todo.details}</Typography>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              className="iconButton"
              size="small"
              aria-label="check"
              onClick={handleCheck}
              style={{
                color: todo.isDone? "white" : "#8bc34a",
                background: todo.isDone? "#8bc34a" : "white",
                border: "solid 3px #8bc34a",
              }}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton
              className="iconButton"
              size="small"
              aria-label="check"
              style={{
                color: "#1769aa",
                background: "white",
                border: "solid 3px #1769aa",
              }}
              onClick={handleEidtDialogOpen}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              className="iconButton"
              size="small"
              aria-label="check"
              
              style={{
                color: "#b23c17",
                background: "white",
                border: "solid 3px #b23c17",
              }}
              onClick={handleDeleteDialogOpen}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </>
  );
}
