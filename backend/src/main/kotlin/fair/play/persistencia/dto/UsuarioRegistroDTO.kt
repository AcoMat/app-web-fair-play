package fair.play.persistencia.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

class UsuarioRegistroDTO(
    @field:NotNull(message = "El correo electrónico es obligatorio")
    @field:Email(message = "El correo electrónico no es válido")
    val email: String?,

    @field:NotNull(message = "La contraseña es obligatoria")
    @field:Size(message = "La contraseña tiene que tener mas de 8 caracteres", min = 8)
    val password: String?,

    @field:NotNull(message = "El nombre de usuario es obligatorio")
    val userName: String?,

    @field:NotNull(message = "El usuario de Lol es obligatorio")
    val lolUser: String?
)