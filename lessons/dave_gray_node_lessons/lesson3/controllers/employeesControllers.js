const {v4:uuid} = require('uuid');
const {capitalize} = require('voca');
const data = {};
data.employees = require("../model/employees.json");

const getAllEmployees = (req, res)=>{
    res.status(200).json(data.employees);
}

const createNewEmployee = (req, res)=>{
    let {firstname, lastname} = req.body;
    if(!firstname || !firstname.length){
        res.status(404).json({error: "Firstname parameter is missing"});
        return;
    }
    if(!lastname || !lastname.length){
        res.status(404).json({error: "Lastname parameter is missing"});
        return;
    }
    let id = uuid();
    data.employees.push({
        id: id, 
        firstname: capitalize(firstname), 
        lastname: capitalize(lastname)
    });
    res.status(200).json(data.employees);
}

const updateEmployee = (req, res)=>{
    if(!req.body.id) return res.status(404).json({"error": "Invalid request"});
    
    data.employees.map(emp=>{
        if(emp.id==req.body.id){
            (req.body.firstname && req.body.firstname.length) && (emp.firstname= capitalize(req.body.firstname));
            (req.body.lastname && req.body.lastname.length) && (emp.lastname= capitalize(req.body.lastname));
            return emp;
        }
        return emp;
    })

    res.status(200).json(data.employees);
}

const deleteEmployee = (req, res)=>{
    if(!req.body.id) return res.status(404).json({"error": "Invalid request"});
    
    data.employees = data.employees.filter(emp=>{
        return emp.id !== req.body.id
    });
    
    res.json(data.employees);
}

const getOneEmployee = (req, res)=>{
    req.params.id ? res.status(200).json(data.employees.find(()=>req.params.id)) : res.status(404).json({error: "Id Missing"});
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getOneEmployee
};