export const updateVehicleDetails = async (carNumber, updatedDetails) => {
    try {
        const response = await fetch(`https://my-care-server.onrender.com/api/vehicle/${carNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDetails),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Server error:", result);
            return false;
        }

        return result;
    } catch (error) {
        console.error("Failed to update vehicle details:", error);
        return false;
    }
};