/** @odoo-module **/

import { registry } from "@web/core/registry";
import { browser } from "@web/core/browser/browser";

import { ClickerModel } from "./clicker_model";

const STORAGE_KEY = "awesome_clicker_state";

const clickerService = {
    dependencies: ["effect", "notification", "action"],

    start(env, { effect, notification, action }) {
        const savedState = browser.localStorage.getItem(STORAGE_KEY);

        const clicker = new ClickerModel(
            savedState ? JSON.parse(savedState) : {}
        );

        clicker.bus.addEventListener("MILESTONE_1k", () => {
            effect.add({
                type: "rainbow_man",
                message: "You can now buy ClickBots!",
            });
        });

        clicker.bus.addEventListener("REWARD", (event) => {
            const reward = event.detail.reward;

            notification.add(reward.description, {
                title: "🎁 Reward!",
                type: "success",
                sticky: true,
                buttons: [
                    {
                        name: "Collect",
                        primary: true,
                        onClick: () => {
                            reward.apply(clicker);

                            action.doAction({
                                type: "ir.actions.client",
                                tag: "awesome_clicker.client_action",
                                target: "new",
                                name: "Clicker",
                            });
                        },
                    },
                ],
            });
        });

        return clicker;
    },
};

registry.category("services").add(
    "awesome_clicker.clicker",
    clickerService
);