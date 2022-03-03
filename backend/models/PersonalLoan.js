const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    Bank: { type: String },
    sector: { type: String },
    collateral: {
        general: { type: String },
    },
    "Minimum Work Experience": { type: String },
    "Age Limit": {
        general: { type: Number },
        pensioner: { type: Number },
    },
    "minimum monthly income": {
        general: { type: Number },
    },
    interest: {
        general: {
            range_from: { type: Number },
            range_upto: { type: Number },
        },
        pensioner: {
            range_from: { type: Number },
            range_upto: { type: Number },
        },
    },
    amount: {
        general: {
            minimum: { type: Number },
            maximum: { type: Number },
        },
        pensioner: {
            minimum: { type: Number },
            maximum: { type: Number },
        },
    },
    tenure: {
        general: {
            years: { type: Number },
        },
        pensioner: {
            years: { type: Number },
        },
    },
    processing_fees: {
        general: {
            percent: { type: Number },
        },
        pensioner: {
            percent: { type: Number },
        },
    },
    // Bank: {
    //     type: String,
    //     required: true
    // },
    // "Age Limit": {
    //     type: String,
    //     required: true
    // },
    // "Minimum Work Experience": {
    //     type: String
    // },
    // "Minimum Income (Per Month)": {
    //     type: String
    // }
}, { timestamp: true });

module.exports = mongoose.model("personal_loan", Schema);