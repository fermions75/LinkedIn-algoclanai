import { streamAIResponse } from "../services/aiService.js";
import { getPersonaDetails } from "../services/personaService.js";
import { generatePrompt } from "../utils/promptGenerator.js";
import User from "../models/User.js";
import Prompt from "../models/Prompt.js";

// Helper function to get prompt by ID
const getPromptById = async (promptId, userId) => {
  const prompt = await Prompt.findOne({ _id: promptId, userId: userId });
  return prompt;
};

export const getLinkedInComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { personaId, linkedinPost, tone, promptId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has available requests
    if (user.availableRequest <= 0) {
      return res
        .status(403)
        .json({ message: "You have passed your limit of available requests" });
    }

    // Decrement the available requests
    user.availableRequest -= 1;

    // Save the updated user object
    await user.save();

    // Retrieve persona details
    const persona = await getPersonaDetails(personaId);

    let subPrompt = null;
    let finalTone = '';  // Initialize finalTone as an empty string

    // Handle promptId if provided
    if (promptId) {
      const promptData = await getPromptById(promptId, userId);
      if (promptData && promptData.text) {
        subPrompt = promptData.text;
        finalTone = subPrompt; // Use subPrompt as tone if promptId is provided and has text
      }
    } else if (tone) {
      finalTone = tone; // Use provided tone if promptId is not available
    }

    // Generate prompt based on persona, LinkedIn post, and final tone
    const generatedPrompt = generatePrompt(persona, linkedinPost, finalTone);

    // Combine subPrompt (if available) with the generated prompt
    const finalPrompt = subPrompt ? `${subPrompt}\n\n${generatedPrompt}` : generatedPrompt;

    // Stream the AI response
    await streamAIResponse(finalPrompt, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};