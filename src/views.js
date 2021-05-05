import {getFilters } from "./filters"
import moment from 'moment'
import {removeTodo, getTodos, toggleTodo} from "./todos"

// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {
    
    const todos = getTodos()
    if (!todos ) {return}
    const todoEl = document.querySelector('#todos-div')
    todoEl.innerHTML = ""
    const hide = getFilters().hideCompleted
    const search = getFilters().searchText.toLowerCase()
    // todos.forEach((todo) => { 
    //    if (!hide || !(hide && todo.completed)) {
    //        if (todo.todoText.toLowerCase().includes(search)){
    //             const todoEl = generateTodoDOM(todo)
    //             document.querySelector("#todos-div").append(todoEl)
    //        }
    //    }
    // })
    const filteredTodos = todos.filter((todo) => { 
       const hideMatch = !hide || !todo.completed
       const searchMatch = todo.todoText.toLowerCase().includes(search)
       return hideMatch && searchMatch
    })
    const summaryEl = document.querySelector('#todo-completed')
    summaryEl.innerHTML = ''
    if (filteredTodos.length > 0){
        filteredTodos.forEach((todo)=> todoEl.appendChild(generateTodoDOM(todo)))
        const incompletedTodos = filteredTodos.filter((todo)=>!todo.completed)    
        summaryEl.appendChild(generateSummaryDOM (incompletedTodos))
    }
    else{
        const messageEl = document.createElement('p')
        messageEl.classList.add("empty-message")
        messageEl.textContent = "No todo"
        summaryEl.appendChild(messageEl)
    }
}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generateTodoDOM = (todo) => { 
    const dv = document.createElement('div')
    const lb = document.createElement('label')
    const cb = document.createElement('input')
    const sp = document.createElement('span')
    const statusEl = document.createElement('p')
    const removeBtn = document.createElement('button')
    
    //setup check box
    cb.setAttribute('type','checkbox')
    cb.checked = todo.completed 
    dv.appendChild (cb) 
    cb.addEventListener('change',function(e){
        toggleTodo(todo.id)
        renderTodos()
        
    })
    //setup span text
    sp.textContent =  todo.todoText 
    dv.appendChild (sp)
    //setup container
    lb.classList.add('list-item')
    dv.classList.add('list-item__container')
    lb.appendChild(dv)
    //last updated
    statusEl.textContent = generateLastUpdated(todo)
    statusEl.classList.add('list-item__subtitle')
    lb.appendChild(statusEl)
    //setup remove button
    removeBtn.textContent = 'remove'
    removeBtn.classList.add('button','button--text')
    lb.appendChild (removeBtn)
    removeBtn.addEventListener('click', function(){
        removeTodo(todo.id)
        renderTodos()
    })
    
    return lb
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummaryDOM = (incompletedTodos) => {
    const summaryEl = document.createElement("h2")
    const plural = incompletedTodos.length > 1 ? "s" : ""
    summaryEl.textContent = `You have ${incompletedTodos.length} todo${plural} left `
    summaryEl.classList.add('list-title')
    return summaryEl
}
const generateLastUpdated = (todo) => {
    
    if (todo.modifyAt){
       return 'last updated ' + moment(todo.modifyAt).fromNow()  
    }
    else {
       return 'created ' + moment(todo.createAt).fromNow() 
    }
}

// Make sure to set up the exports
export {renderTodos, generateTodoDOM, generateSummaryDOM}