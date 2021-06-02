import { Flex, VERSION, Manager } from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";

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
    var SIDParam = window.location.pathname;
    var splitStr = SIDParam.split("/");
    if (splitStr[2]) {
      Actions.invokeAction("SelectTask", { sid: splitStr[2] });
    }
  }
}
