import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import { getEstoqueCentral } from '@/lib/estoque'

export const dynamic = 'force-dynamic'

// GET /api/cardapio
// Retorna os sabores ativos com preço e saldo disponível em tempo real,
// para o cardápio do site refletir o mesmo Estoque Central do admin.
export async function GET() {
  await dbConnect()

  const [produtos, estoque] = await Promise.all([
    Product.find({ status: 'Ativo' }).sort({ nome: 1 }),
    getEstoqueCentral(),
  ])

  const cardapio = produtos.map((produto) => {
    const saldo = estoque.find((e) => e.produtoId === String(produto._id))
    return {
      id: String(produto._id),
      nome: produto.nome,
      descricaoGourmet: produto.descricaoGourmet,
      precoVenda: produto.precoVenda,
      saldoDisponivel: Math.max(saldo?.saldoDisponivel ?? 0, 0),
    }
  })

  return NextResponse.json(cardapio)
}
