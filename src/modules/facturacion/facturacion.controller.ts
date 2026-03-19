import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FacturacionService } from './facturacion.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { GenerarFacturaDto } from './dto/generar-factura.dto';

@Controller('facturacion')
export class FacturacionController {
  constructor(private readonly facturacionService: FacturacionService) {}

  // ─────────────────────────────────────────────────────────────────────────
  // ENDPOINT PRINCIPAL (Requerido por el caso)
  // GET /facturacion/total-pagar/:id_socio
  // Calcula: costo_plan + suma_servicios_del_mes
  // ─────────────────────────────────────────────────────────────────────────
  @Get('total-pagar/:id_socio')
  calcularTotalAPagar(
    @Param('id_socio', ParseIntPipe) id_socio: number,
    @Query('mes') mes?: string,
    @Query('anio') anio?: string,
  ) {
    return this.facturacionService.calcularTotalAPagar(
      id_socio,
      mes ? parseInt(mes) : undefined,
      anio ? parseInt(anio) : undefined,
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CONSUMOS DE SERVICIOS
  // ─────────────────────────────────────────────────────────────────────────

  /** POST /facturacion/consumos — Registrar servicio consumido por un socio */
  @Post('consumos')
  registrarConsumo(@Body() dto: CreateConsumoDto) {
    return this.facturacionService.registrarConsumo(dto);
  }

  /** GET /facturacion/consumos/socio/:id_socio — Todos los consumos de un socio */
  @Get('consumos/socio/:id_socio')
  getConsumosPorSocio(@Param('id_socio', ParseIntPipe) id_socio: number) {
    return this.facturacionService.getConsumosPorSocio(id_socio);
  }

  /**
   * GET /facturacion/consumos/socio/:id_socio/mes?mes=7&anio=2025
   * Consumos de un socio filtrados por mes y año
   */
  @Get('consumos/socio/:id_socio/mes')
  getConsumosPorMes(
    @Param('id_socio', ParseIntPipe) id_socio: number,
    @Query('mes') mes: string,
    @Query('anio') anio: string,
  ) {
    return this.facturacionService.getConsumosPorSocioYMes(
      id_socio,
      parseInt(mes),
      parseInt(anio),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FACTURAS
  // ─────────────────────────────────────────────────────────────────────────

  /** POST /facturacion/facturas — Generar factura mensual de un socio */
  @Post('facturas')
  generarFactura(@Body() dto: GenerarFacturaDto) {
    return this.facturacionService.generarFactura(dto);
  }

  /** GET /facturacion/facturas — Listar todas las facturas */
  @Get('facturas')
  getAllFacturas() {
    return this.facturacionService.getAllFacturas();
  }

  /** GET /facturacion/facturas/:id — Obtener factura por ID */
  @Get('facturas/:id')
  getFacturaById(@Param('id', ParseIntPipe) id: number) {
    return this.facturacionService.getFacturaById(id);
  }

  /** GET /facturacion/facturas/socio/:id_socio — Historial de facturas de un socio */
  @Get('facturas/socio/:id_socio')
  getFacturasPorSocio(@Param('id_socio', ParseIntPipe) id_socio: number) {
    return this.facturacionService.getFacturasPorSocio(id_socio);
  }
}
