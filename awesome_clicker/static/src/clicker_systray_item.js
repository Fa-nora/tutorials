/** @odoo-module **/

import {
    Component,
    useState,
    useExternalListener,
} from "@odoo/owl";

import { registry } from "@web/core/registry";

export class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.ClickerSystrayItem";

    setup() {
        this.state = useState({
            clicks: 0,
        });

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
}

registry.category("systray").add(
    "awesome_clicker.ClickerSystrayItem",
    {
        Component: ClickerSystrayItem,
    }
);