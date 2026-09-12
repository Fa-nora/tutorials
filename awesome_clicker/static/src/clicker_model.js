/** @odoo-module **/

import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    constructor() {
        super();

        this.bus = new EventBus();

        this.clicks = 0;
        this.level = 0;

        this.clickBots = 0;
        this.bigBots = 0;

        setInterval(() => {
            this.clicks += this.clickBots * 10;
            this.clicks += this.bigBots * 100;
        }, 10000);
    }

    increment(inc) {
        this.clicks += inc;

        if (this.clicks >= 400 && this.level < 2) {
            this.level = 2;
        } else if (this.clicks >= 100 && this.level < 1) {
            this.level = 1;
            this.bus.trigger("MILESTONE_1k");
        }
    }

    buyClickBot() {
        if (this.clicks >= 500) {
            this.clicks -= 500;
            this.clickBots += 1;
        }
    }

    buyBigBot() {
        if (this.clicks >= 600) {
            this.clicks -= 600;
            this.bigBots += 1;
        }
    }
}