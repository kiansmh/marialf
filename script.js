document.addEventListener('DOMContentLoaded', function() {
    const { createClient } = supabase;
    const _supabase = createClient('https://fxeqlmtqfxtswfajsvnz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZXFsbXRxZnh0c3dmYWpzdm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2MjQ5NjEsImV4cCI6MjAzMjIwMDk2MX0.COsYahdaD1jBmp-3vAash8yOAXLJFI2CR-7g9mNFUtE');

    document.getElementById('registrationForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const gender = document.getElementById('gender').value;
        const terms = document.getElementById('terms').checked;

        try {
            const { data, error } = await _supabase
                .from('usuarios')
                .insert([
                    { nombre: name, correo: email, sexo: gender, acepto_terminos: terms }
                ]);

            if (error) {
                console.error('Error:', error);
                alert('Hubo un error al registrar los datos.');
            } else {
                alert('Registro exitoso');
                document.getElementById('registrationForm').reset();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Hubo un error al registrar los datos.');
        }
    });

    document.getElementById('mostrarRegistros').addEventListener('click', async function() {
        const { data, error } = await _supabase.from('usuarios').select();

        if (error) {
            console.error('Error:', error);
            alert('Hubo un error al cargar los registros.');
        } else {
            const registrosContainer = document.getElementById('registrosContainer');
            if (data && data.length > 0) {
                const registrosHTML = data.map(registro => {
                    return `<div>Nombre: ${registro.nombre}, Correo: ${registro.correo}, Sexo: ${registro.sexo}, Acepto términos: ${registro.acepto_terminos ? 'Sí' : 'No'}</div>`;
                }).join('');
                registrosContainer.innerHTML = registrosHTML;
            } else {
                registrosContainer.innerHTML = '<div>No hay registros disponibles.</div>';
            }
        }
    });
});
