
const axios = require("axios")
const dotenv = require("dotenv");

dotenv.config();
const paystack = () => {
    
    const MySecretKey = `Bearer ${process.env.PAYSTACK_KEY}`;
    // sk_test_xxxx to be replaced by your own secret key
   const initializePayment = (form, mycallback) =>{
    const options = {
        url : 'https://api.paystack.co/transaction/initialize',
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        },
       form
    }
    const callback = (error, response, body)=>{
        return mycallback(error, body);
    }
    axios.post(options,callback);
   }
   
   const verifyPayment = (ref,mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref    ),
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
       }
    }
    const callback = (error, response, body)=>{
        return mycallback(error, body);
    }
    axios.get(options,callback);
   }
   return {initializePayment, verifyPayment};
}

module.exports = paystack