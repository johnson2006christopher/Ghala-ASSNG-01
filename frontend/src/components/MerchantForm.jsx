import { useState } from "react";

const MerchatForm = () => {
    // the states we need to track the user types
    const [name, setName] = useState("");
    const [paymentMethods, setPaymentMethods] = useState("mobile");
    const [configDetails, setConfigDetails] = useState("");

    // the logic , function that handle submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //stop the page from refreshing

        // data objcet preparations
        const newMerchant = {
            name: name,
            preferred_payment_method: paymentMethods,
            config_details: configDetails
        };

        // send data to backend
        try {
            const response = await fetch("http://127.0.0.1:8000/merchant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMerchant),
            });
            if (response.ok) {
                // handle success
                console.log("Merchant created successfully");
                setName("");
                setPaymentMethods("mobile");
                setConfigDetails("");
            } else {
                // handle error
                console.error("Failed to create merchant");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occured. Is the backend running?");
        }
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Merchant Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Add Input For Name */}
                <div>
                    <label className= "block text-sm font-medium text-gray-700 mb-1">
                        Shop Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. John's Electronics"
                        required
                    />
                </div>


                {/* Add Input For Payment Methods */}
                <div>
                    <label className= "block text-sm font-medium text-gray-700 mb-1">
                        Payment Methods
                    </label>
                    <select
                        value={paymentMethods}
                        onChange={(e) => setPaymentMethods(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 "

                    >
                        <option value="mobile">Mobile</option>
                        <option value="bank">Bank</option>
                    </select>
                </div>

                <div>
                    <label className= "block text-sm font-medium text-gray-700 mb-1">
                        Config Details
                    </label>
                    <input
                        type="text"
                        value={configDetails}
                        onChange={(e) => setConfigDetails(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="e.g. mobile_money 123456789"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Save Settings
                </button>
            </form>
        </div>

    );
};

export default MerchatForm;
