package fair.play.modelo

enum class LolRole {
    TOP, JUNGLA, MID, ADC, SUPPORT;

    companion object {
        fun fromString(lolRole: String): LolRole {
            return when (lolRole) {
                "TOP" -> TOP
                "JUNGLA" -> JUNGLA
                "MID" -> MID
                "ADC" -> ADC
                "SUPPORT" -> SUPPORT
                else -> throw IllegalArgumentException("LolRole no encontrado")
            }
        }
    }
}
