package com.formaciondbi.microservicios.app.cursos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
@EntityScan({ "com.formaciondbi.microservicios.commons.alumnos.models.entity",
			  "com.formaciondbi.microservicios.app.cursos.models.entity",
			  "com.formaciondbi.microservicios.commons.examenes.models.entity" })
public class MicroserviciosCursoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviciosCursoApplication.class, args);
	}

}
