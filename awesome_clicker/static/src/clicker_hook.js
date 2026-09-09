/** @odoo-module **/

import { useService } from "@web/core/utils/hooks";
import { useState } from "@odoo/owl";

export function useClicker() {
    const clicker = useService("awesome_clicker.clicker");

    return {
        state: useState(clicker.state),
        increment: clicker.increment,
    };
}