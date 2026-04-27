// Used for date calculations
import dayjs from "dayjs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];

// context = special object from Upstash
// It helps with: running steps,sleeping,retrying
export const sendReminders = serve(async (context) => {
  // Get subscription ID
  const { subscriptionId } = context.requestPayload; //When workflow is triggered, it receives data

  // Fetch subscription from DB : calls helper function
  const subscription = await fetchSubscription(context, subscriptionId);

  // If: no subscription or not active , STOP workflow
  if (!subscription || subscription.status !== "active") return;

  // Get renewal date:  Convert date to usable format
  const renewalDate = dayjs(subscription.renewalDate);

  // Stop if already expired: If date already passed stop
  if (renewalDate.isBefore(dayjs())) {
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate,
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription,
      );
    }
  }
});

//  Helper 1: Fetch subscription
const fetchSubscription = async (context, subscriptionId) => {
  const subscription = await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

//  Helper 2: Sleep (TESTING VERSION)
// const sleepUntilReminder = async (context, label, seconds) => {
//   await context.sleep(label, seconds);

//   console.log(`${label} - Done sleeping`);
// };

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

//  Helper 3: Send email
const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};
