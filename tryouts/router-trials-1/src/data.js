import { uniqueId } from 'lodash';

const todoData = [
    {
        id: 'todo_1',
        name: "Do the Dishes",
        deadline: "Today"
    },
    {
        id: 'todo_2',
        name: "Date with Alina",
        deadline: "Tomorrow"
    },
    {
        id: 'todo_3',
        name: "Meet Sarah",
        deadline: "Today Evening"
    },
    {
        id: 'todo_4',
        name: "Dinner with Anna",
        deadline: "Today"
    },
    {
        id: 'todo_5',
        name: "Brunch Meet with Friends",
        deadline: "Friday"
    },
    {
        id: 'todo_6',
        name: "Business Meeting",
        deadline: "Thursday"
    },
    {
        id: 'todo_7',
        name: "Haircut",
        deadline: "Friday"
    },
    {
        id: 'todo_8',
        name: "Clubbing",
        deadline: "Saturday"
    },
    {
        id: 'todo_9',
        name: "Dinner with Alina",
        deadline: "Saturday"
    },
    {
        id: 'todo_10',
        name: "Church",
        deadline: "Saturday Morning"
    },
    {
        id: 'todo_11',
        name: "Lunch with Family",
        deadline: "Sunday"
    },
    {
        id: 'todo_12',
        name: "Dinner with Alina",
        deadline: "Sunday"
    },
    {
        id: 'todo_13',
        name: "Brunch with Friends",
        deadline: "Monday"
    }
];


export default todoData;

export function getTodo(todoId){
    return todoData.find(todo=>todo.id===todoId)
}

export function addTodo({name, deadline}){
    const newData = {id: uniqueId("newTodo_"), name,  deadline}
    todoData.push(newData);
}