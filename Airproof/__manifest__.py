{
    'name': 'Airproof Theme',
    'description': 'Airproof Theme',
    'category': 'Theme/Website',
    'version': '1.0',
    'author': 'Your Name',
    'license': 'LGPL-3',
    'depends': [
        'website',
        'website_sale',
        'website_sale_wishlist',
    ],
    'data': [
        'data/presets.xml',
    ],
    'assets': {
        'web._assets_primary_variables': [
            'website_airproof/static/src/scss/primary_variables.scss',
        ],
        'web._assets_frontend_helpers': [
            ('prepend', 'website_airproof/static/src/scss/bootstrap_overridden.scss'),
        ],
        'web.assets_frontend': [
            'website_airproof/static/src/scss/font.scss',
        ],
    },
}