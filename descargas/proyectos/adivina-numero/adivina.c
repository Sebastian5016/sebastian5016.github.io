/*
 * Adivina el número
 * Conceptos: variables, bucles, condicionales, números aleatorios.
 * Compilar: gcc adivina.c -o adivina
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MINIMO 1
#define MAXIMO 100
#define INTENTOS_MAX 7

int main(void) {
    int secreto, intento, intentos = 0;

    srand((unsigned) time(NULL));
    secreto = MINIMO + rand() % (MAXIMO - MINIMO + 1);

    printf("Pensé un número entre %d y %d.\n", MINIMO, MAXIMO);
    printf("Tenés %d intentos. ¡Suerte!\n\n", INTENTOS_MAX);

    while (intentos < INTENTOS_MAX) {
        printf("Intento %d: ", intentos + 1);
        if (scanf("%d", &intento) != 1) {
            printf("Eso no es un número.\n");
            while (getchar() != '\n'); /* limpia la entrada */
            continue;
        }
        intentos++;

        if (intento == secreto) {
            printf("¡Correcto! Lo adivinaste en %d intentos.\n", intentos);
            return 0;
        } else if (intento < secreto) {
            printf("Más alto ↑\n");
        } else {
            printf("Más bajo ↓\n");
        }
    }

    printf("\nSe terminaron los intentos. El número era %d.\n", secreto);
    return 0;
}
