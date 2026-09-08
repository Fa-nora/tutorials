/** @odoo-module **/

import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";

import { NumberCard } from "./NumberCard/number_card";
import { PieChartCard } from "./PieChartCard/pie_chart_card";

const items = registry.category("awesome_dashboard");

items.add("new_orders", {
    description: _t("New Orders This Month"),

    Component: NumberCard,

    props: (data) => ({
        title: _t("New Orders This Month"),
        value: data.nb_new_orders,
    }),
});

items.add("total_amount", {
    description: _t("Total Amount of New Orders"),

    Component: NumberCard,

    size: 2,

    props: (data) => ({
        title: _t("Total Amount of New Orders"),
        value: data.total_amount,
    }),
});

items.add("average_amount", {
    description: _t("Average T-Shirts per Order"),

    Component: NumberCard,

    props: (data) => ({
        title: _t("Average T-Shirts per Order"),
        value: data.average_amount,
    }),
});

items.add("cancelled_orders", {
    description: _t("Cancelled Orders"),

    Component: NumberCard,

    props: (data) => ({
        title: _t("Cancelled Orders"),
        value: data.nb_cancelled_orders,
    }),
});

items.add("average_time", {
    description: _t("Average Processing Time"),

    Component: NumberCard,

    size: 2,

    props: (data) => ({
        title: _t("Average Processing Time (days)"),
        value: data.average_time,
    }),
});

items.add("tshirts_by_size", {
    description: _t("T-Shirts Sold by Size"),

    Component: PieChartCard,

    size: 2,


    props: (data, dashboard) => ({
        title: _t("T-Shirts Sold by Size"),

        data: {
            s: data.nb_s,
            m: data.nb_m,
            l: data.nb_l,
            xl: data.nb_xl,
            xxl: data.nb_xxl,
        },

        // وقتی روی یک قسمت نمودار کلیک شد
        onSectionClick: (size) => {
            dashboard.openOrdersBySize(size);
        },
    }),
});