/** @odoo-module **/

import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    setup(params) {
        this.orm = params.orm;
        this.resModel = params.resModel;
        this.imageField = params.imageField;
        this.tooltipField = params.tooltipField;

        this.keepLast = new KeepLast();

        this.images = [];
        this.length = 0;
    }

    async load(domain) {
        const specification = {
            id: {},
            [this.imageField]: {},
        };

        if (this.tooltipField) {
            specification[this.tooltipField] = {};
        }

        const { length, records } = await this.keepLast.add(
            this.orm.webSearchRead(
                this.resModel,
                domain,
                {
                    specification,
                    context: {
                        bin_size: true,
                    },
                }
            )
        );

        this.images = records;
        this.length = length;
    }
}