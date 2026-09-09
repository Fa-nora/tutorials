/** @odoo-module **/

import {
    Component,
    useState,
} from "@odoo/owl";

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";

    setup() {
        this.clicker = useService("awesome_clicker");
        this.state = useState(this.clicker.state);
    }

    increment() {
        this.clicker.increment(10);
    }
}

registry.category("actions").add(
    "awesome_clicker.client_action",
    ClickerClientAction
);