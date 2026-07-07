
import adapter from '@sveltejs/adapter-static';


const config = {
	kit: {
		adapter: adapter({ 
			fallback: 'index.html' ,
			pages: 'docs',
			assets: 'docs',
		}) , 
		// paths: { base: '/floodweb' }
		paths: { base: '/flood-web' }
	},
};

export default config;
