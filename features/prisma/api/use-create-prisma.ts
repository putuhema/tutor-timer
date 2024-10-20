import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  typeof client.api.prisma.$post
>;

type RequestType = InferRequestType<
  typeof client.api.prisma.$post
>["json"];

export const useCreatePrisma = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (body: RequestType) => {
      const response = await client.api.prisma.$post({
        json: body,
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
      toast("Created", { icon: "🎉", duration: 2000 });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return mutation;
};
