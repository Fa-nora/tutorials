/** @odoo-module **/

import { reactive, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

const state = reactive({
    clicks: 0,
});

const clickerService = {
    start() {
        return {
            state,

            increment(inc) {
                state.clicks += inc;
            },
        };
    },
};

registry.category("services").add(
    "awesome_clicker",
    clickerService
);

export function useClicker() {
    const clicker = useService("awesome_clicker");
    return {
        ...clicker,
        state: useState(clicker.state),
    };
}