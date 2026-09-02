/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { TodoItem } from "../TodoItem/todo_item";

export class TodoList extends Component {
    static template = "awesome_owl.TodoList";
    static components = { TodoItem };

    setup() {
        this.todos = useState([
            { id: 1, description: "buy milk", isCompleted: false },
            { id: 2, description: "write tutorial", isCompleted: true },
        ]);
    }
}