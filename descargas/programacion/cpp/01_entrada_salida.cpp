#include <iostream>
#include <string>
using namespace std;

int main() {
    string nombre;
    int edad;

    cout << "¿Cómo te llamás? ";
    getline(cin, nombre);
    cout << "¿Cuántos años tenés? ";
    cin >> edad;

    cout << "Hola " << nombre << ", en 5 años vas a tener " << edad + 5 << "." << endl;
    return 0;
}
