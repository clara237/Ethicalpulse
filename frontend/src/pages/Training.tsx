
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  GraduationCap, 
  Clock, 
  Award, 
  FileText, 
  CheckCircle,
  Users,
  Calendar,
  User,
  Shield,
  Search,
  Bug,
  Globe,
  AlertTriangle,
  Lock
} from "lucide-react";
import { useState } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  duration: string;
  modules: number;
  completedModules?: number;
  progress?: number;
  instructor: string;
  image: string;
  icon: React.ElementType;
  popular?: boolean;
  upcomingDate?: string;
}

export default function Training() {
  const [activeTab, setActiveTab] = useState("courses");

  const courses: Course[] = [
    {
      id: 1,
      title: "Introduction à la Cybersécurité",
      description: "Apprenez les bases de la cybersécurité et les meilleures pratiques pour protéger vos systèmes.",
      category: "Fondamentaux",
      level: "Débutant",
      duration: "4 heures",
      modules: 5,
      completedModules: 5,
      progress: 100,
      instructor: "Thomas Martin",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      icon: Shield,
      popular: true
    },
    {
      id: 2,
      title: "Analyse des Vulnérabilités",
      description: "Techniques avancées pour identifier et analyser les vulnérabilités dans vos systèmes.",
      category: "Analyse",
      level: "Intermédiaire",
      duration: "6 heures",
      modules: 8,
      completedModules: 4,
      progress: 50,
      instructor: "Sophie Dubois",
      image: "https://images.unsplash.com/photo-1573164713712-03790a178651?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      icon: Search
    },
    {
      id: 3,
      title: "Tests d'Intrusion Avancés",
      description: "Maîtrisez les techniques de test d'intrusion éthique pour renforcer la sécurité de vos systèmes.",
      category: "Pentest",
      level: "Avancé",
      duration: "10 heures",
      modules: 12,
      completedModules: 0,
      progress: 0,
      instructor: "Marc Bernard",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      icon: Bug
    },
    {
      id: 4,
      title: "Sécurité des Applications Web",
      description: "Protégez vos applications web contre les vulnérabilités OWASP Top 10.",
      category: "Développement",
      level: "Intermédiaire",
      duration: "8 heures",
      modules: 10,
      completedModules: 2,
      progress: 20,
      instructor: "Julie Lambert",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      icon: Globe,
      popular: true
    },
    {
      id: 5,
      title: "Réponse aux Incidents",
      description: "Développez un plan de réponse aux incidents de sécurité efficace.",
      category: "Gestion",
      level: "Intermédiaire",
      duration: "5 heures",
      modules: 6,
      instructor: "Éric Petit",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      icon: AlertTriangle,
      upcomingDate: "25 avril 2025"
    },
    {
      id: 6,
      title: "Cryptographie Appliquée",
      description: "Comprendre et implémenter des solutions de cryptographie pour protéger vos données.",
      category: "Technique",
      level: "Avancé",
      duration: "7 heures",
      modules: 9,
      instructor: "Marie Leclerc",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      icon: Lock,
      upcomingDate: "2 mai 2025"
    }
  ];

  const upcomingCourses = courses.filter(course => course.upcomingDate);
  const myCourses = courses.filter(course => course.progress !== undefined);

  return (
    <Layout>
      <div className="container w-full mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Formation</h1>
            <p className="text-muted-foreground mt-1">
              Développez vos compétences en cybersécurité
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 flex gap-2 items-center p-2">
              <Award className="h-4 w-4" />
              <span>4 certifications disponibles</span>
            </Badge>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <FileText className="mr-2 h-4 w-4" />
              Catalogue complet
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="myCourses" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Mes formations
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Catalogue
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              À venir
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="myCourses">
            {myCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((course) => (
                  <Card key={course.id} className="flex flex-col">
                    <CardHeader className="pb-2 relative">
                      {course.progress === 100 && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Terminé
                          </Badge>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <course.icon className="h-5 w-5 text-orange-500" />
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                      </div>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <Badge variant="outline">
                            {course.level}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span className="font-medium">{course.completedModules}/{course.modules} modules</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={course.progress === 100 ? "outline" : "default"}>
                        {course.progress === 100 ? (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Voir le certificat
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Continuer
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="flex flex-col items-center justify-center p-6 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune formation en cours</h3>
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore commencé de formation. Explorez notre catalogue pour vous former.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setActiveTab("courses")}>
                  Découvrir les formations
                </Button>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(c => !c.upcomingDate).map((course) => (
                <Card key={course.id} className="relative">
                  {course.popular && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-500">Populaire</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <course.icon className="h-5 w-5 text-orange-500" />
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Niveau</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Durée</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Catégorie</span>
                        <span className="font-medium">{course.category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Modules</span>
                        <span className="font-medium">{course.modules}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Instructeur: {course.instructor}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <Play className="mr-2 h-4 w-4" />
                      Démarrer la formation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            {upcomingCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingCourses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <course.icon className="h-5 w-5 text-orange-500" />
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                      </div>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Niveau</span>
                          <span className="font-medium">{course.level}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Durée</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Catégorie</span>
                          <span className="font-medium">{course.category}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Date</span>
                          <span className="font-medium text-orange-500">{course.upcomingDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Instructeur: {course.instructor}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        S'inscrire
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="flex flex-col items-center justify-center p-6 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune formation à venir</h3>
                <p className="text-muted-foreground mb-4">
                  Il n'y a pas de formations prévues prochainement. Consultez notre catalogue pour vous former dès maintenant.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setActiveTab("courses")}>
                  Voir le catalogue
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Certifications disponibles</CardTitle>
            <CardDescription>
              Validez vos compétences avec nos certifications reconnues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start bg-card border rounded-lg p-4">
                <div className="bg-orange-500/10 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Analyste en Cybersécurité</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Maîtrisez les compétences essentielles pour identifier et analyser les menaces de sécurité.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Niveau intermédiaire</Badge>
                    <Badge variant="outline">5 modules</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start bg-card border rounded-lg p-4">
                <div className="bg-orange-500/10 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Expert en Réponse aux Incidents</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Développez une expertise dans la gestion et la réponse aux incidents de sécurité.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Niveau avancé</Badge>
                    <Badge variant="outline">7 modules</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start bg-card border rounded-lg p-4">
                <div className="bg-orange-500/10 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Sécurité des Applications Web</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Apprenez à sécuriser les applications web contre les vulnérabilités modernes.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Niveau intermédiaire</Badge>
                    <Badge variant="outline">6 modules</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start bg-card border rounded-lg p-4">
                <div className="bg-orange-500/10 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Testeur d'Intrusion Certifié</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Devenez un expert en tests d'intrusion éthiques et en évaluation de la sécurité.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Niveau avancé</Badge>
                    <Badge variant="outline">8 modules</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
