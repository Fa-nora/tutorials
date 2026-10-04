/** @odoo-module **/

import { Plugin } from "@html_editor/plugin";
import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";

export class AirproofImageShapesOptionPlugin extends Plugin {
    static id = "airproofImageShapesOption";
    resources = {
        image_shape_groups_providers: () => ({
            airproof: {
                label: _t("Airproof"),
                subgroups: {
                    duo: {
                        label: _t("Duo"),
                        shapes: {
                            "website_airproof/duo/01": {
                                selectLabel: _t("Duo 01"),
                            },
                        },
                    },
                },
            },
        }),
    };
}

registry.category("website-plugins").add(
    AirproofImageShapesOptionPlugin.id,
    AirproofImageShapesOptionPlugin
);