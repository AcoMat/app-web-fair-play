package fair.play.persistencia.dto

import fair.play.modelo.Usuario
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull

class UsuarioRegistroResponseDTO {
    lateinit var token: String
    lateinit var email: String
    lateinit var password: String
    lateinit var userName: String
    lateinit var lolUser: String

    companion object {
        fun from(usuario: Usuario, token: String): UsuarioRegistroResponseDTO {
            var usuarioDTO = UsuarioRegistroResponseDTO()
            usuarioDTO.userName = usuario.userName!!
            usuarioDTO.email = usuario.eMail!!
            usuarioDTO.password = usuario.password!!
            usuarioDTO.lolUser = usuario.lolUser!!
            usuarioDTO.token = token

            return usuarioDTO
        }
    }
}

