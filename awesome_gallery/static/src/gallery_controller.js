/** @odoo-module **/

import { Component, onWillStart, onWillUpdateProps } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { GalleryModel } from "./gallery_model";
import { GalleryRenderer } from "./gallery_renderer";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";

    static components = {
        Layout,
        GalleryRenderer,
    };

    setup() {
        this.orm = useService("orm");

        this.model = new GalleryModel();

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