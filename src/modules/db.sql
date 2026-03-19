-- ============================================================
    --SISTEMA DE GESTIÓN DE GIMNASIO
--Base de datos MySQL
-- ============================================================

    CREATE DATABASE IF NOT EXISTS gimnasio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gimnasio_db;

-- ============================================================
    --1. PLANES(Membresías)
--Módulo: planes
-- ============================================================
    CREATE TABLE planes(
        id_plan       INT           NOT NULL AUTO_INCREMENT,
        nombre        VARCHAR(50)   NOT NULL COMMENT 'Ej: Black, Gold, Basic',
        costo_mensual DECIMAL(10, 2) NOT NULL,
        descripcion   TEXT,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id_plan),
        UNIQUE KEY uq_planes_nombre(nombre)
    ) ENGINE = InnoDB COMMENT = 'Tipos de membresía disponibles en el gimnasio';

-- ============================================================
    --2. ESPECIALIDADES
--Módulo: staff(entrenadores)
-- ============================================================
    CREATE TABLE especialidades(
        id_especialidad INT           NOT NULL AUTO_INCREMENT,
        nombre          VARCHAR(80)   NOT NULL COMMENT 'Ej: Yoga, Crossfit, Pesas',
        bono_por_clase  DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT 'Pago adicional al entrenador por clase impartida',
        descripcion     TEXT,
        created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id_especialidad),
        UNIQUE KEY uq_especialidades_nombre(nombre)
    ) ENGINE = InnoDB COMMENT = 'Especialidades deportivas de los entrenadores';

-- ============================================================
    --3. SOCIOS
--Módulo: socios
-- ============================================================
    CREATE TABLE socios(
        id_socio              INT          NOT NULL AUTO_INCREMENT,
        nombre                VARCHAR(80)  NOT NULL,
        apellido              VARCHAR(80)  NOT NULL,
        email                 VARCHAR(120) NOT NULL,
        telefono              VARCHAR(20),
        fecha_nacimiento      DATE,
        id_plan               INT          NOT NULL,
        fecha_inicio_membresia DATE        NOT NULL,
        fecha_fin_membresia   DATE         NOT NULL,
        estado                ENUM('activo', 'inactivo', 'suspendido') NOT NULL DEFAULT 'activo',
        created_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id_socio),
        UNIQUE KEY uq_socios_email(email),
        CONSTRAINT fk_socios_plan
    FOREIGN KEY(id_plan) REFERENCES planes(id_plan)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
    ) ENGINE = InnoDB COMMENT = 'Clientes / socios del gimnasio';

-- ============================================================
    --4. ENTRENADORES(Staff)
--Módulo: staff
-- ============================================================
    CREATE TABLE entrenadores(
        id_entrenador     INT          NOT NULL AUTO_INCREMENT,
        nombre            VARCHAR(80)  NOT NULL,
        apellido          VARCHAR(80)  NOT NULL,
        email             VARCHAR(120) NOT NULL,
        telefono          VARCHAR(20),
        id_especialidad   INT          NOT NULL,
        fecha_contratacion DATE        NOT NULL,
        estado            ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
        created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id_entrenador),
        UNIQUE KEY uq_entrenadores_email(email),
        CONSTRAINT fk_entrenadores_especialidad
    FOREIGN KEY(id_especialidad) REFERENCES especialidades(id_especialidad)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
    ) ENGINE = InnoDB COMMENT = 'Instructores / staff del gimnasio';

-- ============================================================
    --5. CLASES_GRUPALES
--Módulo: clases
-- ============================================================
    CREATE TABLE clases_grupales(
        id_clase         INT          NOT NULL AUTO_INCREMENT,
        nombre_clase     VARCHAR(100) NOT NULL,
        id_entrenador    INT          NOT NULL,
        horario          DATETIME     NOT NULL COMMENT 'Fecha y hora de inicio de la sesión',
        duracion_minutos INT          NOT NULL DEFAULT 60,
        cupo_maximo      INT          NOT NULL,
        cupo_disponible  INT          NOT NULL,
        created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id_clase),
        CONSTRAINT fk_clases_entrenador
    FOREIGN KEY(id_entrenador) REFERENCES entrenadores(id_entrenador)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
        CONSTRAINT chk_cupo CHECK(cupo_disponible >= 0 AND cupo_disponible <= cupo_maximo)
    ) ENGINE = InnoDB COMMENT = 'Sesiones de clases grupales programadas';

-- ============================================================
    --6. ASISTENCIAS(Inscripción socio ↔ clase)
--Módulo: socios(historial)
-- ============================================================
    CREATE TABLE asistencias(
        id_asistencia   INT       NOT NULL AUTO_INCREMENT,
        id_socio        INT       NOT NULL,
        id_clase        INT       NOT NULL,
        fecha_asistencia DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        estado          ENUM('inscrito', 'asistio', 'falto', 'cancelado') NOT NULL DEFAULT 'inscrito',
        created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id_asistencia),
        UNIQUE KEY uq_asistencia_socio_clase(id_socio, id_clase),
        CONSTRAINT fk_asistencias_socio
    FOREIGN KEY(id_socio) REFERENCES socios(id_socio)
    ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_asistencias_clase
    FOREIGN KEY(id_clase) REFERENCES clases_grupales(id_clase)
    ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE = InnoDB COMMENT = 'Registro de inscripciones y asistencia a clases grupales';

-- ============================================================
    --7. SERVICIOS_BIENESTAR(Catálogo)
--Módulo: servicios - bienestar
-- ============================================================
    CREATE TABLE servicios_bienestar(
        id_servicio  INT           NOT NULL AUTO_INCREMENT,
        nombre       VARCHAR(100)  NOT NULL COMMENT 'Ej: Cita Nutrición, Masaje Deportivo',
        precio       DECIMAL(10, 2) NOT NULL,
        descripcion  TEXT,
        activo       BOOLEAN       NOT NULL DEFAULT TRUE,
        created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id_servicio)
    ) ENGINE = InnoDB COMMENT = 'Catálogo de servicios adicionales de bienestar';

-- ============================================================
    --8. CONSUMOS_SERVICIOS(Servicios tomados por socio)
--Módulo: facturación
-- ============================================================
    CREATE TABLE consumos_servicios(
        id_consumo     INT           NOT NULL AUTO_INCREMENT,
        id_socio       INT           NOT NULL,
        id_servicio    INT           NOT NULL,
        fecha_consumo  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
        precio_cobrado DECIMAL(10, 2) NOT NULL COMMENT 'Precio al momento del consumo (histórico)',
        observaciones  TEXT,
        created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id_consumo),
        CONSTRAINT fk_consumos_socio
    FOREIGN KEY(id_socio) REFERENCES socios(id_socio)
    ON UPDATE CASCADE ON DELETE RESTRICT,
        CONSTRAINT fk_consumos_servicio
    FOREIGN KEY(id_servicio) REFERENCES servicios_bienestar(id_servicio)
    ON UPDATE CASCADE ON DELETE RESTRICT
    ) ENGINE = InnoDB COMMENT = 'Servicios de bienestar consumidos por los socios';

-- ============================================================
    --9. FACTURACION(Total a pagar por socio / mes)
--Módulo: facturación
-- ============================================================
    CREATE TABLE facturacion(
        id_factura       INT           NOT NULL AUTO_INCREMENT,
        id_socio         INT           NOT NULL,
        periodo_mes      TINYINT       NOT NULL COMMENT '1-12',
        periodo_anio     YEAR          NOT NULL,
        costo_plan       DECIMAL(10, 2) NOT NULL COMMENT 'Snapshot del costo mensual del plan',
        total_servicios  DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT 'Suma de servicios de bienestar del mes',
        total_pagar      DECIMAL(10, 2) GENERATED ALWAYS AS(costo_plan + total_servicios) STORED,
        fecha_generacion DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id_factura),
        UNIQUE KEY uq_factura_socio_periodo(id_socio, periodo_mes, periodo_anio),
        CONSTRAINT fk_facturacion_socio
    FOREIGN KEY(id_socio) REFERENCES socios(id_socio)
    ON UPDATE CASCADE ON DELETE RESTRICT,
        CONSTRAINT chk_periodo_mes CHECK(periodo_mes BETWEEN 1 AND 12)
    ) ENGINE = InnoDB COMMENT = 'Liquidación mensual por socio (plan + servicios adicionales)';

-- ============================================================
    --TRIGGER: Controlar cupo al inscribir un socio a una clase
-- ============================================================
    DELIMITER $$

CREATE TRIGGER trg_before_inscripcion
BEFORE INSERT ON asistencias
FOR EACH ROW
BEGIN
  DECLARE v_cupo INT;
  SELECT cupo_disponible INTO v_cupo
  FROM clases_grupales
  WHERE id_clase = NEW.id_clase
  FOR UPDATE;

  IF v_cupo <= 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No hay cupo disponible en esta clase';
  END IF;
END$$

CREATE TRIGGER trg_after_inscripcion
AFTER INSERT ON asistencias
FOR EACH ROW
BEGIN
  UPDATE clases_grupales
  SET cupo_disponible = cupo_disponible - 1
  WHERE id_clase = NEW.id_clase;
END$$

--Trigger: restaurar cupo si se cancela inscripción
CREATE TRIGGER trg_after_cancelacion
AFTER UPDATE ON asistencias
FOR EACH ROW
BEGIN
  IF NEW.estado = 'cancelado' AND OLD.estado != 'cancelado' THEN
    UPDATE clases_grupales
    SET cupo_disponible = cupo_disponible + 1
    WHERE id_clase = NEW.id_clase;
  END IF;
END$$

DELIMITER;