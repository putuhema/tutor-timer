import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetStudents = () => {
  const query = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await client.api.students.$get();

      const data = await res.json();
      return data.data;
    },
  });

  return query;
};
