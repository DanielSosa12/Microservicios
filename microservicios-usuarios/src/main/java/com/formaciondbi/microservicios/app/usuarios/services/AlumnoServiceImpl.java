package com.formaciondbi.microservicios.app.usuarios.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.formaciondbi.microservicios.app.commons.services.CommonServiceImpl;
import com.formaciondbi.microservicios.app.usuarios.models.repository.AlumnoRepository;
import com.formaciondbi.microservicios.commons.alumnos.models.entity.Alumno;

@Service
public class AlumnoServiceImpl extends CommonServiceImpl<Alumno, AlumnoRepository> implements AlumnoService {

	@Override
	@Transactional(readOnly = true)
	public List<Alumno> findByNombreOrApellido(String term) {
		return repository.findByNombreOrApellido(term);
	}


}

