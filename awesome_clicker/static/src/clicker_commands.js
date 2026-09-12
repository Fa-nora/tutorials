/** @odoo-module **/

import { registry } from "@web/core/registry";

const commandProvider = {
    provide: (env) => {
        const clicker = env.services["awesome_clicker.clicker"];
        const action = env.services.action;

        return [
            {
                name: "Open Clicker Game",
                category: "awesome_clicker",

                run() {
                    action.doAction({
                        type: "ir.actions.client",
                        tag: "awesome_clicker.client_action",
                        target: "new",
                        name: "Clicker",
                    });
                },
            },

            {
                name: "Buy 1 click bot",
                category: "awesome_clicker",

                run() {
                    clicker.buyClickBot();
                },
            },
        ];
    },
};

registry.category("commandProvider").add(
    "awesome_clicker.commands",
    commandProvider
);