// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary
import {setFilters } from "./filters";
import {createTodo, sortTodos, loadTodos} from "./todos"
import {renderTodos} from "./views";
// --

// Add necessary imports

// Render initial todos
sortTodos()
renderTodos()
// Set up search text handler
document.querySelector('#search-text').addEventListener('input', function (e) {
    setFilters({searchText: e.target.value.trim()})
    renderTodos()
})
// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change',function(e){
    setFilters({hideCompleted:e.target.checked})
    renderTodos()
})
//sort by created,  modified, first alphabet
document.querySelector('#sort-by').addEventListener('change',function(e){
    setFilters({sortBy:e.target.value})
    sortTodos()
    renderTodos()
})

// Set up form submission handler
document.querySelector('#todo-form').addEventListener('submit',function(e){
    e.preventDefault()
    createTodo(e.target.elements.newTodo.value.trim())
    renderTodos()
})
// Bonus: Add a watcher for local storage
window.addEventListener('storage',function(e){
    if (e.key==='todos'){
        loadTodos()
        renderTodos()
    }
})
