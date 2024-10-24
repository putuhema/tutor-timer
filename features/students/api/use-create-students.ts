import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  typeof client.api.students.$post
>;

type RequestType = InferRequestType<
  typeof client.api.students.$post
>["json"];

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (body: RequestType) => {
      console.log(body);
      const response = await client.api.students.$post({
        json: body,
      });

      return response.json();
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
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
