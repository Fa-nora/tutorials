from odoo import api, fields, models
import json


class AwesomeDashboardSettings(models.Model):
    _name = "awesome.dashboard.settings"
    _description = "Awesome Dashboard Settings"

    user_id = fields.Many2one(
        "res.users",
        required=True,
        default=lambda self: self.env.user,
        index=True,
    )

    removed_items = fields.Text(
        default="[]",
    )

    @api.model
    def get_dashboard_settings(self):
        settings = self.sudo().search(
            [
                ("user_id", "=", self.env.user.id)
            ],
            limit=1,
        )

        if not settings:
            settings = self.sudo().create({
                "user_id": self.env.user.id,
                "removed_items": "[]",
            })

        return {
            "removed_items": json.loads(
                settings.removed_items or "[]"
            ),
        }

    @api.model
    def save_dashboard_settings(
        self,
        removed_items,
    ):
        settings = self.sudo().search(
            [
                ("user_id", "=", self.env.user.id)
            ],
            limit=1,
        )

        values = {
            "removed_items": json.dumps(
                removed_items
            ),
        }

        if settings:
            settings.sudo().write(values)

        else:
            values["user_id"] = self.env.user.id

            self.sudo().create(values)

        return True