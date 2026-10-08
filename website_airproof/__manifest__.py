{
	'name': 'Airproof Theme',
	'description': 'Airproof Theme',
	'category': 'Theme',
	'version': '1.0',
	'author': 'Your Name',
	'license': 'LGPL-3',
	'depends': [
		'website',
		'website_sale',
		'website_sale_wishlist',
		'website_blog',
		'website_mass_mailing',
	],
	    'data': [
        'data/presets.xml',
        'data/website.xml',
        'data/images.xml',
        'data/shapes.xml',
        'data/menu.xml',
        'data/pages/home.xml',
        'data/pages/contact.xml',
        'views/website_templates.xml',
        'views/website_sale_templates.xml',
        # 'views/product_tile_templates.xml',
        'views/snippets/s_airproof_carousel.xml',
        'views/snippets/options.xml',
        'views/new_page_template_templates.xml',
    ],
	'assets': {
		'web._assets_primary_variables': [
			'website_airproof/static/src/scss/primary_variables.scss',
		],
		'web._assets_frontend_helpers': [
			('prepend', 'website_airproof/static/src/scss/bootstrap_overridden.scss'),
		],
		'web.assets_frontend': [
    'website_airproof/static/src/scss/layout/header.scss',
    # 'website_airproof/static/src/scss/pages/shop.scss',
    'website_airproof/static/src/scss/snippets/caroussel.scss',
    'website_airproof/static/src/scss/snippets/newsletter.scss',
    'website_airproof/static/src/scss/components/mouse_follower.scss',
    'website_airproof/static/src/snippets/s_airproof_carousel/000.scss',
    'website_airproof/static/src/js/mouse_follower.js',
],
		'website.website_builder_assets': [
			'website_airproof/static/src/builder/background_shapes_option_plugin.js',
			'website_airproof/static/src/builder/image_shapes_option_plugin.js',
		],
	},

	'new_page_templates': {
		'airproof': {
			'services': [
				's_parallax',
				's_airproof_key_benefits_h2',
				's_call_to_action',
				's_airproof_carousel',
			],
		},
	}
}
