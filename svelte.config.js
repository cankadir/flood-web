
import adapter from '@sveltejs/adapter-static';


const config = {
	kit: {
		adapter: adapter({ 
			fallback: 'index.html' ,
			// pages: 'build',
			// assets: 'build',
		}) , 
		paths: { base: '/floodweb' }
	},
};

export default config;
