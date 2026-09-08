/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class SettingsDialog extends Component {
    static template = "awesome_dashboard.SettingsDialog";

    static components = {
        Dialog,
    };

    static props = {
        items: { type: Array },
        close: { type: Function },
        apply: { type: Function },
    };

    setup() {
        this.state = useState({
            uncheckedItems: [],
        });
    }

    toggleItem(item) {
        if (this.state.uncheckedItems.includes(item.id)) {
            this.state.uncheckedItems = this.state.uncheckedItems.filter(
                (id) => id !== item.id
            );
        } else {
            this.state.uncheckedItems.push(item.id);
        }
    }

    applyChanges() {
        this.props.apply(this.state.uncheckedItems);
        this.props.close();
    }
}