/** @odoo-module **/

import { registry } from "@web/core/registry";
import { NumberCard } from "./NumberCard/number_card";
import { PieChartCard } from "./PieChartCard/pie_chart_card";

const items = registry.category("awesome_dashboard");

items.add("new_orders", {
    description: "New Orders This Month",
    Component: NumberCard,
    props: (data) => ({
        title: "New Orders This Month",
        value: data.nb_new_orders,
    }),
});

items.add("total_amount", {
    description: "Total Amount of New Orders",
    Component: NumberCard,
    size: 2,
    props: (data) => ({
        title: "Total Amount of New Orders",
        value: data.total_amount,
    }),
});

items.add("average_amount", {
    description: "Average T-Shirts per Order",
    Component: NumberCard,
    props: (data) => ({
        title: "Average T-Shirts per Order",
        value: data.average_amount,
    }),
});

items.add("cancelled_orders", {
    description: "Cancelled Orders",
    Component: NumberCard,
    props: (data) => ({
        title: "Cancelled Orders",
        value: data.nb_cancelled_orders,
    }),
});

items.add("average_time", {
    description: "Average Processing Time",
    Component: NumberCard,
    size: 2,
    props: (data) => ({
        title: "Average Processing Time (days)",
        value: data.average_time,
    }),
});

items.add("tshirts_by_size", {
    description: "T-Shirts Sold by Size",
    Component: PieChartCard,
    size: 2,
    props: (data) => ({
        title: "T-Shirts Sold by Size",
        data: {
            s: data.nb_s,
            m: data.nb_m,
            l: data.nb_l,
            xl: data.nb_xl,
            xxl: data.nb_xxl,
        },
    }),
});