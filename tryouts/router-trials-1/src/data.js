const todoData = [
    {
        id: 1,
        name: "Do the Dishes",
        deadline: "Today"
    },
    {
        id: 2,
        name: "Date with Alina",
        deadline: "Tomorrow"
    },
    {
        id: 3,
        name: "Meet Sarah",
        deadline: "Today Evening"
    },
    {
        id: 4,
        name: "Dinner with Anna",
        deadline: "Today"
    },
    {
        id: 5,
        name: "Brunch Meet with Friends",
        deadline: "Friday"
    }
];


export default todoData;

export function getTodo(todoId){
    return todoData.find(todo=>todo.id===todoId)
}