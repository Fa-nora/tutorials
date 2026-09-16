/** @odoo-module **/

import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    setup(params) {
        this.orm = params.orm;
        this.resModel = params.resModel;
        this.imageField = params.imageField;
        this.tooltipField = params.tooltipField;
        this.fieldNames = params.fieldNames || [];

        this.keepLast = new KeepLast();

        this.images = [];
        this.length = 0;
        this.offset = 0;
        this.limit = 20;
    }

    async load(domain, offset = this.offset, limit = this.limit) {
        const specification = {
            id: {},
            write_date: {},
            [this.imageField]: {},
        };

        if (this.tooltipField) {
            specification[this.tooltipField] = {};
        }

        for (const fieldName of this.fieldNames) {
            specification[fieldName] = {};
        }

        const { length, records } = await this.keepLast.add(
            this.orm.webSearchRead(
                this.resModel,
                domain,
                {
                    specification,
                    offset,
                    limit,
                    context: {
                        bin_size: true,
                    },
                }
            )
        );

        this.images = records;
        this.length = length;
        this.offset = offset;
        this.limit = limit;
    }
}