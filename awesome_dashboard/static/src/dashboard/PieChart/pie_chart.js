/** @odoo-module **/

import {
    Component,
    onWillStart,
    onMounted,
    useRef,
} from "@odoo/owl";

import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";

    static props = {
        data: {
            type: Object,
            optional: true,
        },


        // تابعی که هنگام کلیک روی نمودار اجرا می‌شود
        onSectionClick: {
            type: Function,
            optional: true,
        },
    };

    setup() {
        this.canvas = useRef("canvas");

        onWillStart(async () => {
            await loadJS(
                "/web/static/lib/Chart/Chart.js"
            );
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        new Chart(this.canvas.el, {
            type: "pie",

            data: {
                labels: [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL",
                ],

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

            
            // تشخیص قسمتی که کاربر روی آن کلیک کرده
            options: {
                onClick: (event, elements) => {

                    if (!elements.length) {
                        return;
                    }

                    const index =
                        elements[0].index;

                    const sizes = [
                        "S",
                        "M",
                        "L",
                        "XL",
                        "XXL",
                    ];

                    const size = sizes[index];

                    this.props.onSectionClick?.(
                        size
                    );
                },
            },
        });
    }
}