const express = require("express");
const router = express.Router();
const stocks = require("../scripts/stocks");
const users = require("../scripts/users");
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "client-dashboard",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "stock-updates-group" });

(async () => {
  try {
      await producer.connect();
      console.log('Kafka Producer connected successfully.');

      await consumer.connect();
      await consumer.subscribe({ topic: 'stock-updates', fromBeginning: true });

      consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
              const updatedStock = JSON.parse(message.value.toString());
              console.log('Received stock update from Kafka:', updatedStock);
          }
      });
  } catch (error) {
      console.error('Error connecting to Kafka:', error);
  }
})();

router.get("/home", (req, res) => {
  if (req.session.isAuthenticated) {
    const userStocks = req.session.user.stocks || [];
    const subscribedStocks = [];
    userStocks.forEach((stock) => {
      const stockDetail = stocks.find((stockie) => stockie.code === stock);
      if (stockDetail) subscribedStocks.push(stockDetail);
    });
    res.render("dashboard", {
      user: req.session.user,
      stocks: stocks,
      subscribedStocks: subscribedStocks,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/subscribe", async (req, res) => {
  if (req.session.isAuthenticated) {
    const stock = req.body.stock;
    if (stock) {
      const user = users.find((user) => user.email === req.session.user.email);
      user.stocks.push(stock);
      req.session.user = user;

      const stockDetail = stocks.find(stockie => stockie.code === stock);
      await producer.send({
        topic: 'stock-updates',
        messages: [
            {value: JSON.stringify(stockDetail)}
        ]
      });
      console.log('Write:', stockDetail);
    }
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = router;
