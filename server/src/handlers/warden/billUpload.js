const { addBills, getBills } = require("../../database/operations/billOp")

const uploadBill = async function(req, res){
    try{
        let response = await addBills({url: req.body.image_url, amount: req.body.amount});
        res.send(response)
    }
    catch(error){
        res.send({status: 400, data: {message: "error uploading bill:"+error}})
    }
}

const getBillsbyDate = async function(req, res){
    try{
        let response = await getBills({date: req.body.date});
        res.send({status: 200, data: response});
    }
    catch(err){
        res.send({status: 400, data:{message: "error: "+err}});
    }
}

module.exports = {uploadBill, getBillsbyDate}