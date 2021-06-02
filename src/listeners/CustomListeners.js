import { Actions, Manager } from "@twilio/flex-ui";

const manager = Manager.getInstance();
const disabledReason = "It's currently outside of the customer's business hour";
let initialValue = 9000;
var clearTime;
var initialArr = [];

Actions.addListener("afterSelectTask", async (payload) => {
  // Listening for this event as a last resort check to ensure call
  // and conference metadata are captured on the task

  console.log(
    "Customer's local Timezone Offset",
    payload.task.dateCreated.getTimezoneOffset()
  );

  //Get the expected time in customer's time zone
  const current_time = calcTime(payload.task.dateCreated.getTimezoneOffset());
  const local_hours = current_time.getHours();
  console.log("This is the local hours" + local_hours);
  disableComponent(local_hours);
});

const calcTime = function (offset) {
  var d = new Date();
  const currentOffset = d.getTimezoneOffset();
  var utc = d.getTime();
  var nd = new Date(utc + 60000 * (currentOffset - offset));

  return nd;
};

//Set an additional initialValue to test disabling component after 9 sec; remove the initialValue setting in production code
const disableComponent = function (hours) {
  if (hours > 9 || hours < 17 || initialValue > 0) {
    waitForDisable(hours);
  } else {
    disableInput();
  }
};

function waitForDisable(hours) {
  clearAllIntervals();
  clearTime = setInterval(function () {
    playWithProps(hours);
  }, 5000);
  initialArr.push(clearTime);
}

const disableInput = function () {
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
    clearAllIntervals();
    disableInput();
    console.log("clear interval");
  } else {
    console.log("initialize the value");
    initialValue = initialValue - 1000;
  }
};

const clearAllIntervals = () => {
  initialArr.map((a) => {
    console.log("clear single element in the array", a);
    if (a) {
      clearInterval(a);
    }
    initialArr = [];
  });
};
