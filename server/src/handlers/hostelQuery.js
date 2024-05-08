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
const { getStudentbyId } = require("../database/operations/studentOp");
const HostelSchema = require("../database/schema/schemaHostel");

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
    try{
        let student = await getStudentbyId(req.sid);
        let hostelExpense = await getHostelExpense(student.hostelName);
        res.send({status:200, data:{expense: hostelExpense}})
    }
    catch(err){
        console.log(err)
        res.send({status:400,message:"error:"+err})
    }
}

module.exports = { getAllHostels , getHostelExpensePerPerson};
