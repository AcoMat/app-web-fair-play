package fair.play.persistencia.dto

import fair.play.modelo.Usuario

class UsuarioLoginResponseDTO {
    lateinit var userName : String
    lateinit var eMail: String
    lateinit var password: String
    lateinit var lolUser: String
    lateinit var token: String

    companion object {
        fun from(usuario: Usuario, token: String): UsuarioLoginResponseDTO {
            val usuarioDTO = UsuarioLoginResponseDTO()
            usuarioDTO.userName = usuario.userName!!
            usuarioDTO.eMail = usuario.eMail!!
            usuarioDTO.password = usuario.password!!
            usuarioDTO.lolUser = usuario.lolUser!!
            usuarioDTO.token = token

            return usuarioDTO
        }
    }
}