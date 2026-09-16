/** @odoo-module **/

import { Component, xml, useRef } from "@odoo/owl";

import { useService } from "@web/core/utils/hooks";
import { url } from "@web/core/utils/urls";
import { visitXML } from "@web/core/utils/xml";

import { FileUploader } from "@web/views/fields/file_handler";


export class GalleryCard extends Component {
    static template = "awesome_gallery.GalleryCard";

    static components = {
        FileUploader,
    };

    setup() {
        this.action = useService("action");
        this.orm = useService("orm");
    }

    getImageUrl() {
        return url("/web/image", {
            model: this.props.resModel,
            id: this.props.image.id,
            field: this.props.imageField,
            unique: this.props.image.write_date,
        });
    }

    getTooltipText() {
        const image = this.props.image;
        return `name: ${image.name || ''}\ne-mail: ${image.email || ''}`;
    }

    openRecord = () => {
        this.action.switchView("form", {
            resId: this.props.image.id,
        });
    };

    onImageUploaded = async (file) => {
        await this.orm.webSave(
            this.props.resModel,
            [this.props.image.id],
            {
                [this.props.imageField]: file.data,
            }
        );
    };
}


export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";

    static components = {
        FileUploader,
        GalleryCard,
    };

    setup() {
        this.action = useService("action");
        this.orm = useService("orm");
    }
}