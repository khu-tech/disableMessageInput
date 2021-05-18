import React from "react";
import { Flex, VERSION, Manager } from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";
import reducers, { namespace } from "./states";

import {
  disableInput,
  disableComponent,
  calcTime,
} from "./listeners/CustomListeners";

const PLUGIN_NAME = "SamplePlugin";

import "./listeners/CustomListeners";
import { Actions } from "@twilio/flex-ui";
//import { LogManager } from '@twilio/flex-ui/src/core/LogManager';

export default class SamplePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager  { import('@twilio/flex-ui').Manager}
   */
  init(flex, manager) {
    this.registerReducers(manager);

    var SIDParam = window.location.pathname;
    var splitStr = SIDParam.split("/");
    console.log("loging the SID", splitStr[2]);
    if (splitStr[2]) {
      Actions.invokeAction("SelectTask", { sid: splitStr[2] });
      console.log("Here helps ");
    }
  }
  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }
    manager.store.addReducer(namespace, reducers);
  }
}
