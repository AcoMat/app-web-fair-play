package fair.play.services

import fair.play.modelo.Usuario
import fair.play.modelo.Voto

interface ValoracionService {
    fun registrarValoracion(votante: Usuario, votado: Usuario, puntaje: Int)
    fun buscarVoto(votante: Usuario, votado: Usuario): Voto?

}
