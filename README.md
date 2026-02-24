# Ghala Technical Intern Challenge – Core Systems Simulation

This project implements a simplified version of Ghala's core systems:

- Merchants configure their preferred payment method and config details
- Customers place mock orders
- Orders start as `pending` and are later updated to `paid` or `failed`
- A React admin UI lets you configure merchants, create mock orders, and simulate payments

The goal is to demonstrate the data flow and system design, not a production-ready app.

---

## Tech Stack

- **Backend**
  - Python 3.10+ (tested with Python 3.12)
  - FastAPI
  - Uvicorn

- **Frontend**
  - Node.js 18+ and npm
  - React + Vite
  - Tailwind CSS (via `@tailwindcss/vite`)

All data is stored in memory and is lost when the backend process restarts.

---

## Project Structure

- `backend/`
  - `main.py` – FastAPI app, data models, and all endpoints
- `frontend/`
  - `src/App.jsx` – main UI layout, order fetching and payment handling
  - `src/components/MerchantForm.jsx` – merchant configuration form
  - `src/components/OrderList.jsx` – order list with payment simulation button
  - `vite.config.js` – Vite and Tailwind configuration

---

## Backend Setup and Run

1. **Install Python dependencies**

   From the project root:

   ```bash
   cd backend
   python -m venv venv
   # On PowerShell
   .\venv\Scripts\Activate

   pip install fastapi uvicorn
   ```

2. **Run the FastAPI server**

   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

   - The API will be available at `http://127.0.0.1:8000/`
   - Interactive docs are at `http://127.0.0.1:8000/docs`

3. **Notes**

   - `merchants_db` and `orders_db` are in-memory lists; restarting the server clears all merchants and orders.
   - The `/pay/{order_id}` endpoint waits 5 seconds, then randomly marks the order as `paid` or `failed`.

---

## Frontend Setup and Run

1. **Install Node dependencies**

   From the project root:

   ```bash
   cd frontend
   npm install
   ```

2. **Run the React dev server**

   ```bash
   npm run dev
   ```

   - Vite will print a local URL, usually `http://localhost:5173/`
   - Open that URL in your browser

3. **Linting (optional)**

   From `frontend/`:

   ```bash
   npm run lint
   ```

---

## How the System Works (High-Level)

### Backend

- **Merchant configuration**
  - `POST /merchant`
    - Accepts `name`, `preferred_payment_method`, and `config_details`
    - Stores a `MerchantConfig` object with an auto-generated UUID
    - Returns the saved merchant in the response
  - `GET /merchants`
    - Returns all merchants currently in memory

- **Orders**
  - `POST /order`
    - Accepts `product_name`, `total_amount`, and `merchant_id`
    - Creates an `Order` with a UUID and `status="pending"`
  - `GET /orders`
    - Returns all current orders

- **Payment simulation**
  - `POST /pay/{order_id}`
    - Waits 5 seconds to simulate contacting a payment provider
    - Randomly sets `status` to `paid` or `failed`
    - Returns the updated order and a message

### Frontend

- **Merchant Settings**
  - `MerchantForm` posts merchant details to `POST /merchant`
  - Shows the last saved merchant (name, ID, method, config)
  - Notifies `App` of the active merchant so orders can be linked to it

- **Orders & Payment**
  - `App` fetches orders from `GET /orders` and passes them to `OrderList`
  - The **Create Mock Order** button:
    - Requires an active merchant
    - Generates a random amount between 100 and 50,000 TSh
    - Calls `POST /order` with that amount and the merchant's ID
    - Refreshes the list from the backend
  - `OrderList` displays:
    - Product name, truncated order ID, and `TSh` total amount
    - A status badge (`pending`, `paid`, or `failed`)
    - A **Simulate Pay** button for pending orders only
  - Clicking **Simulate Pay**:
    - Calls `POST /pay/{order_id}`
    - After the backend finishes, the orders list is re-fetched and the status badge updates

---

## Running on Another Machine

For local development, both frontend and backend assume they are running on the **same machine**:

- Backend: `http://127.0.0.1:8000`
- Frontend: `http://localhost:5173`

If you move the project to another computer and repeat the setup steps there, it will work the same without code changes.

