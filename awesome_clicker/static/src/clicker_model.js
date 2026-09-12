/** @odoo-module **/

import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

import { getReward } from "./click_rewards";

export class ClickerModel extends Reactive {
    constructor() {
        super();

        this.bus = new EventBus();

        this.clicks = 0;
        this.level = 0;

        this.clickBots = 0;
        this.bigBots = 0;

        this.power = 1;

        setInterval(() => {
            this.clicks += this.clickBots * 10 * this.power;
            this.clicks += this.bigBots * 100 * this.power;
        }, 10000);
    }

    increment(inc) {
        this.clicks += inc;

        if (this.clicks >= 100 && this.level < 1) {
            this.level = 1;
            this.bus.trigger("MILESTONE_1k");
        }

        if (this.clicks >= 400 && this.level < 2) {
            this.level = 2;
        }

        if (this.clicks >= 1000 && this.level < 3) {
            this.level = 3;
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

    buyPower() {
        if (this.clicks >= 900 && this.level >= 3) {
            this.clicks -= 900;
            this.power += 1;
        }
    }

    getReward() {
        return getReward(this);
    }
}