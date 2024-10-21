import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.prisma)[":id"]["$delete"]
>;

type RequestType = InferRequestType<
  (typeof client.api.prisma)[":id"]["$delete"]
>;

export const useDeletePrismaItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ param: { id } }) => {
      const response = await client.api.prisma[
        ":id"
      ].$delete({
        param: {
          id: id.toString(),
        },
      });

      return response.json();
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: [
          "prisma",
          body.data.level,
          body.data.page,
        ],
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
