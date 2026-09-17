/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class CustomerList extends Component {
    static template = "awesome_kanban.CustomerList";

    static props = {
        selectCustomer: Function,
    };

    setup() {
        this.orm = useService("orm");

        this.state = useState({
            customers: [],
            activeCustomers: false,
        });

        onWillStart(async () => {
            await this.loadCustomers();
        });
    }

    async loadCustomers() {
        let domain = [];

        if (this.state.activeCustomers) {
            domain = [["opportunity_ids", "!=", false]];
        }

        this.state.customers = await this.orm.searchRead(
            "res.partner",
            domain,
            ["name"]
        );
    }

    async onActiveCustomersChange(ev) {
        this.state.activeCustomers = ev.target.checked;

        await this.loadCustomers();
    }
}