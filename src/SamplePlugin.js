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

    const flex_manager = Manager.getInstance();

    flex_manager.chatClient.getSubscribedChannels().then(function (paginator) {
      if (paginator.items[0]) {
        let time_created = paginator.items[0].dateCreated.getTimezoneOffset();
        console.log("the time is" + time_created);
        let currentTime = calcTime(time_created);
        let hours = currentTime.getHours();
        disableComponent(hours);
        console.log("Run init functions");
      }
    });
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
