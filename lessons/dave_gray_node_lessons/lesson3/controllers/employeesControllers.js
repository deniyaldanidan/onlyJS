const {capitalize} = require('voca');
const Employee = require('../model/Employee');

const getAllEmployees = async(req, res)=>{
    const allEmployees = await Employee.find({});
    res.status(200).json(allEmployees);
}

const createNewEmployee = async (req, res)=>{
    let {firstname, lastname} = req.body;
    // shorthand for below conditions
    // if (!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({error: "missing fields"}); 
    if(!firstname || !firstname.length){
        res.status(404).json({error: "Firstname parameter is missing"});
        return;
    }
    if(!lastname || !lastname.length){
        res.status(404).json({error: "Lastname parameter is missing"});
        return;
    }
    const newEmployee = await Employee.create({
        firstname: capitalize(firstname),
        lastname: capitalize(lastname)
    });

    res.status(200).json(newEmployee);
}

const updateEmployee = async (req, res)=>{
    if(!req.body.id) return res.status(404).json({"error": "Invalid request"});
    
    const myEmployee = await Employee.findById(req.body.id);
    req.body.firstname && (myEmployee.firstname = capitalize(req.body.firstname));
    req.body.lastname && (myEmployee.lastname = capitalize(req.body.lastname));
    await myEmployee.save();

    res.status(200).json(myEmployee);
}

const deleteEmployee = async (req, res)=>{
    if(!req.body.id) return res.status(404).json({"error": "Invalid request"});
    
    await Employee.findByIdAndDelete(req.body.id);
    
    res.json({success: "Employee deleted"});
}

const getOneEmployee = async (req, res)=>{
    const empId = req.params.id;
    const myEmployee = await Employee.findById(empId).exec()
    if (!myEmployee) {
        res.status(404).json({error: "Employee not found"});
    }
    res.status(200).json(myEmployee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getOneEmployee
};