
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX, 
  Filter, 
  Download,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Données de démonstration
  const mockUsers = [
    {
      id: 1,
      name: "Thomas Martin",
      email: "thomas.martin@example.com",
      role: "Administrateur",
      status: "Actif",
      lastLogin: "2025-04-18 09:45",
    },
    {
      id: 2,
      name: "Sophie Dubois",
      email: "sophie.dubois@example.com",
      role: "Analyste",
      status: "Actif",
      lastLogin: "2025-04-17 14:22",
    },
    {
      id: 3,
      name: "Marc Bernard",
      email: "marc.bernard@example.com",
      role: "Technicien",
      status: "Inactif",
      lastLogin: "2025-04-10 11:30",
    },
    {
      id: 4,
      name: "Julie Lambert",
      email: "julie.lambert@example.com",
      role: "Analyste",
      status: "Actif",
      lastLogin: "2025-04-18 08:15",
    },
    {
      id: 5,
      name: "Éric Petit",
      email: "eric.petit@example.com",
      role: "Technicien",
      status: "Suspendu",
      lastLogin: "2025-04-05 16:40",
    },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setIsAddingUser(false);
    toast({
      title: "Utilisateur ajouté",
      description: "Le nouvel utilisateur a été ajouté avec succès.",
    });
  };

  const handleEditUser = (id: number) => {
    toast({
      title: "Modification d'utilisateur",
      description: `Modification de l'utilisateur ID: ${id}`,
    });
  };

  const handleDeleteUser = (id: number) => {
    toast({
      title: "Suppression d'utilisateur",
      description: `L'utilisateur ID: ${id} a été supprimé avec succès.`,
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <div className="container w-full mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Administration</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les utilisateurs et les permissions du système
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer un nouvel utilisateur
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Nom complet
                    </label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right">
                      Email
                    </label>
                    <Input id="email" className="col-span-3" type="email" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="role" className="text-right">
                      Rôle
                    </label>
                    <select id="role" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="admin">Administrateur</option>
                      <option value="analyst">Analyste</option>
                      <option value="technician">Technicien</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingUser(false)}>
                    Annuler
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddUser}>
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Rôles et permissions
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Journaux d'activité
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader className="pb-1">
                <div className="flex justify-between items-center">
                  <CardTitle>Liste des utilisateurs</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Gérez les comptes utilisateurs de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            user.role === "Administrateur" 
                              ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20" 
                              : user.role === "Analyste"
                                ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          }>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            user.status === "Actif" 
                              ? "default" 
                              : user.status === "Inactif"
                                ? "secondary"
                                : "destructive"
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditUser(user.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirmer la suppression</DialogTitle>
                                  <DialogDescription>
                                    Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Annuler</Button>
                                  <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                                    Supprimer
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="roles" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des rôles</CardTitle>
                <CardDescription>
                  Configurez les rôles et niveaux d'accès
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-orange-500" />
                        <h3 className="text-lg font-semibold">Administrateur</h3>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Accès complet à toutes les fonctionnalités</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                      <Badge className="inline-flex items-center">Gestion des utilisateurs</Badge>
                      <Badge className="inline-flex items-center">Configuration système</Badge>
                      <Badge className="inline-flex items-center">Rapports avancés</Badge>
                      <Badge className="inline-flex items-center">Gestion des vulnérabilités</Badge>
                      <Badge className="inline-flex items-center">Paramètres globaux</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-semibold">Analyste</h3>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Accès aux outils d'analyse et rapports</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                      <Badge className="inline-flex items-center">Analyse de vulnérabilités</Badge>
                      <Badge className="inline-flex items-center">Rapports standards</Badge>
                      <Badge className="inline-flex items-center">Outils de détection</Badge>
                      <Badge className="inline-flex items-center">Historique</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <UserX className="h-5 w-5 text-green-500" />
                        <h3 className="text-lg font-semibold">Technicien</h3>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Accès limité aux outils de remédiation</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                      <Badge className="inline-flex items-center">Outils de remédiation</Badge>
                      <Badge className="inline-flex items-center">Consultation historique</Badge>
                      <Badge className="inline-flex items-center">Rapports basiques</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Journaux d'activité</CardTitle>
                <CardDescription>
                  Historique des connexions et actions des utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date et heure</TableHead>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Détails</TableHead>
                      <TableHead>Adresse IP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2025-04-18 09:45:12</TableCell>
                      <TableCell>Thomas Martin</TableCell>
                      <TableCell>Connexion</TableCell>
                      <TableCell>Connexion réussie</TableCell>
                      <TableCell>192.168.1.45</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2025-04-18 09:47:23</TableCell>
                      <TableCell>Thomas Martin</TableCell>
                      <TableCell>Modification utilisateur</TableCell>
                      <TableCell>Modification des permissions de Julie Lambert</TableCell>
                      <TableCell>192.168.1.45</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2025-04-18 08:15:34</TableCell>
                      <TableCell>Julie Lambert</TableCell>
                      <TableCell>Connexion</TableCell>
                      <TableCell>Connexion réussie</TableCell>
                      <TableCell>192.168.1.17</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2025-04-17 17:32:09</TableCell>
                      <TableCell>Sophie Dubois</TableCell>
                      <TableCell>Déconnexion</TableCell>
                      <TableCell>Déconnexion manuelle</TableCell>
                      <TableCell>192.168.1.22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2025-04-17 16:54:15</TableCell>
                      <TableCell>System</TableCell>
                      <TableCell>Sauvegarde</TableCell>
                      <TableCell>Sauvegarde automatique de la base de données</TableCell>
                      <TableCell>192.168.1.1</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
