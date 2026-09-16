/** @odoo-module **/

import {
    Component,
    onWillStart,
    onWillUpdateProps,
    useState,
} from "@odoo/owl";

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
            fieldNames: this.props.archInfo.fieldNames,
        });

        this.pagerState = useState({
            offset: 0,
            limit: 10,
        });

        usePager(() => ({
            offset: this.pagerState.offset,
            limit: this.pagerState.limit,
            total: this.model.length,

            onUpdate: async ({ offset, limit }) => {
                this.pagerState.offset = offset;
                this.pagerState.limit = limit;

                await this.model.load(
                    this.props.domain,
                    offset,
                    limit
                );
            },
        }));

        onWillStart(async () => {
            await this.model.load(
                this.props.domain,
                this.pagerState.offset,
                this.pagerState.limit
            );
        });

        onWillUpdateProps(async (nextProps) => {
            this.pagerState.offset = 0;

            await this.model.load(
                nextProps.domain,
                0,
                this.pagerState.limit
            );
        });
    }
}