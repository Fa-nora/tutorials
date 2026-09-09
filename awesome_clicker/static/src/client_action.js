/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

import { useClicker } from "./clicker_service";

export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";

    setup() {
        this.clicker = useClicker();
    }

    increment() {
        this.clicker.increment(10);
    }
}

registry.category("actions").add(
    "awesome_clicker.client_action",
    ClickerClientAction
);