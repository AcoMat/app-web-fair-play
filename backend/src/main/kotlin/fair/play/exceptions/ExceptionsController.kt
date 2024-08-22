package fair.play.exceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.util.function.Consumer

@ControllerAdvice
class ExceptionsController {
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun DtoValidation(ex: MethodArgumentNotValidException): ResponseEntity<*> {
        val errlist = HashMap<String, String?>()
        ex.fieldErrors.forEach(Consumer { er: FieldError ->
            errlist[er.field] = er.defaultMessage
        })

        return ResponseEntity(errlist, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(LoginException::class)
    fun LogInValidation(ex: LoginException): ResponseEntity<*> {
        val errList = HashMap<String, String>()
        errList["Invalid"] = ex.message!!
        return ResponseEntity(errList, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(UnexpectedError::class)
    fun UnexpectedError(ex: UnexpectedError): ResponseEntity<*> {
        val errList = HashMap<String, String>()
        errList["Error"] = ex.message!!
        return ResponseEntity(errList, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(DuplicatedUserException::class)
    fun DuplicatedUserException(ex: DuplicatedUserException): ResponseEntity<*> {
        val errList = HashMap<String, String>()
        errList["Duplicated"] = ex.message!!
        return ResponseEntity(errList, HttpStatus.BAD_REQUEST)
    }
}