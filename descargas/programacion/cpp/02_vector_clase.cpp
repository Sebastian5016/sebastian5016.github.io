#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Alumno {
public:
    string codigo;
    vector<double> notas;

    Alumno(string c) : codigo(c) {}

    double promedio() const {
        if (notas.empty()) return 0;
        double suma = 0;
        for (double n : notas) suma += n;
        return suma / notas.size();
    }
};

int main() {
    Alumno a("E-001");
    a.notas = {8, 6.5, 9};
    cout << a.codigo << " - promedio: " << a.promedio() << endl;
    return 0;
}
