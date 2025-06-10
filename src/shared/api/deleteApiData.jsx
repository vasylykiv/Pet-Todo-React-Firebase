import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteData(id) {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: () => deleteApiData({ id }),
      onError: (error) => {
         console.error("Mutation failed:", error);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
   });
   return mutation;
}

async function deleteApiData({ id, signal }) {
   const BASE_URL = import.meta.env.VITE_API_BASE_URL;
   const URL_Delete = `${BASE_URL}/tasks/${id}.json`;

   try {
      const response = await axios.delete(URL_Delete, {
         signal: signal,
         headers: { "Content-Type": "application/json" },
      });

      return response.data;
   } catch (error) {
      console.warn(`You have error: ${error}`);
      throw new Error(error);
   }
}
