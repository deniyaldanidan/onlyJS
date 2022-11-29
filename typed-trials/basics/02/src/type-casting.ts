//* type-guarding using typeof
function inpHandler(inp:string|number):string{
    if (typeof inp === "string") return "It is a string";
    return "It is a number";
}

console.log(inpHandler("name"));
console.log(inpHandler(1234));

//* type-guarding using instanceOf
class Messager1{
    messager1():string{
        return "I am Messager1";
    }
}

class Messager2{
    messager2():string{
        return "I am Messager2";
    }
}

function handler1 (inp: Messager1 | Messager2):void{
    if (inp instanceof Messager1){
        console.log(inp.messager1())
    }
    if (inp instanceof Messager2){
        console.log(inp.messager2())
    }

}
const mess1 = new Messager1();
const mess2 = new Messager2();

handler1(mess1);
handler1(mess2);

//* Type guarding using in 
function empHandler(emp : Employee | Employer) :void{
    if ("jobTitle" in emp){
        console.log("I am a Employee")
    }
    if ("companyName" in emp) {
        console.log("I am a Employer")
    }
}

const emp1:Employee = {
    id: "23ff12",
    name: "Sarah",
    salary: 12000,
    jobTitle: "Welder"
} 
const emp2:Employer = {
    id :"2671ff",
    name: "Dave",
    companyName: "SoftWorks Inc.",
    capital: 1200000
}

empHandler(emp1);
empHandler(emp2);

//* user-defined Type-Guards
function isEmployee(emp:any): emp is Employee{
    return "jobTitle" in emp
}

console.log(isEmployee(emp1));
console.log(isEmployee(emp2));

function empHan (emp:Employee | Employer) :void{
    if (isEmployee(emp)){
        console.log("Yes He is an Employee")
    } else{
        console.log("He is an Employer")
    }
}

empHan(emp1);
empHan(emp2)