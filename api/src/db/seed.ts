import { faker } from '@faker-js/faker'
import { db } from './index'
import { webhooks } from './schema/webhooks'

// Tipos de eventos comuns do Stripe
const stripeEventTypes = [
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.created',
  'payment_intent.canceled',
  'charge.succeeded',
  'charge.failed',
  'charge.refunded',
  'charge.dispute.created',
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.created',
  'invoice.updated',
  'invoice.finalized',
  'customer.created',
  'customer.updated',
  'customer.deleted',
  'subscription.created',
  'subscription.updated',
  'subscription.deleted',
  'subscription_schedule.created',
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'coupon.created',
  'coupon.updated',
  'plan.created',
  'plan.updated',
  'product.created',
  'product.updated',
]

// Métodos HTTP comuns para webhooks
const httpMethods = ['POST'] // Webhooks geralmente são POST

// Status codes comuns
const statusCodes = [200, 201, 400, 401, 403, 404, 500]

// IPs fictícios
const generateIp = () => faker.internet.ipv4()

// Gerar headers típicos do Stripe
const generateStripeHeaders = (eventType: string): Record<string, string> => {
  const webhookId = `whsec_${faker.string.alphanumeric(32)}`
  const timestamp = Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 86400 })
  
  return {
    'content-type': 'application/json',
    'stripe-signature': `t=${timestamp},v1=${faker.string.alphanumeric(64)},v0=${faker.string.alphanumeric(64)}`,
    'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
    'x-stripe-event-id': `evt_${faker.string.alphanumeric(24)}`,
    'x-stripe-webhook-id': webhookId,
    'host': faker.internet.domainName(),
    'accept': '*/*',
    'x-forwarded-for': generateIp(),
    'x-forwarded-proto': 'https',
  }
}

// Gerar body típico do Stripe baseado no tipo de evento
const generateStripeBody = (eventType: string): string => {
  const eventId = `evt_${faker.string.alphanumeric(24)}`
  const objectId = eventType.includes('payment_intent') 
    ? `pi_${faker.string.alphanumeric(24)}`
    : eventType.includes('charge')
    ? `ch_${faker.string.alphanumeric(24)}`
    : eventType.includes('invoice')
    ? `in_${faker.string.alphanumeric(24)}`
    : eventType.includes('customer')
    ? `cus_${faker.string.alphanumeric(24)}`
    : eventType.includes('subscription')
    ? `sub_${faker.string.alphanumeric(24)}`
    : eventType.includes('checkout')
    ? `cs_${faker.string.alphanumeric(24)}`
    : `obj_${faker.string.alphanumeric(24)}`

  const baseEvent = {
    id: eventId,
    object: 'event',
    api_version: '2024-11-20.acacia',
    created: Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 86400 }),
    data: {
      object: {},
      previous_attributes: {},
    },
    livemode: faker.datatype.boolean(),
    pending_webhooks: faker.number.int({ min: 0, max: 5 }),
    request: {
      id: `req_${faker.string.alphanumeric(24)}`,
      idempotency_key: faker.string.uuid(),
    },
    type: eventType,
  }

  // Adicionar dados específicos baseados no tipo de evento
  if (eventType.includes('payment_intent')) {
    baseEvent.data.object = {
      id: objectId,
      object: 'payment_intent',
      amount: faker.number.int({ min: 1000, max: 1000000 }),
      currency: faker.helpers.arrayElement(['usd', 'eur', 'brl', 'gbp']),
      status: eventType.includes('succeeded') ? 'succeeded' : eventType.includes('failed') ? 'payment_failed' : 'created',
      customer: `cus_${faker.string.alphanumeric(24)}`,
      description: faker.commerce.productDescription(),
      metadata: {
        order_id: faker.string.uuid(),
        user_id: faker.string.uuid(),
      },
    }
  } else if (eventType.includes('charge')) {
    baseEvent.data.object = {
      id: objectId,
      object: 'charge',
      amount: faker.number.int({ min: 1000, max: 1000000 }),
      currency: faker.helpers.arrayElement(['usd', 'eur', 'brl', 'gbp']),
      status: eventType.includes('succeeded') ? 'succeeded' : eventType.includes('failed') ? 'failed' : 'pending',
      paid: eventType.includes('succeeded'),
      refunded: eventType.includes('refunded'),
      customer: `cus_${faker.string.alphanumeric(24)}`,
      description: faker.commerce.productDescription(),
      receipt_email: faker.internet.email(),
    }
  } else if (eventType.includes('invoice')) {
    baseEvent.data.object = {
      id: objectId,
      object: 'invoice',
      amount_due: faker.number.int({ min: 1000, max: 1000000 }),
      amount_paid: eventType.includes('paid') ? faker.number.int({ min: 1000, max: 1000000 }) : 0,
      currency: faker.helpers.arrayElement(['usd', 'eur', 'brl', 'gbp']),
      status: eventType.includes('paid') ? 'paid' : eventType.includes('failed') ? 'open' : 'draft',
      customer: `cus_${faker.string.alphanumeric(24)}`,
      subscription: `sub_${faker.string.alphanumeric(24)}`,
      invoice_pdf: `https://pay.stripe.com/invoice/${faker.string.alphanumeric(32)}/pdf`,
      hosted_invoice_url: `https://invoice.stripe.com/i/${faker.string.alphanumeric(32)}`,
    }
  } else if (eventType.includes('customer')) {
    baseEvent.data.object = {
      id: objectId,
      object: 'customer',
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      created: Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 31536000 }),
      metadata: {
        user_id: faker.string.uuid(),
        source: faker.helpers.arrayElement(['website', 'mobile', 'api']),
      },
    }
  } else if (eventType.includes('subscription')) {
    baseEvent.data.object = {
      id: objectId,
      object: 'subscription',
      status: eventType.includes('deleted') ? 'canceled' : faker.helpers.arrayElement(['active', 'past_due', 'trialing']),
      customer: `cus_${faker.string.alphanumeric(24)}`,
      current_period_start: Math.floor(Date.now() / 1000),
      current_period_end: Math.floor(Date.now() / 1000) + 2592000, // 30 dias
      items: {
        data: [{
          id: `si_${faker.string.alphanumeric(24)}`,
          price: {
            id: `price_${faker.string.alphanumeric(24)}`,
            amount: faker.number.int({ min: 1000, max: 50000 }),
            currency: faker.helpers.arrayElement(['usd', 'eur', 'brl', 'gbp']),
          },
        }],
      },
    }
  } else if (eventType.includes('checkout')) {
    baseEvent.data.object = {
      id: objectId,
      object: 'checkout.session',
      status: eventType.includes('completed') ? 'complete' : eventType.includes('succeeded') ? 'complete' : 'open',
      customer: `cus_${faker.string.alphanumeric(24)}`,
      customer_email: faker.internet.email(),
      amount_total: faker.number.int({ min: 1000, max: 1000000 }),
      currency: faker.helpers.arrayElement(['usd', 'eur', 'brl', 'gbp']),
      payment_status: eventType.includes('succeeded') ? 'paid' : eventType.includes('failed') ? 'unpaid' : 'pending',
      url: `https://checkout.stripe.com/c/pay/${faker.string.alphanumeric(32)}`,
    }
  } else {
    baseEvent.data.object = {
      id: objectId,
      object: 'object',
      created: Math.floor(Date.now() / 1000),
    }
  }

  return JSON.stringify(baseEvent, null, 2)
}

// Gerar query params opcionais
const generateQueryParams = (): Record<string, string> | undefined => {
  if (faker.datatype.boolean({ probability: 0.3 })) {
    return {
      source: faker.helpers.arrayElement(['stripe', 'api', 'dashboard']),
      version: faker.helpers.arrayElement(['2024-11-20.acacia', '2024-10-28.acacia']),
    }
  }
  return undefined
}

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    const webhookData = []

    // Gerar pelo menos 60 webhooks (gerando 65 para ter margem)
    for (let i = 0; i < 65; i++) {
      const eventType = faker.helpers.arrayElement(stripeEventTypes)
      const method = faker.helpers.arrayElement(httpMethods)
      const pathname = `/webhook/stripe`
      const ip = generateIp()
      const statusCode = faker.helpers.arrayElement(statusCodes)
      const contentType = 'application/json'
      const headers = generateStripeHeaders(eventType)
      const body = generateStripeBody(eventType)
      const contentLength = Buffer.byteLength(body, 'utf8')
      const queryParams = generateQueryParams()

      webhookData.push({
        method,
        pathname,
        ip,
        statusCode,
        contentType,
        contentLength,
        queryParams,
        headers,
        body,
      })
    }

    // Inserir todos os webhooks de uma vez
    await db.insert(webhooks).values(webhookData)

    console.log(`✅ Seed concluído! ${webhookData.length} webhooks inseridos com sucesso.`)
    console.log(`📊 Tipos de eventos incluídos: ${new Set(stripeEventTypes).size} tipos diferentes`)
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error)
    process.exit(1)
  }
}

seed()
  .then(() => {
    console.log('✨ Processo de seed finalizado!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro fatal no seed:', error)
    process.exit(1)
  })

