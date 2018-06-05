using everisapi.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using AutoMapper;
using everisapi.API.Models;
using everisapi.API.Entities;

namespace everisapi.API.Controllers
{
    [Route("api/respuestas")]
    public class RespuestaController : Controller
    {
    //Creamos un logger
    private ILogger<RespuestaController> _logger;
    private IRespuestasInfoRepository _respuestasInfoRepository;

    //Utilizamos el constructor para inicializar el logger
    public RespuestaController(ILogger<RespuestaController> logger, IRespuestasInfoRepository respuestasInfoRepository)
    {
      _logger = logger;
      _respuestasInfoRepository = respuestasInfoRepository;
    }

    //Recogemos todas las respuestas de la base de datos
    [HttpGet()]
    public IActionResult GetRespuestas()
    {
      try
      {
        var RespuestaEntities = _respuestasInfoRepository.GetRespuestas();

        var results = Mapper.Map<IEnumerable<RespuestaDto>>(RespuestaEntities);

        _logger.LogInformation("Mandamos correctamente todas las respuestas.");

        return Ok(results);
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"Se recogio un error al recibir todos los datos de las respuestas: " + ex);
        return StatusCode(500, "Un error a ocurrido mientras se procesaba su petición.");
      }
    }

    //Introduciendo el id de la respuesta encuentra todos los datos de este si existe
    [HttpGet("{id}")]
    public IActionResult GetRespuesta(int id)
    {
      try
      {
        //Recoge si existe el usuario si es así la devuelve si no es así muestra un error
        var Section = _respuestasInfoRepository.GetRespuesta(id);

        if (Section == null)
        {
          _logger.LogInformation("La respuesta con id " + id + " no pudo ser encontrado.");
          return NotFound();
        }
          var RespuestaResult = Mapper.Map<RespuestaDto>(Section);

          return Ok(RespuestaResult);
      }
      catch (Exception ex)
      {
        _logger.LogCritical("Se recogio un error al recibir la respuesta con id " + id + ": " + ex);
        return StatusCode(500, "Un error a ocurrido mientras se procesaba su petición.");
      }
    }

    //Introduciendo la id del evaluacion y la id de la pregunta
    [HttpGet("evaluacion/{idevaluacion}/pregunta/{idpregunta}")]
    public IActionResult GetSectionsDeProyectoYPregunta(int idevaluacion, int idpregunta)
    {
      try
      {
        var RespuestaEntities = _respuestasInfoRepository.GetRespuestasFromAsigEval(idevaluacion, idpregunta);

        var results = Mapper.Map<IEnumerable<RespuestaDto>>(RespuestaEntities);

        _logger.LogInformation("Mandamos correctamente todas las respuestas.");

        return Ok(results);
      }
      catch (Exception ex)
      {
        _logger.LogCritical("Se recogio un error al recibir las respuestas con idevaluacion " + idevaluacion + " y idpregunta "+ idpregunta +" : " + ex);
        return StatusCode(500, "Un error a ocurrido mientras se procesaba su petición.");
      }
    }

    //Introduciendo la id del evaluacion y la id de la asignacion
    [HttpGet("evaluacion/{idevaluacion}/asignacion/{idasignacion}")]
    public IActionResult GetSectionsDeProyectoYAsignacion(int idevaluacion, int idasignacion)
    {
      try
      {
        var RespuestaEntities = _respuestasInfoRepository.GetRespuestasFromAsigEval(idevaluacion, idasignacion);

        var results = Mapper.Map<IEnumerable<RespuestaDto>>(RespuestaEntities);

        _logger.LogInformation("Mandamos correctamente todas las respuestas.");

        return Ok(results);
      }
      catch (Exception ex)
      {
        _logger.LogCritical("Se recogio un error al recibir las respuestas con idevaluacion " + idevaluacion + " y idasignacion " + idasignacion + " : " + ex);
        return StatusCode(500, "Un error a ocurrido mientras se procesaba su petición.");
      }
    }

    //Cambiamos el estado de la pregunta que queremos cambiar
    [HttpPut("{id}/change/{CambioRespuesta}")]
    public IActionResult AlterRespuesta(int id, Boolean CambioRespuesta)
    {
      try
      {

        if (!ModelState.IsValid)
        {
          return BadRequest(ModelState);
        }

        var RespuestaEncontrada = _respuestasInfoRepository.GetRespuesta(id);

        if (RespuestaEncontrada == null)
        {
          return NotFound();
        }

        //Intenta hacer update y lo comprueba

        _respuestasInfoRepository.UpdateRespuesta( CambioRespuesta, id );

        if (!_respuestasInfoRepository.SaveChanges())
        {
          _logger.LogCritical("Ocurrio un error al guardar los cambios cuando intentamos actualizar una respuesta con id: " + id);
          return StatusCode(500, "Ocurrio un problema en la petición.");
        }

        //Si todo salio bien dara un mensaje 200 con todo correcto
        return Ok("Actualización correcta.");

      }
      catch (Exception ex)
      {
        _logger.LogCritical("Se recogio un error al recibir la respuesta con id " + id + ": " + ex);
        return StatusCode(500, "Un error a ocurrido mientras se procesaba su petición.");
      }
    }

  }
}
