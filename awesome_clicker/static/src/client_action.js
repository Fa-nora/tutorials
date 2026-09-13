/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "./clicker_hook";
import { ClickValue } from "./ClickValue/click_value";

export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";

    static components = {
        ClickValue,
    };

    setup() {
        this.clicker = useClicker();
        this.state = useState({ activeTab: 'clicks' });
    }

    switchTab(tabName) {
        this.state.activeTab = tabName;
    }
}

registry.category("actions").add(
    "awesome_clicker.client_action",
    ClickerClientAction
);