// src/components/OrderList.jsx

const OrderList = ({ orders, onPay }) => {
  
  // 1. SAFETY CHECK: If there are no orders, show a message and stop.
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        <p>No orders yet. Create one to get started!</p>
      </div>
    );
  }

  // 2. MAIN RENDER: If we have orders, we loop through them.
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Orders</h2>
      
      {/* Container for the list of cards */}
      <div className="space-y-4">
        
        {/* THE LOOP: .map() takes each order and turns it into HTML */}
        {orders.map((order) => (
          
          // The Card: 'key' is required by React to track this item
          <div 
            key={order.id} 
            className="border rounded-lg p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
          >
            
            {/* LEFT SIDE: Product Info */}
            <div>
              <p className="font-bold text-gray-800">{order.product_name}</p>
              <p className="text-sm text-gray-500">
                Order ID: {order.id.substring(0, 8)}...
              </p>
              <p className="text-green-600 font-semibold mt-1">
                ${order.total_amount}
              </p>
            </div>

            {/* RIGHT SIDE: Status & Action */}
            <div className="flex items-center gap-4">
              
              {/* Status Badge: Changes color based on status */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                  order.status === 'failed' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}
              >
                {order.status}
              </span>

              {/* Pay Button: Only shows if status is 'pending' */}
              {order.status === 'pending' && (
                <button 
                  onClick={() => onPay(order.id)} // Calls the function passed from App.jsx
                  className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
                >
                  Simulate Pay
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;