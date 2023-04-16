
import { MAPS_API_KEY,API_URL } from '@env';
import axios from 'axios';

 export const reverseGeocode = async (latitude, longitude) => {
    const apiKey = MAPS_API_KEY; // Replace with your Google Maps API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
    try {
      const response = await axios.get(apiUrl);
      const { results } = response.data;
  
      if (results.length > 0) {
        return results[0].formatted_address;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Error fetching address';
    }
  };

  export const getToken = async(userId) =>{
    try {
      const response = await fetch(`${API_URL}/getTokens/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to get token");
      }
  
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error getting token:", error);
      throw error;
    }
  }
  
  