"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Projects from "../models/projects.model";
import Assemblies from "../models/assemblies.model";
import { Collection } from "mongoose";
import { Db } from "mongodb";

interface Params {
    text: string,
    tags: string,
    bio: string
    path: string,
    author: string,
    parent: string
}

interface Props {
    projectid: string
    assemblyid: string
}

interface SPProps {
    projectId: string
    path: string
    prompt: string
    nodes: Float64Array
    keywords: Float64Array
    edges: Float64Array
    jsonextract: object
}

export async function createProject({ text, tags, bio, path, author, parent }: Params) {

    try {
        
        connectToDB();

        if(parent == ""){
            const CreatedThread = await Projects.create({
                text: text,
                tags: tags,
                bio: bio,
                author: author
            });
        } else {
            const CreatedThread = await Projects.create({
                text: text,
                tags: tags,
                bio: bio,
                author: author,
                parent: parent
            });

            const originalProject = await Assemblies.findById(parent);
            originalProject.children.push(CreatedThread._id);
            await originalProject.save();
            
        }

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Error creating new post: ${error.message}`);
    }

}

export async function createAssemblies({ text, tags, bio, path, author, parent }: Params) {

    try {
        
        connectToDB();

        const CreatedThread = await Assemblies.create({
            text: text,
            tags: tags,
            bio: bio,
            author: author,
            parent: parent
        });

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Error creating new post: ${error.message}`);
    }

}

export async function saveProject({projectId, path, prompt, nodes, keywords, edges, jsonextract}: SPProps) {

    connectToDB();
  
    try {
      // Find the original thread by its ID
      const originalproject = await Projects.findById(projectId);
      
      
      //clearing the old data if there is any 
      await Projects.updateOne(
        { _id: projectId },
        { $set: { Nodes: [] } }
      );
      await Projects.updateOne(
        { _id: projectId },
        { $set: { Prompt: [] } }
      );
      await Projects.updateOne(
        { _id: projectId },
        { $set: { Keywords: [] } }
      );
      await Projects.updateOne(
        { _id: projectId },
        { $set: { jsonextract: [] } }
      );
      await Projects.updateOne(
        { _id: projectId },
        { $set: { Edges: [] } }
      );

      // Add the new nodes
      originalproject.Nodes.push(nodes);

      // Add the new edges
      originalproject.Edges.push(edges);

      // Add the new prompt
      originalproject.Prompt.push(prompt);

      // Add the new keywords
      originalproject.Keywords.push(keywords);

      // Add the new keywords
      originalproject.jsonextract.push(jsonextract);

      // Save the updated original project to the database
      await originalproject.save();

    } catch (err) {
      console.error("Error while saving project:", err);
      throw new Error("Unable to save project");
    }
}

export async function fetchProjectById(id: string) {
    connectToDB();
    try {

        const thread = await Projects.findById(id);
        return thread;

    } catch (error: any) {
        throw new Error(`Error fetching threadL ${error.message}`)
    }
}