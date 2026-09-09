/** @odoo-module **/

import {
    Component,
    useExternalListener,
} from "@odoo/owl";

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_hook";
import { ClickValue } from "./ClickValue/click_value";

export class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.ClickerSystrayItem";

    static components = {
        ClickValue,
    };

    setup() {
        this.clicker = useClicker();
        this.action = useService("action");

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