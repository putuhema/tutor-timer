
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.subjects.$post>;
type RequestType = InferRequestType<typeof client.api.subjects.$post>['json'];


export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (body: RequestType) => {
      const response = await client.api.subjects.$post({
        json: body
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"]
      })
      toast("Created", { icon: "🎉", duration: 2000 })
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    }
  })

  return mutation
}

