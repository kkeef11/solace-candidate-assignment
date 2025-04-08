import {
  DefinedInitialDataOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { Advocate } from "../lib/types";

export function useFetchAdvocates(options: UseQueryOptions<Advocate[]>) {
  return useQuery<Advocate[]>({
    ...options,
    queryKey: ["advocates"],
    queryFn: async () => {
      const response = await fetch("/api/advocates");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data as Advocate[];
    },
  });
}
