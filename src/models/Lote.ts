import { Schema, model, models, Model, Document } from 'mongoose'
import { genId, withIdTransform } from '@/lib/mongooseHelpers'

export type StatusLote = 'Em Maturação' | 'Pré-Assando' | 'Finalizado/Estoque'

export interface IAlocacaoProduto {
  produto: string
  quantidade: number
}

export interface ILote extends Document<string> {
  _id: string
  codigo: string
  quantidadeFarinhaKg: number
  dataInicio: Date
  dataFinalizacao?: Date
  status: StatusLote
  alocacoes: IAlocacaoProduto[]
  createdAt: Date
  updatedAt: Date
  rendimentoTeorico: number
  rendimentoRealTotal: number
}

const AlocacaoProdutoSchema = new Schema<IAlocacaoProduto>(
  {
    produto: { type: String, ref: 'Product', required: true },
    quantidade: { type: Number, required: true, min: [1, 'A quantidade alocada deve ser maior que zero'] },
  },
  { _id: false },
)

const LoteSchema = new Schema<ILote>(
  {
    _id: { type: String, default: () => genId('lote') },
    codigo: {
      type: String,
      required: [true, 'O código do lote é obrigatório (ex: Lote #01)'],
      unique: true,
      trim: true,
    },
    quantidadeFarinhaKg: {
      type: Number,
      required: [true, 'A quantidade de farinha utilizada é obrigatória'],
      min: [0, 'A quantidade de farinha não pode ser negativa'],
    },
    dataInicio: { type: Date, required: [true, 'A data de início (batida da massa) é obrigatória'] },
    dataFinalizacao: { type: Date },
    status: {
      type: String,
      enum: ['Em Maturação', 'Pré-Assando', 'Finalizado/Estoque'],
      default: 'Em Maturação',
    },
    alocacoes: { type: [AlocacaoProdutoSchema], default: [] },
  },
  { timestamps: true },
)

LoteSchema.virtual('rendimentoTeorico').get(function (this: ILote) {
  return Math.round(this.quantidadeFarinhaKg * 8)
})

LoteSchema.virtual('rendimentoRealTotal').get(function (this: ILote) {
  return this.alocacoes.reduce((total, item) => total + item.quantidade, 0)
})

withIdTransform(LoteSchema)

const Lote: Model<ILote> = models.Lote || model<ILote>('Lote', LoteSchema)

export default Lote
