/** @odoo-module **/

import { registry } from "@web/core/registry";

import { GalleryArchParser } from "./gallery_arch_parser";
import { GalleryController } from "./gallery_controller";
import { GalleryModel } from "./gallery_model";
import { GalleryRenderer } from "./gallery_renderer";


export const galleryView = {
    type: "gallery",
    display_name: "Gallery",
    icon: "oi oi-view-list",
    multiRecord: true,

    Controller: GalleryController,
    ArchParser: GalleryArchParser,
    Model: GalleryModel,
    Renderer: GalleryRenderer,

    props(genericProps, view) {

        const {
            ArchParser,
            Model,
            Renderer,
        } = view;

        const { arch } = genericProps;

        const archInfo = new ArchParser().parse(arch);

        return {
            ...genericProps,
            Model,
            Renderer,
            archInfo,
        };
    },
};


registry.category("views").add(
    "gallery",
    galleryView
);