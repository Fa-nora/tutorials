/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { fuzzyLookup } from "@web/core/utils/search";

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
            search: "",
        });

        onWillStart(async () => {
            await this.loadCustomers();
        });
    }

    async loadCustomers() {
        let domain = [];

        if (this.state.activeCustomers) {
            domain.push(["opportunity_ids", "!=", false]);
        }

        this.state.customers = await this.orm.searchRead(
            "res.partner",
            domain,
            ["name"]
        );
    }

    get filteredCustomers() {
        if (!this.state.search) {
            return this.state.customers;
        }

        return fuzzyLookup(
            this.state.search,
            this.state.customers,
            (customer) => customer.name
        );
    }

    async onActiveCustomersChange(ev) {
        this.state.activeCustomers = ev.target.checked;
        await this.loadCustomers();
    }

    onSearch(ev) {
        this.state.search = ev.target.value;
    }
}