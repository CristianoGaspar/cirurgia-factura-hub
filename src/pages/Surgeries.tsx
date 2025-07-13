import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  Activity,
  DollarSign,
  Clock,
  User
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
import { Textarea } from "@/components/ui/textarea"

interface Surgery {
  id: string
  patientName: string
  patientId: string
  procedure: string
  surgeon: string
  date: string
  time: string
  complexity: "Baixa" | "Média" | "Alta"
  baseValue: number
  complexityMultiplier: number
  finalValue: number
  status: "Agendada" | "Em Andamento" | "Concluída" | "Cancelada"
  room: string
  duration: string
  notes?: string
}

const Surgeries = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const surgeries: Surgery[] = [
    {
      id: "CIR001",
      patientName: "João Silva",
      patientId: "PAC001",
      procedure: "Apendicectomia",
      surgeon: "Dr. Maria Santos",
      date: "2024-01-15",
      time: "08:00",
      complexity: "Baixa",
      baseValue: 3000,
      complexityMultiplier: 1.0,
      finalValue: 3000,
      status: "Concluída",
      room: "Centro Cirúrgico 1",
      duration: "60 min"
    },
    {
      id: "CIR002",
      patientName: "Ana Costa",
      patientId: "PAC002",
      procedure: "Colecistectomia Laparoscópica",
      surgeon: "Dr. Carlos Lima",
      date: "2024-01-16",
      time: "10:30",
      complexity: "Média",
      baseValue: 4000,
      complexityMultiplier: 1.3,
      finalValue: 5200,
      status: "Agendada",
      room: "Centro Cirúrgico 2",
      duration: "90 min"
    },
    {
      id: "CIR003",
      patientName: "Pedro Oliveira",
      patientId: "PAC003",
      procedure: "Hernioplastia Inguinal",
      surgeon: "Dr. Maria Santos",
      date: "2024-01-17",
      time: "14:00",
      complexity: "Baixa",
      baseValue: 3500,
      complexityMultiplier: 1.0,
      finalValue: 3500,
      status: "Agendada",
      room: "Centro Cirúrgico 1",
      duration: "75 min"
    },
    {
      id: "CIR004",
      patientName: "Maria Fernandes",
      patientId: "PAC004",
      procedure: "Angioplastia Coronária",
      surgeon: "Dr. Roberto Silva",
      date: "2024-01-18",
      time: "07:00",
      complexity: "Alta",
      baseValue: 8000,
      complexityMultiplier: 1.8,
      finalValue: 14400,
      status: "Em Andamento",
      room: "Centro Cirúrgico 3",
      duration: "180 min"
    }
  ]

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Baixa":
        return "bg-medical-green/10 text-medical-green"
      case "Média":
        return "bg-warning/10 text-warning"
      case "Alta":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendada":
        return "bg-info/10 text-info"
      case "Em Andamento":
        return "bg-warning/10 text-warning"
      case "Concluída":
        return "bg-medical-green/10 text-medical-green"
      case "Cancelada":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredSurgeries = surgeries.filter(surgery => {
    const matchesSearch = surgery.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surgery.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surgery.surgeon.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || surgery.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const totalValue = surgeries.reduce((sum, surgery) => sum + surgery.finalValue, 0)
  const completedSurgeries = surgeries.filter(s => s.status === "Concluída").length
  const scheduledSurgeries = surgeries.filter(s => s.status === "Agendada").length

  const getComplexityMultipliers = () => {
    return {
      "Baixa": 1.0,
      "Média": 1.3,
      "Alta": 1.8
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cirurgias</h1>
          <p className="text-muted-foreground">
            Gerencie cirurgias e seus valores baseados na complexidade
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4 mr-2" />
              Nova Cirurgia
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agendar Nova Cirurgia</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pac001">João Silva (PAC001)</SelectItem>
                      <SelectItem value="pac002">Ana Costa (PAC002)</SelectItem>
                      <SelectItem value="pac003">Pedro Oliveira (PAC003)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="procedure">Procedimento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o procedimento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apendicectomy">Apendicectomia</SelectItem>
                      <SelectItem value="cholecystectomy">Colecistectomia</SelectItem>
                      <SelectItem value="hernioplasty">Hernioplastia</SelectItem>
                      <SelectItem value="angioplasty">Angioplastia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surgeon">Cirurgião</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cirurgião" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-maria">Dr. Maria Santos</SelectItem>
                      <SelectItem value="dr-carlos">Dr. Carlos Lima</SelectItem>
                      <SelectItem value="dr-roberto">Dr. Roberto Silva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Sala</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a sala" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cc1">Centro Cirúrgico 1</SelectItem>
                      <SelectItem value="cc2">Centro Cirúrgico 2</SelectItem>
                      <SelectItem value="cc3">Centro Cirúrgico 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (min)</Label>
                  <Input id="duration" placeholder="60" type="number" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complexity">Complexidade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a complexidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa (1.0x)</SelectItem>
                      <SelectItem value="medium">Média (1.3x)</SelectItem>
                      <SelectItem value="high">Alta (1.8x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baseValue">Valor Base (R$)</Label>
                  <Input id="baseValue" placeholder="3000" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finalValue">Valor Final (R$)</Label>
                  <Input id="finalValue" placeholder="Calculado automaticamente" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Observações sobre a cirurgia..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                Agendar Cirurgia
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
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Cirurgias</p>
                <p className="text-2xl font-bold text-foreground">{surgeries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold text-foreground">{completedSurgeries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agendadas</p>
                <p className="text-2xl font-bold text-foreground">{scheduledSurgeries}</p>
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
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {totalValue.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complexity Info */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Multiplicadores de Complexidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(getComplexityMultipliers()).map(([complexity, multiplier]) => (
              <div key={complexity} className="flex items-center justify-between p-3 rounded-lg border border-border bg-gradient-card">
                <div className="flex items-center gap-2">
                  <Badge className={getComplexityColor(complexity)}>
                    {complexity}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{multiplier}x</p>
                  <p className="text-xs text-muted-foreground">Multiplicador</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cirurgias..."
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
                  <SelectItem value="Agendada">Agendadas</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluída">Concluídas</SelectItem>
                  <SelectItem value="Cancelada">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surgeries List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Lista de Cirurgias ({filteredSurgeries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredSurgeries.map((surgery) => (
              <div 
                key={surgery.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-gradient-card hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{surgery.procedure}</h3>
                      <Badge variant="outline" className="text-xs">
                        {surgery.id}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-foreground">{surgery.patientName}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{surgery.surgeon}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{surgery.date} às {surgery.time}</span>
                      <span>•</span>
                      <span>{surgery.room}</span>
                      <span>•</span>
                      <span>{surgery.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      R$ {surgery.finalValue.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Base: R$ {surgery.baseValue.toLocaleString('pt-BR')} × {surgery.complexityMultiplier}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Badge className={getComplexityColor(surgery.complexity)}>
                      {surgery.complexity}
                    </Badge>
                    <Badge className={getStatusColor(surgery.status)}>
                      {surgery.status}
                    </Badge>
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Surgeries