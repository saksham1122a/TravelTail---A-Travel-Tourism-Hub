require('dotenv').config();
const mongoose = require('mongoose');

async function testFlow() {
  try {
    const salt = Math.floor(Math.random() * 1000);
    // 1. Register a new Test User to get token
    const regRes = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        firstName: "Test",
        lastName: "User",
        email: `tester${salt}@example.com`,
        password: "password123",
        phone: "1234567890" 
      })
    });
    
    if (!regRes.ok) {
      console.log("Register failed!", await regRes.text());
      return;
    }
    
    const regData = await regRes.json();
    const token = regData.token;
    console.log("Got token for new user:", token.substring(0, 10) + "...");
    
    // 2. Mock a payload from PaymentModal
    const payload = {
        itemType: 'destination',
        itemName: 'Test Destination ' + salt,
        amount: '$999',
        paymentMethod: 'card',
        customerName: 'Test Name',
        customerEmail: 'test@example.com'
    };

    console.log("Posting to /api/bookings...");
    const postRes = await fetch("http://localhost:5001/api/bookings", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(payload)
    });

    console.log("Status:", postRes.status);
    console.log("Response:", await postRes.text());
  } catch(e) {
    console.error("Error:", e);
  }
}
testFlow();
