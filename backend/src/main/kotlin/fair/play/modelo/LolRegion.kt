package fair.play.modelo

enum class LolRegion {
    BR, LAS, LAN, NA, EUW, EUNE, OCE, RU, TR, JP, KR;

    companion object {
        fun fromString(region: String): LolRegion {
            return when (region) {
                "BR" -> BR
                "LAS" -> LAS
                "LAN" -> LAN
                "NA" -> NA
                "EUW" -> EUW
                "EUNE" -> EUNE
                "OCE" -> OCE
                "RU" -> RU
                "TR" -> TR
                "JP" -> JP
                "KR" -> KR
                else -> throw IllegalArgumentException("Region no válida")
            }
        }
    }
}
