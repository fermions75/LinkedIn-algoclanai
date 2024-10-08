"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Send, Loader2 } from "lucide-react";
import useStreamApi from "@/lib/hooks/useStreamApi";
import { Textarea } from "./ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

const AiPlayGround = ({ personas, prompts, accessToken }) => {
  const [selectedPersona, setSelectedPersona] = useState(
    personas[0]?.job || ""
  );
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [postText, setPostText] = useState("");
  const { response, isLoading, error, streamApi } = useStreamApi();

  const handleGenerate = () => {
    if (selectedPersona && postText) {
      const selectedPersonaId = personas.find(
        (persona) => persona.job === selectedPersona
      )?._id;
      const selectedPromptId =
        prompts.find((prompt) => prompt.name === selectedPrompt)?._id || "";
      streamApi(selectedPersonaId, postText, selectedPromptId, accessToken);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              User Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-normal"
                >
                  <span className="truncate block max-w-[calc(100%-20px)]">
                    {selectedPersona || "Select Persona"}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={selectedPersona}
                  onValueChange={setSelectedPersona}
                >
                  {personas.map((persona) => (
                    <DropdownMenuRadioItem
                      key={persona._id}
                      value={persona.job}
                    >
                      <span
                        className="truncate block max-w-[200px]"
                        title={persona.job}
                      >
                        {persona.job.length > 20
                          ? `${persona.job.substring(0, 20)}...`
                          : persona.job}
                      </span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-normal"
                >
                  {selectedPrompt || "Select Prompt"}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={selectedPrompt}
                  onValueChange={setSelectedPrompt}
                >
                  {prompts.map((prompt) => (
                    <DropdownMenuRadioItem key={prompt._id} value={prompt.name}>
                      {prompt.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Enter LinkedIn Post Text"
              className="min-h-[150px] resize-none"
            />
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !selectedPersona || !postText}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 min-h-[250px] max-h-[400px] overflow-auto">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500"
                  >
                    {error}
                  </motion.p>
                ) : response ? (
                  <motion.pre
                    key="response"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {response}
                  </motion.pre>
                ) : (
                  <motion.p
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-500 dark:text-gray-400 italic"
                  >
                    Awaiting response...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AiPlayGround;
