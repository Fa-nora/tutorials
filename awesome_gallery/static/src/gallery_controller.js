/** @odoo-module **/

import { Component, onWillStart, onWillUpdateProps } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { usePager } from "@web/search/pager_hook";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static components = { Layout };

    setup() {
        this.orm = useService("orm");

        this.model = new this.props.Model();

        this.model.setup({
            orm: this.orm,
            resModel: this.props.resModel,
            imageField: this.props.archInfo.imageField,
            tooltipField: this.props.archInfo.tooltipField,
        });

        usePager(() => ({
            offset: this.model.offset,
            limit: this.model.limit,
            total: this.model.length,

            onUpdate: async ({ offset, limit }) => {
                await this.model.load(this.props.domain, offset, limit);
            },
        }));

        onWillStart(async () => {
            await this.model.load(this.props.domain);
        });

        onWillUpdateProps(async (nextProps) => {
            await this.model.load(nextProps.domain);
        });
    }
}