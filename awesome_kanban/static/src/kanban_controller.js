/** @odoo-module **/

import { KanbanController } from "@web/views/kanban/kanban_controller";
import { CustomerList } from "./customer_list";

export class AwesomeKanbanController extends KanbanController {
    static template = "awesome_kanban.AwesomeKanbanView";

    static components = {
        ...KanbanController.components,
        CustomerList,
    };

    selectCustomer(partner) {
        // پیدا کردن فیلترهای ساخته‌شده توسط CustomerList
        const customerFilters = this.env.searchModel.getSearchItems(
            (searchItem) => searchItem.isFromAwesomeKanban
        );

        for (const customerFilter of customerFilters) {
            if (customerFilter.isActive) {
                this.env.searchModel.toggleSearchItem(customerFilter.id);
            }
        }

        // ساخت فیلتر جدید
        this.env.searchModel.createNewFilters([
            {
                description: partner.name,
                domain: [["partner_id", "=", partner.id]],
                isFromAwesomeKanban: true,
            },
        ]);
    }
}