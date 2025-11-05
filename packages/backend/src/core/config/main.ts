import { registerAs } from '@nestjs/config'

export default registerAs('main', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
}))
