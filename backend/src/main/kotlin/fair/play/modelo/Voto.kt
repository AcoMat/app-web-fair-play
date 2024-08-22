package fair.play.modelo

import jakarta.persistence.*

@Entity
class Voto(
    @ManyToOne
    @JoinColumn(name = "votante_id", nullable = false)
    val votante: Usuario,

    @ManyToOne
    @JoinColumn(name = "votado_id", nullable = false)
    val votado: Usuario,

    @Column(nullable = false)
    val puntaje: Int

    ){

    @Id
    @GeneratedValue
    val id: Long? = null

    init {
        require(puntaje in 1..5) { "El puntaje debe estar entre 1 y 5" }
    }
}