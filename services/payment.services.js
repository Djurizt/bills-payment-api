require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')


const initalizePayment = async(data) => {

    return axios({
                    method: "post",
                    url: `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                    },
                    data: {
                        "email": data.email,
                        "amount": parseFloat(data.amount) * 100,
                        "currency": "NGN",
                        "ref": uuidv4()
                    }
                })
    }

const verifyPayment = async(payment_ref) => {

return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${payment_ref}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
})
    
    }

const chargeTransaction = async(input) => {

    return axios({
            method: "post",
            url: `${process.env.PAYSTACK_BASE_URL}/charge`,
            headers: {
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json"
                
            },
            data: {
                "email": input.email,
                "amount": parseFloat(input.amount) * 100,
                "bank":
                     {  "cvv":input.cvv,
                        "accountNUmber": input.accountNUmber
                    },
                "dob": input.dob
            }
    })
        
    }

const submitPin = async(pin,reference) => {

        const resp =  axios({
                    method: "post",
                    url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_pin`,
                    headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                    data: {
                            "pin":pin,
                            "reference":reference
                        }
                    })

                    console.log(`here: ${JSON.stringify(resp.data)}`)
                    return resp
    }
const submitOtp = async(otp) => {

        return axios({
                        method: "post",
                        url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_otp`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                        data: {
                            "otp":otp,
                            "reference":reference
                        }
                    })
    }

const submitPhone = async(phone) => {

        return axios({
                        method: "post",
                        url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_phone`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                        data: {
                            "phone":phone,
                            "reference":reference
                        }
                    })
    }
const submitBirthday = async(birthday) => {

        return axios({
                        method: "post",
                        url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_birthday`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                        data: {
                            "birthday":birthday,
                            "reference":reference
                        }
                    })
    }
const pendingCharge = async(reference) => {

        return axios({
                method: "get",
                url: `${process.env.PAYSTACK_BASE_URL}/charge/:reference${reference}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                },
        })
            
        }

module.exports = {
    initalizePayment,
    verifyPayment,
    chargeTransaction,
    submitPin,
    submitOtp,
    submitPhone,
    submitBirthday,
    pendingCharge
}