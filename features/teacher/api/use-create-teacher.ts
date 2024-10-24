import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  typeof client.api.teachers.$post
>;

type RequestType = InferRequestType<
  typeof client.api.teachers.$post
>["json"];

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (body: RequestType) => {
      const response = await client.api.teachers.$post({
        json: body,
      });

      return response.json();
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
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
