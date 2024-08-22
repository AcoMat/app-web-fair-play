package fair.play.persistencia.dto

import fair.play.modelo.*

class UsuarioDTO {
    var userName : String? = null
    var eMail: String? = null
    var password: String? = null
    var profileImage: String? = null
    var discordUser: String? = null
    var lolUser: String? = null
    var lolRank: String? = null
    var region: String? = null
    var lolRole: String? = null
    var hoursPlayed: Int? = null
    var disponibility: Boolean = false
    var disponibilityType: DisponibilityType = DisponibilityType.fromString("Any")

    companion object {
        fun from(usuario: Usuario): UsuarioDTO {
            var usuarioDTO = UsuarioDTO()
            usuarioDTO.userName = usuario.userName
            usuarioDTO.eMail = usuario.eMail
            usuarioDTO.password = usuario.password
            usuarioDTO.profileImage = usuario.profileImage
            usuarioDTO.discordUser = usuario.discordUser
            usuarioDTO.lolUser = usuario.lolUser
            usuarioDTO.lolRank = usuario.lolRank.toString()
            usuarioDTO.region = usuario.region.toString()
            usuarioDTO.lolRole = usuario.lolRole.map { it.toString() }.joinToString()
            usuarioDTO.hoursPlayed = usuario.hoursPlayed
            usuarioDTO.disponibility = usuario.disponibility
            usuarioDTO.disponibilityType = usuario.disponibilityType
            return usuarioDTO
        }

        fun to(usuarioDTO: UsuarioDTO): Usuario {
            var usuario = Usuario()
            usuario.userName = usuarioDTO.userName
            usuario.eMail = usuarioDTO.eMail
            usuario.password = usuarioDTO.password
            usuario.profileImage = usuario.profileImage
            usuario.discordUser = usuarioDTO.discordUser
            usuario.lolUser = usuarioDTO.lolUser
            usuario.lolRank = LolRank.fromString(usuarioDTO.lolRank!!)
            usuario.region = LolRegion.fromString(usuarioDTO.region!!)
            usuario.lolRole = usuarioDTO.lolRole!!.split(",").map { LolRole.fromString(it) }.toMutableList()
            usuario.hoursPlayed = usuarioDTO.hoursPlayed
            usuario.disponibility = usuarioDTO.disponibility
            usuario.disponibilityType = usuarioDTO.disponibilityType
            return usuario
        }
    }
}