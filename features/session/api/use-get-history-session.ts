import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetHistorySession = (teacherId: number) => {
  const query = useQuery({
    queryKey: ["history-sessions", teacherId],
    queryFn: async () => {
      const res = await client.api.sessions.history[
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
