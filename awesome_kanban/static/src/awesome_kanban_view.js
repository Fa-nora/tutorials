/** @odoo-module **/

import { kanbanView } from "@web/views/kanban/kanban_view";
import { registry } from "@web/core/registry";
import { AwesomeKanbanController } from "./kanban_controller";

const awesomeKanbanView = {
    ...kanbanView,
    Controller: AwesomeKanbanController,
};

registry.category("views").add("awesome_kanban", awesomeKanbanView);