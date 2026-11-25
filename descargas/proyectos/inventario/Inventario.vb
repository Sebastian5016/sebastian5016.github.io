' Inventario del laboratorio de informática — VB.NET (consola)
' Conceptos: clases, listas, menú, validación.
Imports System.Collections.Generic

Module Inventario

    Class Equipo
        Public Property Codigo As String
        Public Property Tipo As String
        Public Property Estado As String

        Public Overrides Function ToString() As String
            Return $"{Codigo,-8} {Tipo,-14} {Estado}"
        End Function
    End Class

    Private ReadOnly equipos As New List(Of Equipo)

    Sub Main()
        Dim opcion As String
        Do
            Console.WriteLine(vbCrLf & "=== INVENTARIO DEL LABORATORIO ===")
            Console.WriteLine("1) Agregar equipo")
            Console.WriteLine("2) Listar equipos")
            Console.WriteLine("3) Buscar por código")
            Console.WriteLine("0) Salir")
            Console.Write("Opción: ")
            opcion = Console.ReadLine()

            Select Case opcion
                Case "1" : Agregar()
                Case "2" : Listar()
                Case "3" : Buscar()
            End Select
        Loop Until opcion = "0"
    End Sub

    Sub Agregar()
        Dim e As New Equipo()
        Console.Write("Código (ej. PC-01): ") : e.Codigo = Console.ReadLine().ToUpper()
        Console.Write("Tipo (PC, Notebook, Proyector...): ") : e.Tipo = Console.ReadLine()
        Console.Write("Estado (OK / Reparar / Baja): ") : e.Estado = Console.ReadLine()
        equipos.Add(e)
        Console.WriteLine("✔ Equipo agregado.")
    End Sub

    Sub Listar()
        If equipos.Count = 0 Then
            Console.WriteLine("No hay equipos cargados.")
            Return
        End If
        For Each e In equipos
            Console.WriteLine(e.ToString())
        Next
    End Sub

    Sub Buscar()
        Console.Write("Código a buscar: ")
        Dim codigo = Console.ReadLine().ToUpper()
        Dim encontrado = equipos.Find(Function(x) x.Codigo = codigo)
        Console.WriteLine(If(encontrado Is Nothing, "No encontrado.", encontrado.ToString()))
    End Sub

End Module
