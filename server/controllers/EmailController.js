const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const hbs = require("nodemailer-express-handlebars");

const emailSendFunction = asyncHandler(async (req, res) => {
  const detail = req.body;
  console.log("calling");

  const testEmail = {
    from: "devsagar <sagarmp7731@gmail.com>", //  this   is actually see in result mail you can check it
    to: `${detail.email}`, // list of receivers,
    cc: ["sagarmp77312gmail.com"],
    subject: "Testing Mail Sending Functionality ",
    template: "testEmail",
    context: {
      text: `Hi ${detail.name},`,
      username: detail.name,
      email: detail.email,
    },
  };

  try {
    let result = await emailSend({
      message: testEmail,
    });

    res.status(201).json({
      mailStatus: result,
    });
  } catch (error) {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
// email send functionality

const emailSend = async ({ message }) => {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });

  //  we creates this because we want to send dynamic mail(username is  alway changing)  with custom html and css for that we
  // use the 'nodemailer-express-handlebars' liabray and also define email.handlebars where i define my  html and to pass data to
  // html we use context object  of message variable.
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("Email/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("Email/views"),
    extName: ".handlebars",
  };

  //we define that for transporter of email we use  handlebarOptions  as middle ware and   complie is  phase in which we want to use that  middleware
  transporter.use("compile", hbs(handlebarOptions));

  // the template property in the message object is used to specify the name of the Handlebars template that will be used to render the email content.
  // Message object

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return false;
    } else {
      console.log("Message sent: %s", info.messageId);
      return true;
    }
  });
};

module.exports = {
  emailSend,
  emailSendFunction,
};
