package fair.play.controller

import fair.play.services.UsuarioService
import fair.play.services.ValoracionService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
@RequestMapping("/valoracion")
class ValoracionControllerRest {

    @Autowired private lateinit var usuarioService: UsuarioService

    @Autowired private lateinit var valoracionService: ValoracionService

    @PostMapping("/")
    fun registrarValoracion(
        @RequestHeader("Authorization") authorizationHeader: String,
        @RequestBody valoracionRequest: ValoracionRequest
    ): ResponseEntity<Any> {
        return try {
            val currentUser = usuarioService.recuperarUsuarioActual(authorizationHeader)
            val userVotado = usuarioService.recuperarUsuario(valoracionRequest.usernameVotado)

            valoracionService.registrarValoracion(currentUser, userVotado, valoracionRequest.puntaje)

            ResponseEntity("Valoración registrada exitosamente", HttpStatus.CREATED)
        } catch (e: Exception) {
            ResponseEntity(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{userName}")
    fun votoDelUsuario(
        @RequestHeader("Authorization") authorizationHeader: String,
        @PathVariable userName: String
    ): ResponseEntity<Any> {
        return try {
            val currentUser = usuarioService.recuperarUsuarioActual(authorizationHeader)
            val userVotado = usuarioService.recuperarUsuario(userName)

            val voto = valoracionService.buscarVoto(currentUser, userVotado)
            if(voto == null){
                val resp = HashMap<String, String>()
                resp["result"] = "El usuario no realizo voto"
                return ResponseEntity(resp, HttpStatus.OK)
            }
            return ResponseEntity(voto, HttpStatus.OK)
        } catch (e: Exception) {

            ResponseEntity(e.message, HttpStatus.BAD_REQUEST)
        }
    }
}

data class ValoracionRequest(
    val usernameVotado: String,
    val puntaje: Int
)