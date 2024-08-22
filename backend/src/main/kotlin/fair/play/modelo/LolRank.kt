package fair.play.modelo

enum class LolRank {
    Iron, Bronze, Silver, Gold, Platinum, Emerald, Diamond, Master, Grandmaster, Challenger;

    companion object {
        fun fromString(rank: String): LolRank {
            return when (rank) {
                "Iron" -> Iron
                "Bronze" -> Bronze
                "Silver" -> Silver
                "Gold" -> Gold
                "Platinum" -> Platinum
                "Emerald" -> Emerald
                "Diamond" -> Diamond
                "Master" -> Master
                "Grandmaster" -> Grandmaster
                "Challenger" -> Challenger
                else -> throw IllegalArgumentException("Invalid rank")
            }
        }
    }
}
