import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetData() {
   const queryResult = useQuery({
      queryKey: ["todos"],
      queryFn: getDataFromAPI,
      retry: false,
   });
   return queryResult;
}

async function getDataFromAPI({ signal }) {
   const BASE_URL = import.meta.env.VITE_API_BASE_URL;
   const GET_URL = `${BASE_URL}/tasks.json`;

   try {
      const response = await axios.get(GET_URL, { signal: signal });
      const receivedData = formatReveivedData(response);
      return receivedData;
   } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
   }
}

function formatReveivedData(response) {
   let apiData;

   if (!response.data) {
      apiData = [];
      return apiData;
   }

   apiData = Object.keys(response.data).map((key) => ({
      id: key,
      ...response.data[key],
   }));
   return apiData;
}
