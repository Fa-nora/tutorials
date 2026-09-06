/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./DashboardItem/dashboard_item";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = {
        Layout,
        DashboardItem,
    };

    setup() {
        this.action = useService("action");

        this.statisticsService = useService(
            "awesome_dashboard.statistics"
        );

        this.statistics = useState({
            average_amount: 0,
            average_time: 0,
            nb_new_orders: 0,
            nb_cancelled_orders: 0,
            total_amount: 0,
        });

        onWillStart(async () => {
            const result =
                await this.statisticsService.loadStatistics();

            Object.assign(this.statistics, result);
        });
    }

    openCustomers() {
        this.action.doAction("base.action_partner_formfields");
    }

    openLeads() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Leads",
            res_model: "crm.lead",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }
}

registry.category("actions").add(
    "awesome_dashboard.dashboard",
    AwesomeDashboard
);