import { Article } from '@/types/Article';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchArticles = async (days: number): Promise<Article[]> => {
	const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/${days}.json`;
	const response = await axios.get(`${BASE_URL}?api-key=${API_KEY}`);
	return response.data.results;
};
