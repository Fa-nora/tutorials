# -*- coding: utf-8 -*-
{
    'name': "Awesome Dashboard",

    'summary': """
        Starting module for "Discover the JS framework, chapter 2: Build a dashboard"
    """,

    'description': """
        Starting module for "Discover the JS framework, chapter 2: Build a dashboard"
    """,

    'author': "Odoo",
    'website': "https://www.odoo.com/",
    'category': 'Tutorials',
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'web', 'mail', 'crm'],

    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'awesome_dashboard/static/src/dashboard_action.js',
        ],
        'awesome_dashboard.dashboard': [
            'awesome_dashboard/static/src/dashboard/dashboard.js',
            'awesome_dashboard/static/src/dashboard/dashboard.xml',
            'awesome_dashboard/static/src/dashboard.scss',
            'awesome_dashboard/static/src/dashboard/DashboardItem/dashboard_item.js',
            'awesome_dashboard/static/src/dashboard/DashboardItem/dashboard_item.xml',
            'awesome_dashboard/static/src/dashboard/PieChart/pie_chart.js',
            'awesome_dashboard/static/src/dashboard/PieChart/pie_chart.xml',
            'awesome_dashboard/static/src/statistics_service.js',
            'awesome_dashboard/static/src/dashboard_action.xml',
        ],
    },

    'license': 'AGPL-3'
}
