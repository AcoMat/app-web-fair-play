package fair.play.services

import fair.play.modelo.DisponibilityType
import fair.play.modelo.Usuario
import fair.play.persistencia.dto.*

interface UsuarioService {
    fun crearUsuario(usuario: UsuarioRegistroDTO): UsuarioRegistroResponseDTO
    fun recuperarUsuario(userName: String): Usuario
    fun loguearUsuario(usuarioLogin: UsuarioLoginDTO): UsuarioLoginResponseDTO
    fun recuperarTodosLosUsuarios(roles: List<String>) : List<Usuario>
    fun recuperarTodosLosUsuariosMultiplesFiltros(roles: List<String>, rangos: List<String>, region: String, disponibility: Boolean, disponibilityType: DisponibilityType): List<Usuario>
    fun recuperarUsuarioActual(token: String) : Usuario
    fun actualizarUsuario(usuarioUpdate: UsuarioUpdateDTO) : Usuario
    fun actualizarDisponibilidad(usuarioDisponibility: UsuarioDisponibilityDTO) : Usuario
}