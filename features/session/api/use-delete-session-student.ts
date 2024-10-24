import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.sessions)["session-student"][":id"]["$delete"]
>;

type RequestType = InferRequestType<
  (typeof client.api.sessions)["session-student"][":id"]["$delete"]
>["param"];

export const useDeleteSessionStudent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (param: RequestType) => {
      const response = await client.api.sessions[
        "session-student"
      ][":id"]["$delete"]({
        param: {
          id: param.id,
        },
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return mutation;
};
