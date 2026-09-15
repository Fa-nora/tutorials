/** @odoo-module **/

import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { url } from "@web/core/utils/urls";

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";

    setup() {
        this.action = useService("action");
    }

    getImageUrl(image) {
        return url("/web/image", {
            model: this.props.resModel,
            id: image.id,
            field: this.props.imageField,
        });
    }

    getTooltip(image) {
        if (!this.props.tooltipField) {
            return "";
        }

        const value = image[this.props.tooltipField];

        if (Array.isArray(value)) {
            return value[1] || "";
        }

        return value ?? "";
    }

    openRecord = (image) => {
        this.action.switchView("form", {
            resId: image.id,
        });
    };
}