import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ArticleList from './ArticleList';
import { Article } from '@/types/Article';
// import { mockArticles } from '@/tests/mockArticles';

describe('ArticleList Component', () => {
	const mockArticles = [
		{
			id: 1,
			title: 'Test Article 1',
			byline: 'Test Author 1',
			url: 'https://example.com/1',
		},
		{
			id: 2,
			title: 'Test Article 2',
			byline: 'Test Author 2',
			url: 'https://example.com/2',
		},
	] as Article[];
	it('renders a list of articles', () => {
		render(<ArticleList articles={mockArticles} onSelectArticle={vi.fn()} />);

		// Check if all article titles are rendered
		mockArticles.forEach((article) => {
			expect(screen.getByText(article.title)).toBeInTheDocument();
		});

		// Check if all bylines are rendered
		mockArticles.forEach((article) => {
			expect(screen.getByText(article.byline)).toBeInTheDocument();
		});
	});

	it('calls onSelectArticle when an article is clicked', () => {
		const onSelectArticle = vi.fn();
		render(<ArticleList articles={mockArticles} onSelectArticle={onSelectArticle} />);

		// Click on the first article
		fireEvent.click(screen.getByText(mockArticles[0].title));
		expect(onSelectArticle).toHaveBeenCalledOnce();
		expect(onSelectArticle).toHaveBeenCalledWith(mockArticles[0]);

		// Click on the second article
		fireEvent.click(screen.getByText(mockArticles[1].title));
		expect(onSelectArticle).toHaveBeenCalledTimes(2);
		expect(onSelectArticle).toHaveBeenCalledWith(mockArticles[1]);
	});

	it('renders no articles when the list is empty', () => {
		render(<ArticleList articles={[]} onSelectArticle={vi.fn()} />);
		expect(screen.queryAllByRole('listitem')).toHaveLength(0);
		expect(screen.queryByText(/Test Article/i)).not.toBeInTheDocument();
	});
});
