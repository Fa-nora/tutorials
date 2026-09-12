/** @odoo-module **/

import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";

const clickerService = {
    start() {
        return new ClickerModel();
    },
};

registry.category("services").add(
    "awesome_clicker.clicker",
    clickerService
);