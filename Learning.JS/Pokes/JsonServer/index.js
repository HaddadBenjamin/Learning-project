(async () => {
    const todos = await (await fetch("http://localhost:3000/todos")).json();

    console.log(todos)
})()