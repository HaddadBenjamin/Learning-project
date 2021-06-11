(async () =>
{
    class TodoApi
    {
        apiUrl = "http://localhost:3888/todos"
        headers = { "Content-Type" : "application/json" }

        getAll = async () => await (await fetch(this.apiUrl)).json()

        create = todo => fetch(this.apiUrl,
        { 
            method : 'POST',
            headers : this.headers,
            body : JSON.stringify(todo)
        })

        patchCompleted = (id, completed) => fetch(`${this.apiUrl}/${id}`,
        {
            method : 'PATCH',
            headers : this.headers,
            body : JSON.stringify({ completed : !completed }),
        })

        patchContent = (id, content) => fetch(`${this.apiUrl}/${id}`,
        {
            method : 'PATCH',
            headers : this.headers,
            body : JSON.stringify({ content : content }),
        })

        delete = id => fetch(`${this.apiUrl}/${id}`, { method : 'DELETE' })
    }

    class TodoState
    {
        todos = []

        set = todos => this.todos = todos

        add = todo => this.todos.push(todo)

        toggle = id => this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed : !todo.completed } : todo)

        patchContent = (id, content) =>this.todos.map(todo => todo.id === id ? { ...todo, content : content } : todo)

        delete = id => this.todos = this.todos.filter(todo => todo.id === id)

        generateId = () => Math.max(this.todos.map(todo => todo.id)) + 1
    }

    class TodoDom
    {
        doneTodoList = document.querySelector('.done-todo-list')
        undoneTodoList = document.querySelector('.undone-todo-list')

        add = ({ id, content, completed }, resetInput = false) =>
        {
            let newTodo = document.createElement('div')
            let toggleClass = completed ? 'todo-toggle-checked' : 'todo-toggle'

            newTodo.innerHTML = `
                <li class="todo" data-todo-id="${id}">
                    <div class="${toggleClass}">
                        <div class="todo-toggle-checked-image"></div>
                    </div>
                    <input class="todo-content" value="${content}">
                    <div class="todo-remove"></div>
                </li>`

            this.getTodoList(completed).appendChild(newTodo)  

            newTodo.querySelector('.todo-remove').addEventListener('click', todoEventHandlers.remove)
            newTodo.querySelector('.todo-toggle, .todo-toggle-checked').addEventListener('click', todoEventHandlers.toggle)
            newTodo.querySelector('.todo-content').addEventListener('input', todoEventHandlers.patchContent)

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

            this.getTodoList(!completed).appendChild(todo)
        }

        expandOrCollapse = () =>
        {
            let doneTodoListImage = document.querySelector('.arrow-down-image') 
      
            this.doneTodoList.classList.toggle('hidden')
    
            doneTodoListImage.classList.toggle('arrow-down-image')
            doneTodoListImage.classList.toggle('arrow-right-image')
        }

        delete = todo => todo.parentElement.removeChild(todo)

        isCompleted = toggle => toggle.classList.contains('todo-toggle-checked')
        isTodo = element => element.classList.contains('todo')

        getAddContentInput = () => document.querySelector('.add-todo-content')
        getTodoList = (completed) => completed ? this.doneTodoList : this.undoneTodoList
    }

    class TodoEventHandlers
    {
        add = () =>
        {
            let content = todoDom.getAddContentInput().value

            if (content === '') return

            let id = todoState.generateId()
            let todo = { id, content, completed : false }

            todoDom.add(todo, true)
            todoState.add(todo)
            todoApi.create(todo)
        }

        toggle = event =>
        {
            const toggle = todoDom.isTodo(event.target.parentElement) ? event.target : event.target.parentElement
            const completed = todoDom.isCompleted(toggle)
            const todo = toggle.parentElement
            const id = todo.dataset.todoId
            
            todoDom.toggle(toggle, completed, todo)
            todoState.toggle(id)
            todoApi.patchCompleted(id, completed)
        }

        patchContent = event =>
        {
            const contentElement = todoDom.isTodo(event.target.parentElement) ? event.target : event.target.parentElement
            const todo = contentElement.parentElement
            const content = contentElement.value
            const id = todo.dataset.todoId

            todoApi.patchContent(id, content)
            todoState.patchContent(id, content)
        }

        remove = event => 
        {
            const todo = event.target.parentElement
            const id = todo.dataset.todoId
            
            todoDom.delete(todo)
            todoState.delete(id)
            todoApi.delete(id)
        }

        expandOrCollapseCompletedTodos = () => todoDom.expandOrCollapse()
    }


    let todoApi = new TodoApi()
    let todoState = new TodoState()
    let todoDom = new TodoDom()
    let todoEventHandlers = new TodoEventHandlers()

    document.querySelector('.done-todo-list-title').addEventListener('click', todoEventHandlers.expandOrCollapseCompletedTodos)
    document.querySelector('.add-todo-image').addEventListener('click', todoEventHandlers.add)

    await (generateTodoList = async () =>
    {
        todoState.set(await todoApi.getAll())
        todoState.todos.forEach(todo => todoDom.add(todo))
    })()
})()