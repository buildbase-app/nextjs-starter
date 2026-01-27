import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';

/**
 * Health Check Endpoint
 *
 * Used for deployment monitoring, load balancer health checks,
 * and uptime monitoring services.
 *
 * GET /api/health - Basic health check
 * GET /api/health?deep=true - Include database connectivity check
 */

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks?: {
    database?: {
      status: 'up' | 'down';
      latencyMs?: number;
      error?: string;
    };
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deep = searchParams.get('deep') === 'true';

  const startTime = Date.now();

  const health: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    uptime: process.uptime(),
  };

  // Deep health check includes database connectivity
  if (deep) {
    health.checks = {};

    // Check database
    try {
      const dbStart = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      const dbLatency = Date.now() - dbStart;

      health.checks.database = {
        status: 'up',
        latencyMs: dbLatency,
      };

      logger.debug('Health check: database up', { latencyMs: dbLatency });
    } catch (error) {
      health.checks.database = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      health.status = 'degraded';

      logger.warn('Health check: database down', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  const responseTime = Date.now() - startTime;
  logger.debug('Health check completed', {
    status: health.status,
    deep,
    responseTimeMs: responseTime,
  });

  // Return appropriate status code
  const statusCode = health.status === 'healthy' ? 200 : 503;

  return NextResponse.json(health, { status: statusCode });
}
