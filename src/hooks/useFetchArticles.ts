import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/services/articles';

export const useFetchArticles = (days: number) => {
	return useQuery({
		queryKey: ['fetchArticles', days],
		queryFn: () => fetchArticles(days),
		staleTime: 24 * 60 * 60 * 1000, // 1 day
		retry: false,
	});
};
