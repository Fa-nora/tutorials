/** @odoo-module **/

import { Component, onWillStart, onMounted, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {
        data: { type: Object, optional: true },
    };

    setup() {
        this.canvas = useRef("canvas");

        onWillStart(async () => {
            await loadJS("/web/static/lib/Chart/Chart.js");
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
		debugger
        new Chart(this.canvas.el, {
            type: "pie",
            data: {
                labels: ["S", "M", "L", "XL", "XXL"],
                datasets: [
                    {
                        data: [
                            this.props.data.s,
                            this.props.data.m,
                            this.props.data.l,
                            this.props.data.xl,
                            this.props.data.xxl,
                        ],
                    },
                ],
            },
        });
    }
}
