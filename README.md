#  Subscription Management Backend

A backend API to manage user subscriptions and send automated renewal reminder emails using workflows.


##  Features

*  User Authentication (JWT)
*  Create & manage subscriptions
*  Automated reminders using Upstash Workflow
*  Email notifications with Nodemailer


##  Tech Stack

* Node.js & Express
* MongoDB & Mongoose
* Upstash QStash
* Nodemailer
* Day.js


##  How It Works

1. User registers & logs in
2. Creates a subscription
3. Workflow is triggered
4. System waits (or schedules)
5. Reminder email is sent
