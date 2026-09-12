/** @odoo-module **/

import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";

const clickerService = {
    dependencies: ["effect", "notification", "action"],

    start(env, { effect, notification, action }) {
        const clicker = new ClickerModel();

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