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
  Stethoscope,
  Activity
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

const Procedures = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const procedures = [
    {
      id: "PROC001",
      name: "Apendicectomia",
      type: "Cirurgia",
      category: "Cirurgia Geral",
      code: "40.19",
      description: "Remoção cirúrgica do apêndice vermiforme",
      complexity: "Baixa",
      estimatedTime: "60 min",
      status: "Ativo"
    },
    {
      id: "PROC002",
      name: "Colecistectomia Laparoscópica",
      type: "Cirurgia",
      category: "Cirurgia Geral",
      code: "51.23",
      description: "Remoção da vesícula biliar por via laparoscópica",
      complexity: "Média",
      estimatedTime: "90 min",
      status: "Ativo"
    },
    {
      id: "PROC003",
      name: "Hernioplastia Inguinal",
      type: "Cirurgia",
      category: "Cirurgia Geral",
      code: "53.05",
      description: "Correção cirúrgica de hérnia inguinal",
      complexity: "Baixa",
      estimatedTime: "75 min",
      status: "Ativo"
    },
    {
      id: "PROC004",
      name: "Consulta Cardiológica",
      type: "Consulta",
      category: "Cardiologia",
      code: "03.01.01",
      description: "Consulta médica em cardiologia",
      complexity: "Baixa",
      estimatedTime: "30 min",
      status: "Ativo"
    },
    {
      id: "PROC005",
      name: "Angioplastia Coronária",
      type: "Cirurgia",
      category: "Cardiologia",
      code: "36.01",
      description: "Procedimento de desobstrução de artérias coronárias",
      complexity: "Alta",
      estimatedTime: "180 min",
      status: "Ativo"
    },
    {
      id: "PROC006",
      name: "Ultrassom Abdominal",
      type: "Exame",
      category: "Diagnóstico",
      code: "88.76",
      description: "Exame de ultrassonografia do abdome",
      complexity: "Baixa",
      estimatedTime: "20 min",
      status: "Ativo"
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Cirurgia":
        return <Activity className="h-4 w-4" />
      case "Consulta":
        return <Stethoscope className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "surgery" && procedure.type === "Cirurgia") ||
                         (filterType === "consultation" && procedure.type === "Consulta") ||
                         (filterType === "exam" && procedure.type === "Exame")
    
    return matchesSearch && matchesFilter
  })

  const surgeryCount = procedures.filter(p => p.type === "Cirurgia").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Procedimentos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os procedimentos médicos e cirúrgicos
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4 mr-2" />
              Novo Procedimento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Procedimento</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Procedimento</Label>
                  <Input id="name" placeholder="Nome do procedimento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Código do procedimento" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surgery">Cirurgia</SelectItem>
                      <SelectItem value="consultation">Consulta</SelectItem>
                      <SelectItem value="exam">Exame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Cirurgia Geral</SelectItem>
                      <SelectItem value="cardiology">Cardiologia</SelectItem>
                      <SelectItem value="orthopedics">Ortopedia</SelectItem>
                      <SelectItem value="neurology">Neurologia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complexity">Complexidade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a complexidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Tempo Estimado (min)</Label>
                  <Input id="time" placeholder="60" type="number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descrição detalhada do procedimento"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                Salvar Procedimento
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
                <p className="text-sm text-muted-foreground">Total de Procedimentos</p>
                <p className="text-2xl font-bold text-foreground">{procedures.length}</p>
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
                <p className="text-sm text-muted-foreground">Cirurgias</p>
                <p className="text-2xl font-bold text-foreground">{surgeryCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Consultas</p>
                <p className="text-2xl font-bold text-foreground">
                  {procedures.filter(p => p.type === "Consulta").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Exames</p>
                <p className="text-2xl font-bold text-foreground">
                  {procedures.filter(p => p.type === "Exame").length}
                </p>
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
                  placeholder="Buscar procedimentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="surgery">Apenas Cirurgias</SelectItem>
                  <SelectItem value="consultation">Apenas Consultas</SelectItem>
                  <SelectItem value="exam">Apenas Exames</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Procedures List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Lista de Procedimentos ({filteredProcedures.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredProcedures.map((procedure) => (
              <div 
                key={procedure.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-gradient-card hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    {getTypeIcon(procedure.type)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{procedure.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {procedure.code}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{procedure.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{procedure.category}</span>
                      <span>•</span>
                      <span>{procedure.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={getComplexityColor(procedure.complexity)}>
                    {procedure.complexity}
                  </Badge>
                  
                  <Badge 
                    variant={procedure.type === "Cirurgia" ? "default" : "secondary"}
                    className={procedure.type === "Cirurgia" ? "bg-gradient-primary text-white" : ""}
                  >
                    {procedure.type}
                  </Badge>

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

export default Procedures