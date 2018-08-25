const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    userid: {type:String, required: true},
    expenseDate: {type:Date, required: true},
    expenseType: {type:String, required: true},
    expenseAmount: {type:Number, required: true},
    expenseDescription: {type:String}
});

ExpenseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('expenses', ExpenseSchema, 'expenses');
