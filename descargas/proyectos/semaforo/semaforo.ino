// Semáforo con Arduino
// Conceptos: salidas digitales, constantes, funciones, tiempo.
// Conexión: LED rojo -> pin 13, amarillo -> pin 12, verde -> pin 11
// (cada LED con una resistencia de 220 Ω a GND).

const int ROJO = 13;
const int AMARILLO = 12;
const int VERDE = 11;

const unsigned long T_ROJO = 5000;
const unsigned long T_AMARILLO = 1500;
const unsigned long T_VERDE = 4000;

void encender(int pin, unsigned long duracion) {
  digitalWrite(pin, HIGH);
  delay(duracion);
  digitalWrite(pin, LOW);
}

void setup() {
  pinMode(ROJO, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(VERDE, OUTPUT);
}

void loop() {
  encender(ROJO, T_ROJO);
  encender(VERDE, T_VERDE);
  encender(AMARILLO, T_AMARILLO);
}
