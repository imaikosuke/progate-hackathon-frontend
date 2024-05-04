// utils/getData.ts
import axios from "axios";

export const getID = async (lon: string, lat: string) => {
  try {
    const apiUrl = process.env.BACKEND_URL;
    const response = await axios.post(`${apiUrl}/get_narrow`, {
      data: { longitude: lon, latitude: lat },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
