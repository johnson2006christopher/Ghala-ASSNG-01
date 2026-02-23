import { useState, useEffect } from 'react';
import MerchantForm from './components/MerchantForm';
import OrderList from './components/OrderList';

function App() {
  // 1. STATE: Store the list of orders here. Start with empty array.
  const [orders, setOrders] = useState([]);

  // 2. ACTION: Function to get orders from Backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/orders');
      const data = await response.json();
      setOrders(data); // Update state
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  // 3. INITIALIZATION: Run fetchOrders once when page loads
  useEffect(() => {
    fetchOrders();
  }, []);

  // 4. ACTION: Function to handle the "Pay" button click
  const handlePay = async (orderId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/pay/${orderId}`, {
        method: 'POST'
      });

      if (response.ok) {
        // After payment is done, refresh the list to see new status
        await fetchOrders(); 
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  // 5. RENDER: Put the pieces together
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">🧠 Ghala Admin Panel</h1>
          <p className="text-gray-500">Manage Merchants & Simulate Orders</p>
        </div>

        {/* Main Grid: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="md:col-span-1">
            <MerchantForm />
            
            {/* Bonus: Button to create a mock order easily */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow text-center">
              <p className="text-sm text-gray-500 mb-2">Testing Tools:</p>
              <button 
                onClick={async () => {
                   await fetch('http://127.0.0.1:8000/order', {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json'},
                     body: JSON.stringify({ product_name: "Test Item", total_amount: 100, merchant_id: "test" })
                   });
                   fetchOrders();
                }}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm w-full"
              >
                + Create Mock Order
              </button>
            </div>
          </div>

          {/* Right Column: List */}
          <div className="md:col-span-2">
            <OrderList orders={orders} onPay={handlePay} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;