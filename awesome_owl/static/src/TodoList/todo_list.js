/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { TodoItem } from "../TodoItem/todo_item";
import { useAutofocus } from "../utils";

export class TodoList extends Component {
    static template = "awesome_owl.TodoList";
    static components = { TodoItem };

    setup() {
        this.todos = useState([]);
        this.nextId = 1;
        this.inputRef = useAutofocus();
    }

    addTodo(ev) {
        if (ev.keyCode === 13) {
            const description = ev.target.value;

            if (!description) {
                return;
            }

            this.todos.push({
                id: this.nextId++,
                description: description,
                isCompleted: false,
            });

            ev.target.value = "";
        }
    }

    toggleState(todoId) {
        const todo = this.todos.find(todo => todo.id === todoId);

        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }

    removeTodo(todoId) {
        const index = this.todos.findIndex(todo => todo.id === todoId);

        if (index >= 0) {
            this.todos.splice(index, 1);
        }
    }
}