# 1. IMPORTS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
import asyncio
import random

# 2. APP INITIALIZATION
app = FastAPI(title="Ghala Simulation API")

# CORS configuration to allow the React frontend (Vite dev server) to access this API
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. DATABASE (Mocking)
# We use lists in memory to simulate a database for now.
merchants_db = []
orders_db = []

# 4. DATA MODELS (Schemas)
# This defines the "Shape" of the data we expect.
class MerchantConfig(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    preferred_payment_method: str
    config_details: str

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_name: str
    total_amount: float
    merchant_id: str
    status: str = "pending"

# 5. API ENDPOINTS (The Logic)

@app.get("/")
def read_root():
    return {"message": "Welcome to Ghala Backend"}

# Endpoint A: Save Merchant Config
@app.post("/merchant")
def save_merchant(merchant: MerchantConfig):
    merchants_db.append(merchant)
    return {"message": "Merchant saved successfully", "data": merchant}

@app.get("/merchants")
def get_merchants():
    return merchants_db

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

            # 3. Randomly decide if payment is successful or failed
            outcome = random.choice(["paid", "failed"])
            order.status = outcome

            message = "Payment Successful!" if outcome == "paid" else "Payment Failed"
            return {"message": message, "order": order}
    
    # If the loop finishes and we didn't find the ID
    return {"error": "Order not found"}
