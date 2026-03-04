import { BANNER_APP_ID, MODULE_ID } from "../constants.js";
import { ChapterBannerAddContentApp } from "./add-content.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ChapterBannerApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    id: BANNER_APP_ID,
    classes: ["chapter-banner-app"],
    tag: "section",
    window: {
      icon: "fas fa-flag",
      title: "Chapter Banner",
      resizable: false
    },
    actions: {
      openAddContent: ChapterBannerApp._onOpenAddContent
    },
    position: {
      width: 520,
      height: 160
    }
  }, { inplace: false });

  static PARTS = {
    body: {
      template: `modules/${MODULE_ID}/templates/banner.hbs`
    }
  };

  async _prepareContext(_options) {
    return {};
  }

  static async _onOpenAddContent(event, _target) {
    event.preventDefault();
    await new ChapterBannerAddContentApp().render(true);
  }

  _onClose(options) {
    super._onClose(options);
    Hooks.callAll("closeChapterBannerApp");
    ui.controls?.render();
  }
}
