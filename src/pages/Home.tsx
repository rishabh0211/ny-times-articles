import { useState } from 'react';

import ArticleList from '@/components/ArticleList/ArticleList';
import { useFetchArticles } from '@/hooks/useFetchArticles';
import ArticleDetail from '@/components/ArticleDetails/ArticleDetail';
import { Article } from '@/types/Article';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
	const [days, setDays] = useState(7);

	const { data: articles, isLoading, error, refetch } = useFetchArticles(days);

	const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDays(+e.target.value);
	};

	if (isLoading) return <p className='text-center'>Loading articles...</p>;
	if (error)
		return (
			<div className='flex flex-col items-center'>
				<p className='text-center text-red-500'>Failed to load articles.</p>
				<button
					className='bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700'
					onClick={() => refetch()}
				>
					Refetch
				</button>
			</div>
		);

	return (
		<div>
			<div className='text-right mb-4'>
				<select value={days} onChange={handleDaysChange} className='p-1 cursor-pointer'>
					<option value='1'>1</option>
					<option value='7'>7</option>
					<option value='30'>30</option>
				</select>
			</div>
			<ArticleList
				articles={articles || []}
				onSelectArticle={(article) => setSelectedArticle(article)}
			/>
			{selectedArticle && (
				<ArticleDetail
					article={selectedArticle}
					onClose={() => setSelectedArticle(null)}
				/>
			)}
		</div>
	);
};

export default Home;
