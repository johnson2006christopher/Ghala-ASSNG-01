# 1. IMPORTS
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import uuid
import asyncio

# 2. APP INITIALIZATION
app = FastAPI(title="Ghala Simulation API")

# 3. DATABASE (Mocking)
# We use lists in memory to simulate a database for now.
merchants_db = []
orders_db = []

# 4. DATA MODELS (Schemas)
# This defines the "Shape" of the data we expect.
class MerchantConfig(BaseModel):
    id: str = str(uuid.uuid4()) # Auto-generate a unique ID
    name: str
    preferred_payment_method: str # e.g., "mobile", "card"
    config_details: str # e.g., "Paybill 12345"

class Order(BaseModel):
    id: str = str(uuid.uuid4())
    product_name: str
    total_amount: float
    merchant_id: str
    status: str = "pending" # Default status is pending

# 5. API ENDPOINTS (The Logic)

@app.get("/")
def read_root():
    return {"message": "Welcome to Ghala Backend"}

# Endpoint A: Save Merchant Config
@app.post("/merchant")
def save_merchant(merchant: MerchantConfig):
    # Save the incoming data to our fake database
    merchants_db.append(merchant)
    return {"message": "Merchant saved successfully", "data": merchant}

# Endpoint B: Create Order
@app.post("/order")
def create_order(order: Order):
    # Add order to our list
    orders_db.append(order)
    return {"message": "Order placed", "order": order}

# Endpoint C: View All Orders
@app.get("/orders")
def get_orders():
    return orders_db

# Endpoint D: Simulate Payment
@app.post("/pay/{order_id}")
async def simulate_payment(order_id: str):
    # 1. Search for the order
    for order in orders_db:
        if order.id == order_id:
            
            # 2. Simulate waiting for a bank response (5 seconds)
            # 'await' means "pause this function here, but keep the server running for others"
            await asyncio.sleep(5)
            
            # 3. Update the status
            order.status = "paid"
            
            return {"message": "Payment Successful!", "order": order}
    
    # If the loop finishes and we didn't find the ID
    return {"error": "Order not found"}