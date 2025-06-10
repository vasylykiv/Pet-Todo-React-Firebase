import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useSendData() {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: ({ data, signal }) => sendDataToAPI({ data, signal }),
      onError: (error) => {
         console.error("Mutation failed:", error);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
   });
   return mutation;
}

const sendDataToAPI = async ({ data, signal }) => {
   const BASE_URL = import.meta.env.VITE_API_BASE_URL;
   const SEND_URL = `${BASE_URL}/tasks.json`;

   try {
      const response = await axios.post(SEND_URL, data, {
         signal: signal,
         headers: {
            "Content-Type": "application/json",
         },
      });

      return response.data;
   } catch (error) {
      console.error(error);
      throw new Error(`you error: ${error}`);
   }
};
