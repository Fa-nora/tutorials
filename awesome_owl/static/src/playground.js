/** @odoo-module **/

import { Component, useState, markup } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";

export class Playground extends Component {
    static template = "awesome_owl.Playground";
    static components = { Counter, Card };

    setup() {
        this.state = useState({ value: 2});
        this.html = markup("<div><b>Bold</b> html content</div>");
        this.plainText = "<div>this will show as plain text</div>";
    }

    increment() {
        this.state.value++;
    }
}