import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetSubject = () => {
  const query = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await client.api.subjects.$get();

      const data = await res.json();
      return data.data;
    },
  });

  return query;
};
