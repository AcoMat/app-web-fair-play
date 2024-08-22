package fair.play.persistencia

import fair.play.modelo.Usuario
import fair.play.modelo.Voto
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface ValoracionDAO: CrudRepository<Voto,Long> {

    @Query("SELECT ROUND(AVG(v.puntaje),1) FROM Voto v WHERE v.votado = :votado")
    fun promedioDeUser(@Param("votado") votado: Usuario): Double

    @Query("SELECT COUNT(v.id) FROM Voto v WHERE v.votado = :votado")
    fun totalDeVotosA(@Param("votado") votado: Usuario): Int

    @Query("SELECT v FROM Voto v WHERE v.votado = :votado AND v.votante = :votante")
    fun buscarVoto(votante: Usuario, votado: Usuario): Voto?
}