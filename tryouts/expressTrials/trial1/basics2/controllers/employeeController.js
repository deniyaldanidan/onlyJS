const {v4:uuid} = require('uuid');
const data= {};
data.employees = require('../data/employees.json');

const getAllEmployees = (req, res)=>{
    return res.status(200).json(data.employees)
};

const addEmployee = (req, res)=>{
    let {fname, lname} = req.body;
    if(fname && lname) {
        let newEmployee = {
            id: uuid(),
            firstname: fname,
            lastname: lname
        }
        data.employees.push(newEmployee);
        return res.status(201).json(newEmployee);
    }
    return res.status(400).json({error: "missing a field"})
}

const updateEmployee = (req, res)=>{
    let {id, fname, lname} = req.body;
    if (id){
        let chosenEmp = data.employees.find(emp=>emp.id===id);
        if (chosenEmp){
            fname && (chosenEmp.firstname = fname);
            lname && (chosenEmp.lastname = lname);
            let empIndex = data.employees.findIndex(emp=>emp.id===id)
            data.employees.splice(empIndex, 1, chosenEmp);
            let modifiedEmp = data.employees.find(emp=>emp.id===id);
            return res.status(201).json(modifiedEmp);
        }
        return res.status(404).json({error:"Employee not found"})
    }
    return res.status(400).json({error:"Missing a field"});
}

const deleteEmployee = (req, res)=>{
    let {id} = req.body;
    if(id){
        let empIndex = data.employees.findIndex(emp=>emp.id===id);
        if(empIndex !== -1){
            data.employees.splice(empIndex, 1);
            return res.status(202).json({success: "Employee is successfully deleted"});
        }
        return res.status(400).json({error: "Employee is not found"});
    }
    return res.status(400).json({error: "Missing a field"})
}

const viewEmployee = (req, res)=>{
    let empId = req.params.id;
    let myEmp = data.employees.find(emp=>emp.id===empId);
    if(myEmp){
        return res.status(200).json(myEmp);
    }
    return res.status(404).json({error: "Employee not found"});
}

module.exports = {
    getAllEmployees,
    addEmployee, 
    updateEmployee,
    deleteEmployee,
    viewEmployee
}