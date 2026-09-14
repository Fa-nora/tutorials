/** @odoo-module **/

import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    setup(params) {
        this.orm = params.orm;
        this.resModel = params.resModel;
        this.imageField = params.imageField;

        this.keepLast = new KeepLast();

        this.images = [];
        this.length = 0;
    }

    async load(domain) {
        const { length, records } = await this.keepLast.add(
            this.orm.webSearchRead(
                this.resModel,
                domain,
                {
                    specification: {
                        id: {},
                        [this.imageField]: {},
                    },
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