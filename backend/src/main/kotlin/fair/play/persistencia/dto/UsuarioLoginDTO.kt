package fair.play.persistencia.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull
import org.springframework.validation.annotation.Validated

@Validated
data class UsuarioLoginDTO(
    @field:NotNull(message = "El correo electrónico es obligatorio")
    @field:Email(message = "El correo electrónico no es válido")
    val email: String?,

    @field:NotNull(message = "La contraseña es obligatoria")
    val password: String?
)