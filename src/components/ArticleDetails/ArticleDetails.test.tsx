import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ArticleDetail from './ArticleDetail';
import { mockArticles } from '@/tests/mockArticles';

describe('ArticleDetail Component', () => {
	const mockArticle = mockArticles[0];

	it('renders article details correctly', () => {
		render(<ArticleDetail article={mockArticle} onClose={vi.fn()} />);
		expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
		expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
		expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /read full article/i })).toHaveAttribute(
			'href',
			mockArticle.url
		);
	});

	it('closes the modal on close button click', () => {
		const onClose = vi.fn();
		render(<ArticleDetail article={mockArticle} onClose={onClose} />);
		fireEvent.click(screen.getByTestId('article-detail-modal-close'));
		expect(onClose).toHaveBeenCalledOnce();
	});

	it('closes the modal when clicking the overlay', () => {
		const onClose = vi.fn();
		render(<ArticleDetail article={mockArticle} onClose={onClose} />);
		fireEvent.click(screen.getByTestId('article-detail-modal'));
		expect(onClose).toHaveBeenCalledOnce();
	});

	it('does not close the modal when clicking inside content', () => {
		const onClose = vi.fn();
		render(<ArticleDetail article={mockArticle} onClose={onClose} />);
		fireEvent.click(screen.getByTestId('modal-content'));
		expect(onClose).not.toHaveBeenCalled();
	});
});
