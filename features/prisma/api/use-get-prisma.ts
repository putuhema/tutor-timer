import { useQuery } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  typeof client.api.prisma.$get
>;
type RequestType = InferRequestType<
  typeof client.api.prisma.$get
>;

export const useGetPrisma = (
  level: number,
  page: number,
  enabled: boolean
) => {
  const query = useQuery({
    queryKey: ["prisma", level, page],
    queryFn: async () => {
      const res = await client.api.prisma.$get({
        query: {
          level: level.toString(),
          page: page.toString(),
        },
      });

      const data = await res.json();
      return data.data;
    },
  });

  return query;
};