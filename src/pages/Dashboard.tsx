import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, DollarSign, Calendar, Users, TrendingUp, Activity } from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Receita Mensal",
      value: "R$ 127.450",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-medical-green"
    },
    {
      title: "Cirurgias Realizadas",
      value: "48",
      change: "+8.2%",
      icon: Activity,
      color: "text-primary"
    },
    {
      title: "Pacientes Ativos",
      value: "156",
      change: "+5.1%",
      icon: Users,
      color: "text-info"
    },
    {
      title: "Faturas Pendentes",
      value: "23",
      change: "-3.2%",
      icon: Calendar,
      color: "text-warning"
    }
  ]

  const recentSurgeries = [
    {
      id: "CIR001",
      patient: "João Silva",
      procedure: "Apendicectomia",
      surgeon: "Dr. Maria Santos",
      date: "2024-01-15",
      value: "R$ 3.500",
      status: "Concluída"
    },
    {
      id: "CIR002",
      patient: "Ana Costa",
      procedure: "Colecistectomia",
      surgeon: "Dr. Carlos Lima",
      date: "2024-01-14",
      value: "R$ 5.200",
      status: "Concluída"
    },
    {
      id: "CIR003",
      patient: "Pedro Oliveira",
      procedure: "Hernioplastia",
      surgeon: "Dr. Maria Santos",
      date: "2024-01-13",
      value: "R$ 4.100",
      status: "Faturada"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída":
        return "bg-medical-green/10 text-medical-green"
      case "Faturada":
        return "bg-primary/10 text-primary"
      case "Pendente":
        return "bg-warning/10 text-warning"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de faturamento hospitalar
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Última atualização: {new Date().toLocaleDateString("pt-BR")}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden shadow-card hover:shadow-hover transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                stat.change.startsWith('+') ? 'text-medical-green' : 'text-destructive'
              }`}>
                <TrendingUp className="h-3 w-3" />
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Receita dos Últimos 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2 px-4">
              {[85, 92, 78, 96, 88, 100].map((height, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-8 bg-gradient-primary rounded-t transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(2023, 7 + index).toLocaleDateString("pt-BR", { month: "short" })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Surgeries */}
        <Card className="shadow-card hover:shadow-hover transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Cirurgias Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSurgeries.map((surgery) => (
                <div key={surgery.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-gradient-card hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{surgery.patient}</p>
                    <p className="text-sm text-muted-foreground">{surgery.procedure}</p>
                    <p className="text-xs text-muted-foreground">{surgery.surgeon}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium text-foreground">{surgery.value}</p>
                    <p className="text-xs text-muted-foreground">{surgery.date}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(surgery.status)}`}>
                      {surgery.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card hover:shadow-hover transition-all duration-200">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-gradient-card hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-foreground">Nova Cirurgia</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-gradient-card hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-foreground">Gerar Fatura</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-gradient-card hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-foreground">Novo Paciente</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-gradient-card hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-foreground">Relatórios</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard