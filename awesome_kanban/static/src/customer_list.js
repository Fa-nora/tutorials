/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { fuzzyLookup } from "@web/core/utils/search";
import { Pager } from "@web/core/pager/pager";

export class CustomerList extends Component {
    static template = "awesome_kanban.CustomerList";

    static components = {
        Pager,
    };

    static props = {
        selectCustomer: Function,
    };

    setup() {
        this.orm = useService("orm");

        this.state = useState({
            customers: [],
            displayActiveCustomers: false,
            searchString: "",
        });

        this.pagerState = useState({
            offset: 0,
            limit: 20,
        });

        onWillStart(async () => {
            this.state.customers = await this.orm.searchRead(
                "res.partner",
                [],
                ["name", "opportunity_ids"]
            );
        });
    }

    get filteredCustomers() {
        let customers = this.state.customers;

        if (this.state.displayActiveCustomers) {
            customers = customers.filter(
                (customer) => customer.opportunity_ids.length > 0
            );
        }

        if (this.state.searchString) {
            customers = fuzzyLookup(
                this.state.searchString,
                customers,
                (customer) => customer.name
            );
        }

        return customers;
    }

    get displayedCustomers() {
        return this.filteredCustomers.slice(
            this.pagerState.offset,
            this.pagerState.offset + this.pagerState.limit
        );
    }

    onPagerUpdate({ offset }) {
        this.pagerState.offset = offset;
    }
}