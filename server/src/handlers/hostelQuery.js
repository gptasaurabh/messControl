// const HostelSchema = require("../database/schema/schemaHostel")


// const getAllHostels = async function(req,res,next){
//     const hostels = await HostelSchema.find({},'hostelName');
//     console.log(hostels);
//     res.send({status:200,data:{
//         hostels: hostels
//     }})
// }

// module.exports = {getAllHostels}

const { getHostelExpense } = require("../database/operations/hostelOp");
const HostelSchema = require("../database/schema/schemaHostel");
const { getStudentDetailById } = require("./studentQuery");

const getAllHostels = async (req, res) => {
    try {
        const hostels = await HostelSchema.find({}, 'hostelName');
        console.log(hostels);
        res.send({
            status: 200,
            data: {
                hostels: hostels
            }
        });
    } catch (error) {
        console.error('Failed to retrieve hostels:', error);
        res.status(500).send({
            status: 500,
            message: "Failed to retrieve data from the database"
        });
    }
}

const getHostelExpensePerPerson = async function(req, res){
    let student = await getStudentDetailById(req.sid);
    let hostelExpense = await getHostelExpense(student.hostelName);
}

module.exports = { getAllHostels , getHostelExpensePerPerson};
