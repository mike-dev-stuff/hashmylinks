'use server';

/**
 * @fileOverview Generates theme suggestions based on a user-provided description of their profile content.
 *
 * - suggestThemeFromDescription - A function that suggests theme customizations (colors, fonts) based on a profile description.
 * - ThemeSuggestionFromDescriptionInput - The input type for the suggestThemeFromDescription function.
 * - ThemeSuggestionFromDescriptionOutput - The return type for the suggestThemeFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThemeSuggestionFromDescriptionInputSchema = z.object({
  profileDescription: z
    .string()
    .describe(
      'A brief description of the profile content or purpose (e.g., \'portfolio for a web developer\', \'collection of travel photos\').'
    ),
});
export type ThemeSuggestionFromDescriptionInput = z.infer<
  typeof ThemeSuggestionFromDescriptionInputSchema
>;

const ThemeSuggestionFromDescriptionOutputSchema = z.object({
  themeSuggestions: z
    .string()
    .describe(
      'Theme customization suggestions (colors, fonts) that match the description and help create a visually appealing profile.'
    ),
});
export type ThemeSuggestionFromDescriptionOutput = z.infer<
  typeof ThemeSuggestionFromDescriptionOutputSchema
>;

export async function suggestThemeFromDescription(
  input: ThemeSuggestionFromDescriptionInput
): Promise<ThemeSuggestionFromDescriptionOutput> {
  return themeSuggestionFromDescriptionFlow(input);
}

const themeSuggestionPrompt = ai.definePrompt({
  name: 'themeSuggestionPrompt',
  input: {schema: ThemeSuggestionFromDescriptionInputSchema},
  output: {schema: ThemeSuggestionFromDescriptionOutputSchema},
  prompt: `You are a theme customization expert. Given a description of a profile's content or purpose, you will suggest theme customizations (colors, fonts) that match the description and help create a visually appealing profile.

Description: {{{profileDescription}}}

Theme Suggestions:`,
});

const themeSuggestionFromDescriptionFlow = ai.defineFlow(
  {
    name: 'themeSuggestionFromDescriptionFlow',
    inputSchema: ThemeSuggestionFromDescriptionInputSchema,
    outputSchema: ThemeSuggestionFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await themeSuggestionPrompt(input);
    return output!;
  }
);
