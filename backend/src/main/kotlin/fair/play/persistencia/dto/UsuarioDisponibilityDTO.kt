package fair.play.persistencia.dto

import fair.play.modelo.DisponibilityType
import jakarta.validation.constraints.NotNull
import org.hibernate.annotations.Check


class UsuarioDisponibilityDTO(

    @field:NotNull(message = "El nombre de usuario es obligatorio")
    val userName: String?,
    @field:NotNull(message = "La disponibilidad es obligatoria")
    val disponibility: Boolean,
    @field:NotNull(message = "El tipo de disponibilidad es obligatorio")
    val disponibilityType: DisponibilityType
)