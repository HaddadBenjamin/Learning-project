export interface ITodoFilters
{
    terms : string
    onlyUncompleted : boolean
}

export interface ITodo
{
    id : string
    title : string
    completed : boolean
}