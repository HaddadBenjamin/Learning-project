(async () =>
{
    class TodoApi
    {
        static #apiUrl = "http://localhost:3888/todos"
        static #headers = { "Content-Type" : "application/json" }

        getAll = async () => await (await fetch(TodoApi.#apiUrl)).json()

        create = todo => fetch(TodoApi.#apiUrl,
        { 
            method : 'POST',
            headers : TodoApi.#headers,
            body : JSON.stringify(todo)
        })

        patchCompleted = (id, completed) => fetch(`${TodoApi.#apiUrl}/${id}`,
        {
            method : 'PATCH',
            headers : TodoApi.#headers,
            body : JSON.stringify({ completed : !completed }),
        })

        patchContent = (id, content) => fetch(`${TodoApi.#apiUrl}/${id}`,
        {
            method : 'PATCH',
            headers : TodoApi.#headers,
            body : JSON.stringify({ content : content }),
        })

        delete = id => fetch(`${TodoApi.#apiUrl}/${id}`, { method : 'DELETE' })
    }

    class TodoState
    {
        #todos = []

        get = () => [...this.#todos]

        set = todos => this.#todos = todos

        add = todo => this.#todos.push(todo)

        toggle = id => this.#todos = this.#todos.map(todo => todo.id === id ? { ...todo, completed : !todo.completed } : todo)

        patchContent = (id, content) => this.#todos.map(todo => todo.id === id ? { ...todo, content : content } : todo)

        delete = id => this.#todos = this.#todos.filter(todo => todo.id === id)

        generateId = () => (Math.max(this.#todos.map(todo => todo.id)) + 1).toString()
    }

    class TodoDom
    {
        static #doneTodoList = document.querySelector('.done-todo-list')
        static #undoneTodoList = document.querySelector('.undone-todo-list')

        add = ({ id, content, completed }, resetInput = false) =>
        {
            const newTodo = document.createElement('div')
            const toggleClass = completed ? 'todo-toggle-checked' : 'todo-toggle'

            newTodo.innerHTML = `
                <li class="todo" data-todo-id="${id}">
                    <div class="${toggleClass}">
                        <div class="todo-toggle-checked-image"></div>
                    </div>
                    <input class="todo-content" value="${content}">
                    <div class="todo-remove"></div>
                </li>`

            TodoDom.#getTodoList(completed).appendChild(newTodo)  

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

            TodoDom.#getTodoList(!completed).appendChild(todo)
        }

        expandOrCollapse = () =>
        {
            const doneTodoListImage = document.querySelector('.arrow-down-image') 
      
            TodoDom.#doneTodoList.classList.toggle('hidden')
    
            doneTodoListImage.classList.toggle('arrow-down-image')
            doneTodoListImage.classList.toggle('arrow-right-image')
        }

        delete = todo => todo.parentElement.removeChild(todo)

        isCompleted = toggle => toggle.classList.contains('todo-toggle-checked')
        isTodo = element => element.classList.contains('todo')

        getAddContentInput = () => document.querySelector('.add-todo-content')
        static #getTodoList = (completed) => completed ? TodoDom.#doneTodoList : TodoDom.#undoneTodoList
    }

    class TodoEventHandlers
    {
        add = () =>
        {
            const content = todoDom.getAddContentInput().value

            if (content === '') return

            const id = todoState.generateId()
            const todo = { id, content, completed : false }

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


    const todoApi = new TodoApi()
    const todoState = new TodoState()
    const todoDom = new TodoDom()
    const todoEventHandlers = new TodoEventHandlers()

    document.querySelector('.done-todo-list-title').addEventListener('click', todoEventHandlers.expandOrCollapseCompletedTodos)
    document.querySelector('.add-todo-image').addEventListener('click', todoEventHandlers.add)

    await (generateTodoList = async () =>
    {
        todoState.set(await todoApi.getAll())
        todoState.get().forEach(todo => todoDom.add(todo))
    })()
})()
