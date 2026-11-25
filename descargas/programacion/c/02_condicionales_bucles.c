#include <stdio.h>

int main(void) {
    int n, suma = 0;

    printf("¿Cuántos números querés sumar? ");
    scanf("%d", &n);

    for (int i = 1; i <= n; i++) {
        int valor;
        printf("Número %d: ", i);
        scanf("%d", &valor);
        suma += valor;
    }

    printf("Suma total: %d\n", suma);
    if (suma % 2 == 0) {
        printf("La suma es par.\n");
    } else {
        printf("La suma es impar.\n");
    }
    return 0;
}
