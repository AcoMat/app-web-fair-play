package fair.play.controller

import fair.play.modelo.DisponibilityType
import fair.play.modelo.Usuario
import fair.play.persistencia.dto.*
import fair.play.services.UsuarioService
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
@RequestMapping("/usuario")
class UsuarioControllerRest {
    @Autowired
    private lateinit var usuarioService: UsuarioService

    @GetMapping("/{userName}")
    fun recuperarUsuario(@PathVariable userName: String) : ResponseEntity<Any> {
        val resp = usuarioService.recuperarUsuario(userName)
        return ResponseEntity(resp, HttpStatus.OK)
    }

    @PostMapping("/register")
    fun crearUsuario(@RequestBody @Valid usuarioRegisterDTO: UsuarioRegistroDTO) : ResponseEntity<Any> {
        val resp = usuarioService.crearUsuario(usuarioRegisterDTO)
        return ResponseEntity.ok(resp)
    }

    @PostMapping("/login")
    fun login(@RequestBody @Valid usuarioLoginDTO: UsuarioLoginDTO): ResponseEntity<Any>  {
        val resp = usuarioService.loguearUsuario(usuarioLoginDTO)
        return ResponseEntity(resp, HttpStatus.OK)
    }

    @GetMapping("/usuarios")
    fun recuperarTodosLosUsuarios(@RequestParam rolesDeBusqueda: List<String>): ResponseEntity<Any>  {
        val usuarios = usuarioService.recuperarTodosLosUsuarios(roles = rolesDeBusqueda)
        return ResponseEntity.ok(usuarios)
    }

    @GetMapping("/usuarios/multFilt")
    fun reuperarTodosLosUsuariosMultiplesFiltros(@RequestParam rolesDeBusqueda: List<String>, @RequestParam rangosDeBusqueda: List<String>, @RequestParam regionDeBusqueda: String, disponibility: Boolean, disponibilityType: String): ResponseEntity<Any> {
        val parsedDisponibilityType = DisponibilityType.fromString(disponibilityType)
        val usuarios = usuarioService.recuperarTodosLosUsuariosMultiplesFiltros(rolesDeBusqueda, rangosDeBusqueda, regionDeBusqueda, disponibility, parsedDisponibilityType)
        return ResponseEntity.ok(usuarios)
    }

    @GetMapping("/actual")
    fun getCurrentUser(@RequestHeader("Authorization") authorizationHeader: String): ResponseEntity<Any> {
        val currentUser = usuarioService.recuperarUsuarioActual(authorizationHeader)
        return ResponseEntity.ok(currentUser)
    }

    @PostMapping("/update")
    fun actualizarUsuario(@RequestBody @Valid usuarioUpdateDTO: UsuarioUpdateDTO): ResponseEntity<Any> {
        val resp = usuarioService.actualizarUsuario(usuarioUpdateDTO)
        return ResponseEntity.ok(resp)
    }

    @PostMapping("/updateDisponibility")
    fun actualizarDisponibilidad(@RequestBody @Valid usuarioDisponibility: UsuarioDisponibilityDTO): ResponseEntity<Any> {
        val resp = usuarioService.actualizarDisponibilidad(usuarioDisponibility)
        return ResponseEntity.ok(resp)
    }
}