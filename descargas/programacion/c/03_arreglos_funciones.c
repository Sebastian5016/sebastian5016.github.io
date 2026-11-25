#include <stdio.h>

#define N 5

float promedio(int v[], int largo) {
    int suma = 0;
    for (int i = 0; i < largo; i++) suma += v[i];
    return (float) suma / largo;
}

int main(void) {
    int notas[N] = {7, 8, 5, 9, 6};
    printf("Promedio: %.2f\n", promedio(notas, N));
    return 0;
}
