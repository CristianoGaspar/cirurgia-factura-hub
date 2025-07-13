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
  Users,
  Phone,
  Mail,
  Calendar,
  MapPin,
  User,
  Heart,
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

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  gender: string
  address: string
  city: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string
  insuranceProvider?: string
  insuranceNumber?: string
  medicalHistory: string[]
  status: "Ativo" | "Inativo"
  registrationDate: string
  totalSurgeries: number
  totalInvoices: number
  totalAmount: number
}

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const patients: Patient[] = [
    {
      id: "PAC001",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      birthDate: "1985-03-15",
      gender: "Masculino",
      address: "Rua das Flores, 123",
      city: "São Paulo - SP",
      zipCode: "01234-567",
      emergencyContact: "Maria Silva",
      emergencyPhone: "(11) 88888-8888",
      insuranceProvider: "Unimed",
      insuranceNumber: "123456789",
      medicalHistory: ["Hipertensão", "Diabetes Tipo 2"],
      status: "Ativo",
      registrationDate: "2023-01-15",
      totalSurgeries: 2,
      totalInvoices: 2,
      totalAmount: 6500
    },
    {
      id: "PAC002",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 77777-7777",
      birthDate: "1992-07-22",
      gender: "Feminino",
      address: "Av. Paulista, 456",
      city: "São Paulo - SP",
      zipCode: "01310-000",
      emergencyContact: "Carlos Costa",
      emergencyPhone: "(11) 66666-6666",
      insuranceProvider: "Bradesco Saúde",
      insuranceNumber: "987654321",
      medicalHistory: ["Asma"],
      status: "Ativo",
      registrationDate: "2023-02-10",
      totalSurgeries: 1,
      totalInvoices: 1,
      totalAmount: 5200
    },
    {
      id: "PAC003",
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(11) 55555-5555",
      birthDate: "1978-11-08",
      gender: "Masculino",
      address: "Rua Augusta, 789",
      city: "São Paulo - SP",
      zipCode: "01305-001",
      emergencyContact: "Laura Oliveira",
      emergencyPhone: "(11) 44444-4444",
      medicalHistory: ["Colesterol Alto"],
      status: "Ativo",
      registrationDate: "2023-03-05",
      totalSurgeries: 1,
      totalInvoices: 1,
      totalAmount: 3500
    },
    {
      id: "PAC004",
      name: "Maria Fernandes",
      email: "maria.fernandes@email.com",
      phone: "(11) 33333-3333",
      birthDate: "1965-05-30",
      gender: "Feminino",
      address: "Rua Oscar Freire, 321",
      city: "São Paulo - SP",
      zipCode: "01426-001",
      emergencyContact: "José Fernandes",
      emergencyPhone: "(11) 22222-2222",
      insuranceProvider: "SulAmérica",
      insuranceNumber: "456789123",
      medicalHistory: ["Arritmia Cardíaca", "Hipertensão"],
      status: "Ativo",
      registrationDate: "2023-01-20",
      totalSurgeries: 1,
      totalInvoices: 1,
      totalAmount: 14400
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-medical-green/10 text-medical-green"
      case "Inativo":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const totalPatients = patients.length
  const activePatients = patients.filter(p => p.status === "Ativo").length
  const totalRevenue = patients.reduce((sum, patient) => sum + patient.totalAmount, 0)
  const avgAge = patients.reduce((sum, patient) => sum + calculateAge(patient.birthDate), 0) / patients.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground">
            Gerencie informações dos pacientes do hospital
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Nome do paciente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" placeholder="email@exemplo.com" type="email" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input id="birthDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Rua, número, complemento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input id="zipCode" placeholder="00000-000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Cidade - Estado" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                  <Input id="emergencyContact" placeholder="Nome do contato" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Telefone de Emergência</Label>
                  <Input id="emergencyPhone" placeholder="(11) 99999-9999" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Convênio</Label>
                  <Input id="insuranceProvider" placeholder="Nome do convênio" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceNumber">Número da Carteirinha</Label>
                  <Input id="insuranceNumber" placeholder="000000000" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                Cadastrar Paciente
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
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Pacientes</p>
                <p className="text-2xl font-bold text-foreground">{totalPatients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pacientes Ativos</p>
                <p className="text-2xl font-bold text-foreground">{activePatients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Idade Média</p>
                <p className="text-2xl font-bold text-foreground">{Math.round(avgAge)} anos</p>
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
                <p className="text-sm text-muted-foreground">Receita Total</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {totalRevenue.toLocaleString('pt-BR')}
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
                  placeholder="Buscar pacientes..."
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
                  <SelectItem value="Ativo">Ativos</SelectItem>
                  <SelectItem value="Inativo">Inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Lista de Pacientes ({filteredPatients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-gradient-card hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{patient.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {patient.id}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{patient.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{calculateAge(patient.birthDate)} anos</span>
                      </div>
                      <span>•</span>
                      <span>{patient.gender}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{patient.city}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Cirurgias:</span>
                      <span className="font-medium">{patient.totalSurgeries}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Receita:</span>
                      <span className="font-medium">R$ {patient.totalAmount.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                    {patient.insuranceProvider && (
                      <Badge variant="outline" className="text-xs">
                        {patient.insuranceProvider}
                      </Badge>
                    )}
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

export default Patients