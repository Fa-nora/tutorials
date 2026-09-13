/** @odoo-module **/

import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export function useClicker() {
    const clicker = useService("awesome_clicker.clicker");

    return useState(clicker);
}