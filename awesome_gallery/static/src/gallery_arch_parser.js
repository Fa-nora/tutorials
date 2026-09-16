/** @odoo-module **/

import { visitXML } from "@web/core/utils/xml";

export class GalleryArchParser {
    parse(xmlDoc) {
        const imageField = xmlDoc.getAttribute("image_field");
        const tooltipField = xmlDoc.getAttribute("tooltip_field");

        const fieldNames = [];
        let tooltipTemplate = null;

        visitXML(xmlDoc, (node) => {
            if (node.tagName === "field") {
                const name = node.getAttribute("name");

                if (name && !fieldNames.includes(name)) {
                    fieldNames.push(name);
                }
            }

            if (node.tagName === "tooltip-template") {
                tooltipTemplate = node;
            }
        });

        return {
            imageField,
            tooltipField,
            fieldNames,
            tooltipTemplate,
        };
    }
}