/** @odoo-module **/

import {
    Component,
    useState,
    useExternalListener,
} from "@odoo/owl";

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.ClickerSystrayItem";

    setup() {
        this.state = useState({
            clicks: 0,
        });

        this.action = useService("action");

        useExternalListener(
            document.body,
            "click",
            (event) => {
                if (event.target.closest(".o_clicker_counter")) {
                    return;
                }

                this.state.clicks += 1;
            },
            { capture: true }
        );
    }

    increment() {
        this.state.clicks += 10;
    }

    openClicker() {
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