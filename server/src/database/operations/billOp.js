const BillSchema = require("../schema/schemaBill");
const { increaseExpense } = require("./hostelOp");
const { getWardenById } = require("./wardenOp");

const getDateCorrected = async function(date){
    let date1 = date.getFullYear().toString()+'-'+date.getMonth().toString()+'-'+date.getDate().toString();
    let correctDate = new Date(date);
    return correctDate;
}

const getBills = async function(data){
    let date = getDateCorrected(data.date);
    return await BillSchema.find({date: date});
}

const addBills = async function(data){
    let image_url = data.url;
    let amount = data.amount;
    let date = await getDateCorrected(new Date());
    const bill = new BillSchema({
        image_url: image_url,
        amount: amount,
        date: date
    })
    let response;
    await bill.save().then(()=>{
        response = {status: 200, data: {message: "Successfully added the bill"}};
    }).catch((err)=>{
        response =  {status: 400, message:"error: "+err};
    })
    if(response.status===200){
        let warden = await getWardenById(req.wid);
        await increaseExpense({name:warden.hostelName,expense:amount});
    }
    return response;
}

module.exports = {addBills,getBills}