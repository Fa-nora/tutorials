/** @odoo-module **/

import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

import { getReward } from "./click_rewards";

export class ClickerModel extends Reactive {
    constructor() {
        super();

        this.bus = new EventBus();

        // Main state
        this.clicks = 0;
        this.level = 0;

        // Bots
        this.clickBots = 0;
        this.bigBots = 0;

        // Power
        this.power = 1;

        // Trees
        this.pearTrees = 0;
        this.cherryTrees = 0;

        // Fruits
        this.pearFruits = 0;
        this.cherryFruits = 0;

        // Bots generate clicks every 10 seconds
        setInterval(() => {
            this.clicks += this.clickBots * 10 * this.power;
            this.clicks += this.bigBots * 100 * this.power;

            this.updateLevel();
        }, 10000);

        // Trees generate fruits every 30 seconds
        setInterval(() => {
            this.pearFruits += this.pearTrees;
            this.cherryFruits += this.cherryTrees;
        }, 30000);
    }

    updateLevel() {
        // Level 1: 100 clicks
        if (this.clicks >= 100 && this.level < 1) {
            this.level = 1;
            this.bus.trigger("MILESTONE_1k");
        }

        // Level 2: 500 clicks
        if (this.clicks >= 500 && this.level < 2) {
            this.level = 2;
        }

        // Level 3: 900 clicks
        if (this.clicks >= 900 && this.level < 3) {
            this.level = 3;
        }
    }

    increment(inc) {
        this.clicks += inc;
        this.updateLevel();
    }

    buyClickBot() {
        if (this.clicks >= 200 && this.level >= 1) {
            this.clicks -= 200;
            this.clickBots += 1;
        }
    }

    buyBigBot() {
        if (this.clicks >= 300 && this.level >= 2) {
            this.clicks -= 300;
            this.bigBots += 1;
        }
    }

    buyPower() {
        if (this.clicks >= 400 && this.level >= 3) {
            this.clicks -= 400;
            this.power += 1;
        }
    }

    buyPearTree() {
        if (this.clicks >= 500 && this.level >= 3) {
            this.clicks -= 500;
            this.pearTrees += 1;
        }
    }

    buyCherryTree() {
        if (this.clicks >= 500 && this.level >= 3) {
            this.clicks -= 500;
            this.cherryTrees += 1;
        }
    }


	get totalTrees() {
        return this.pearTrees + this.cherryTrees;
    }

     get totalFruits() {
        return this.pearFruits + this.cherryFruits;
    }

    getReward() {
        return getReward(this);
    }
}