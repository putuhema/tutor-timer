import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetStudent = (id: string) => {
  const query = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const res = await client.api.students[":id"].$get({
        param: {
          id,
        },
      });

      const data = await res.json();
      return data.data;
    },
  });

  return query;
};
