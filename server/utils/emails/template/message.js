function MessageWelcome(name){
    const message = `
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <h1 style="color: #3498db; margin-top: 0;">Bienvenido a aNotate</h1>
        <p style="color: #555555; margin: 10px 0;">¡Hola `+name+`!</p>
        <p style="color: #555555; margin: 10px 0;">Gracias por unirte a aNotate. Estamos emocionados de tenerte con nosotros.</p>
        <p style="color: #555555; margin: 10px 0;">Con aNotate, podrás organizar tus ideas y tomar notas de manera fácil y eficiente.</p>
        <p style="color: #555555; margin: 10px 0;">Si tienes alguna pregunta o necesitas asistencia, estamos aquí para ayudarte.</p>
        <p style="color: #555555; margin: 10px 0;">¡Disfruta de tu experiencia con aNotate!</p>

    </div>`;
    return message;
}
function MessageResetPassword(name, code) {
    const message = `
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <h1 style="color: #3498db; margin-top: 0;">Restablecer Contraseña - aNotate</h1>
        <p style="color: #555555; margin: 10px 0;">¡Hola `+name+`!</p>
        <p style="color: #555555; margin: 10px 0;">Has solicitado restablecer tu contraseña en aNotate. Utiliza el siguiente código de confirmación:</p>
        <h2 style="color: #3498db;">`+code+`</h2>
        <p style="color: #555555; margin: 10px 0;">Este código es válido por un tiempo limitado. Si no solicitaste este restablecimiento, puedes ignorar este mensaje.</p>
        <p style="color: #555555; margin: 10px 0;">Si tienes alguna pregunta o necesitas asistencia, estamos aquí para ayudarte.</p>
        <p style="color: #555555; margin: 10px 0;">¡Gracias por usar aNotate!</p>

    </div>`;
    return message;
}

function confirmResetPassword(name){
    const message= `    
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #3498db; margin-top: 0;">Contraseña Restablecida - aNotate</h1>
        <p style="color: #555555; margin: 10px 0;">¡Hola `+name+`!</p>
        <p style="color: #555555; margin: 10px 0;">Te informamos que tu contraseña en aNotate ha sido restablecida correctamente.</p>
        <p style="color: #555555; margin: 10px 0;">Si realizaste este cambio, puedes ignorar este mensaje. Si no fuiste tú, por favor, contacta con nosotros.</p>
        <a href="[Enlace a la plataforma]" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Iniciar Sesión</a>
        <p style="color: #555555; margin: 10px 0;">Si tienes alguna pregunta o necesitas asistencia, estamos aquí para ayudarte.</p>
        <p style="color: #555555; margin: 10px 0;">¡Gracias por confiar en aNotate!</p>
    </div>`
    return message;
}

module.exports ={
    MessageWelcome,
    MessageResetPassword,
    confirmResetPassword
}