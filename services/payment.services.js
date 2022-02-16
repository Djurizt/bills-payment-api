require('dotenv').config()
const axios = require('axios').default
const fetch = require('node-fetch')
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

    console.log("i got here: ", JSON.stringify(input))
    /* return axios({
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
                {
                    "code": input.cvv,
                    "account_number": input.accountNumber
                    },
                "birthday": input.dob
            }
    }) */

    return fetch(`${process.env.PAYSTACK_BASE_URL}/charge`,
    {
        method: 'post',
        body: JSON.stringify({
            "email" : input.email,
            "amount" : parseFloat(input.amount) * 100,
            "bank": {
                    code: input.cvv,
                    account_number: input.accountNumber
                    },
            "birthday": input.dob
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
             
    })
        
    }

const submitPin = async (pin, reference) => {

     /*return  axios({
                    method: "post",
                    url: `${process.env.PAYSTACK_BASE_URL}/charge/submit_pin`,
                    headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                        },
                    data: {
                            pin :"1111",
                            reference :"wwwddvrr4"
                  }
            
      })*/
    
    return fetch(`${process.env.PAYSTACK_BASE_URL}/charge/submit_pin`,
        {
            method: 'post',
            body: JSON.stringify({
                pin: pin,
                reference: reference
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
                 
        })
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