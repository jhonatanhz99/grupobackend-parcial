import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Facturacion } from './facturacion.entity';
import { ConsumoServicio } from './consumo-servicio.entity';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { GenerarFacturaDto } from './dto/generar-factura.dto';

// Estas entidades deben ser importadas desde sus módulos correspondientes
import { Socio } from '../socios/entities/socio.entity';
import { ServicioBienestar } from '../servicios-bienestar/servicio-bienestar.entity';

@Injectable()
export class FacturacionService {
  constructor(
    @InjectRepository(Facturacion)
    private readonly facturaRepo: Repository<Facturacion>,

    @InjectRepository(ConsumoServicio)
    private readonly consumoRepo: Repository<ConsumoServicio>,

    @InjectRepository(Socio)
    private readonly socioRepo: Repository<Socio>,

    @InjectRepository(ServicioBienestar)
    private readonly servicioRepo: Repository<ServicioBienestar>,
  ) {}

  // ─────────────────────────────────────────────────────────────────────────
  // CONSUMOS
  // ─────────────────────────────────────────────────────────────────────────

  /** Registra un servicio de bienestar consumido por un socio */
  async registrarConsumo(dto: CreateConsumoDto): Promise<ConsumoServicio> {
    const socio = await this.socioRepo.findOne({ where: { id_socio: dto.id_socio } });
    if (!socio) throw new NotFoundException(`Socio #${dto.id_socio} no encontrado`);

    if (socio.estado !== 'activo') {
      throw new BadRequestException(`El socio #${dto.id_socio} no tiene membresía activa`);
    }

    const servicio = await this.servicioRepo.findOne({ where: { id_servicio: dto.id_servicio } });
    if (!servicio) throw new NotFoundException(`Servicio #${dto.id_servicio} no encontrado`);

    if (!servicio.activo) {
      throw new BadRequestException(`El servicio "${servicio.nombre}" no está disponible actualmente`);
    }

    const consumo = this.consumoRepo.create({
      socio,
      servicio,
      precio_cobrado: servicio.precio,   // Snapshot del precio actual
      fecha_consumo: dto.fecha_consumo ? new Date(dto.fecha_consumo) : new Date(),
      observaciones: dto.observaciones ?? null,
    });

    return this.consumoRepo.save(consumo);
  }

  /** Lista todos los consumos de un socio */
  async getConsumosPorSocio(id_socio: number): Promise<ConsumoServicio[]> {
    const socio = await this.socioRepo.findOne({ where: { id_socio } });
    if (!socio) throw new NotFoundException(`Socio #${id_socio} no encontrado`);

    return this.consumoRepo.find({
      where: { socio: { id_socio } },
      order: { fecha_consumo: 'DESC' },
    });
  }

  /** Lista consumos de un socio filtrando por mes y año */
  async getConsumosPorSocioYMes(
    id_socio: number,
    mes: number,
    anio: number,
  ): Promise<ConsumoServicio[]> {
    return this.consumoRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.socio', 'socio')
      .leftJoinAndSelect('c.servicio', 'servicio')
      .where('socio.id_socio = :id_socio', { id_socio })
      .andWhere('MONTH(c.fecha_consumo) = :mes', { mes })
      .andWhere('YEAR(c.fecha_consumo) = :anio', { anio })
      .orderBy('c.fecha_consumo', 'DESC')
      .getMany();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FACTURACIÓN
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Genera (o actualiza) la factura mensual de un socio.
   * Lógica: total_pagar = costo_mensual_del_plan + suma_servicios_del_mes
   */
  async generarFactura(dto: GenerarFacturaDto): Promise<Facturacion> {
    // 1. Validar socio y su plan
    const socio = await this.socioRepo.findOne({
      where: { id_socio: dto.id_socio },
      relations: ['plan'],
    });
    if (!socio) throw new NotFoundException(`Socio #${dto.id_socio} no encontrado`);

    // 2. Verificar que no exista ya una factura para ese período
    const existente = await this.facturaRepo.findOne({
      where: {
        socio: { id_socio: dto.id_socio },
        periodo_mes: dto.periodo_mes,
        periodo_anio: dto.periodo_anio,
      },
    });
    if (existente) {
      throw new ConflictException(
        `Ya existe una factura para el socio #${dto.id_socio} en ${dto.periodo_mes}/${dto.periodo_anio}`,
      );
    }

    // 3. Sumar los servicios de bienestar consumidos en el período
    const resultado = await this.consumoRepo
      .createQueryBuilder('c')
      .select('COALESCE(SUM(c.precio_cobrado), 0)', 'total')
      .where('c.socio.id_socio = :id', { id: dto.id_socio })
      .andWhere('MONTH(c.fecha_consumo) = :mes', { mes: dto.periodo_mes })
      .andWhere('YEAR(c.fecha_consumo) = :anio', { anio: dto.periodo_anio })
      .getRawOne<{ total: string }>();

    const totalServicios = parseFloat(resultado?.total ?? '0');
    const costoPlan = parseFloat(socio.plan.costo_mensual.toString());

    // 4. Crear y guardar la factura
    const factura = this.facturaRepo.create({
      socio,
      periodo_mes: dto.periodo_mes,
      periodo_anio: dto.periodo_anio,
      costo_plan: costoPlan,
      total_servicios: totalServicios,
      fecha_generacion: new Date(),
    });

    return this.facturaRepo.save(factura);
  }

  /**
   * Endpoint principal requerido por el caso:
   * Calcula el total a pagar de un socio en el mes/año actual (o indicado).
   */
  async calcularTotalAPagar(
    id_socio: number,
    mes?: number,
    anio?: number,
  ): Promise<{
    socio: string;
    plan: string;
    costo_plan: number;
    total_servicios: number;
    total_a_pagar: number;
    periodo: string;
    detalle_servicios: ConsumoServicio[];
  }> {
    const ahora = new Date();
    const periodoMes = mes ?? ahora.getMonth() + 1;
    const periodoAnio = anio ?? ahora.getFullYear();

    // Socio con su plan
    const socio = await this.socioRepo.findOne({
      where: { id_socio },
      relations: ['plan'],
    });
    if (!socio) throw new NotFoundException(`Socio #${id_socio} no encontrado`);

    // Detalle de servicios del período
    const consumos = await this.getConsumosPorSocioYMes(id_socio, periodoMes, periodoAnio);
    const totalServicios = consumos.reduce((acc, c) => acc + Number(c.precio_cobrado), 0);
    const costoPlan = Number(socio.plan.costo_mensual);

    return {
      socio: `${socio.nombre} ${socio.apellido}`,
      plan: socio.plan.nombre,
      costo_plan: costoPlan,
      total_servicios: totalServicios,
      total_a_pagar: costoPlan + totalServicios,
      periodo: `${periodoMes.toString().padStart(2, '0')}/${periodoAnio}`,
      detalle_servicios: consumos,
    };
  }

  /** Lista todas las facturas generadas */
  async getAllFacturas(): Promise<Facturacion[]> {
    return this.facturaRepo.find({
      order: { periodo_anio: 'DESC', periodo_mes: 'DESC' },
    });
  }

  /** Obtiene una factura por ID */
  async getFacturaById(id: number): Promise<Facturacion> {
    const factura = await this.facturaRepo.findOne({ where: { id_factura: id } });
    if (!factura) throw new NotFoundException(`Factura #${id} no encontrada`);
    return factura;
  }

  /** Historial de facturas de un socio */
  async getFacturasPorSocio(id_socio: number): Promise<Facturacion[]> {
    const socio = await this.socioRepo.findOne({ where: { id_socio } });
    if (!socio) throw new NotFoundException(`Socio #${id_socio} no encontrado`);

    return this.facturaRepo.find({
      where: { socio: { id_socio } },
      order: { periodo_anio: 'DESC', periodo_mes: 'DESC' },
    });
  }
}
