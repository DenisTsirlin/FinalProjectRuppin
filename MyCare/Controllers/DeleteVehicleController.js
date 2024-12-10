export const deleteVehicleByCarNumber = async (carNumber) => {
    try {
        const response = await fetch(`https://my-care-server.onrender.com/api/vehicle/${carNumber}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        throw error;
    }
};
