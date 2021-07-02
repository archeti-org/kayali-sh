odoo.define('kayali_stock.KayaliLines', function(require) {
    'use strict';

    var LinesWidget = require('stock_barcode.LinesWidget');
    var ViewsWidget = require('stock_barcode.ViewsWidget');
    var ClientAction = require('stock_barcode.ClientAction');
    var core = require('web.core');

    LinesWidget.include({
        scrollToRecord: function (id) {
            var line = this.$(`div.o_barcode_line[data-id="${id}"]`);
            this.$el.scrollTop(line.position().top);
        },
    });

    ViewsWidget.include({
        _onClickDiscard: function (ev) {
            ev.stopPropagation();
            var record = this.controller.model.get(this.controller.handle);
            this.trigger_up('reload', {'record': record});
        }
    })

    ClientAction.include({
        /**
         * This is mostly just a
         */
        _onReload: function (ev) {
            ev.stopPropagation();
            if (this.ViewsWidget) {
                this.ViewsWidget.destroy();
            }
            if (this.settingsWidget) {
                this.settingsWidget.do_hide();
            }
            this.headerWidget.toggleDisplayContext('init');
            this.$('.o_show_information').toggleClass('o_hidden', true);
            var self = this;
            this._save({'forceReload': true}).then(function () {
                var record = ev.data.record;
                if (record) {
                    var newPageIndex = _.findIndex(self.pages, function (page) {
                        return page.location_id === record.data.location_id.res_id &&
                               (self.actionParams.model === 'stock.inventory' ||
                                page.location_dest_id === record.data.location_dest_id.res_id);
                    });
                    if (newPageIndex === -1) {
                        new Error('broken');
                    }
                    self.currentPageIndex = newPageIndex;

                    // Add the edited/added product in `this.scannedLines` if not already present. The
                    // goal is to impact them on the potential next step.
                    if (self.scannedLines.indexOf(record.data.id) === -1) {
                        self.scannedLines.push(record.data.id);
                    }
                }

                self._reloadLineWidget(self.currentPageIndex);
                self.linesWidget.scrollToRecord(record.data.id);
                self.$('.o_show_information').toggleClass('o_hidden', false);
            });
        },
    });
})