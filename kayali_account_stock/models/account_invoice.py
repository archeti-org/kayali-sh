# -*- coding: utf-8 -*-

from odoo import api, fields, models


class AccountInvoiceLine(models.Model):
    _inherit = 'account.invoice.line'
    _order = 'invoice_id,name,sequence,id'
