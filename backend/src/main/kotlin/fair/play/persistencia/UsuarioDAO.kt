package fair.play.persistencia

import fair.play.modelo.LolRole
import fair.play.modelo.Usuario
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UsuarioDAO : CrudRepository<Usuario, Long> {
    @Query("SELECT u FROM Usuario u WHERE u.lolRole IN :lolRole")
    fun findAllByLolRole(lolRole: List<LolRole>): List<Usuario>
    fun findByUserName(userName: String): Usuario
    fun findOneByeMail(eMail: String): Optional<Usuario>
    @Query("SELECT u FROM Usuario u ORDER BY u.valoracionDeJugadorPromedio DESC")
    fun recuperarTodosOrdenadosXVal() : List<Usuario>
}