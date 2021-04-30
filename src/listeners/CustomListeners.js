import { Actions, Manager } from "@twilio/flex-ui";

const manager = Manager.getInstance();
const disabledReason = "It's currently outside of the customer's business hour";
let initialValue = 9000;
var clearTime;

Actions.addListener("afterSelectTask", async (payload) => {
  // Listening for this event as a last resort check to ensure call
  // and conference metadata are captured on the task

  console.log(
    "Customer's locale Timezone Offset",
    payload.task.dateCreated.getTimezoneOffset()
  );

  //Get the expected time in customer's time zone
  const current_time = calcTime(payload.task.dateCreated.getTimezoneOffset());
  const local_hours = current_time.getHours();
  console.log("This is the local hours" + local_hours);
  disableComponent(local_hours);
});

export const calcTime = function (offset) {
  var d = new Date();
  const currentOffset = d.getTimezoneOffset();
  var utc = d.getTime();
  var nd = new Date(utc + 60000 * (currentOffset - offset));

  return nd;
};

export const disableComponent = function (hours) {
  if (hours > 9 || hours < 17 || initialValue > 0) {
    waitForDisable(hours);
  } else {
    disableInput();
  }
};

function waitForDisable(hours) {
  clearTime = setInterval(function () {
    playWithProps(hours);
  }, 5000);
  console.log("Finish setting Interval");
}

export const disableInput = function () {
  manager.updateConfig({
    componentProps: {
      MessageInput: {
        disabledReason,
      },
    },
  });
};

const playWithProps = function (hours) {
  if (hours <= 9 || hours >= 17 || initialValue == 0) {
    clearInterval(clearTime);
    disableInput();
    console.log("clear interval");
  } else {
    console.log("initial the value");
    initialValue = initialValue - 1000;
  }
};
