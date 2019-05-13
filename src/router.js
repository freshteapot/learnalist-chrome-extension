import { get, writable } from "svelte/store";
import { api } from "./api.js";
import { config } from "./config.js";
import { aList } from "./store/alist.js";
import { label } from "./store/label.js";

const renderScreen = writable(config.renderScreen);
// TODO remove
const promise = writable();

function saveRenderScreen() {
  localStorage.setItem("renderScreen", get(renderScreen));
}

function showScreenVersion() {
  renderScreen.set("version");
  saveRenderScreen();
  promise.set(api.GetVersion());
}

function showScreenLabelsByMe() {
  renderScreen.set("labels:by:me");
  saveRenderScreen();
  setLabel();
  promise.set(api.GetLabelsByMe());
}

function showScreenLabelNew() {
  renderScreen.set("label:new");
  saveRenderScreen();
}

function showScreenLabelView(label) {
  setLabel(label);
  let id = "label:view";
  renderScreen.set(id);
  saveRenderScreen();
  promise.set(api.GetListsByLabel(label));
}

function showScreenListsByMe() {
  renderScreen.set("lists:by:me");
  saveRenderScreen();
  promise.set(api.GetListsByMe());
  setAlist({});
}

function showScreenListView(_aList) {
  setAlist(_aList);
  renderScreen.set("alist:view");
  saveRenderScreen();
}

function showScreenListEdit(_aList) {
  aList.set(_aList);
  renderScreen.set("alist:edit");
  saveRenderScreen();
}

function showScreenListNew() {
  renderScreen.set("alist:new");
  saveRenderScreen();
}

function showScreenOptions() {
  renderScreen.set("options");
  saveRenderScreen();
}

function setAlist(_aList) {
  if (_aList) {
    localStorage.setItem("aList", JSON.stringify(_aList));
  } else {
    localStorage.removeItem("aList");
  }
  aList.set(_aList);
}

function setLabel(_label) {
  if (_label) {
    localStorage.setItem("label", _label);
  } else {
    localStorage.removeItem("label");
  }
  label.set(_label);
}

function createRouter() {
  return {
    showScreenLabelsByMe: showScreenLabelsByMe,
    showScreenLabelNew: showScreenLabelNew,
    showScreenLabelView: showScreenLabelView,
    showScreenListsByMe: showScreenListsByMe,
    showScreenListView: showScreenListView,
    showScreenListEdit: showScreenListEdit,
    showScreenListNew: showScreenListNew,
    showScreenOptions: showScreenOptions,
    showScreenVersion: showScreenVersion,
    loadStart: () => {
      let _aList = localStorage.getItem("aList");
      if (_aList) {
        _aList = JSON.parse(_aList);
        setAlist(_aList);
      } else {
        // TODO make sure render is not edit view.
        if (config.renderScreen.startsWith("alist:")) {
          config.renderScreen = "lists:by:me";
        }
      }

      let _label = localStorage.getItem("label");
      if (_label) {
        setLabel(_label);
      } else {
        // TODO make sure render is not edit view.
        if (config.renderScreen.startsWith("label:")) {
          config.renderScreen = "labels:by:me";
        }
      }

      if (config.renderScreen === "version") {
        showScreenVersion();
      } else if (config.renderScreen === "options") {
        showScreenOptions();
      } else if (config.renderScreen === "lists:by:me") {
        showScreenListsByMe();
      } else if (config.renderScreen === "alist:view") {
        showScreenListView(get(aList));
      } else if (config.renderScreen ===  "alist:edit") {
        showScreenListEdit(get(aList));
      } else if (config.renderScreen === "alist:new") {
        showScreenListNew();
      } else if (config.renderScreen === "labels:by:me") {
        showScreenLabelsByMe();
      } else if (config.renderScreen === "label:view") {
        showScreenLabelView(get(label));
      } else if (config.renderScreen === "label:new") {
        showScreenLabelNew();
      } else {
        showScreenListsByMe();
      }
    }
  };
}

const router = createRouter();
router.loadStart();

export { router, aList, renderScreen, promise, label };
