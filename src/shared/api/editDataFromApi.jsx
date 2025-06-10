import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useEditData(id) {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: ({ data, signal }) => editDataFromAPI({ data, signal, id }),
      onError: (error) => {
         console.error("Mutation failed:", error);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
   });
   return mutation;
}

async function editDataFromAPI({ id, data, signal }) {
   const BASE_URL = import.meta.env.VITE_API_BASE_URL;
   const URL_EDIT = `${BASE_URL}/tasks/${id}.json`;

   try {
      const response = await axios.patch(URL_EDIT, data, {
         signal: signal,
         headers: { "Content-Type": "application/json" },
      });
      return response.data;
   } catch (error) {
      console.warn(`You have error: ${error}`);
      throw new Error(error);
   }
}
