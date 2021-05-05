import moment from 'moment'
import uuidv4 from 'uuid/v4'
import { getFilters, setFilters } from './filters'
// Setup the empty todos array
let todos = {}

// loadTodos
// Arguments: none
// Return value: none
const loadTodos = () => {
    const Jstorage = localStorage.getItem('todos')
    try {
        todos = Jstorage ? JSON.parse(Jstorage) : []
    }
    catch(e){
        todos = []
    }
}
loadTodos()

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = () =>{
    localStorage.setItem('todos',JSON.stringify(todos))
}
// getTodos
// Arguments: none
// Return value: todos array
//expose notes from module
const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (todoText) => {
    if (todoText.length === 0) {return}
    const uId = uuidv4()
    
    todos.push( {id:uId,
          todoText: todoText,
          createAt: moment(),
          modifyAt: '',
          completed:false})
    
    saveTodos()
}
// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex,1)
    }
    saveTodos()
 }

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId)
    
    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
        todos[todoIndex].modifyAt = moment()
    }
    saveTodos()
}
const sortTodos = () => {
    const sortBy = getFilters().sortBy
    if (sortBy === 'edited-L'){
        return todos.sort((a,b)=>{
            
            if (a.modifyAt > b.modifyAt) { 
                return 1
            }
            else if (a.modifyAt < b.modifyAt){
                return -1
            } else {
                return 0
            }
        })
    }
    if (sortBy === 'edited-R'){
        return todos.sort((a,b)=>{
            
            if (a.modifyAt > b.modifyAt) { 
                return -1
            }
            else if (a.modifyAt < b.modifyAt){
                return 1
            } else {
                return 0
            }
        })
    }
    else if (sortBy === 'created-L'){
        return todos.sort((a,b)=>{
            if (a.createAt > b.createAt) { 
                return 1
            }
            else if (a.createAt < b.createAt){
                return -1
            } else {
                return 0
            }
        })
    }
    else if (sortBy === 'created-R'){
        return todos.sort((a,b)=>{
            if (a.createAt > b.createAt) { 
                return -1
            }
            else if (a.createAt < b.createAt){
                return 1
            } else {
                return 0
            }
        })
    }
    else if (sortBy === 'alphabet-A'){
        return todos.sort((a,b)=>{
            if (a.todoText > b.todoText) { 
                return 1
            }
            else if (b.todoText > a.todoText){
                return -1
            } else {
                return 0
            }
        })
    }
    else if (sortBy === 'alphabet-D'){
        return todos.sort((a,b)=>{
            if (a.todoText > b.todoText) { 
                return -1
            }
            else if (b.todoText > a.todoText){
                return 1
            } else {
                return 0
            }
        })
    }
    else {
        return todos
    }
}

// Make sure to call loadTodos and setup the exports
export {createTodo, removeTodo, toggleTodo, sortTodos, getTodos, loadTodos}