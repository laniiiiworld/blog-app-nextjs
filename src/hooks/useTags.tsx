import { jsonToMap } from '@/util/convert';
import { useQuery } from '@tanstack/react-query';

type Props = {
  initialData: Map<string, number>;
};
export function useTags({ initialData }: Props) {
  const {
    data: tags = initialData,
    isLoading,
    isError,
  } = useQuery<Map<string, number>, Error>({
    queryKey: ['tags'],
    queryFn: () =>
      fetch('/api/tags', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((jsonData) => jsonToMap(jsonData)),
    initialData,
    refetchInterval: 1000 * 60 * 3,
  });

  return { tags, isLoading, isError };
}
