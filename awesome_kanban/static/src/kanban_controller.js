/** @odoo-module **/

import { KanbanController } from "@web/views/kanban/kanban_controller";
import { CustomerList } from "./customer_list";

export class AwesomeKanbanController extends KanbanController {
    static components = {
        ...KanbanController.components,
        CustomerList,
    };
}