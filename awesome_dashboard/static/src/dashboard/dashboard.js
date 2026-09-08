/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./DashboardItem/dashboard_item";
import { SettingsDialog } from "./Settings/settings_dialog";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = {
        Layout,
        DashboardItem,
    };

    setup() {
        this.action = useService("action");
        this.dialog = useService("dialog");

        const statisticsService = useService(
            "awesome_dashboard.statistics"
        );

        this.statistics = useState(
            statisticsService.statistics
        );

        const items = registry.category("awesome_dashboard");

        this.items = items.getEntries().map(([id, item]) => ({
            id,
            ...item,
        }));

        this.removedItems = useState({
            ids: JSON.parse(
                localStorage.getItem(
                    "awesome_dashboard_removed_items"
                ) || "[]"
            ),
        });
    }

    get displayedItems() {
        return this.items.filter(
            (item) => !this.removedItems.ids.includes(item.id)
        );
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

    openSettings() {
        this.dialog.add(SettingsDialog, {
            items: this.items,
            removedItems: this.removedItems.ids,
            apply: (removedItems) => {
                this.removedItems.ids = removedItems;

                localStorage.setItem(
                    "awesome_dashboard_removed_items",
                    JSON.stringify(removedItems)
                );
            },
        });
    }
}

registry.category("lazy_components").add(
    "AwesomeDashboard",
    AwesomeDashboard
);