/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { useService } from "@web/core/utils/hooks";

import { useClicker } from "./clicker_hook";
import { ClickValue } from "./ClickValue/click_value";

export class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.ClickerSystrayItem";

    static components = {
        Dropdown,
        DropdownItem,
        ClickValue,
    };

    setup() {
        this.clicker = useClicker();
        this.action = useService("action");
    }

    openGame() {
        this.action.doAction("awesome_clicker.client_action", {
            additionalContext: {},
            props: {},
            options: {
                target: "new",
            },
        });
    }

    buyClickBot() {
        this.clicker.buyClickBot();
    }
}

registry.category("systray").add(
    "awesome_clicker.ClickerSystrayItem",
    {
        Component: ClickerSystrayItem,
        sequence: 1,
    }
);