package com.formaciondbi.microservicios.app.cursos.services;

import com.formaciondbi.microservicios.app.commons.services.CommonService;
import com.formaciondbi.microservicios.app.cursos.models.entity.Curso;

public interface CursoService extends CommonService<Curso> {

	public Curso findCursoByAlumnoId(Long id);
}
