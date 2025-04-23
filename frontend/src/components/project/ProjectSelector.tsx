
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  targetDomain?: string;
  targetIP?: string;
  targetType?: string;
  scope?: string;
  technologies?: string[];
};

interface ProjectSelectorProps {
  onProjectChange?: (project: Project) => void;
}

export function ProjectSelector({ onProjectChange }: ProjectSelectorProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Site Web Corporate",
      description: "Audit de sécurité du site web principal",
      createdAt: new Date().toISOString(),
      targetDomain: "exemple.com",
      targetIP: "192.168.1.100",
      targetType: "web",
      scope: "Site web, API, Base de données",
      technologies: ["PHP", "MySQL", "Apache"]
    },
    {
      id: "2",
      name: "Application Mobile",
      description: "Tests de pénétration sur l'application mobile",
      createdAt: new Date().toISOString(),
      targetDomain: "api.exemple.com",
      targetIP: "192.168.1.101",
      targetType: "mobile-api",
      scope: "API REST, Authentification",
      technologies: ["Node.js", "MongoDB", "Express"]
    },
  ]);
  
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectTargetDomain, setNewProjectTargetDomain] = useState("");
  const [newProjectTargetIP, setNewProjectTargetIP] = useState("");
  const [newProjectTargetType, setNewProjectTargetType] = useState("web");
  const [newProjectScope, setNewProjectScope] = useState("");
  const [newProjectTechnologies, setNewProjectTechnologies] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    if (onProjectChange) {
      onProjectChange(project);
    }
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est requis",
        variant: "destructive",
      });
      return;
    }

    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: newProjectName,
      description: newProjectDescription || undefined,
      createdAt: new Date().toISOString(),
      targetDomain: newProjectTargetDomain || undefined,
      targetIP: newProjectTargetIP || undefined,
      targetType: newProjectTargetType || undefined,
      scope: newProjectScope || undefined,
      technologies: newProjectTechnologies ? newProjectTechnologies.split(',').map(tech => tech.trim()) : undefined,
    };

    setProjects([...projects, newProject]);
    setSelectedProject(newProject);
    if (onProjectChange) {
      onProjectChange(newProject);
    }
    
    // Reset form fields
    setNewProjectName("");
    setNewProjectDescription("");
    setNewProjectTargetDomain("");
    setNewProjectTargetIP("");
    setNewProjectTargetType("web");
    setNewProjectScope("");
    setNewProjectTechnologies("");
    setActiveTab("basic");
    setIsDialogOpen(false);
    
    toast({
      title: "Projet créé",
      description: `Le projet "${newProjectName}" a été créé avec succès.`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span className="max-w-[150px] truncate">{selectedProject?.name || "Sélectionner un projet"}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[300px]">
          <DropdownMenuLabel>Projets</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {projects.map((project) => (
            <DropdownMenuItem 
              key={project.id}
              onClick={() => handleSelectProject(project)}
              className="cursor-pointer"
            >
              <div className="flex flex-col w-full">
                <span className="font-medium">{project.name}</span>
                {project.description && (
                  <span className="text-xs text-muted-foreground truncate max-w-[270px]">
                    {project.description}
                  </span>
                )}
                {project.targetDomain && (
                  <span className="text-xs text-primary truncate max-w-[270px] mt-1">
                    Domain: {project.targetDomain}
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Créer un nouveau projet</DialogTitle>
            <DialogDescription>
              Ajoutez les informations de votre nouveau projet de sécurité.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informations de base</TabsTrigger>
              <TabsTrigger value="target">Cible</TabsTrigger>
              <TabsTrigger value="scope">Périmètre</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Nom du projet*</Label>
                <Input
                  id="project-name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Nom du projet"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Description du projet"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="target" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="target-domain">Nom de domaine</Label>
                <Input
                  id="target-domain"
                  value={newProjectTargetDomain}
                  onChange={(e) => setNewProjectTargetDomain(e.target.value)}
                  placeholder="exemple.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target-ip">Adresse IP</Label>
                <Input
                  id="target-ip"
                  value={newProjectTargetIP}
                  onChange={(e) => setNewProjectTargetIP(e.target.value)}
                  placeholder="192.168.1.100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target-type">Type de cible</Label>
                <Select 
                  value={newProjectTargetType} 
                  onValueChange={setNewProjectTargetType}
                >
                  <SelectTrigger id="target-type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Site Web</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="mobile-api">API Mobile</SelectItem>
                    <SelectItem value="network">Infrastructure Réseau</SelectItem>
                    <SelectItem value="cloud">Infrastructure Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="scope" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="scope">Périmètre</Label>
                <Textarea
                  id="scope"
                  value={newProjectScope}
                  onChange={(e) => setNewProjectScope(e.target.value)}
                  placeholder="Définissez le périmètre du test (ex: Site web, API, exclusions...)"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="technologies">Technologies</Label>
                <Input
                  id="technologies"
                  value={newProjectTechnologies}
                  onChange={(e) => setNewProjectTechnologies(e.target.value)}
                  placeholder="PHP, MySQL, Apache (séparés par des virgules)"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateProject}>
              Créer le projet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
