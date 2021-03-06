export interface ITodoFilters
{
    terms : string
    onlyUncompleted : boolean
}

export interface Todo
{
    id : string
    title : string
    completed : boolean
}