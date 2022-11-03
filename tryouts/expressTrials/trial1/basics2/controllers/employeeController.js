const Employee = require('../model/Employee');

const getAllEmployees = async (req, res)=>{
    const employees = await Employee.find({}).exec();
    return res.status(200).json(employees)
};

const addEmployee = async (req, res)=>{
    let {fname, lname} = req.body;
    if(fname && lname) {
        try {
            const newEmployee = await Employee.create({
                firstname: fname,
                lastname: lname
            });
            return res.status(201).json(newEmployee);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
    return res.status(400).json({error: "missing a field"})
}

const updateEmployee = async (req, res)=>{
    let {id, fname, lname} = req.body;
    if (id){
        try {
            let chosenEmp = await Employee.findById(id).exec();
            if (chosenEmp){
                fname && (chosenEmp.firstname = fname);
                lname && (chosenEmp.lastname = lname);
                await chosenEmp.save();
                return res.status(201).json(chosenEmp);
            }
            return res.status(404).json({error:"Employee not found"})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "Invalid value"});
        }
    }
    return res.status(400).json({error:"Missing a field"});
}

const deleteEmployee = async (req, res)=>{
    let {id} = req.body;
    if(id){
        try {
            let emp = await Employee.findById(id).exec();
            if(emp){
                await emp.delete();
                return res.status(202).json({success: "Employee is successfully deleted"});
            }
            return res.status(400).json({error: "Employee is not found"});       
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "Invalid values"});
        }
    }
    return res.status(400).json({error: "Missing a field"})
}

const viewEmployee = async (req, res)=>{
    let id = req.params.id;
    try {
        let myEmp = await Employee.findById(id).exec()
        if(myEmp){
            return res.status(200).json(myEmp);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Invalid Id"});
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