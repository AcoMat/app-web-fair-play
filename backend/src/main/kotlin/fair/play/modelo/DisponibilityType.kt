package fair.play.modelo

enum class DisponibilityType {
    Any, Ranked, Casual;

    companion object {
        fun fromString(rank: String): DisponibilityType {
            return when (rank) {
                "Any" -> Any
                "Ranked" -> Ranked
                "Casual" -> Casual
                else -> throw IllegalArgumentException("Invalid type")
            }
        }
    }
}