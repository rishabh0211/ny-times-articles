import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// Add plugins here
		},
		baseUrl: 'http://localhost:5173', // Update based on your development server's port
	},
});
