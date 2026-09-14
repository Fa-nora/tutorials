/** @odoo-module **/

import { Component, onWillStart, onWillUpdateProps } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static components = { Layout };

    setup() {
        this.orm = useService("orm");

        onWillStart(async () => {
            await this.loadImages(this.props.domain);
        });

        onWillUpdateProps(async (nextProps) => {
            await this.loadImages(nextProps.domain);
        });
    }

    async loadImages(domain) {
        const { length, records } = await this.orm.webSearchRead(
            this.props.resModel,
            domain,
            {
                specification: {
                    id: {},
                    [this.props.archInfo.imageField]: {},
                },
                context: {
                    bin_size: true,
                },
            }
        );

        this.images = records;
        this.length = length;
    }
}