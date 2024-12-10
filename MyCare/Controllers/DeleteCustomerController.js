export const deleteCustomer = async (customerId) => {
    try {
        const response = await fetch(`https://my-care-server.onrender.com/api/customer/${customerId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting customer:', error);
        return null;
    }
};
