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
    },
    {
        id: 6,
        name: "Business Meeting",
        deadline: "Thursday"
    },
    {
        id: 7,
        name: "Haircut",
        deadline: "Friday"
    },
    {
        id: 8,
        name: "Clubbing",
        deadline: "Saturday"
    },
    {
        id: 9,
        name: "Dinner with Alina",
        deadline: "Saturday"
    },
    {
        id: 10,
        name: "Church",
        deadline: "Saturday Morning"
    },
    {
        id: 11,
        name: "Lunch with Family",
        deadline: "Sunday"
    },
    {
        id: 12,
        name: "Dinner with Alina",
        deadline: "Sunday"
    },
    {
        id: 13,
        name: "Brunch with Friends",
        deadline: "Monday"
    }
];


export default todoData;

export function getTodo(todoId){
    return todoData.find(todo=>todo.id===todoId)
}