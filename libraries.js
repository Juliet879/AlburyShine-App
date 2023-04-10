
import { MAPS_API_KEY } from '@env';
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
  