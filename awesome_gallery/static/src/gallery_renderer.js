/** @odoo-module **/

import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { url } from "@web/core/utils/urls";
import { FileUploader } from "@web/views/fields/file_handler";

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";
    static components = { FileUploader };

    setup() {
        this.action = useService("action");
        this.orm = useService("orm");
    }

    getImageUrl(image) {
        return url("/web/image", {
            model: this.props.resModel,
            id: image.id,
            field: this.props.imageField,
            unique: image.write_date,
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

    onImageUploaded = async (image, file) => {
        await this.orm.webSave(
            this.props.resModel,
            [image.id],
            {
                [this.props.imageField]: file.data,
            }
        );
    };
}