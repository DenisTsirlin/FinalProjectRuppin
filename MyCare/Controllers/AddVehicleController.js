import { Alert } from 'react-native';


export const handleAddVehicle = async (vehicleDetails) => {
    try {
        // בדיקה אם מספר הרכב כבר נמצא במאגר עבור הלקוח הנוכחי
        const checkResponse = await fetch(`https://my-care-server.onrender.com/api/vehicle/number/${vehicleDetails.carNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (checkResponse.ok) {
            const data = await checkResponse.json();

            // בדיקה אם הרכב כבר קיים במאגר והאם הוא שייך לאותו לקוח
            if (data.vehicle && data.vehicle.Customer_Id === vehicleDetails.customerId) {
                Alert.alert('Error', 'הרכב כבר קיים ברשימת הרכבים של הלקוח');
                return false;
            }
        } else {
            Alert.alert('תהליך בהמתנה', 'עוד כמה שניות והרכב מתווסף בהצלחה!');
        }



        // אם הרכב לא נמצא, ממשיך בהוספה
        console.log('Vehicle details being sent:', JSON.stringify(vehicleDetails));
        const response = await fetch('https://my-care-server.onrender.com/api/vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Car_Number: vehicleDetails.carNumber,
                Customer_Id: vehicleDetails.customerId,
                Manufacturer: vehicleDetails.manufacturer,
                Year_of_Manufacture: vehicleDetails.yearOfManufacture,
                Color: vehicleDetails.color,
                Number_Of_Kilometers: vehicleDetails.numberOfKilometers,
                Insurance_Expiration: vehicleDetails.insuranceExpiration,
                Model: vehicleDetails.model,
                imageURL: vehicleDetails.imageURL,
                insuranceUrl: vehicleDetails.insuranceUrl
            }),
        });

        const textResponse = await response.text();

        if (!response.ok) {
            console.error('Server error:', textResponse);
            Alert.alert('Error', `Server error: ${textResponse}`);
            return false;
        }
    

        return true;

    } catch (error) {
        console.error('Failed to add vehicle:', error.message);
        Alert.alert('Error', `Failed to add vehicle: ${error.message}`);
        return false;
    }
};

export const fetchCustomerVehicles = async (customerId) => {
    try {
        const response = await fetch(`https://my-care-server.onrender.com/api/customer/${customerId}`);
        const textResponse = await response.text(); // קריאה לתגובה כטקסט

        // בדיקה אם התגובה היא JSON
        let data;
        try {
            data = JSON.parse(textResponse);
        } catch (error) {
            console.error('Failed to parse JSON:', textResponse);
            Alert.alert('Error', 'Failed to fetch customer data. Please try again.');
            return null;
        }

        // וידוא שהתגובה כוללת את אובייקט הלקוח
        if (data && data.customer) {
            return data.customer;
        } else {
            console.error('Customer not found or response invalid');
            Alert.alert('Error', 'Customer not found or response invalid');
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch customer details:', error);
        Alert.alert('Error', `Failed to fetch customer details: ${error.message}`);
        return null;
    }
};






export const loadCarDetails = async (carNumber, setVehicleDetails) => {
    try {
        const response = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${carNumber}`);
        const data = await response.json();

        if (data.result.records.length > 0) {
            const carData = data.result.records[0];

            setVehicleDetails((prevDetails) => ({
                ...prevDetails,
                yearOfManufacture: carData.shnat_yitzur ? carData.shnat_yitzur.toString() : '', // המרת מספר למחרוזת
                color: carData.tzeva_rechev || '', // צבע
                manufacturer: carData.tozeret_nm || '', // יצרן
                numberOfKilometers: carData.numberOfKilometers || '', // מספר קילומטרים
                insuranceExpiration: carData.tokef_dt || '', // תוקף ביטוח
                model: carData.kinuy_mishari || '', // דגם
            }));
        } else {
            console.error('No car data found for the given number');
        }
    } catch (error) {
        console.error('Error loading car details:', error);
    }

};


export const createImage = async (manufacturer, model, color, setImage) => {
    let words = await translateWords(color, manufacturer.split(' ')[0]);
    let [c, m] = words.split(', ');
    let prompt = `A ${c} ${m} ${model}, Soft natural lighting, high details, photorealistic style, 4k, high res`;
    console.log(prompt);

    // יצירת התמונה
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                inputs: prompt,
            }),
        }
    );

    const result = await response.blob();
    const img = await ConvertToBase64(result);

    // עדכון התמונה באפליקציה
    setImage(img);
    return img; // מחזיר את התמונה לשימוש ב-uploadImageToCloudinary
};

export const translateWords = async (color, manufacturer) => {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct/v1/chat/completions",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "model": "meta-llama/Llama-3.2-3B-Instruct",
                "messages": [
                    {
                        role: "user",
                        content: `Please translate the Hebrew color ${color} to English and the car model ${manufacturer} also. If you cant translate, write the word phonetically. write only the translation and seperate each one by a comma`,
                    },
                ],
                "max_tokens": 500,
                "stream": false,
            }),
        }
    );

    let data = await response.json();
    let translatedText = data.choices[0].message.content;
    return translatedText;
}

function ConvertToBase64(blob) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });

}


export const uploadImageToCloudinary = async (imageUri) => {
    console.log('Uploading image to Cloudinary:', imageUri);

    let data = new FormData();
    data.append('file', {
        uri: imageUri,
        type: 'image/jpeg', // or image/png
        name: 'insurance_image.jpg' // Adjust the name as per your needs
    });
    data.append('upload_preset', 'MyCare');

    try {
        let response = await fetch(
            'https://api.cloudinary.com/v1_1/dphqcfyz8/image/upload',
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        let jsonResponse = await response.json();
        console.log('URL of uploaded image:', jsonResponse.secure_url);
        return jsonResponse.secure_url;

    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};
