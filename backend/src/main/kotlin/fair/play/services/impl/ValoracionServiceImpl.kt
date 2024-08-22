package fair.play.services.impl

import fair.play.modelo.Usuario
import fair.play.modelo.Voto
import fair.play.persistencia.UsuarioDAO
import fair.play.persistencia.ValoracionDAO
import fair.play.services.ValoracionService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ValoracionServiceImpl: ValoracionService {
    @Autowired
    private lateinit var dao: ValoracionDAO
    @Autowired
    private lateinit var usuarioDAO: UsuarioDAO

    override fun registrarValoracion(votante: Usuario, votado: Usuario, puntaje: Int) {
        val voto = Voto(votante, votado , puntaje)
        //Buscar voto si existe
        val votoAntiguo = dao.buscarVoto(votante, votado)
        if(votoAntiguo != null){
            dao.delete(votoAntiguo)
        }
        try {
            dao.save(voto)
            val promedio: Double = dao.promedioDeUser(votado)
            votado.valoracionDeJugadorPromedio = promedio
            votado.cantVotosTotal = dao.totalDeVotosA(votado)
            usuarioDAO.save(votado)
        } catch (e: Exception) {
            println(e)
            throw RuntimeException("Ocurrió un error inesperado.", e)
        }
    }

    override fun buscarVoto(votante: Usuario, votado: Usuario): Voto? {
        val voto = dao.buscarVoto(votante, votado)
        return voto
    }
}