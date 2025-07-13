import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Eye,
  CreditCard,
  DollarSign,
  FileText,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Invoice {
  id: string
  patientName: string
  patientId: string
  surgeryId: string
  procedure: string
  surgeon: string
  surgeryDate: string
  issueDate: string
  dueDate: string
  amount: number
  status: "Pendente" | "Pago" | "Vencida" | "Cancelada"
  paymentMethod?: string
  paymentDate?: string
  notes?: string
}

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const invoices: Invoice[] = [
    {
      id: "FAT001",
      patientName: "João Silva",
      patientId: "PAC001",
      surgeryId: "CIR001",
      procedure: "Apendicectomia",
      surgeon: "Dr. Maria Santos",
      surgeryDate: "2024-01-15",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      amount: 3000,
      status: "Pago",
      paymentMethod: "Cartão de Crédito",
      paymentDate: "2024-01-20"
    },
    {
      id: "FAT002",
      patientName: "Ana Costa",
      patientId: "PAC002",
      surgeryId: "CIR002",
      procedure: "Colecistectomia Laparoscópica",
      surgeon: "Dr. Carlos Lima",
      surgeryDate: "2024-01-16",
      issueDate: "2024-01-16",
      dueDate: "2024-02-16",
      amount: 5200,
      status: "Pendente"
    },
    {
      id: "FAT003",
      patientName: "Pedro Oliveira",
      patientId: "PAC003",
      surgeryId: "CIR003",
      procedure: "Hernioplastia Inguinal",
      surgeon: "Dr. Maria Santos",
      surgeryDate: "2024-01-17",
      issueDate: "2024-01-17",
      dueDate: "2024-02-17",
      amount: 3500,
      status: "Pendente"
    },
    {
      id: "FAT004",
      patientName: "Maria Fernandes",
      patientId: "PAC004",
      surgeryId: "CIR004",
      procedure: "Angioplastia Coronária",
      surgeon: "Dr. Roberto Silva",
      surgeryDate: "2024-01-18",
      issueDate: "2024-01-18",
      dueDate: "2024-01-15",
      amount: 14400,
      status: "Vencida"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-warning/10 text-warning"
      case "Pago":
        return "bg-medical-green/10 text-medical-green"
      case "Vencida":
        return "bg-destructive/10 text-destructive"
      case "Cancelada":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendente":
        return <Clock className="h-4 w-4" />
      case "Pago":
        return <CheckCircle className="h-4 w-4" />
      case "Vencida":
        return <XCircle className="h-4 w-4" />
      case "Cancelada":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = invoices.filter(i => i.status === "Pago").reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = invoices.filter(i => i.status === "Pendente").reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueCount = invoices.filter(i => i.status === "Vencida").length

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faturas</h1>
          <p className="text-muted-foreground">
            Gerencie faturas e controle de pagamentos
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4 mr-2" />
              Nova Fatura
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Gerar Nova Fatura</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surgery">Cirurgia</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cirurgia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cir001">CIR001 - João Silva - Apendicectomia</SelectItem>
                      <SelectItem value="cir002">CIR002 - Ana Costa - Colecistectomia</SelectItem>
                      <SelectItem value="cir003">CIR003 - Pedro Oliveira - Hernioplastia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <Input id="amount" placeholder="0,00" type="number" step="0.01" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Data de Emissão</Label>
                  <Input id="issueDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Data de Vencimento</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Input id="notes" placeholder="Observações sobre a fatura..." />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                Gerar Fatura
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Faturas</p>
                <p className="text-2xl font-bold text-foreground">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Recebido</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {paidAmount.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Pendente</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {pendingAmount.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/20 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Faturas Vencidas</p>
                <p className="text-2xl font-bold text-foreground">{overdueCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar faturas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Pendente">Pendentes</SelectItem>
                  <SelectItem value="Pago">Pagas</SelectItem>
                  <SelectItem value="Vencida">Vencidas</SelectItem>
                  <SelectItem value="Cancelada">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Lista de Faturas ({filteredInvoices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredInvoices.map((invoice) => (
              <div 
                key={invoice.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-gradient-card hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{invoice.id}</h3>
                      <Badge variant="outline" className="text-xs">
                        {invoice.surgeryId}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-foreground">{invoice.patientName}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{invoice.procedure}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Emitida: {new Date(invoice.issueDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <span>•</span>
                      <span>Vence: {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}</span>
                      {invoice.paymentDate && (
                        <>
                          <span>•</span>
                          <span>Pago: {new Date(invoice.paymentDate).toLocaleDateString('pt-BR')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      R$ {invoice.amount.toLocaleString('pt-BR')}
                    </p>
                    {invoice.paymentMethod && (
                      <p className="text-xs text-muted-foreground">
                        {invoice.paymentMethod}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {getStatusIcon(invoice.status)}
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleViewInvoice(invoice)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Detail Modal */}
      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Fatura {selectedInvoice?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
                <div>
                  <h3 className="text-lg font-semibold">{selectedInvoice.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Emitida em {new Date(selectedInvoice.issueDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedInvoice.status)}
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
              </div>

              {/* Patient Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Informações do Paciente</h4>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nome:</span>
                    <span className="font-medium">{selectedInvoice.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID do Paciente:</span>
                    <span className="font-medium">{selectedInvoice.patientId}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Surgery Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Informações da Cirurgia</h4>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Procedimento:</span>
                    <span className="font-medium">{selectedInvoice.procedure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cirurgião:</span>
                    <span className="font-medium">{selectedInvoice.surgeon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data da Cirurgia:</span>
                    <span className="font-medium">
                      {new Date(selectedInvoice.surgeryDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Informações de Pagamento</h4>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-bold text-lg">
                      R$ {selectedInvoice.amount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data de Vencimento:</span>
                    <span className="font-medium">
                      {new Date(selectedInvoice.dueDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {selectedInvoice.paymentDate && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data do Pagamento:</span>
                        <span className="font-medium">
                          {new Date(selectedInvoice.paymentDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Método de Pagamento:</span>
                        <span className="font-medium">{selectedInvoice.paymentMethod}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {selectedInvoice.status === "Pendente" && (
                  <Button className="bg-gradient-success hover:opacity-90">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar como Pago
                  </Button>
                )}
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Invoices