import axios from 'axios';
import apiUrl from './apiConfig.js'

// DEVELOPMENT URL http://localhost:4741/
// PRODUCTION URL https://guarded-shore-72344.herokuapp.com/

export const perVisitTransaction = (customerId, price, selectedPackage) => {
  return axios({
    url: `${apiUrl}/charges`,
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      deposit: {
        customer_id: customerId,
        selected_package: selectedPackage,
        price: price
      }
    }
  })
}

export const createSubscription = (customerId, price, selectedPackage) => {
  return axios({
    url: `${apiUrl}/subscriptions`,
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      customer_id: customerId,
      selected_package: selectedPackage,
      price: price
    }
  })
}

export const createCustomer = (token, userId) => {
  return axios({
    url: `${apiUrl}/customers`,
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      id: userId,
      token: token
    }
  })
}
