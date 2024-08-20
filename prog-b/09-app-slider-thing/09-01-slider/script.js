// Getting references to HTML elements
const slider = document.getElementById("slider");
const displayValue = document.getElementById("sliderValue");
const sliderIndicator = document.querySelector(".sliderValue span");

// Update the displayed value when the slider is adjusted
slider.oninput = function () {
  let value = parseInt(slider.value);
  displayValue.textContent = value;
  sliderIndicator.textContent = value;
  sliderIndicator.style.left = (value) * 33 + "%"; // Adjust left positioning based on value
  sliderIndicator.classList.add("show");
};

slider.onblur = function () {
  sliderIndicator.classList.remove("show");
};

// MQTT Configuration
const brokerUrl = "wss://mqtt.nextservices.dk";
const topic = "ihatelife";

// Create an MQTT client instance
const client = mqtt.connect(brokerUrl);

// Set up MQTT event handlers
client.on("connect", function () {
  console.log("Connected to broker");
  client.subscribe(topic, function (err) {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});

client.on("message", function (topic, message) {
  console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

client.on("error", function (error) {
  console.error("Connection error:", error);
});

// Handle slider change event and publish to MQTT
slider.addEventListener("input", function () {
  let value = parseInt(slider.value);
  let message;

  switch (value) {
    case 0:
      message = 0;
      break;
    case 1:
      message = 33;
      break;
    case 2:
      message = 66;
      break;
    case 3:
      message = 100;
      break;
  }

  // Publish the message to the MQTT topic
  client.publish(topic, message.toString());
  console.log(`Sent message: ${message} to topic: ${topic}`);
});
