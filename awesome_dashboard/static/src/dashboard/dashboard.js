/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./DashboardItem/dashboard_item";
import { SettingsDialog } from "./Settings/settings_dialog";
import { _t } from "@web/core/l10n/translation";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = {
        Layout,
        DashboardItem,
    };

    setup() {
        this.action = useService("action");
        this.dialog = useService("dialog");
        this.orm = useService("orm");

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
            ids: [],
        });

        this.loadSettings();
    }


    // دریافت تنظیمات داشبورد از سرور
    async loadSettings() {
        const result = await this.orm.call(
            "awesome.dashboard.settings",
            "get_dashboard_settings",
            []
        );

        this.removedItems.ids = result.removed_items || [];
    }

    get displayedItems() {
        return this.items.filter(
            (item) => !this.removedItems.ids.includes(item.id)
        );
    }


    // ارسال اطلاعات داشبورد به آیتم‌ها
    // این قسمت باعث می‌شود dashboard در dashboard_items.js تعریف بشه
    getItemProps(item) {
        return item.props(this.statistics, this);
    }

   openCustomers() {
    this.action.doAction({
        type: "ir.actions.act_window",
        name: _t("Customers"),
        res_model: "res.partner",
        views: [
            [false, "list"],
            [false, "form"],
        ],
    });
}

    openLeads() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: _t("Leads"),
            res_model: "crm.lead",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }


    // باز کردن تنظیمات داشبورد
    openSettings() {
        this.dialog.add(SettingsDialog, {
            items: this.items,
            removedItems: this.removedItems.ids,

            apply: async (removedItems) => {
                this.removedItems.ids = removedItems;

                await this.orm.call(
                    "awesome.dashboard.settings",
                    "save_dashboard_settings",
                    [removedItems]
                );
            },
        });
    }


    // باز کردن سفارش‌های مربوط به سایز انتخاب‌شده
    openOrdersBySize(size) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: _t("Orders"),
            res_model: "sale.order.line",
            views: [
                [false, "list"],
                [false, "form"],
            ],
            domain: [
                [
                    "product_id.product_template_variant_value_ids.name",
                    "=",
                    size,
                ],
            ],
        });
    }
}

registry.category("lazy_components").add(
    "AwesomeDashboard",
    AwesomeDashboard
);