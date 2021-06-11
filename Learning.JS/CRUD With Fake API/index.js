(async () =>
{
    class TodoApi
    {
        apiUrl = "http://localhost:3004/todos"
        headers = { "Content-Type" : "application/json" }

        getAll = async () => await (await fetch(this.apiUrl)).json()

        create = async(todo) => await (await fetch(this.apiUrl,
        { 
            method : 'POST',
            headers : this.headers,
            body : JSON.stringify(todo)
        }))

        patchCompleted = async (id, completed) =>  await (await fetch(`${this.apiUrl}/${id}`,
        {
            method : 'PATCH',
            headers : this.headers,
            body : JSON.stringify({ completed : !completed }),
        }))

        delete = async (id) => await (await fetch(`${this.apiUrl}/${id}`, { method : 'DELETE' }))
    }

    class TodoState
    {
        todos = []

        set = (todos) => this.todos = todos

        add = (todo) => this.todos.push(todo)

        toggle = (id) => this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed : !todo.completed } : todo)

        delete = (id) => this.todos = this.todos.filter(todo => todo.id === id )

        generateId = () => Math.max(this.todos.map(todo => todo.id)) + 1
    }

    class TodoDom
    {
        add = ({ id, content, completed }, resetInput = false) =>
        {
            let newTodo = document.createElement('div')
            let toggleClass = completed ? 'todo-toggle-checked' : 'todo-toggle'
            let todoList = completed ? doneTodoList : undoneTodoList

            newTodo.innerHTML = `
                <li class="todo" data-todo-id="${id}">
                    <div class="${toggleClass}">
                        <div class="todo-toggle-checked-image"></div>
                    </div>
                    <div class="todo-content">${content}</div>
                    <div class="todo-remove"></div>
                </li>`

            todoList.appendChild(newTodo)  

            newTodo.querySelector('.todo-remove').addEventListener('click', todoEventHandlers.remove)
            newTodo.querySelector('.todo-toggle, .todo-toggle-checked').addEventListener('click', todoEventHandlers.toggle)

            if (resetInput)
            {
                let addContentInput = this.getAddContentInput()
                
                addContentInput.value = addContentInput.placeholder = ''
            }
        }

        toggle = (toggle, completed, todo) =>
        {
            toggle.classList.toggle('todo-toggle')
            toggle.classList.toggle('todo-toggle-checked')

            const todoList = completed ? doneTodoList : undoneTodoList
            
            todoList.appendChild(todo)
        }

        expandOrCollapse = () =>
        {
            let doneTodoListImage = document.querySelector('.arrow-down-image') 
      
            doneTodoList.classList.toggle('hidden')
    
            doneTodoListImage.classList.toggle('arrow-down-image')
            doneTodoListImage.classList.toggle('arrow-right-image')
        }

        delete = (todo) => todo.parentElement.removeChild(todo)

        isCompleted = (toggle) => toggle.classList.contains('todo-toggle-checked')
        isTodo = (element) => element.classList.contains('todo')

        getAddContentInput = () => document.querySelector('.add-todo-content')
    }

    class TodoEventHandlers
    {
        add = async () =>
        {
            let content = todoDom.getAddContentInput().value

            if (content === '') return

            let id = todoState.generateId()
            let todo = { id, content, completed : false }

            todoDom.add(todo, true)
            todoState.add(todo)
            await todoApi.create(todo)
        }

        toggle = async (event) =>
        {
            const toggle = todoDom.isTodo(event.target.parentElement) ? event.target : event.target.parentElement
            const completed = todoDom.isCompleted(toggle)
            const todo = toggle.parentElement
            const id = todo.dataset.todoId
            
            todoDom.toggle(toggle, completed, todo)
            todoState.toggle(id)
            await todoApi.patchCompleted(id, completed)
        }

        remove = async (event) => 
        {
            const todo = event.target.parentElement
            const id = todo.dataset.todoId
            
            todoDom.delete(todo)
            todoState.delete(id)
            await todoApi.delete(id)
        }

        expandOrCollapseCompletedTodos = () => todoDom.expandOrCollapse()
    }

    let todoApi = new TodoApi()
    let todoState = new TodoState()
    let todoDom = new TodoDom()
    let todoEventHandlers = new TodoEventHandlers()
    let doneTodoList = document.querySelector('.done-todo-list')
    let undoneTodoList = document.querySelector('.undone-todo-list')

    // Expand & collapse done todo list
    let doneTodoListTitle = document.querySelector('.done-todo-list-title') 
    doneTodoListTitle.addEventListener('click', todoEventHandlers.expandOrCollapseCompletedTodos)

    // Add todo
    let addTodoImage = document.querySelector('.add-todo-image')
    addTodoImage.addEventListener('click', todoEventHandlers.add)

    // Generate to do list
    const generateTodoList = async () =>
    {
        todoState.set(await todoApi.getAll())
        todoState.todos.forEach(todo => todoDom.add(todo))
    }

    await generateTodoList()
})()

