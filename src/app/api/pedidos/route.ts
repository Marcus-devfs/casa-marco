import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Pedido from '@/models/Pedido'
import Product from '@/models/Product'
import { getEstoqueCentral } from '@/lib/estoque'

interface ItemInput {
  produto: string
  quantidade: number
}

// POST /api/pedidos
// Cria um pedido feito pelo próprio cliente no site (canal adicional ao
// WhatsApp). Cai na mesma coleção que o admin usa, com status 'pendente' —
// a Gestora confirma e conduz o pedido normalmente por lá.
export async function POST(request: Request) {
  await dbConnect()

  try {
    const body = await request.json()
    const { cliente, telefone, observacoes, dataRetirada } = body
    const itensInput: ItemInput[] = body.itens

    if (!cliente?.trim() || !telefone?.trim()) {
      return NextResponse.json({ error: 'Nome e telefone são obrigatórios' }, { status: 400 })
    }

    if (!Array.isArray(itensInput) || itensInput.length === 0) {
      return NextResponse.json({ error: 'Selecione ao menos uma pizza' }, { status: 400 })
    }

    if (!dataRetirada) {
      return NextResponse.json({ error: 'Escolha a data de retirada/entrega' }, { status: 400 })
    }

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    if (new Date(`${dataRetirada}T00:00:00`) < hoje) {
      return NextResponse.json({ error: 'A data de retirada não pode ser no passado' }, { status: 400 })
    }

    const estoque = await getEstoqueCentral()
    const itens = []

    for (const item of itensInput) {
      if (item.quantidade <= 0) continue

      const produto = await Product.findById(item.produto)
      if (!produto || produto.status !== 'Ativo') {
        return NextResponse.json({ error: 'Um dos sabores selecionados não está disponível' }, { status: 400 })
      }

      const saldoDisponivel = Math.max(
        estoque.find((e) => e.produtoId === String(produto._id))?.saldoDisponivel ?? 0,
        0,
      )
      if (item.quantidade > saldoDisponivel) {
        return NextResponse.json(
          { error: `${produto.nome}: restam apenas ${saldoDisponivel} unidade(s) disponível(is)` },
          { status: 400 },
        )
      }

      itens.push({
        saborId: String(produto._id),
        saborNome: produto.nome,
        quantidade: item.quantidade,
        precoUnitario: produto.precoVenda,
      })
    }

    if (itens.length === 0) {
      return NextResponse.json({ error: 'Selecione ao menos uma pizza' }, { status: 400 })
    }

    // Total sempre recalculado no servidor a partir do preço cadastrado —
    // nunca confiar em um valor de total vindo do cliente.
    const total = itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0)

    const pedido = await Pedido.create({
      cliente,
      telefone,
      itens,
      total,
      observacoes,
      dataRetirada,
      status: 'pendente',
      origem: 'site',
      data: new Date().toISOString(),
    })

    return NextResponse.json(pedido, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao registrar pedido'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
