import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.students)[":id"]["$delete"]
>;

type RequestType = InferRequestType<
  (typeof client.api.students)[":id"]["$delete"]
>["param"];

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (param: RequestType) => {
      const response = await client.api.students[":id"][
        "$delete"
      ]({
        param: {
          id: param.id.toString(),
        },
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      toast("Deleted", { icon: "🎉", duration: 2000 });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return mutation;
};
