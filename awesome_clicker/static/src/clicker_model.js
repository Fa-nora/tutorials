/** @odoo-module **/

import { EventBus } from "@odoo/owl";
import { Reactive } from "@web/core/utils/reactive";

export class ClickerModel extends Reactive {
    constructor() {
        super();

        this.bus = new EventBus();

        this.clicks = 0;
        this.level = 0;
        this.clickBots = 0;

        setInterval(() => {
            this.clicks += 10 * this.clickBots;
        }, 10000);
    }

    increment(inc) {
        this.clicks += inc;

        if (this.clicks >= 1000 && this.level < 1) {
            this.level = 1;
            this.bus.trigger("MILESTONE_1k");
        }
    }

    buyClickBot() {
        if (this.clicks >= 1000) {
            this.clicks -= 1000;
            this.clickBots += 1;
        }
    }
}