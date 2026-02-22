import { useState } from "react";

const MerchatForm = () => {
    // create state variable for name, paymentMethods , configDetails

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch("/api/merchants", {
            method: "POST",
        })
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Merchant Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Add Input For Name */}
                <input
                    type="text"
                    placeholder="Shop Name"
                    className="w-full boder p-2 rounded"
                />

                {/* Add Input For Payment Methods */}
                <input
                    type="text"
                    placeholder="Payment Methods"
                    className="w-full boder p-2 rounded"
                />

                {/* Add Input For Config Details */}
                <input
                    type="text"
                    placeholder="Config Details"
                    className="w-full boder p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Save
                </button>
            </form>
        </div>

    );
};

export default MerchatForm;
