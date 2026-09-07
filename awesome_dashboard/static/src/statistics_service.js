/** @odoo-module **/

import { reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

const statisticsService = {
    start() {
        const statistics = reactive({
            average_amount: 0,
            average_time: 0,
            nb_new_orders: 0,
            nb_cancelled_orders: 0,
            total_amount: 0,

            nb_s: 10,
            nb_m: 20,
            nb_l: 10,
            nb_xl: 50,
            nb_xxl: 40,
        });

        const loadStatistics = async () => {
            const result = await rpc("/awesome_dashboard/statistics");

            Object.assign(statistics, result);
        };

        loadStatistics();

        setInterval(loadStatistics, 10000);

        return {
            statistics,
        };
    },
};

registry.category("services").add(
    "awesome_dashboard.statistics",
    statisticsService
);