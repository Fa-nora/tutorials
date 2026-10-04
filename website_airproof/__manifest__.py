{
	'name': 'Airproof Theme',
	'description': 'Airproof Theme',
	'category': 'Theme',
	'version': '1.0',
	'author': 'Your Name',
	'license': 'LGPL-3',
	'depends': ['website', 'website_sale', 'website_sale_wishlist', 'website_blog',
	            'website_mass_mailing'],

	'data': [
		'data/presets.xml',
		'data/website.xml',
		'data/images.xml',
		'data/menu.xml',
		'data/shapes.xml',
		'data/pages/home.xml',
		'views/website_templates.xml',
		'views/website_sale_templates.xml',
		'views/snippets/s_airproof_carousel.xml',
		'views/snippets/options.xml',
	],
	'assets': {
		'web._assets_primary_variables': [
			'website_airproof/static/src/scss/primary_variables.scss',
		],
		'website.website_builder_assets': [
			'website_airproof/static/src/builder/background_shapes_option_plugin.js',
		],
		'web._assets_frontend_helpers': [
			('prepend', 'website_airproof/static/src/scss/bootstrap_overridden.scss'),
		],
		'web.assets_frontend': [
			'website_airproof/static/src/scss/layout/header.scss',
			'website_airproof/static/src/scss/snippets/caroussel.scss',
			'website_airproof/static/src/scss/components/mouse_follower.scss',
			'website_airproof/static/src/js/mouse_follower.js',
			'website_airproof/static/src/scss/snippets/newsletter.scss',
			'website_airproof/static/src/snippets/s_airproof_carousel/000.scss',

		],
	},
}
