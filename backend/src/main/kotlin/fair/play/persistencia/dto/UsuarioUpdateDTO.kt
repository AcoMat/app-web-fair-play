package fair.play.persistencia.dto

import jakarta.validation.constraints.NotNull
import org.hibernate.annotations.Check


class UsuarioUpdateDTO(

    @field:NotNull(message = "El nombre de usuario es obligatorio")
    val userName: String?,
    @field:NotNull(message = "El usuario de LOL es obligatorio")
    val lolUser: String?,
    val discordUser: String?,
    @field:Check(constraints = "region IN ('BR', 'LAS', 'LAN', 'NA', 'EUW', 'EUNE', 'OCE', 'RU', 'TR', 'JP', 'KR') OR region IS NULL")
    val region: String?,
    val lolRank: String?,
    val lolRole: List<String>,
    val hoursPlayed: Int?,
    val profileImage: String?,
)