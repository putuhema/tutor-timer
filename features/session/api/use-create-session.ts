import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  typeof client.api.sessions.$post
>;

type RequestType = InferRequestType<
  typeof client.api.sessions.$post
>["json"];

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (body: RequestType) => {
      const response = await client.api.sessions.$post({
        json: body,
      });

      return response.json();
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: ["sessions", body.data.teacherId],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return mutation;
};
