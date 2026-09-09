/** @odoo-module **/

import {
    Component,
    useExternalListener,
    useState,
} from "@odoo/owl";

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.ClickerSystrayItem";

   setup() {
    this.clicker = useService("awesome_clicker");
    this.action = useService("action");

    this.state = useState(this.clicker.state);

    useExternalListener(
        document.body,
        "click",
        (event) => {
            if (event.target.closest(".o_clicker_counter")) {
                return;
            }

            this.clicker.increment(1);
        },
        { capture: true }
    );
}

    openClicker() {
        this.clicker.increment(1);

        this.action.doAction({
            type: "ir.actions.client",
            tag: "awesome_clicker.client_action",
            target: "new",
            name: "Clicker",
        });
    }
}

registry.category("systray").add(
    "awesome_clicker.ClickerSystrayItem",
    {
        Component: ClickerSystrayItem,
    }
);