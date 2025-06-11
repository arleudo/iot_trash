#include <WiFi.h>
#include <HTTPClient.h>

#define TRIG_PIN 5
#define ECHO_PIN 18
#define GREEN_LED 2
#define RED_LED 4

const char* ssid = "arleudo";
const char* password = "12345678";
const char* serverUrl = "http://192.168.178.141:4444/trash";

void wifiConnect() {
  Serial.println("Connecting in wifi...");
  WiFi.begin(ssid, password);

  int tries = 0;
  while (WiFi.status() != WL_CONNECTED && tries < 20) {
    delay(500);
    Serial.print(".");
    tries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWi-Fi connected!");
    Serial.print("Address IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFail to connect at Wi-Fi.");
  }
}

void setup() {
  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);

  wifiConnect();
}

float checkDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  float distance = duration * 0.034 / 2;
  return distance;
}

void sendPutRequest(const String& status) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  String putData = "{\"id\": \"1\", \"status\": \"" + status + "\"}";

  int httpResponseCode = http.PUT(putData);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Server Response:");
    Serial.println(response);
  } else {
    Serial.print("Error in PUT request. Code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void loop() {
  float distance = checkDistance();
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance > 0 && distance < 10.0) {
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);
    sendPutRequest("full");
  } else {
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(RED_LED, LOW);
    sendPutRequest("empty");
  }

  delay(500);
}
