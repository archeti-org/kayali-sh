# -*- coding: utf-8 -*-

{
    'name': 'Societe Kayali International : Customisation for customer invoice and ',
    'summary': 'Customisation for customer invoice',
    'sequence': 100,
    'license': 'OEEL-1',
    'website': 'https://www.odoo.com',
    'version': '1.1',
    'author': 'Odoo Inc',
    'description': """
        Task ID: 2327984
        - Sort invoice lines by description
        - Stop edit from going to the top of the page
    """,
    'category': 'Custom Development',

    # any module necessary for this one to work correctly
    'depends': ['account', 'stock_barcode', 'sale'],
    'data': [
        'views/account_invoice_views.xml',
        'views/templates.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
