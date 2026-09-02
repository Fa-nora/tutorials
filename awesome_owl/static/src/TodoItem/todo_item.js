/** @odoo-module **/

import { Component } from "@odoo/owl";

export class TodoItem extends Component {
    static template ="awesome_owl.TodoItem";
}

TodoItem.props = {
    todo: {
        type: Object,
        shape: {
            id: Number,
            description: String,
            isCompleted: Boolean,
        },
    },
};