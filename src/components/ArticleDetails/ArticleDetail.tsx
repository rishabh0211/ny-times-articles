import { Article } from '@/types/Article';
import { useEffect } from 'react';

type ArticleDetailProps = {
	article: Article;
	onClose: () => void;
};

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose }) => {
	useEffect(() => {
		// Prevent background scroll when the modal is open
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const media = article.media[0];
	const image = media?.['media-metadata'].find(
		(meta) => meta.format === 'mediumThreeByTwo440'
	);

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			onClick={onClose}
			data-testid='article-detail-modal'
		>
			<div
				className='bg-white rounded-lg p-7 w-11/12 max-w-lg max-h-[95%] relative overflow-y-auto'
				onClick={(e) => e.stopPropagation()}
				data-testid='modal-content'
				>
				<button
					className='absolute top-1 right-2.5 text-gray-500 hover:text-gray-700 scale-x-150 scale-y-125'
					onClick={onClose}
					data-testid='article-detail-modal-close'
				>
					x
				</button>
				{image && (
					<img
						src={image.url}
						alt={media.caption}
						className='w-full h-48 object-cover rounded mb-4'
					/>
				)}
				<h2 className='text-xl font-bold mb-4 text-blue-600'>{article.title}</h2>
				<p className='text-gray-700 mb-2'>{article.byline}</p>
				<p className='text-gray-600 mb-4'>{article.abstract}</p>
				<a
					href={article.url}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-500 hover:underline'
				>
					Read full article
				</a>
			</div>
		</div>
	);
};

export default ArticleDetail;
