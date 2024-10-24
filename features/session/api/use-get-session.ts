import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { client } from "@/lib/rpc";

export const useGetSession = (teacherId: number) => {
  const query = useQuery({
    queryKey: ["sessions", teacherId],
    queryFn: async () => {
      const res = await client.api.sessions[
        ":teacherId"
      ].$get({
        param: {
          teacherId: teacherId.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch sessions");
      }

      const { data } = await res.json();
      return data;
    },
  });

  return query;
};
