import logging
import os

from lxml import etree

# from odoo.exceptions import ValidationError
from odoo.loglevels import ustr
from odoo.tools import misc, view_validation

_logger = logging.getLogger(__name__)

_gallery_validator = None


@view_validation.validate('gallery')
def schema_gallery(arch, **kwargs):

	global _gallery_validator

	if _gallery_validator is None:
		try:
			with misc.file_open(os.path.join('awesome_gallery', 'rng', 'gallery.rng')) as f:
				_gallery_validator = etree.RelaxNG(etree.parse(f))
		except Exception as e:
			_logger.error("Could not load gallery RNG file: %s", e)
			return True

	if _gallery_validator.validate(arch):
		# بررسی اینکه آیا فیلدهای داده شده در مدل وجود دارند یا خیر
		res_model = kwargs.get('res_model')
		if res_model and res_model in kwargs.get('env', {}):
			Model = kwargs['env'][res_model]
			image_field = arch.get('image_field')
			tooltip_field = arch.get('tooltip_field')

			if image_field and image_field not in Model._fields:
				_logger.error(f"Field '{image_field}' does not exist on model '{res_model}'")
				return False

			if tooltip_field and tooltip_field not in Model._fields:
				_logger.error(f"Field '{tooltip_field}' does not exist on model '{res_model}'")
				return False

		return True

	for error in _gallery_validator.error_log:
		_logger.error(ustr(error))
	return False