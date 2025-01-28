import Home from '@/pages/Home';
import Header from '@/components/Header';

const App = () => {
	return (
		<div className='min-h-screen bg-gray-100 text-gray-900'>
			<Header />
			<main className='p-4 md:max-w-5xl md:mx-auto'>
				<Home />
			</main>
		</div>
	);
};
export default App;
