/** @odoo-module */

import { Plugin } from "@html_editor/plugin";
import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";

export class AirproofBackgroundShapesOptionPlugin extends Plugin {
    static id = "airproofBackgroundShapesOption";

    resources = {
        background_shape_groups_providers: () => ({
            airproof: {
                label: _t("Airproof"),

                subgroups: {
                    airproof_shapes: {
                        label: _t("Shapes"),

                        shapes: {

                            "website_airproof/airproof/waves": {
                                selectLabel: _t("Waves"),
                            },
                        },
                    },
                },
            },
        }),
    };
}

registry.category("website-plugins").add(
    AirproofBackgroundShapesOptionPlugin.id,
    AirproofBackgroundShapesOptionPlugin
);
