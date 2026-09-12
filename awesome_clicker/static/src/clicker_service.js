/** @odoo-module **/

import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";

const clickerService = {
    dependencies: ["effect"],

    start(env, { effect }) {
        const clicker = new ClickerModel();

        clicker.bus.addEventListener("MILESTONE_1k", () => {
            effect.add({
                type: "rainbow_man",
                message: "You can now buy ClickBots!",
            });
        });

        return clicker;
    },
};

registry.category("services").add(
    "awesome_clicker.clicker",
    clickerService
);