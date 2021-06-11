(async () =>
{
    const todoLists = document.querySelectorAll('.done-todo-list, .undone-todo-list')
    const cleanTodos = () => todoLists.forEach(t => t.innerHTML = '')

    const apiUrl = "http://localhost:3004/todos"
    const generateTodoLists = async () =>
    {
        const todos = await (await fetch(apiUrl)).json();
       
        todos.forEach(todo => addTodo(todo))
    }

    let doneTodoList = document.querySelector('.done-todo-list')
    let undoneTodoList = document.querySelector('.undone-todo-list')
    const addTodo = ({ content, completed }) =>
    {
        let newTodo = document.createElement('div')
        let toggleClass = completed ? 'todo-toggle-checked' : 'todo-toggle'
        let todoList = completed ? doneTodoList : undoneTodoList

        newTodo.innerHTML = `
            <li class="todo">
                <div class="${toggleClass}">
                    <div class="todo-toggle-checked-image"></div>
                </div>
                <div class="todo-content">${content}</div>
                <div class="todo-remove"></div>
            </li>`

        todoList.appendChild(newTodo)  

        newTodo.querySelector('.todo-remove').addEventListener('click', removeTodoEventHandler)
        newTodo.querySelector('.todo-toggle, .todo-toggle-checked').addEventListener('click', toggleTodoEventHandler)
    }

    // Toggle todo
    let todoToggles = document.querySelectorAll('.todo-toggle, .todo-toggle-checked')

    const toggleTodoEventHandler = (event) =>
    {
        let toggle = event.target.parentElement.classList.contains('todo') ? event.target : event.target.parentElement
        let todo = toggle.parentElement
        
        toggle.classList.toggle('todo-toggle')
        toggle.classList.toggle('todo-toggle-checked')

        const toggled = toggle.classList.contains('todo-toggle-checked')
        const todoList = toggled ? doneTodoList : undoneTodoList
        
        todoList.appendChild(todo)
    }

    todoToggles.forEach(toggle => toggle.addEventListener('click', toggleTodoEventHandler))


    // Remove todo
    let removeTodos = document.querySelectorAll('.todo-remove') // delete-icon

    const removeTodoEventHandler = (event) => 
    {
        const todo = event.target.parentElement
        const todoList = todo.parentElement

        todoList.removeChild(todo)
    }

    removeTodos.forEach(remove => remove.addEventListener('click', removeTodoEventHandler))


    // Expand & collapse done todo list
    let doneTodoListImage = document.querySelector('.arrow-down-image') 
    let doneTodoListTitle = document.querySelector('.done-todo-list-title') 

    const doneTodosTextEventHandler = () =>
    {
        doneTodoList.classList.toggle('hidden')

        doneTodoListImage.classList.toggle('arrow-down-image')
        doneTodoListImage.classList.toggle('arrow-right-image')
    }

    doneTodoListTitle.addEventListener('click', doneTodosTextEventHandler)


    // Add todo
    let addTodoImage = document.querySelector('.add-todo-image')
    let addTodoContentInput = document.querySelector('.add-todo-content')
    const addTodoEventHandler = () =>
    {
        if (addTodoContentInput.value === '') return

        let todoContent = addTodoContentInput.value
        let newTodo = document.createElement('div')
        
        newTodo.innerHTML = `
            <li class="todo">
                <div class="todo-toggle">
                    <div class="todo-toggle-checked-image"></div>
                </div>
                <div class="todo-content">${todoContent}</div>
                <div class="todo-remove"></div>
            </li>`

        undoneTodoList.appendChild(newTodo)  

        newTodo.querySelector('.todo-remove').addEventListener('click', removeTodoEventHandler)
        newTodo.querySelector('.todo-toggle').addEventListener('click', toggleTodoEventHandler)

        addTodoContentInput.value = addTodoContentInput.placeholder = ''
    }

    addTodoImage.addEventListener('click', addTodoEventHandler)

    cleanTodos()
    await generateTodoLists()
})()

