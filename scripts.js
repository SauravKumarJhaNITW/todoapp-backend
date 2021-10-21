const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const sendMail = require("./services/mailService");
require("./startup/db")();

const sendMailForDueTask = async () => {
  const todos = await Todo.find();
  for (let t of todos) {
    console.log((t.dueDate.getTime() - Date.now()) / (60 * 60 * 1000));
    if (
      t.dueDate.getTime() - Date.now() > 0 &&
      t.dueDate.getTime() - Date.now() <= 48 * 60 * 60 * 1000
    ) {
      const from = "imsauravgauravjha@gmail.com",
        { username: to } = await User.findById(t.userId),
        subject = "Task Due",
        text = `Your task ${t.task} is due. Due date is ${t.dueDate}.`;
      console.log(to);
      await sendMail({ from, to, subject, text });
    }
  }
  console.log("email sent.");
};

sendMailForDueTask().then(process.exit);
