# -*- coding: utf-8 -*-

from odoo import api, fields, models


class AccountInvoiceLine(models.Model):
    _inherit = 'account.invoice.line'
    _order = 'invoice_id,name,sequence,id'

    fake_field_to_see_order = fields.Char(compute='_compute_fake')

    def _compute_fake(self):
        for rec in self:
            rec.fake_field_to_see_order = self._order
