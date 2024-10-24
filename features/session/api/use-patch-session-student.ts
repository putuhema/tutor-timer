import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.sessions.time)[":id"]["$put"]
>;

type RequestType = InferRequestType<
  (typeof client.api.sessions.time)[":id"]["$put"]
>["param"];

export const usePatchSessionStudent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (param: RequestType) => {
      const response = await client.api.sessions.time[
        ":id"
      ]["$put"]({
        param: {
          id: param.id.toString(),
        },
      });

      return response.json();
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
