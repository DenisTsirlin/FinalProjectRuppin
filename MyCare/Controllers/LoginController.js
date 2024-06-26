const login = async (email, password) => {
    try {
        const response = await fetch(
            `http://www.denists.somee.com/api/CustomerRW/login?email=${email}&password=${password}`,
            { method: 'GET' }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw error;
    }
};

export default login;


