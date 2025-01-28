import axios from 'axios';
import { vi, describe, it, MockedObject, expect } from 'vitest';
import { fetchArticles } from '@/services/articles';

vi.mock('axios');

describe('fetchArticles', () => {
	const mockedAxios = axios as MockedObject<typeof axios>;

	it('should fetch articles successfully', async () => {
		const mockData = {
			results: [
				{ id: 1, title: 'Article 1' },
				{ id: 2, title: 'Article 2' },
			],
		};

		mockedAxios.get.mockResolvedValueOnce({ data: mockData });

		const articles = await fetchArticles(7);

		expect(articles).toEqual(mockData.results);
		expect(mockedAxios.get).toHaveBeenCalledWith(
			'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=' +
				process.env.VITE_NYT_API_KEY
		);
	});

	it('should throw an error if the API call fails', async () => {
		mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

		await expect(fetchArticles(7)).rejects.toThrow('Network error');
		expect(mockedAxios.get).toHaveBeenCalledWith(
			'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=' +
				process.env.VITE_NYT_API_KEY
		);
	});
});
