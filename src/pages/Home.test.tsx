import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { vi, describe, it, expect, Mock } from 'vitest';

import Home from '@/pages/Home';
import { useFetchArticles } from '@/hooks/useFetchArticles';
import { Article } from '@/types/Article';

vi.mock('@/components/ArticleList/ArticleList', () => ({
	__esModule: true,
	default: ({
		articles,
		onSelectArticle,
	}: {
		articles: Article[];
		onSelectArticle: (article: Article) => void;
	}) => (
		<div>
			{articles.map((article) => (
				<div
					key={article.id}
					data-testid='article-item'
					onClick={() => onSelectArticle(article)}
				>
					{article.title}
				</div>
			))}
		</div>
	),
}));

vi.mock('@/components/ArticleDetails/ArticleDetail', () => ({
	__esModule: true,
	default: ({ article, onClose }: { article: Article; onClose: () => void }) => (
		<div data-testid='article-detail'>
			<h1>{article.title}</h1>
			<button data-testid='close-detail' onClick={onClose}>
				Close
			</button>
		</div>
	),
}));

vi.mock('@/hooks/useFetchArticles', () => ({
	useFetchArticles: vi.fn(),
}));

describe('Home Component', () => {
	it('renders loading state initially', () => {
		(useFetchArticles as Mock).mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
			refetch: vi.fn(),
		});

		render(<Home />);
		expect(screen.getByText(/Loading articles.../i)).toBeInTheDocument();
	});

	it('renders error state', async () => {
		const mockRefetch = vi.fn();
		(useFetchArticles as Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: true,
			refetch: mockRefetch,
		});

		render(<Home />);
		expect(screen.getByText(/Failed to load articles/i)).toBeInTheDocument();

		const refetchButton = screen.getByText(/Refetech/i);
		fireEvent.click(refetchButton);
		expect(mockRefetch).toHaveBeenCalled();
	});

	it('renders articles and handles article selection', async () => {
		(useFetchArticles as Mock).mockReturnValue({
			data: [
				{ id: 1, title: 'Article 1' },
				{ id: 2, title: 'Article 2' },
			],
			isLoading: false,
			error: null,
			refetch: vi.fn(),
		});

		render(<Home />);

		const articles = screen.getAllByTestId('article-item');
		expect(articles).toHaveLength(2);
		expect(screen.getByText('Article 1')).toBeInTheDocument();
		expect(screen.getByText('Article 2')).toBeInTheDocument();

		fireEvent.click(articles[0]);
		expect(screen.getByTestId('article-detail')).toBeInTheDocument();
		const articleDetailsEl = await screen.findByTestId('article-detail');
		expect(within(articleDetailsEl).getByText('Article 1')).toBeInTheDocument();

		const closeButton = screen.getByTestId('close-detail');
		fireEvent.click(closeButton);
		await waitFor(() =>
			expect(screen.queryByTestId('article-detail')).not.toBeInTheDocument()
		);
	});

	it('handles days selection', () => {
		(useFetchArticles as Mock).mockReturnValue({
			data: [],
			isLoading: false,
			error: null,
			refetch: vi.fn(),
		});

		render(<Home />);

		const select = screen.getByRole('combobox');
		expect(select).toHaveValue('7');
		expect(useFetchArticles).toHaveBeenCalledWith(7);

		fireEvent.change(select, { target: { value: '30' } });
		expect(select).toHaveValue('30');
		expect(useFetchArticles).toHaveBeenCalledWith(30);
	});
});
