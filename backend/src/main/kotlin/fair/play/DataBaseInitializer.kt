package fair.play
import fair.play.modelo.*
import fair.play.persistencia.UsuarioDAO
import fair.play.persistencia.ValoracionDAO
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class DataBaseInitializer {

    @Bean
    fun initializeDataBase(usuarioDAO: UsuarioDAO, valoracionDAO: ValoracionDAO) : CommandLineRunner {

        return CommandLineRunner {

            valoracionDAO.deleteAll()
            usuarioDAO.deleteAll()

            val user1 = Usuario(
                "Juan11",
                "juan11@gmail.com",
                "contrase",
                "JuanDiscord",
                "JuanLOL",
                LolRank.Diamond,
                LolRegion.LAN,
                mutableListOf(LolRole.SUPPORT, LolRole.MID),
                150,
                false,
                DisponibilityType.Casual
            )
            usuarioDAO.save(user1)

            val user2 = Usuario(
                "Leo12",
                "leo12@gmail.com",
                "contrase",
                "LeoDiscord",
                "LeoLOL",
                LolRank.Silver,
                LolRegion.LAS,
                mutableListOf(LolRole.ADC, LolRole.TOP),
                95,
                false,
                DisponibilityType.Casual
            )
            usuarioDAO.save(user2)

            val user3 = Usuario(
                "Roman13",
                "roman13@gmail.com",
                "contrase",
                "RomanDisc",
                "RomanLOL",
                LolRank.Emerald,
                LolRegion.NA,
                mutableListOf(LolRole.JUNGLA),
                120,
                true,
                DisponibilityType.Ranked
            )
            usuarioDAO.save(user3)

            val user4 = Usuario(
                "Marcos14",
                "marcos14@gmail.com",
                "contrase",
                "MarcosDisc",
                "MarcosLOL",
                LolRank.Gold,
                LolRegion.LAS,
                mutableListOf(LolRole.SUPPORT, LolRole.TOP),
                150,
                false,
                DisponibilityType.Ranked
            )
            usuarioDAO.save(user4)

            val user5 = Usuario(
                "Santi15",
                "santi15@gmail.com",
                "contrase",
                "SantiDisc",
                "SantiLOL",
                LolRank.Master,
                LolRegion.BR,
                mutableListOf(LolRole.MID, LolRole.JUNGLA, LolRole.TOP),
                160,
                false,
                DisponibilityType.Casual
            )
            usuarioDAO.save(user5)

            val user6 = Usuario(
                "Alejo16",
                "alejo16@gmail.com",
                "contrase",
                "AlejoDisc",
                "AlejoLOL",
                LolRank.Gold,
                LolRegion.NA,
                mutableListOf(LolRole.JUNGLA, LolRole.TOP, LolRole.SUPPORT),
                180,
                true,
                DisponibilityType.Casual
            )
            usuarioDAO.save(user6)

            val user7 = Usuario(
                "Nacho",
                "nacho@gmail.com",
                "contrase",
                "NachoDisc",
                "NachoLOL",
                LolRank.Gold,
                LolRegion.NA,
                mutableListOf(LolRole.JUNGLA, LolRole.TOP, LolRole.SUPPORT),
                180,
                false,
                DisponibilityType.Ranked
            )
            user7.datosCompletados = true
            usuarioDAO.save(user7)


            // Votacion =>  Voto(votante, votado , puntaje)
            // Primera votación

            val votante1Leo = usuarioDAO.findByUserName("Leo12")
            val votado1Roman = usuarioDAO.findByUserName("Roman13")

            val voto1 = Voto(votante1Leo, votado1Roman, 3)
            valoracionDAO.save(voto1)

            val promedio1: Double = valoracionDAO.promedioDeUser(votado1Roman)
            votado1Roman.valoracionDeJugadorPromedio = promedio1
            votado1Roman.cantVotosTotal = valoracionDAO.totalDeVotosA(votado1Roman)
            usuarioDAO.save(votado1Roman)

            // Segunda votación

            val votante2Juan = usuarioDAO.findByUserName("Juan11")
            val votado2Marcos = usuarioDAO.findByUserName("Marcos14")

            val voto2 = Voto(votante2Juan, votado2Marcos, 4)
            valoracionDAO.save(voto2)

            val promedio2: Double = valoracionDAO.promedioDeUser(votado2Marcos)
            votado2Marcos.valoracionDeJugadorPromedio = promedio2
            votado2Marcos.cantVotosTotal = valoracionDAO.totalDeVotosA(votado2Marcos)
            usuarioDAO.save(votado2Marcos)

            // Tercera votación

            val votante3Marcos = usuarioDAO.findByUserName("Marcos14")
            val votado3Santi = usuarioDAO.findByUserName("Santi15")

            val voto3 = Voto(votante3Marcos, votado3Santi, 5)
            valoracionDAO.save(voto3)

            val promedio3: Double = valoracionDAO.promedioDeUser(votado3Santi)
            votado3Santi.valoracionDeJugadorPromedio = promedio3
            votado3Santi.cantVotosTotal = valoracionDAO.totalDeVotosA(votado3Santi)
            usuarioDAO.save(votado3Santi)
        }

    }
}