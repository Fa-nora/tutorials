/** @odoo-module **/

import { choose } from "./utils";

export const rewards = [
    {
        description: "Get 10 clicks",
        apply(clicker) {
            clicker.increment(10);
        },
        maxLevel: 2,
    },

    {
        description: "Get 1 ClickBot",
        apply(clicker) {
            clicker.clickBots += 1;
        },
        minLevel: 1,
        maxLevel: 2,
    },

    {
        description: "Get 1 BigBot",
        apply(clicker) {
            clicker.bigBots += 1;
        },
        minLevel: 2,
    },

    {
        description: "Increase Power!",
        apply(clicker) {
            clicker.power += 1;
        },
        minLevel: 3,
    },
];

export function getReward(clicker) {
    const availableRewards = rewards.filter((reward) => {
        const minLevel =
            reward.minLevel === undefined || clicker.level >= reward.minLevel;

        const maxLevel =
            reward.maxLevel === undefined || clicker.level <= reward.maxLevel;

        return minLevel && maxLevel;
    });

    return choose(availableRewards);
}