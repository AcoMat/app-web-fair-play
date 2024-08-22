package fair.play.services.impl

import fair.play.exceptions.DuplicatedUserException
import fair.play.exceptions.LoginException
import fair.play.exceptions.UnexpectedError
import fair.play.modelo.*
import fair.play.persistencia.UsuarioDAO
import fair.play.persistencia.dto.*
import fair.play.services.UsuarioService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service

@Service
class UsuarioServiceImpl : UsuarioService {
    @Autowired
    private lateinit var usuarioDAO: UsuarioDAO
    @Autowired
    private lateinit var jwtService: JwtService

    override fun crearUsuario(usuarioDto: UsuarioRegistroDTO): UsuarioRegistroResponseDTO {
        val usuario = Usuario()
        usuario.userName = usuarioDto.userName
        usuario.password = usuarioDto.password
        usuario.eMail = usuarioDto.email
        usuario.lolUser = usuarioDto.lolUser

        try {
            usuarioDAO.save(usuario)
        } catch (err: DataIntegrityViolationException){
            throw DuplicatedUserException("Ya existe un usuario con el mismo email o nombre de usuario")
        }catch (err: RuntimeException){
            throw UnexpectedError("Ocurrio un error inesperado al realizar el registro")
        }

        val token = jwtService.generateToken(usuario.userName!!)
        return UsuarioRegistroResponseDTO.from(usuario, token)
    }

    override fun recuperarUsuario(userName: String): Usuario {
        return usuarioDAO.findByUserName(userName)
    }

    override fun loguearUsuario(usuarioLogin: UsuarioLoginDTO): UsuarioLoginResponseDTO {
        val usuario = usuarioDAO.findOneByeMail(usuarioLogin.email!!)

        if (usuario.isEmpty || usuario.get().password != usuarioLogin.password){
            throw LoginException("Email o clave incorrectas")
        }

        val token = jwtService.generateToken(usuario.get().userName!!)
        return UsuarioLoginResponseDTO.from(usuario.get(), token)
    }

    override fun recuperarTodosLosUsuarios(roles: List<String>): List<Usuario> {
        var usuarios = usuarioDAO.recuperarTodosOrdenadosXVal()

        if(roles.isNotEmpty()) {
            usuarios = usuarios.filter { user -> user.lolRole.any { it.toString() in roles } }
        }
        return usuarios
    }

    override fun recuperarTodosLosUsuariosMultiplesFiltros(roles: List<String>, rangos: List<String>, region: String, disponibility: Boolean, disponibilityType: DisponibilityType): List<Usuario> {
        var usuarios = usuarioDAO.recuperarTodosOrdenadosXVal()
        if (roles.isNotEmpty()) {
            usuarios = usuarios.filter { user -> user.lolRole.any { it.toString() in roles } }
        }
        if (rangos.isNotEmpty()) {
            usuarios = usuarios.filter { user -> rangos.contains(user.lolRank.toString())}
        }
        if (region.isNotEmpty()) {
            usuarios = usuarios.filter { user -> user.region == LolRegion.fromString(region)}
        }
        if (disponibility){
            usuarios = usuarios.filter { user -> user.disponibility }.toList()
        }

        if (disponibilityType != DisponibilityType.Any){
            usuarios = usuarios.filter { user -> user.disponibilityType == disponibilityType }.toList()
        }
        return usuarios
    }

    override fun recuperarUsuarioActual(token: String): Usuario {
        val username = jwtService.getUsernameFromToken(token)
        return usuarioDAO.findByUserName(username!!)
    }

    override fun actualizarUsuario(usuarioUpdate: UsuarioUpdateDTO): Usuario {
        val usuario = usuarioDAO.findByUserName(usuarioUpdate.userName!!)
        usuario.lolUser = usuarioUpdate.lolUser
        usuario.discordUser = usuarioUpdate.discordUser
        usuario.region = LolRegion.fromString(usuarioUpdate.region!!)
        usuario.lolRank = LolRank.fromString(usuarioUpdate.lolRank!!)
        usuario.lolRole = usuarioUpdate.lolRole.map { rolstr -> LolRole.fromString(rolstr) }.toMutableList()
        usuario.hoursPlayed = usuarioUpdate.hoursPlayed
        usuario.datosCompletados = true
        usuario.profileImage = usuarioUpdate.profileImage
        return usuarioDAO.save(usuario)
    }

    override fun actualizarDisponibilidad(usuarioDisponibility: UsuarioDisponibilityDTO): Usuario {
        val usuario = usuarioDAO.findByUserName(usuarioDisponibility.userName!!)
        usuario.disponibility = usuarioDisponibility.disponibility
        usuario.disponibilityType = usuarioDisponibility.disponibilityType
        return usuarioDAO.save(usuario)
    }
}
