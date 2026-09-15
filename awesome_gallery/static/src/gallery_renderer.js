/** @odoo-module **/

import { Component } from "@odoo/owl";
import { url } from "@web/core/utils/urls";

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";

    getImageUrl(image) {
        return url("/web/image", {
            model: this.props.resModel,
            id: image.id,
            field: this.props.imageField,
        });
    }
}