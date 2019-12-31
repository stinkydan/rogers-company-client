import axios from 'axios'

function sendConfirmationEmail(toEmail, lineItem, price) {
  return axios({
    url: 'http://localhost:1337/payment_success_confirmation',
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      toEmail: toEmail,
      lineItem: lineItem,
      price: price
    }
  });
};

export default sendConfirmationEmail
