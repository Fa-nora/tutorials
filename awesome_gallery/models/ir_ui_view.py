# -*- coding: utf-8 -*-
from odoo import fields, models,api
from lxml.builder import E


class View(models.Model):
	_inherit = 'ir.ui.view'

	type = fields.Selection(selection_add=[('gallery', "Awesome Gallery")])

	def _get_view_info(self):
		return {'gallery': {'icon': 'fa fa-picture-o'}} | super()._get_view_info()

	# @api.model
	# def _get_default_gallery_view(self):
	# 	""" Generates a single-field search view, based on _rec_name.
	#
	# 	:returns: a search view as an lxml document
	# 	:rtype: etree._Element
	# 	"""
	# 	element = E.field(name=self._rec_name_fallback())
	# 	return E.search(element, string=self._description)
