import axios from 'axios';
// import apiUrl from './apiConfig.js'

// DEVELOPMENT URL http://localhost:4741/
// PRODUCTION URL https://guarded-shore-72344.herokuapp.com/

export const perVisitTransaction = (customerId, price, selectedPackage) => {
  return axios({
    url: 'http://localhost:1337/charges',
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      customerId: customerId,
      selectedPackage: selectedPackage,
      price: price
    }
  })
}

export const createSubscription = (customerId, price, selectedPackage) => {
  return axios({
    url: 'http://localhost:1337/subscriptions',
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      customerId: customerId,
      selectedPackage: selectedPackage,
      price: price
    }
  })
}

export const createCustomer = (token, userId) => {
  return axios({
    url: 'http://localhost:1337/customers',
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      id: userId,
      token: token
    }
  })
}
