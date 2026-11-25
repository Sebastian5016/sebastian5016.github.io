' Windows Forms: un botón que saluda.
' Crear un proyecto "Aplicación de Windows Forms (.NET)" y pegar en Form1.vb
Public Class Form1
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Me.Text = "Mi primer formulario"
    End Sub

    Private Sub btnSaludar_Click(sender As Object, e As EventArgs) Handles btnSaludar.Click
        If String.IsNullOrWhiteSpace(txtNombre.Text) Then
            MessageBox.Show("Escribí tu nombre primero.", "Atención")
        Else
            lblSaludo.Text = $"¡Hola, {txtNombre.Text}!"
        End If
    End Sub
End Class
