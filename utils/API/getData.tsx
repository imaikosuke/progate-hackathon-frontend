// utils/getData.ts
import axios from "axios";

export const getID = async (
  lon: string,
  lat: string,
  time: string,
  transportation: string,
  mainPlaceTime: string,
  name: string
) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await axios.post(`${apiUrl}/get_narrow`, {
      data: {
        longitude: lon,
        latitude: lat,
        time: time,
        transportation: transportation,
        mainPlaceTime: mainPlaceTime,
        name: name,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
