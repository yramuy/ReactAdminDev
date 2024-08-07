import axios from "axios";

export const fetchData = async () => {

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/screens', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const screenData = response.data['screens'];

        return screenData;

    } catch (error) {
        console.error('Fetch data failed:', error);
        throw error;
    }
};