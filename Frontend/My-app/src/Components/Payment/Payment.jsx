import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { useState } from 'react';
import './Payment.css' 
const Payment = () => {
  const { getTotal } = useContext(ShopContext);

  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [phone, setphone] = useState("");
  const [payment, setpayment] = useState("");
  const [total, settotal] = useState("");

  const payme = async () => {
    const response = await fetch('http://localhost:4000/payment', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem('auth-token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: address,
        pincode: pincode,
        phone: phone,
        payment: payment,
        total: getTotal(),
      })
    })
  };

  return (
    <div className="payment">
      <div className="payment-container">

        <input
          className="payment-input"
          name="Address"
          type="text"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          placeholder="Address"
        />

        <input
          className="payment-input"
          name="pincode"
          type="number"
          value={pincode}
          onChange={(e) => setpincode(e.target.value)}
          placeholder="Pincode"
        />

        <input
          className="payment-input"
          name="phone"
          type="number"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="Phone"
        />

        <div className="payment-method">
          <h3>Select Payment Method</h3>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="GPay"
              onChange={(e) => setpayment(e.target.value)}
            />
            Google Pay
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="PhonePe"
              onChange={(e) => setpayment(e.target.value)}
            />
            PhonePe
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) => setpayment(e.target.value)}
            />
            UPI
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) => setpayment(e.target.value)}
            />
            Debit/Credit Card
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={(e) => setpayment(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        <div className="payment-total">
          <span>Total</span>
          <span>₹{getTotal()}</span>
        </div>

        <button className="payment-btn" onClick={payme}>
          Pay
        </button>

      </div>
    </div>
  )
}

export default Payment