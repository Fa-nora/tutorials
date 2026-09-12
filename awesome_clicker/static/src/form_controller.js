/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";

import { useClicker } from "./clicker_hook";

patch(FormController.prototype, {
    setup() {
        super.setup(...arguments);

        this.clicker = useClicker();

        if (Math.random() < 1) {
            const reward = this.clicker.getReward();

            this.clicker.bus.trigger("REWARD", {
                reward,
            });
        }
    },
});