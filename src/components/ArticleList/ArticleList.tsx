import { Article } from '@/types/Article';

type ArticleListProps = {
	articles: Article[];
	onSelectArticle: (article: Article) => void;
};

const ArticleList: React.FC<ArticleListProps> = ({ articles, onSelectArticle }) => {
	return (
		<ul className='space-y-4' data-testid='article-list'>
			{articles.map((article) => (
				<li
					key={article.url}
					className='bg-white p-4 shadow rounded transition duration-300 hover:shadow-lg cursor-pointer'
					onClick={() => onSelectArticle(article)}
				>
					<h2 className='text-lg font-semibold text-blue-600'>{article.title}</h2>
					<p className='text-sm text-gray-600'>{article.byline}</p>
				</li>
			))}
		</ul>
	);
};

export default ArticleList;
