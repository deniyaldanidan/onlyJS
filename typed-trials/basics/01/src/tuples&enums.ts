type Skill = [string, number];
type RGBA = [number, number, number, (string | number)?]
type ProfessionalPosition = [string, number, string?];

interface Employee extends Person {
    skill: Skill,
    employeePosition?: ProfessionalPosition 
}

const emp1: Employee = {
    id: "236fd",
    name: "Sarah",
    age: 23,
    country: "Singapore",
    skill: ["Welder", 23],
    gender: "female",
    employeePosition: ["Welder", 70000, "2019"],
    info: function(){
        return `My name is ${this.name}. I'm ${this.age}years old.`
    },
    greet(name:string){
        return `Hello ${name}, I'm ${this.name}`
    }
}

const color1: RGBA = [255, 200, 12];
const color2: RGBA = [200, 102, 0, 0.9];
const color3: RGBA = [0, 0, 120, "20%"];

enum Month {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul
}

console.log(Month.Apr);
console.log(Month[0])