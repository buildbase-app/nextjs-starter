import { agent } from '@/lib/agent';

/**
 * The MCP server. One JSON-RPC message per POST (Streamable HTTP, stateless).
 * GET/DELETE answer 405; OPTIONS answers the CORS preflight.
 */
export const { GET, POST, DELETE, OPTIONS } = agent.routes;
