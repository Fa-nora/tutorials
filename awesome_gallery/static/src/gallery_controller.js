/** @odoo-module **/

import { Component, onWillStart, onWillUpdateProps } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";

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
        });

        onWillStart(async () => {
            await this.model.load(this.props.domain);
        });

        onWillUpdateProps(async (nextProps) => {
            await this.model.load(nextProps.domain);
        });
    }
}