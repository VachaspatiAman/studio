'use server';

/**
 * @fileOverview This file implements the personalized course and mentor recommendation flow.
 * It recommends courses and mentors based on a student's learning history and preferences.
 *
 * - getPersonalizedRecommendations - A function that returns personalized recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  learningHistory: z.string().describe('The learning history of the student.'),
  preferences: z.string().describe('The preferences of the student.'),
});

export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedCourses: z.string().describe('Recommended courses for the student.'),
  recommendedMentors: z.string().describe('Recommended mentors for the student.'),
});

export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized course and mentor recommendations to students.

  Based on the student's learning history and preferences, recommend courses and mentors that would be most relevant and helpful to them.

  Student ID: {{{studentId}}}
  Learning History: {{{learningHistory}}}
  Preferences: {{{preferences}}}

  Consider the student's past performance, areas of interest, and preferred learning style when making your recommendations.
  Make sure the course and mentor recommendations align well with the student's learning history and preferences.
  Make the course and mentor recommendations specific, give the reasons why the courses and mentors are recommended based on student's learning history and preferences.
`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
