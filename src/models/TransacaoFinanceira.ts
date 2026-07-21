import { Schema, model, models, Model, Document } from 'mongoose'
import { genId, withIdTransform } from '@/lib/mongooseHelpers'

export type TipoTransacao = 'Receita' | 'Despesa'

export type CategoriaTransacao =
  | 'Venda Direta'
  | 'Venda por Canal'
  | 'Cortesia/Marketing'
  | 'Despesa Geral'

export interface ITransacaoFinanceira extends Document<string> {
  _id: string
  tipo: TipoTransacao
  categoria: CategoriaTransacao
  produto?: string
  quantidade?: number
  valor: number
  custoInsumoTotal?: number
  movimentacaoCanal?: string
  descricao: string
  data: Date
  createdAt: Date
  updatedAt: Date
}

const TransacaoFinanceiraSchema = new Schema<ITransacaoFinanceira>(
  {
    _id: { type: String, default: () => genId('tx') },
    tipo: { type: String, enum: ['Receita', 'Despesa'], required: true },
    categoria: {
      type: String,
      enum: ['Venda Direta', 'Venda por Canal', 'Cortesia/Marketing', 'Despesa Geral'],
      required: true,
    },
    produto: { type: String, ref: 'Product' },
    quantidade: { type: Number, min: [0, 'A quantidade não pode ser negativa'] },
    valor: { type: Number, required: true, min: [0, 'O valor não pode ser negativo'] },
    custoInsumoTotal: { type: Number, min: [0, 'O custo de insumo não pode ser negativo'] },
    movimentacaoCanal: { type: String, ref: 'MovimentacaoCanal' },
    descricao: { type: String, required: [true, 'A descrição do lançamento é obrigatória'], trim: true },
    data: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
)

TransacaoFinanceiraSchema.pre('validate', function (this: ITransacaoFinanceira, next) {
  if (this.categoria === 'Cortesia/Marketing') {
    this.tipo = 'Despesa'
    this.valor = this.custoInsumoTotal ?? 0
  }
  next()
})

withIdTransform(TransacaoFinanceiraSchema)

const TransacaoFinanceira: Model<ITransacaoFinanceira> =
  models.TransacaoFinanceira ||
  model<ITransacaoFinanceira>('TransacaoFinanceira', TransacaoFinanceiraSchema)

export default TransacaoFinanceira
