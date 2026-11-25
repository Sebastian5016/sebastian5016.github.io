# Guía de trabajo — Diseño de la red de una escuela

## Situación
La escuela tiene cinco sectores: administración, sala de profesores, laboratorio,
biblioteca y una red Wi‑Fi para estudiantes. Hoy todo está en una sola red y
cualquiera puede ver los equipos de administración.

## Consigna
1. Dibujá la topología (router, switch central, un switch por sector, access point).
2. Completá la tabla de direccionamiento (ver `direccionamiento.csv`).
3. Separá los sectores con VLAN.
4. Configurá DHCP para la red Wi‑Fi de estudiantes.
5. Probá la conectividad con `ping` entre equipos del mismo sector y de distintos sectores.
6. Escribí una regla que impida que la red de estudiantes llegue a Administración.

## Preguntas para el informe
- ¿Por qué conviene separar la red en sectores?
- ¿Qué pasaría si la red Wi‑Fi usara una máscara /24?
- ¿Qué equipo decide por dónde viaja cada paquete?

## Entrega
Archivo de Packet Tracer (.pkt) + informe breve (máximo 2 páginas).
