package fair.play.modelo

import jakarta.persistence.*

@Entity
class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    @Column(unique = true)
    var userName: String? = null
    @Column(unique = true)
    var eMail: String? = null
    var password: String? = null
    var profileImage: String? = null
    var discordUser : String? = null
    var lolUser : String? = null
    var lolRank : LolRank? = null
    var region: LolRegion? = null
    var lolRole: MutableList<LolRole> = mutableListOf()
    var hoursPlayed: Int? = null
    var valoracionDeJugadorPromedio: Double = 0.0
    var cantVotosTotal: Int = 0
    var datosCompletados: Boolean = false
    var disponibility: Boolean = false
    var disponibilityType: DisponibilityType = DisponibilityType.fromString("Any")

    constructor(userName: String, eMail: String, password: String, discordUser: String,
                lolUser: String, lolRank: LolRank, region: LolRegion, lolRole: MutableList<LolRole>, hoursPlayed: Int,
                disponibility: Boolean, disponibilityType: DisponibilityType) {
        this.userName = userName
        this.eMail = eMail
        this.password = password
        this.discordUser = discordUser
        this.lolUser = lolUser
        this.lolRank = lolRank
        this.region = region
        this.lolRole = lolRole
        this.hoursPlayed = hoursPlayed
        this.disponibility = disponibility
        this.disponibilityType = disponibilityType
    }

    constructor()
}