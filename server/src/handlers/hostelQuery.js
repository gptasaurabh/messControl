// const HostelSchema = require("../database/schema/schemaHostel")


// const getAllHostels = async function(req,res,next){
//     const hostels = await HostelSchema.find({},'hostelName');
//     console.log(hostels);
//     res.send({status:200,data:{
//         hostels: hostels
//     }})
// }

// module.exports = {getAllHostels}

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

module.exports = { getAllHostels };
