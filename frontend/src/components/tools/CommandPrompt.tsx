
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Play, Code, X } from "lucide-react";

interface CommandPromptProps {
  tool: string;
  onCommandExecuted: (command: string, output: string) => void;
  targetDomain?: string;
  targetIP?: string;
}

export function CommandPrompt({ 
  tool, 
  onCommandExecuted,
  targetDomain,
  targetIP 
}: CommandPromptProps) {
  const [inputCommand, setInputCommand] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commandMode, setCommandMode] = useState<"terminal" | "simple">("terminal");
  const [selectedOption, setSelectedOption] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  
  // Auto-focus output area and scroll to bottom when content changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputText]);

  // Set tool-specific options
  useEffect(() => {
    // Set default command based on tool
    let defaultCommand = "";
    let defaultOption = "";
    
    switch (tool) {
      case "nmap":
        defaultCommand = targetIP 
          ? `nmap -sV ${targetIP}` 
          : targetDomain 
            ? `nmap -sV ${targetDomain}` 
            : "nmap -sV example.com";
        defaultOption = "version-detection";
        break;
      case "sqlmap":
        defaultCommand = targetDomain 
          ? `sqlmap -u "http://${targetDomain}/page.php?id=1" --dbs` 
          : "sqlmap -u \"http://example.com/page.php?id=1\" --dbs";
        defaultOption = "database-detection";
        break;
      case "owaspzap":
        defaultCommand = targetDomain 
          ? `python zap.py -t http://${targetDomain} -m scan` 
          : "python zap.py -t http://example.com -m scan";
        defaultOption = "full-scan";
        break;
      default:
        defaultCommand = `${tool} --help`;
        defaultOption = "";
    }
    
    setInputCommand(defaultCommand);
    setSelectedOption(defaultOption);
  }, [tool, targetDomain, targetIP]);

  const handleCommandExecution = async () => {
    if (!inputCommand.trim()) return;
    
    setIsLoading(true);
    setOutputText("");

    // Clear previous output
    setOutputText("");

    // Simulate command execution
    await typingEffect(`Exécution de: ${inputCommand}\n\n`);
    
    // Generate fake output based on the command
    let output = "";
    
    if (inputCommand.includes("nmap")) {
      await typingEffect("Starting Nmap 7.94 ( https://nmap.org )\n");
      await typingEffect("Scanning targets...\n");
      await typingEffect("Scanning 1 host [1000 ports]\n");
      await typingEffect("Discovered open port 80/tcp on 192.168.1.1\n");
      await typingEffect("Discovered open port 443/tcp on 192.168.1.1\n");
      await typingEffect("Discovered open port 22/tcp on 192.168.1.1\n");
      output = "Port scanning completed. Found 3 open ports.";
    } else if (inputCommand.includes("sqlmap")) {
      await typingEffect("Initializing sqlmap engine...\n");
      await typingEffect("Testing connection to the target URL\n");
      await typingEffect("Checking if the target is protected by WAF/IPS\n");
      await typingEffect("Testing for SQL injection vulnerabilities\n");
      await typingEffect("Found SQL injection vulnerability in parameter 'id'\n");
      await typingEffect("Extracting database information\n");
      output = "Database extraction complete. Found 3 databases.";
    } else if (inputCommand.includes("owasp") || inputCommand.includes("zap")) {
      await typingEffect("Initializing OWASP ZAP...\n");
      await typingEffect("Exploring the application...\n");
      await typingEffect("Spider completed, found 24 unique URLs\n");
      await typingEffect("Scanning for vulnerabilities...\n");
      await typingEffect("Found Cross-Site Scripting (XSS) vulnerability\n");
      await typingEffect("Found SQL Injection vulnerability\n");
      output = "Scan completed. Found 5 high, 8 medium, 3 low vulnerabilities.";
    } else {
      await typingEffect("Exécution de la commande...\n");
      await typingEffect("Traitement en cours...\n");
      output = "Commande exécutée avec succès.";
    }
    
    await typingEffect("\n" + output + "\n");
    
    // Signal that command has been executed
    onCommandExecuted(inputCommand, output);
    setIsLoading(false);
  };
  
  // Function to simulate typing effect
  const typingEffect = async (text: string, speed = 10) => {
    for (let i = 0; i < text.length; i++) {
      setOutputText(prev => prev + text.charAt(i));
      await new Promise(resolve => setTimeout(resolve, Math.random() * speed));
    }
  };

  const getCommandFromOption = (option: string): string => {
    switch (tool) {
      case "nmap":
        switch (option) {
          case "quick-scan":
            return targetIP 
              ? `nmap -F ${targetIP}` 
              : targetDomain ? `nmap -F ${targetDomain}` : "nmap -F example.com";
          case "version-detection":
            return targetIP 
              ? `nmap -sV ${targetIP}` 
              : targetDomain ? `nmap -sV ${targetDomain}` : "nmap -sV example.com";
          case "os-detection":
            return targetIP 
              ? `nmap -O ${targetIP}` 
              : targetDomain ? `nmap -O ${targetDomain}` : "nmap -O example.com";
          case "comprehensive":
            return targetIP 
              ? `nmap -sS -sV -A -T4 ${targetIP}` 
              : targetDomain ? `nmap -sS -sV -A -T4 ${targetDomain}` : "nmap -sS -sV -A -T4 example.com";
          default:
            return targetIP 
              ? `nmap -sV ${targetIP}` 
              : targetDomain ? `nmap -sV ${targetDomain}` : "nmap -sV example.com";
        }
      case "sqlmap":
        switch (option) {
          case "database-detection":
            return targetDomain 
              ? `sqlmap -u "http://${targetDomain}/page.php?id=1" --dbs` 
              : "sqlmap -u \"http://example.com/page.php?id=1\" --dbs";
          case "tables-detection":
            return targetDomain 
              ? `sqlmap -u "http://${targetDomain}/page.php?id=1" -D <database> --tables` 
              : "sqlmap -u \"http://example.com/page.php?id=1\" -D <database> --tables";
          case "dump-data":
            return targetDomain 
              ? `sqlmap -u "http://${targetDomain}/page.php?id=1" -D <database> -T <table> --dump` 
              : "sqlmap -u \"http://example.com/page.php?id=1\" -D <database> -T <table> --dump";
          default:
            return targetDomain 
              ? `sqlmap -u "http://${targetDomain}/page.php?id=1" --dbs` 
              : "sqlmap -u \"http://example.com/page.php?id=1\" --dbs";
        }
      case "owaspzap":
        switch (option) {
          case "full-scan":
            return targetDomain 
              ? `python zap.py -t http://${targetDomain} -m scan` 
              : "python zap.py -t http://example.com -m scan";
          case "passive-scan":
            return targetDomain 
              ? `python zap.py -t http://${targetDomain} -m passive` 
              : "python zap.py -t http://example.com -m passive";
          case "api-scan":
            return targetDomain 
              ? `python zap.py -t http://${targetDomain}/api -m api` 
              : "python zap.py -t http://example.com/api -m api";
          default:
            return targetDomain 
              ? `python zap.py -t http://${targetDomain} -m scan` 
              : "python zap.py -t http://example.com -m scan";
        }
      default:
        return `${tool} --help`;
    }
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    const command = getCommandFromOption(value);
    setInputCommand(command);
  };

  const clearOutput = () => {
    setOutputText("");
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={commandMode} onValueChange={(value) => setCommandMode(value as "terminal" | "simple")}>
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="terminal" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>Terminal</span>
          </TabsTrigger>
          <TabsTrigger value="simple" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Exécution simple</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="terminal" className="space-y-4">
          <div className="bg-black/90 text-green-400 font-mono p-4 rounded-md h-64 overflow-auto" ref={outputRef}>
            {outputText || "Prêt à exécuter des commandes..."}
          </div>
          
          <div className="flex space-x-2">
            <Input 
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder={`Entrez une commande pour ${tool}`}
              className="font-mono"
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleCommandExecution()}
              disabled={isLoading}
            />
            <Button 
              onClick={handleCommandExecution}
              disabled={isLoading || !inputCommand.trim()}
              className="flex-shrink-0"
            >
              {isLoading ? "Exécution..." : "Exécuter"}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={clearOutput} 
              className="flex-shrink-0" 
              title="Effacer la sortie"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="simple" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type d'opération</label>
              <Select value={selectedOption} onValueChange={handleOptionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une option" />
                </SelectTrigger>
                <SelectContent>
                  {tool === "nmap" && (
                    <>
                      <SelectItem value="quick-scan">Scan rapide</SelectItem>
                      <SelectItem value="version-detection">Détection de version</SelectItem>
                      <SelectItem value="os-detection">Détection d'OS</SelectItem>
                      <SelectItem value="comprehensive">Scan complet</SelectItem>
                    </>
                  )}
                  
                  {tool === "sqlmap" && (
                    <>
                      <SelectItem value="database-detection">Détection de base de données</SelectItem>
                      <SelectItem value="tables-detection">Détection de tables</SelectItem>
                      <SelectItem value="dump-data">Extraction de données</SelectItem>
                    </>
                  )}
                  
                  {tool === "owaspzap" && (
                    <>
                      <SelectItem value="full-scan">Scan complet</SelectItem>
                      <SelectItem value="passive-scan">Scan passif</SelectItem>
                      <SelectItem value="api-scan">Scan d'API</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Commande à exécuter</label>
              <div className="flex items-center gap-2">
                <Input 
                  value={inputCommand}
                  onChange={(e) => setInputCommand(e.target.value)}
                  className="font-mono"
                  readOnly
                />
                <Button 
                  onClick={handleCommandExecution}
                  disabled={isLoading || !inputCommand.trim()}
                  size="sm"
                >
                  {isLoading ? "..." : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {outputText && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Résultat</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearOutput} 
                  className="h-6 px-2 text-xs"
                >
                  Effacer
                </Button>
              </div>
              <div className="bg-black/90 text-green-400 font-mono p-4 rounded-md max-h-64 overflow-auto" ref={outputRef}>
                {outputText}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
